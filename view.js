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
            var list = [];
            var listOfChildren = [];
            for(var i=0; i<result.length; i++){
                if(result[i].status!=null){
                    break;
                }else{
                    listOfChildren.push(result[i].name);
                }
                for(var j=i; j<result.length; j++){
                    if(result[j].parent_area == result[i].area_id && result[j].status!=null){
                        listOfChildren.push(result[j].name);
                    }
                }
                list.push(listOfChildren);
                listOfChildren=[];
            }
            console.log(list);
        }
    });
}