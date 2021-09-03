const { ipcRenderer } = require('electron')

let username; 
let password;
let loginBtn;
let message;
let instr;

window.onload = function() { 
  username = document.getElementById("username")
  password = document.getElementById("password")
  loginBtn = document.getElementById("loginBtn")
  message = document.getElementById("message");
  instr = document.getElementById("instr");

  loginBtn.onclick = async function(){
      const obj = {username:username.value, password:password.value }
      ipcRenderer.invoke("login", obj)
  }
}

ipcRenderer.on('login-failed', async(event, results) => {
  message.innerHTML = "Login failed.";
  instr.innerHTML = "Please enter your login credentials to try again.";
})