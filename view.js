const { ipcRenderer } = require('electron')
let db = require('./database')

let container;
let view;

window.onload = function() { 
    // console.log("LOADED")
    view = document.getElementById("view");
    container = document.getElementById("container");

    view.onclick = function(){
        view.innerHTML = "changed";
    }

    // get all open doors - just for practice.
    const sql ="SELECT * FROM system_data";
    db.query(sql, function(err, result, fields){
        if(err){
            throw err;
        }else{
            console.log(result)
        }
    });
}