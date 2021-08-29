const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path'); 
let db = require('./database')


var winLogin;

function loginWindow () {
    winLogin = new BrowserWindow({
     width: 800,
     height: 600,
     webPreferences: {
         nodeIntegration: true,
         contextIsolation:true,
         devTools:true,
         preload:path.join(__dirname, 'login.js')
        }
    })
    winLogin.loadFile('login.html');
}

// When application is ready, we will first add the users to the database (if needed) and then display
// The login window.
app.whenReady().then(function(){
    addUsers();
    loginWindow();
});

// If the ipcRenderer is invoked with the commans'login', we will execute the validateLogin function.
ipcMain.handle('login', (event, obj) => {
    validateLogin(obj)
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
            // we need to send the user to a new window.
        }else{
            new Notification({
                title:"Login",
                body: 'The Email and/or Password entered is incorrect.'
            }).show()
        }
    });
}