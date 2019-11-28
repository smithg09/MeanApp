/*
    Author: Smith Gajjar 
    Title : Demo MYSQL NODE APP
    Date : 11th NOvember 2019 9:30AM
*/
const express = require('express')
const app = express()
var bodyParser = require("body-parser");
var mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});
app.get('/', function (req, res) {
    res.send(" <form action='/' method='post'> <input type='text' name='name'> <input type='submit'  value='send'> ");
});

app.post('/', (req, res) => {
    var user1 = req.body.name;
    con.connect(function (err) {
        if (err) throw err;
        con.query("insert into `user` values(" + user1 + ")", function (err, result, fields) {
            if (err) throw err;
            // result.forEach(element => {
                //     console.log(element.username)
                // });
                // console.log(fields)
            });
        });
    });
    
    
    con.query("SELECT * FROM user", function (err, result, fields) {
            if (err) throw err;
            result.forEach(element => {
                console.log(element.name)
            });
            // console.log(fields)
        });
var server = app.listen(8000, function () { });