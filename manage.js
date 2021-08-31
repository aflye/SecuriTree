const { ipcRenderer } = require('electron')

let lockBtn
let unlockBtn
let backBtn

window.onload = function() { 
    lockBtn = document.getElementById("lockBtn")
    unlockBtn = document.getElementById("unlockBtn")
    backBtn = document.getElementById("backBtn")

    lockBtn.onclick = function(){
      ipcRenderer.invoke("loadLock")
    }

    unlockBtn.onclick = function(){
        ipcRenderer.invoke("loadUnlock")
    }

    backBtn.onclick = function(){
        ipcRenderer.invoke("back")
    }
}