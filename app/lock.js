const { ipcRenderer } = require('electron')

let lockDoorBtn
let doorInput

window.onload = function() { 
    lockDoorBtn = document.getElementById("lockDoorBtn")
    doorInput = document.getElementById("door-input").value

    lockDoorBtn.onclick = async function(){
        doorInput = document.getElementById("door-input").value
        ipcRenderer.invoke("lockDoor", doorInput);
    }
}