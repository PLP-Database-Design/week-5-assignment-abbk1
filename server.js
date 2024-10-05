//Import dependencies
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv')
const app = express();

// configure enviroment variable
dotenv.config();

// Creating Connection with Database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect(function (error) {
    if (error) {
        console.log('Error Connecting to Database', error);
        return;
    }
    console.log('Database Connection Succesfully on Port', db.threadId);
    // this will expose all details about your connection including password
    console.log(db)
})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Printing Hello World
// app.get('', function (request, respond) {
//     respond.send("Hello World, This is Abubakar from Adamawa if you don't mind i will leave...!!!");
// });

// Getting Data from Table
app.get('', (req, res) => {
    var patientsQuery = "SELECT patient_id, first_name,last_name FROM patients";
    db.query(patientsQuery, (error, result) => {
        if (error) {
            return res.status(400).send('Query Failed', error);
        }
        res.status(200).render('data', { result });
    });
});

// Testing the app if its up and running on a server
app.listen(3300, function () {
    console.log(`Server is Up now by the App on port 3300...!`)
});