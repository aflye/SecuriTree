const { ipcRenderer } = require('electron')

let unlockDoorBtn
let doorInput

window.onload = function() { 
    unlockDoorBtn = document.getElementById("unlockDoorBtn")
    doorInput = document.getElementById("door-input").value

    unlockDoorBtn.onclick = async function(){
        doorInput = document.getElementById("door-input").value
        console.log(doorInput);
        ipcRenderer.invoke("unlockDoor", doorInput);
    }
}