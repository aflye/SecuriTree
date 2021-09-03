const { ipcRenderer } = require('electron')

let viewBtn; 
let manageBtn;
let logoutBtn;

window.onload = function() { 
    viewBtn = document.getElementById("viewBtn")
    manageBtn = document.getElementById("manageBtn")
    logoutBtn = document.getElementById("logoutBtn")

    logoutBtn.onclick = async function(){
        await ipcRenderer.invoke("logout")
    }

    viewBtn.onclick = async function(){
        await ipcRenderer.invoke("view")
    }

    manageBtn.onclick = async function(){
        await ipcRenderer.invoke("manage")
    }
}