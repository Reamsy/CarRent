import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

//Import CSS & Images
import './starterpage.css';


export function Login() {
    //Adatok kiolvasása az inputokból (Login)
    const [usernameLog, setUsernameLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");

    //Uncorrect or Coorect login state condescension
    const [loginCorrect, setLoginCorrect] = useState("");
    const history = useHistory();


    //Adatok kiolvasása az inputokból (Regisztráció)
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [emailReg, setEmailReg] = useState("");



    //adatok elküldése 
    //A USERNAME ÉS A PASSWORDNEM EGYEZNIE KELL A BACKENDEN AZ INSERT ADATOKKAL
    //Backend-en install-álni kell a cors-t
    const registration = () => {

        //localhostál állítsd be a portot amin fut majd a node 
        Axios.post('http://localhost:3001/registration', {

            //ennek kell egyeznie a backenddel-->> RegistrationUsername....
            RegistrationUsername: usernameReg,
            RegistrationPassword: passwordReg,
            RegistrationEmail: emailReg
        }).then((response) => {
            console.log(response);
        })
    }

    //Login adatok lekérdezése
    const login = () => {
        Axios.post('http://localhost:3001/login', {
            //megváltozott a backenden lekérdezendő adat !!FIGYELJ!!
            LoginUsername: usernameLog,
            LoginPassword: passwordLog,
        }).then((response) => {

            if (response.data.message) {
                setLoginCorrect(response.data.message)
            }
            //itt kell megadni hogy ha correct a user, dobja be a homepage-re,
            //illetve selectálja hogy ez defaultUser, Driver vagy Admin
            else {
                history.push("/");
            }
        });
    };
    return (<>

        <div>
            {/*FIXED PAGE*/}
            <section id="starting">

                <h3>Wellcome to Car Rent</h3>

                <p id="home-p">Easiest way to rent your car</p>

                <a href="#login" id="login-btn">Login</a>
                <a href="#registration" id="registration-btn">Registration</a>

            </section>
            <br className="br" />

            {/*LOGIN SECTION*/}
            <section id="login">

                <h3 id="login-p">Login</h3>

                {/*Error message on uncorrect user*/}
                <p>{loginCorrect}</p>

                <p>Username</p>
                <input className='input' type="text" id="username"
                    onChange={(e) => {
                        setUsernameLog(e.target.value);
                    }}
                />

                <p>Password</p>
                <input className='input' type="password" id="password"
                    onChange={(e) => {
                        setPasswordLog(e.target.value);
                    }}
                />

                <button id="submit-btn-for-login" onClick={login} >Login</button>

                <a href="#registration" id="login-btn">I don't have any account</a>
                <a href="#starting" id="home-btn">Home</a>

            </section>
            <br className="br" />

            {/*REGISTRATION SECTION */}
            <section id="registration">

                <h3>Registration</h3>

                <p>Username</p>
                <input className='input' type="text" id="username"
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />

                <p>Password</p>
                <input className='input' type="text" id="password"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />

                <p>Email</p>
                <input className='input' type="email" id="email"
                    onChange={(e) => {
                        setEmailReg(e.target.value);
                    }}
                />

                <button id="submit-btn-for-register" type="submit" onClick={registration}>Registration</button>

                <a href="#login" id="login-btn">I have an account, i'd like to log in</a>
                <a href="#starting" id="home-btn">Home</a>

            </section>
        </div>
    </>)
}