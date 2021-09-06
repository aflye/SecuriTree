const { ipcRenderer } = require('electron')
let db = require('./database')

window.onload = function() { 
    // Promise.resolve(getEntites()).then(function() {
    //     return new Promise(function(resolve, reject) {
    //         setTimeout(function() {
    //             resolve(setOutput());
    //         }, 5000);
    //     });
    // })
}

// let listOfChildren=[];
// var list = [];
// let counter=0;

// async function getEntites(){
//     const sql ="SELECT * FROM system_data";
//     db.query(sql, async (err, result) => {
//         if(err) throw err;
//         for(var i=0; i<result.length; i++){
//              if(result[i].status!=null){
//                 break;
//             }else{
//                 var temp = result[i];
//                 while(temp.parent_area!=null){
//                     counter++;
//                     for(var x=0; x<result.length; x++){
//                         if(result[x].area_id==temp.parent_area){
//                             temp = result[x];
//                         }
//                     }
//                 }
//                 listOfChildren.push([result[i].name, counter]);
//                 counter=0;
//             }
//             await getAccess(result, i);
//         }
//         return list;
//     })
// }

// async function getAccess(result, i){
//     for(let j=i; j<result.length; j++){
//         if(result[j].parent_area == result[i].area_id && result[j].status!=null){
//             var nameArray = [];
//             const sql2 = "SELECT * FROM access_rules WHERE door=?";
//             db.query(sql2, result[j].area_id, async (error, result2) => {
//                 if (error) throw(error);
//                 for(let k=0; k<result2.length; k++){
//                     nameArray.push(result2[k].name);
//                 }
//             });
//             listOfChildren.push([result[j].name, result[j].status, nameArray]);
//         }
//     }
//     list.push(listOfChildren);
//     listOfChildren=[];
//     return list;
// }

ipcRenderer.on('setOutput', async(event, result) => {
    await setOutput(result)
})

async function setOutput(list){
    var element = document.getElementById("container");
    var areaTag = document.createElement("pre");
    var doorTag = document.createElement("pre");
    var accessTag = document.createElement("pre");
    var tab = '\t';

    for(var i=0; i<list.length; i++){
        var areaString = "";
        var doorString = "";
        var accessString = "";
        for(l=0; l<list[i][0][1]; l++){
            areaString += tab;
            doorString += tab;
            accessString += tab;
        }
        doorString+=tab;
        accessString+=tab;
        areaString+="\\-"+list[i][0][0];

        areaString = document.createTextNode(areaString);
        areaTag.appendChild(areaString)
        element.appendChild(areaTag);
        doorString += "|- [Doors] ";
        accessString += "|- [Access] ";

        for(var j=1; j<list[i].length; j++){

            var uniqueArray = [];
            for(k=0; k < list[i][j][2].length; k++){
                if(uniqueArray.indexOf(list[i][j][2][k]) === -1) {
                    uniqueArray.push(list[i][j][2][k]);
                }
            }
            doorString += list[i][j][0];

            if(list[i][j][1] == "open"){
                doorString += " (UNLOCKED)"
            }else{
                doorString +=" (LOCKED)"
            }
            doorString += ", "

            if(j==list[i].length-1){
                accessString += uniqueArray;
                accessString += ", "
            }
        }
        areaTag = document.createElement("pre");
        doorString = doorString.substring(0, doorString.length-2);
        doorString = document.createTextNode(doorString);
        doorTag.appendChild(doorString);
        element.appendChild(doorTag);
        doorTag = document.createElement("pre");

        accessString = accessString.substring(0, accessString.length-2);
        accessString = document.createTextNode(accessString);
        accessTag.appendChild(accessString);
        element.appendChild(accessTag);
        accessTag = document.createElement("pre");
    }
    return list;
}