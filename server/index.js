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

//Requests for registration
app.post('/registration', async (req, res) => {
    const { RegistrationUsername, RegistrationPassword, RegistrationEmail } = req.body;

    //email validálás 
    if (emailValidator.validate(RegistrationEmail)) {

        //password hash
        const encryptPassword = await bcrypt.hash(RegistrationPassword, 10);

        //keresés adatbázisban, hogy a frontendről elküldött email és user megtalálható-e
        db.query("SELECT * FROM users WHERE email = ? AND username = ?",
            [RegistrationEmail, RegistrationUsername],
            (err, result) => {
                if (err) return err;

                //itt nézzük meg hogy egyedi-e a user mivel ha a result.length == 0 akkor nincs ilyen username + email kombináció
                if (result.length == 0) {

                    //insert az adatbázisba
                    db.query("INSERT INTO users (username, password, email) VALUES (? , ? , ?)",
                        [RegistrationUsername, encryptPassword, RegistrationEmail],
                        (err, result) => {
                            if (err) {
                                res.send({ err: err })
                            }

                            //ha sikeres az insert akkor "Succesfully created USER" üzenettel tér vissza ami megjelenik a frontenden
                            res.send({ result, message: "Succesfully created USER" });
                        }
                    );
                }
                else {
                    //ha a result.length nem 0 azaz van ilyen username + email kombináció, akkor "User already in exist!" üzenettel tér vissza és nem kreálja le az új usert
                    res.send({ message: "User already in exist!" });
                }
            }
        )
    }
    else {
        //ha az E-mail cím nem valid akkor "E-mail NOT valid" üzenettel tér vissza
        res.send({ message: "E-mail NOT valid" })
    }
});

//request for login
app.post('/login', async (req, res) => {

    //frontendről érkező adat
    const { LoginUsername, LoginPassword } = req.body;

    //itt nézzük meg hogy van e ilyen felhasználó
    db.query("SELECT * FROM users WHERE username = ?",
        [LoginUsername],
        (err, result) => {
            if (err) {
                res.send({ err: err })
            }
            //ha a result.length nagyobb mint 0 akkor azt jelenti hogy van ilyen felhasználó, és rátér a jelszó visszafejtésre
            //ha nincs akkor "incorrect username" üzenettel térünk vissza
            if (result.length > 0) {

                //itt fejtjük vissza a jelszót
                bcrypt.compare(LoginPassword, result[0].password, function (err, result) {
                    if (err) throw err;
                    //ha van akkor a resultot visszaküldi a forntendnek és frontendről átnavigálunk a Homepage.js-re
                    if (result) {
                        res.send(result);
                    }
                    //ha nem talált egyezést jelszó terén, akkor "Incorrect password-del tér vissza amit kiír a frontenden"
                    else {
                        res.send({ message: "Incorrect password!" });
                    }
                })

            } else {
                //ha a result.length 0 vagy kisebb mint 0 akkor "Incorrect username!" üzenettel tér vissza mert nem talált ilyen felhasználónevet
                res.send({ message: "Incorrect username!" });
            }
        }
    );
})

//request for products
app.get('/products', (req, res) => {

    //adatbázis select
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            //itt a hibát frontenden kezeltem le
            res.send(err);
        }
        else {
            //ha nincs hiba respons-al tér vissza
            res.send(result);
        }
    })
})

//request for drivers
app.get('/drivers', (req, res) => {

    //adatbázis select
    db.query("SELECT * FROM drivers", (err, result) => {
        if (err) {
            //itt a hibát frontenden kezeltem le
            res.send(err);
        }
        else {
            //ha nincs hiba respons-al tér vissza
            res.send(result);
        }
    })
})

app.listen(3001, (err) => {
    console.log("fut");
    if (err) throw err;
});