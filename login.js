const { ipcRenderer } = require('electron')

let username; 
let password;
let loginBtn;

window.onload = function() { 
  username = document.getElementById("username")
  password = document.getElementById("password")
  loginBtn = document.getElementById("loginBtn")

  loginBtn.onclick = function(){
      const obj = {username:username.value, password:password.value }
      ipcRenderer.invoke("login", obj)
  }
}