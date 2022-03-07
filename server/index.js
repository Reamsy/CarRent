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
    database: "carrentdb",
});

//Requests for registration
app.post('/registration', async (req, res) => {
    const { RegistrationUsername, RegistrationPassword, RegistrationEmail } = req.body;

    //email validálás 
    if (emailValidator.validate(RegistrationEmail)) {

        //password hash
        const encryptPassword = await bcrypt.hash(RegistrationPassword, 10);

        //keresés adatbázisban, hogy a frontendről elküldött email és user megtalálható-e
        db.query("SELECT * FROM users WHERE email = ?",
            [RegistrationEmail],
            (err, result) => {
                if (err) return err;

                //itt nézzük meg hogy egyedi-e a user mivel ha a result.length == 0 akkor nincs ilyen username + email kombináció
                if (result.length == 0) {

                    //insert az adatbázisba
                    db.query("INSERT INTO users (user_id, username, password, email) VALUES (3, ? , ? , ?)",
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
                    res.send({ message: "E-mail already in exist!" });
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
                bcrypt.compare(LoginPassword, result[0].password, function (err, loginResult) {
                    if (err) throw err;
                    //ha van akkor a resultot visszaküldi a forntendnek és frontendről átnavigálunk a Homepage.js-re
                    if (loginResult) {
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
});

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
    });
});

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
    });
});

//request for drivers@Cars
app.get('/rentCars', async (req, res) => {

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
    });
});

app.get('/rentDrivers', async (req, res) => {

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
    });
});

//LE KELL MÉG KEZELNI AZ EGYEZÉSEKET!!!!!!!!!!!!!!!!!!!!!!!
app.post('/Rent', async (req, res) => {
    //frontendről érkező adat
    const { RentStartDate, RentEndDate, RentCar, RentDriver } = req.body;
    db.query("INSERT INTO rent (start_date, end_date, car_id, driver_id) VALUES (?, ?, ?, ?)",
        [RentStartDate, RentEndDate, RentCar, RentDriver],
        (err, result) => {
            if (err) throw err;
            if (result) {
                res.send({ message: "Rendelés sikeresen megtörtén, az adott időpontban átveheti autóját" })
            }
            else {
                res.send({ message: "Rendelés sikertelen!" })
            }
        }
    );
});

//belépett személy id-jának lekérdezése
app.get('/profile/:id', (req, res) => {
    db.query("SELECT * FROM costumer WHERE user_id = ?", req.params.id, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//user id elküldése login után a costumer táblába, hogy a profile.js-nél legyen mit kiolvasni
app.post('/home', async (req, res) => {
    const { sendId } = req.body;
    //megnézzük van-e ilyen user_id
    db.query("SELECT * FROM costumer WHERE user_id = ?",
        [sendId],
        (err, result) => {
            if (err) throw err;
            //ha nincs akkor insert
            if (result.length == 0) {
                const { sendId } = req.body;
                db.query("INSERT INTO costumer (user_id) VALUES (?)",
                    [sendId],
                    (err, result) => {
                        if (err) throw err;
                        if (result) {
                            res.send(result)
                        }
                        //hiba insert során
                        else {
                            console.log("hiba insert")
                        }
                    })
            }
            //ha van egyező user_id akkor nem történik semmi
            else {
                console.log("van ilyen user")
            }
        }
    )
})

//NEM TARTJA MEG AZ ADATOKAT HA VALAMELYIK INPUT ÜRES MARAD!!!!!!!!!!!!!
//profil save request
app.put('/save/:id', async (req, res) => {
    const { ProfileName, ProfileLicenseCat, ProfileLicenseExp, ProfilePhone, findId } = req.body;
    db.query("UPDATE costumer SET Fullname = ?, License_category = ?, License_expiraton = ?, Phone_number = ?  WHERE user_id = ?",
        [ProfileName, ProfileLicenseCat, ProfileLicenseExp, ProfilePhone, findId],
        (err, result) => {
            if (err) throw err;
            if (result) {
                console.log(result)
                res.send({ message: "Sikeres mentés!" })
            }
            else {
                res.send({ message: "Mentés seikertelen!" })
            }
        }
    )
})

//Admin rents request
app.get('/AdminRents', (req, res) => {
    db.query("SELECT * FROM rent", (err, result) => {
        if (result) {
            res.send(result);
        }
        else {
            res.send({ message: "Lekérdezés sikertelen!" })
        }
    })
})

//Admin vehicles request
app.get('/AdminVehicles', (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (result) {
            res.send(result);
        }
        else {
            res.send({ message: "Lekérdezés sikertelen!" })
        }
    })
})

//Admin drivers request
app.get('/AdminDrivers', (req, res) => {
    db.query("SELECT * FROM drivers", (err, result) => {
        if (result) {
            res.send(result);
        }
        else {
            res.send({ message: "Lekérdezés sikertelen!" })
        }
    })
})

//deleteRents
app.delete('/rentDelete/:RentId', (req, res) => {
    db.query(`DELETE FROM rent WHERE id = ${req.params.RentId}`,
        (err, result) => {
            if (result) {
                res.send(result);
            }
        })
})

//deleteVehicles
app.delete('/vehicleDelete/:CarId', (req, res) => {
    db.query(`DELETE FROM products WHERE id = ${req.params.CarId}`,
        (err, result) => {
            if (result) {
                res.send(result);
            }
        })
})

//deleteDrivers
app.delete('/driverDelete/:DriverId', (req, res) => {
    db.query(`DELETE FROM drivers WHERE id = ${req.params.DriverId}`,
        (err, result) => {
            if (result) {
                res.send(result);
            }
        })
})

//add new car
app.post('/addNewCar', (req, res) => {
    const { Brand, Model, Year, ChassisNumber, Price, Fule, PlateNumber, Color } = req.body;
    db.query("INSERT INTO products (brand, model, year, chassisNumber, rentprice, fuel, plateNumber, color) VALUES (?,?,?,?,?,?,?,?)",
        [Brand, Model, Year, ChassisNumber, Price, Fule, PlateNumber, Color],
        (err, result) => {
            if (err) throw err;
            if (result) {
                res.send(result);
            }
        })
})

//add new driver
app.post('/addNewDriver', (req, res) => {
    const { Name, Sex, LicenseCategory } = req.body;
    db.query("INSERT INTO drivers ( name, sex, licence_category) VALUES (?,?,?)",
        [Name, Sex, LicenseCategory],
        (err, result) => {
            if (err) throw err;
            if (result) {
                res.send(result);
            }
        })
})

app.post('/driverLogin', async (req, res) => {
    const { D_Username, D_Password, D_Email } = req.body;
    //email validálás 
    if (emailValidator.validate(D_Email)) {

        //password hash
        const DriverencryptPassword = await bcrypt.hash(D_Password, 10);
        db.query("INSERT INTO users (user_id, username, password, email) VALUES (2,?,?,?)",
            [D_Username, DriverencryptPassword, D_Email],
            (err, result) => {
                if (err) res.send({ message: "Login creating error" });
                if (result) {
                    res.send({ message: "Login Parameters Created" });
                }
            })
    }
    else {
        res.send({ message: "NOT Valid e-mail" })
    }
})

app.listen(3001, (err) => {
    console.log("fut");
    if (err) throw err;
});