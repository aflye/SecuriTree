const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path'); 

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