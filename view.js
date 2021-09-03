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

    var currentParent = "";
    var counter = 0;
    var temp2
    var rulesArr
    getEntites();
    
}

let listOfChildren=[];
let counter=0;

async function getEntites(){
    const sql ="SELECT * FROM system_data";
    db.query(sql, async (err, result) => {
        if(err) throw err;
        var list = [];
        // var listOfChildren = [];
        for(var i=0; i<result.length; i++){
             if(result[i].status!=null){
                break;
            }else{
                var temp = result[i];
                while(temp.parent_area!=null){
                    counter++;
                    for(var x=0; x<result.length; x++){
                        if(result[x].area_id==temp.parent_area){
                            temp = result[x];
                        }
                    }
                }
                listOfChildren.push([result[i].name, counter]);
                counter=0;
            }
            // console.log("atleast")
            for(let j=i; j<result.length; j++){
                console.log("welcomeloop")
                if(result[j].parent_area == result[i].area_id && result[j].status!=null){
                    var nameArray = [];
                    const sql2 = "SELECT * FROM access_rules WHERE door=?";
                    db.query(sql2, result[j].area_id, async (error, result2) => {
                        if (error) throw(error);
                        for(let k=0; k<result2.length; k++){
                            nameArray.push(result2[k].name);
                        }
                    });
                    listOfChildren.push([result[j].name, result[j].status, nameArray]);
                }
            }
            list.push(listOfChildren);
            listOfChildren=[];
        }
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
        })
}

// function accessResults(parentResult, i){
//     console.log("welcome")
//         console.log("welcome2")
//         console.log(parentResult.length)
//         console.log(parentResult)
//         for(let j=i; j<parentResult.length; j++){
//             console.log("welcomeloop")
//             if(parentResult[j].parent_area == parentResult[i].area_id && parentResult[j].status!=null){
//                 console.log("should ber here")
//                 const sql = "SELECT * FROM access_rules WHERE door=?";
//                 db.query(sql, parentResult[j].area_id, function(error, result) {
//                     if (error) reject( error);
//                     listOfChildren.push([parentResult[j].name, parentResult[j].status, result]);
//                 });
//             }
//         }
// }