const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user:'root',
//     password:'',
//     database:'securitree'
// });

const db = mysql.createConnection({
    host: 'securitree.cbhrv8si7mri.us-east-2.rds.amazonaws.com',
    user:'admin',
    password:'epiuse2021',
    database:'securitree',
    port: '3306'
});

db.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
});
  
// db.end();

module.exports = db