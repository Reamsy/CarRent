const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

//autómatikusan átküldi a frontend adatait
app.use(express.json());
app.use(cors());

//Creatind DB connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "users",
});

//Requests
app.post('/registration', (req, res) => {
    const { RegistrationUsername, RegistrationPassword, RegistrationEmail } = req.body;

    db.query("INSERT INTO users (username, password, email) VALUES (? , ? , ?)",
        [RegistrationUsername, RegistrationPassword, RegistrationEmail],
        (err, result) => {
            if (err) {
                console.log("nem helyes felhasználó");
                res.send({ err: err })
            }
            if (result.length === 0) {
                res.send(result);
            } else {
                res.send({ message: "Incorrect username or password!" });
            }
        }
    );
});


app.post('/login', (req, res) => {
    const { LoginUsername, LoginPassword } = req.body;

    db.query("SELECT * FROM users WHERE username = ? AND password = ?",
        [LoginUsername, LoginPassword],
        (err, result) => {
            if (err) {
                console.log("nem helyes felhasználó");
                res.send({ err: err })
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Incorrect username or password!" });
            }

        }
    );
})

app.listen(3001, (err) => {
    console.log("fut");
    if (err) throw err;
});