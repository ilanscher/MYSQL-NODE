const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv').config();

var mysql = require('mysql');
const res = require('express/lib/response');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MY_PASS,
  database: process.env.MY_DATA_BASE,
  multipleStatements: true
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE mydbilan", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

  // app.get('/', function (req, res) {
  //   var sql = "UPDATE customers SET country ='Israel best' WHERE contactLastName = 'Schmitt'";
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     res.send(result);
  //     console.log("1 record inserted");
  //   });
  // });

app.get('/', function (req, res) {
    var sql = "UPDATE customers SET country ='Israel first' WHERE contactLastName = 'Schmitt'; SELECT DISTINCT * FROM customers;";
    con.query(sql, function (err, results) {
      if (err) throw err;
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(results, null, 2));
      console.log("typing results :-)");
    });
  });


app.use(express.static(__dirname + '/public'));

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
  });
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
 
 
 
 
 
 
 
 
