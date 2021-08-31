const { ipcRenderer } = require('electron')

let lockDoorBtn
let doorInput

window.onload = function() { 
    lockDoorBtn = document.getElementById("lockDoorBtn")
    doorInput = document.getElementById("door-input").value

    lockDoorBtn.onclick = function(){
        doorInput = document.getElementById("door-input").value
        console.log(doorInput);
        ipcRenderer.invoke("lockDoor", doorInput);
    }
}