const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'electron'
});

const db2 = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'electron'
});

module.exports = db
module.exports = db2