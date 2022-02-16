const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

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
app.post('/registration', async (req, res) => {
    const { RegistrationUsername, RegistrationPassword, RegistrationEmail } = req.body;

    //email validálás 
    if (emailValidator.validate(RegistrationEmail)) {

        //password hash
        const encryptPassword = await bcrypt.hash(RegistrationPassword, 10);

        //request hogy egyedi-e a usert
        db.query("SELECT * FROM users WHERE email = ? AND username = ?",
            [RegistrationEmail, RegistrationUsername],
            (err, result) => {
                if (result.length == 0) {
                    console.log(result)
                    db.query("INSERT INTO users (username, password, email) VALUES (? , ? , ?)",
                        [RegistrationUsername, encryptPassword, RegistrationEmail],
                        (err, result) => {
                            if (err) {
                                res.send({ err: err })
                            }
                            res.send({ result, message: "Succesfully created USER" });
                        }
                    );
                }
                else {
                    res.send({ message: "User already in exist!" });
                }
            }
        )
    }
    else {
        res.send({ message: "E-mail NOT valid"})
    }
});


app.post('/login', async (req, res) => {
    const { LoginUsername, LoginPassword } = req.body;

    db.query("SELECT * FROM users WHERE username = ?",
        [LoginUsername],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            if (result.length > 0) {
                bcrypt.compare(LoginPassword, result[0].password, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        res.send(result);
                    }
                    else {
                        res.send({ message: "Incorrect password!" });
                    }
                })

            } else {
                res.send({ message: "Incorrect username!" });
            }
        }
    );
})

app.listen(3001, (err) => {
    console.log("fut");
    if (err) throw err;
});