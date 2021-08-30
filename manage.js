const { ipcRenderer } = require('electron')

let lockBtn
let unlockBtn
let backBtn

window.onload = function() { 
    lockBtn = document.getElementById("lockBtn")
    unlockBtn = document.getElementById("unlockBtn")
    backBtn = document.getElementById("backBtn")

    lockBtn.onclick = function(){
      ipcRenderer.invoke("lockDoor")
    }

    unlockBtn.onclick = function(){
        ipcRenderer.invoke("unlockDoor")
    }

    backBtn.onclick = function(){
        ipcRenderer.invoke("back")
    }
}