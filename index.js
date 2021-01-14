const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const App = express();

App.use(bodyparser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ajay@123",
    database: "person_db"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("mysql connected");
});

App.get('/person', (req, res) => {
    let sql = "SELECT * FROM people";
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
    });
});

App.get('/person/:id', (req, res) => {
    let sql = "SELECT * FROM people WHERE people_id" + req.param.id;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
    });
});

App.post('/person', (req, res) => {
    let data = { people_name: req.body.people_name, people_Email: req.body.people_Email, people_ph: req.body.people_ph, people_gender: req.body.people_gender };
    let sql = "INSERT INTO people SET ?";
    let query = connection.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
    });
});


App.patch('/person/:id', (req, res) => {
    let sql = "UPDATE people SET people_name='" + req.body.people_name + "', people_Email = '" + req.body.people_Email + "', people_ph = '" + req.body.people_ph + "', people_gender = '" + req.body.people_gender + "' WHERE people_id=" + req.params.id;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
    });
});

App.delete('/people/":id', (req, res) => {
    let sql = "DELETE FROM people WHERE people_id=" + req.params.id + "";
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
    });
});

App.listen(8080, () => {
    console.log('Server started on port 8080...');
});
