const { ipcRenderer } = require('electron')
let db = require('./database')

let container;
let view;

window.onload = function() { 
    view = document.getElementById("view");
    container = document.getElementById("container");

    var currentParent = "";
    var counter = 0;
    var temp2
    var rulesArr

    var promise = Promise.resolve(getEntites());

    Promise.resolve('foo')
  // 1. Receive "foo", concatenate "bar" to it, and resolve that to the next then
    .then(function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(setOutput());
            }, 1000);
        });
    })


    // promise.then(setOutput())

    // functionController();
    // await getEntites();
    // await getAccess();
    // await setOutput();
    
}

let listOfChildren=[];
var list = [];
let counter=0;

// async function functionController(){
//     // return ent = await Promise.resolve(getEntites());
//     await Promise.all([getEntites(), getAccess()]);
//     // await getAccess();
//     // await setOutput();
// }

async function getEntites(){
    const sql ="SELECT * FROM system_data";
    db.query(sql, async (err, result) => {
        if(err) throw err;
        // var list = [];
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
            await getAccess(result, i);
        }
        // var promise2 = Promise.resolve(setOutput())
        // promise2.then(value => {
        //     var newArray = list[0][list[0].length-1][2];
        //     console.log(newArray[0]);
        //     return value;
        // })
        return list;
    })
}

async function getAccess(result, i){
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
    return list;
}

async function setOutput(){
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
        // console.log("\-"+list[i][0]);
        areaTag.appendChild(areaString)
        element.appendChild(areaTag);
        doorString += "|- [Doors] ";
        accessString += "|- [Access] ";

        for(var j=1; j<list[i].length; j++){

            var uniqueArray = [];
        
            // Loop through array values
            for(k=0; k < list[i][j][2].length; k++){
                if(uniqueArray.indexOf(list[i][j][2][k]) === -1) {
                    uniqueArray.push(list[i][j][2][k]);
                }
            }

            // console.log(list[i][j][2]);
            doorString += list[i][j][0];
            // accessString += list[i][j][2];
            if(list[i][j][1] == "open"){
                doorString += " (UNLOCKED)"
            }else{
                doorString +=" (LOCKED)"
            }
            doorString += ", "
            // accessString += ", "

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
        // console.log(doorString);
    }
    return list;
}

// async function getData() { 
//     const sql ="SELECT * FROM system_data";

//     let promise = new Promise((resolve, reject) => {

//         db.query(sql, async (err, result) => { 
//             if (err) reject(err); 

//             // asyncForEach
//             async function asyncForEach(array, callback) {
//                 for (let index = 0; index < array.length; index++) {
//                 await callback(array[index], index, array)
//                 }
//             } 

//             var list = [];
//             // var listOfChildren = [];
//             for(var i=0; i<result.length; i++){
//                 if(result[i].status!=null){
//                     break;
//                 }else{
//                     var temp = result[i];
//                     while(temp.parent_area!=null){
//                         counter++;
//                         for(var x=0; x<result.length; x++){
//                             if(result[x].area_id==temp.parent_area){
//                                 temp = result[x];
//                             }
//                         }
//                     }
//                     listOfChildren.push([result[i].name, counter]);
//                     counter=0;
//                 }
//                 for(let j=i; j<result.length; j++){
//                     console.log("welcomeloop")
//                     if(result[j].parent_area == result[i].area_id && result[j].status!=null){
//                         var nameArray = [];
//                         const sql2 = "SELECT * FROM access_rules WHERE door=?";

//                         //Subdata
//                         let promisesub = new Promise((resolvesub, rejectsub) => {
//                             db.query(sql2, result[j].area_id, async (error, result2) => {
//                                 if (error) throw(error);
//                                 for(let k=0; k<result2.length; k++){
//                                     nameArray.push(result2[k].name);
//                                 }
//                             });
//                             listOfChildren.push([result[j].name, result[j].status, nameArray]);
//                         })
//                     }
//                 }
//                 list.push(listOfChildren);
//                 listOfChildren=[];
//             }

//             const start = async () => {
//                 await asyncForEach(result, async (row) => {
//                     row.additionalData = await promisesub;
//                 })
//                 resolve(resultSet)
//             //console.log('ready')
//             };
//             start()
//         }) 
//     })

//     let result = await promise;

//     return result;
// } 