const { app, BrowserWindow, ipcMain, globalShortcut} = require('electron');
const bcrypt = require('bcrypt');
const path = require('path'); 
let db = require('./database')
let userData = require('../registered_users');
let systemData = require('../system_data');

var winLogin;
var winIndex;
const saltRounds = 10;
let listOfChildren=[];
var list = [];
let counter=0;

function loginWindow () {
    winLogin = new BrowserWindow({
     width: 600,
     height: 400,
     resizable:false,
     frame:false,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'login.js')
        }
    })
    winLogin.loadFile('core/login.html');

    winLogin.on('close', function(){
        winLogin=null;
    })

    winLogin.setMenu(null);
}

function indexWindow () {
    winIndex = new BrowserWindow({
     width: 800,
     height: 600,
     resizable:false,
     frame:false,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'index.js')
        }
    })
    winIndex.loadFile('core/index.html');

    //Quit app when closed
    winIndex.on('closed',function(){
        winIndex=null;
    })

    winIndex.setMenu(null);
    if(winLogin!=null){
        winLogin.close();
    }
}

function viewWindow () {
    winView = new BrowserWindow({
     width: 1200,
     height: 700,
     resizable:false,
     frame:false,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'view.js')
        }
    })
    winView.loadFile('core/view.html');

    winView.webContents.openDevTools()

    //Quit app when closed
    winView.on('close',function(){
        indexWindow();
    })

    winView.setMenu(null);
    winIndex.close();
}

function manageWindow () {
    winManage = new BrowserWindow({
     width: 800,
     height: 600,
     resizable:false,
     frame:false,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'manage.js')
        }
    })
    winManage.loadFile('core/manage.html');

    //Quit app when closed
    winManage.on('close',function(){
        if(winIndex==null)
            indexWindow();
        winManage=null;
    })

    winManage.on('destroy', function(){
        winManage=null;
    })

    winManage.setMenu(null);
    if(winIndex!=null)
        winIndex.close();
}

// window used to lock door
function lockWindow () {
    winLock = new BrowserWindow({
     width: 800,
     height: 600,
     resizable:false,
     frame:false,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'lock.js')
        }
    })
    winLock.loadFile('core/lock.html');

    //Quit app when closed
    winLock.on('close',function(){
        manageWindow();
        winLock=null;
    })

    winLock.setMenu(null);
    if(winManage!=null)
        winManage.destroy();
}

// window used to unlock door
function unlockWindow () {
    winUnlock = new BrowserWindow({
     width: 800,
     height: 600,
     resizable:false,
     frame:false,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'unlock.js')
        }
    })
    winUnlock.loadFile('core/unlock.html');

    //Quit app when closed
    winUnlock.on('close',function(){
        manageWindow();
        winUnlock=null;
    })

    winUnlock.setMenu(null);
    if(winManage!=null)
        winManage.destroy();
}

// When application is ready, we will first add the users to the database (if needed) and then display
// The login window.
app.whenReady().then(function(){

    setTimeout(function() {
        globalShortcut.register('Esc', () => {
            const currentWin = BrowserWindow.getFocusedWindow();
            currentWin.close();
        })
        Promise.resolve(addUsers());
        loginWindow();
    }, 5000);
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
        db.end();
    }
})

// If the ipcRenderer is invoked with the commans'login', we will execute the validateLogin function.
ipcMain.handle('login', async (event, obj) => {
    Promise.resolve(validateLogin(obj));
});

ipcMain.handle('logout', async (event) => {
   const result = await app.quit();
   return result
});

ipcMain.handle('view', async (event) => {

    Promise.resolve(getEntites()).then(function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                viewWindow();
                resolve(winView.webContents.send('setOutput', list));
            }, 5000);
        });
    })

    // const result = await viewWindow();
});

ipcMain.handle('manage', async (event) => {
    const result = await manageWindow();
    return result
});

ipcMain.handle('back', async (event) => {
    const result = await winManage.close();
    return result
});

ipcMain.handle('loadLock', async (event) => {
    const result = await lockWindow();
    return result
});

ipcMain.handle('loadUnlock', async (event) => {
    const result = await unlockWindow();
    return result
});

ipcMain.handle('lockDoor', async (event, doorInput) => {
    const result = await lockDoor(doorInput);
    return result
});

ipcMain.handle('unlockDoor', async (event, doorInput) => {
    const result = await unlockDoor(doorInput);
    return result
});

async function getEntites(){
    const sql ="SELECT * FROM system_data";
    db.query(sql, async (err, result) => {
        if(err) throw err;
        for(var i=0; i<result.length; i++){
             if(result[i].status!=null){
                break;
            }else{
                var temp = result[i];
                while(temp.parent_area!=null){
                    counter++;
                    for(var x=0; x<result.length; x++){
                        if(result[x].area_id==temp.parent_area){
                            temp = result[x];
                        }
                    }
                }
                listOfChildren.push([result[i].name, counter]);
                counter=0;
            }
            await getAccess(result, i);
        }
        return list;
    })
}

async function getAccess(result, i){
    for(let j=i; j<result.length; j++){
        if(result[j].parent_area == result[i].area_id && result[j].status!=null){
            var nameArray = [];
            const sql2 = "SELECT * FROM access_rules WHERE door=?";
            db.query(sql2, result[j].area_id, async (error, result2) => {
                if (error) throw(error);
                for(let k=0; k<result2.length; k++){
                    nameArray.push(result2[k].name);
                }
            });
            listOfChildren.push([result[j].name, result[j].status, nameArray]);
        }
    }
    list.push(listOfChildren);
    listOfChildren=[];
    return list;
}

// Functionality to Lock Door
async function lockDoor(doorInput){
    const errorMessage = "Please enter a valid Door ID.";
    if(doorInput.length!=36){
        const sendReq = await winLock.webContents.send('invalid-id', errorMessage);
        sendReq;
    }else{
        const sql = "SELECT status FROM system_data WHERE area_id=?"
        db.query(sql, doorInput, async (error, result) => {
            if(error){
                console.log(error)
            }
            console.log(result[0].status);
            const lockString = "closed";
            const sql2 = "UPDATE system_data SET status=? WHERE area_id=?"
            db.query(sql2, [lockString, doorInput], async (error, input) => {
                if(error){
                    console.log(error)
                }

            })
        })
    }
}

// Functionality to Unlock Door
async function unlockDoor(doorInput){
    const errorMessage = "Please enter a valid Door ID.";
    if(doorInput.length!=36){
        const sendReq = await winUnlock.webContents.send('invalid-id', errorMessage);
        sendReq;
    }else{
        const sql = "SELECT status FROM system_data WHERE area_id=?"
        db.query(sql, doorInput, async (error, result) => {
            if(error){
                console.log(error)
            }
            console.log(result[0].status);
            const unlockString = "open";
            const sql2 = "UPDATE system_data SET status=? WHERE area_id=?"
            db.query(sql2, [unlockString, doorInput], async (error, input) => {
                if(error){
                    console.log(error)
                }

            })
        })
    }
}

// Functionality used to check if login credentials that have been entered are correct.
async function validateLogin(obj) {
    const { username, password } = obj 
    const sql = "SELECT password FROM users WHERE username=?"
    db.query(sql, [username], async (error, result) => {
        if(error){ 
            console.log("ERRORERRORERROR");
            console.log(error);
        }

        const flag = await decryptPass(password, result[0].password);
        
        if(flag){
            console.log("LOGIN SUCCESSFUL");
            return indexWindow();
        }else{
            const sendReq = await winLogin.webContents.send('login-failed', result);
            return sendReq;
        }
    });
}

// This function will only be run once as it loads the registered_users.json data into the db.
async function addUsers() {
    db.query("SELECT * FROM users", async function(err, result){
        if(err){
            console.log (err);
        }
        if(result.length == 0){
            var epidata = userData.registered_users;
            for(var i=0; i<epidata.length; i++){
                const obj = {
                    username: epidata[i].username,
                    first_name: epidata[i].first_name,
                    surname: epidata[i].surname,
                    password: epidata[i].password
                }

                obj.password = await encryptPass(obj.password);

                const sql = "INSERT INTO users SET ?";
                db.query(sql, obj, async (error, results, fields) => {
                    if(error){
                        console.log(error);
                    }
                });
            }

            var areaData = systemData.system_data.areas;
            console.log(areaData[0].child_area_ids[0]);
            for(var i=0; i<areaData.length; i++){
                const obj = {
                    area_id: areaData[i].id,
                    name: areaData[i].name,
                    parent_area: areaData[i].parent_area,
                    status: null
                }

                const sql = "INSERT INTO system_data SET ?";
                db.query(sql, obj, async (error, results, fields) => {
                    if(error){
                        console.log(error);
                    }
                });
            }

            var doorData = systemData.system_data.doors;
            console.log(doorData[0]);
            for(var i=0; i<doorData.length; i++){
                const obj = {
                    area_id: doorData[i].id,
                    name: doorData[i].name,
                    parent_area: doorData[i].parent_area,
                    status: doorData[i].status
                }

                const sql = "INSERT INTO system_data SET ?";
                db.query(sql, obj, async (error, results, fields) => {
                    if(error){
                        console.log(error);
                    }
                });
            }

            var ruleData = systemData.system_data.access_rules;
            console.log(ruleData[0]);
            for(var i=0; i<ruleData.length; i++){
                for(var j=0; j<ruleData[i].doors.length; j++){
                    const obj = {
                        rule_id: ruleData[i].id,
                        name: ruleData[i].name,
                        door: ruleData[i].doors[j]
                    }

                    const sql = "INSERT INTO access_rules SET ?";
                    db.query(sql, obj, async (error, results, fields) => {
                        if(error){
                            console.log(error);
                        }
                    });
                }
            }
        }
    });
}

async function encryptPass(password){
    const hashed_password = await bcrypt.hash(password, saltRounds);
    return hashed_password;
}

async function decryptPass(passwordGiven, hashedPassword){
    console.log(passwordGiven);
    console.log(hashedPassword)
    const flag = await bcrypt.compare(passwordGiven, hashedPassword);
    console.log(flag)
    return flag;
}