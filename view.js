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
    var currentParent = "";
    var counter = 0;
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
                    if(i==0){
                        listOfChildren.push([result[i].name, counter]);
                        currentParent = result[i].area_id;
                    }else{
                        if(result[i].parent_area == currentParent){
                            listOfChildren.push([result[i].name, counter+1]);
                        }else{
                            currentParent=result[i].parent_area;
                            counter++;
                            listOfChildren.push([result[i].name, counter]);
                        }
                    }
                }
                for(var j=i; j<result.length; j++){
                    if(result[j].parent_area == result[i].area_id && result[j].status!=null){
                        listOfChildren.push([result[j].name, result[j].status]);
                    }
                }
                list.push(listOfChildren);
                listOfChildren=[];
            }
            console.log(list[0][0]) //Object of area
            console.log(list[0][1]) //Object of first door
            console.log(list[0][0][0]) //Name of Area
            console.log(list[0][0][1]) //Counter
            console.log(list[0][1][0]) //Name of First Door
            console.log(list[0][1][1]) //Door Status

            var element = document.getElementById("container");
            var areaTag = document.createElement("pre");
            var doorTag = document.createElement("pre");
            var tab = '\t';

            for(var i=0; i<list.length; i++){
                var areaString = "";
                var doorString = "";
                for(l=0; l<list[i][0][1]; l++){
                    areaString += tab;
                    doorString += tab;
                }
                doorString+=tab;
                areaString+="\\-"+list[i][0][0];

                areaString = document.createTextNode(areaString);
                // console.log("\-"+list[i][0]);
                areaTag.appendChild(areaString)
                element.appendChild(areaTag);
                doorString += "|- [Doors] ";

                for(var j=1; j<list[i].length; j++){
                    doorString += list[i][j][0];
                    if(list[i][j][1] == "open"){
                        doorString += " (UNLOCKED)"
                    }else{
                        doorString +=" (LOCKED)"
                    }
                    doorString += ", "
                }
                areaTag = document.createElement("pre");
                doorString = doorString.substring(0, doorString.length-2);
                doorString = document.createTextNode(doorString);
                doorTag.appendChild(doorString);
                element.appendChild(doorTag);
                doorTag = document.createElement("pre");
                // console.log(doorString);
            }

            // console.log(list);
        }
    });
}