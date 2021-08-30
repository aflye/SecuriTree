const { app, BrowserWindow, Menu, ipcMain, Notification } = require('electron');
const path = require('path'); 
let db = require('./database')
let userData = require('./registered_users');
let systemData = require('./system_data');

var winLogin;
var winIndex;

function loginWindow () {
    winLogin = new BrowserWindow({
     width: 600,
     height: 400,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'login.js')
        }
    })
    winLogin.loadFile('login.html');

    winLogin.on('close', function(){
        winLogin=null;
    })

    winLogin.setMenu(null);
}

function indexWindow () {
    winIndex = new BrowserWindow({
     width: 800,
     height: 600,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'index.js')
        }
    })
    winIndex.loadFile('index.html');

    //Quit app when closed
    // winIndex.on('closed',function(){
    //     app.quit();
    // })

    winIndex.setMenu(null);
    if(winLogin!=null){
        winLogin.close();
    }
}

function viewWindow () {
    winView = new BrowserWindow({
     width: 800,
     height: 600,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'view.js')
        }
    })
    winView.loadFile('view.html');

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
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'manage.js')
        }
    })
    winManage.loadFile('manage.html');

    //Quit app when closed
    winManage.on('close',function(){
        indexWindow();
    })

    winManage.setMenu(null);
    winIndex.close();
}

// When application is ready, we will first add the users to the database (if needed) and then display
// The login window.
app.whenReady().then(function(){
    addUsers();
    loginWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

// If the ipcRenderer is invoked with the commans'login', we will execute the validateLogin function.
ipcMain.handle('login', (event, obj) => {
    validateLogin(obj)
});

ipcMain.handle('logout', (event) => {
    app.quit();
});

ipcMain.handle('view', (event) => {
    viewWindow();
});

ipcMain.handle('manage', (event) => {
    manageWindow();
});

// Functionality used to check if login credentials that have been entered are correct.
function validateLogin(obj) {
    const { username, password } = obj 
    const sql = "SELECT * FROM epi_tests WHERE username=? AND password=?"
    db.query(sql, [username, password], (error, results, fields) => {
        if(error){ 
            console.log(error);
        }
        
        if(results.length > 0){
            console.log("LOGIN SUCCESSFUL");
            indexWindow();
        }else{
            winLogin.webContents.send('login-failed', results);
        }
    });
}

// This function will only be run once as it loads the registered_users.json data into the db.
function addUsers() {
    db.query("SELECT * FROM epi_tests", function(err, result, fields){
        if(err){
            throw err;
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

                const sql = "INSERT INTO epi_tests SET ?";
                db.query(sql, obj, (error, results, fields) => {
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
                db.query(sql, obj, (error, results, fields) => {
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
                db.query(sql, obj, (error, results, fields) => {
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
                    db.query(sql, obj, (error, results, fields) => {
                        if(error){
                            console.log(error);
                        }
                    });
                }
            }
        }
    });
}