const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

//autómatikusan átküldi a frontend adatait
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "users",
});

app.post('/registration', (req, res) => {

    //helyi konstansban elhelyezett Frontend változók
    const username = RegistrationUsername;
    const password = RegistrationPassword;
    const email = RegistrationEmail;

    db.query("INSERT INTO Users (username, password, email) VALUES (? , ? , ?)",
        [username, password, email],
        (err, result) => {
            console.log(err)
        }
    );
});

app.post('/login', (req, res) => {
    const username = LoginUsername
    const password = LoginPassword

    db.query("SELECT * FROM Users WHERE username = ? AND password = ?",
        [username, password,],
        (err, result) => {
            if (err) { 
                console.log("nem helyes felhasználó");
                //res.send({err: err})
            }
            if(result.length > 0){
                res.send(result);
            }else{
                res.send({message: "Incorrect username or password!"});
            }

        }
    );
})

app.listen(3001, (err) =>{
    console.log("fut");
    if(err) throw err;
});