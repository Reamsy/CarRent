import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

//Import CSS & Images
import './starterpage.css';


export function Login() {
    //Adatok kiolvasása az inputokból (Login)
    const [usernameLog, setUsernameLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");

    //Uncorrect or Coorect login state condescension
    const [loginCorrect, setLoginCorrect] = useState("");
    const [registrationCorrect, setRegistrationCorrect] = useState("");
    const navigate = useNavigate();


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
            if (response.data.message) {
                setRegistrationCorrect(response.data.message)
            }
            else {
                navigate("/App");
            }
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
                navigate("/App");
            }
        });
    };
    return (<>
        <div className="welcome">
            <h3>Wellcome to Car Rent</h3>

            <p id="home-p">Easiest way to rent your car</p>
        </div>

        {/*Login*/}
        <div className="Login">
            <h3 id="login-p">Login</h3>

            <input className='input' type="text" id="username" placeholder="Username"
                onChange={(e) => {
                    setUsernameLog(e.target.value);
                    setLoginCorrect("");
                }}
            />

            <input className='input' type="password" id="password" placeholder="Password"
                onChange={(e) => {
                    setPasswordLog(e.target.value);
                    setLoginCorrect("");
                }}
            />

            <p id="loginErr">{loginCorrect}</p>
            <button id="submit-btn-for-login" onClick={login} >Login</button>
        </div>

        {/*Registration*/}
        <div className="Registration">
            <h3>Registration</h3>

            <input className='input' type="text" id="username" placeholder="Username"
                onChange={(e) => {
                    setUsernameReg(e.target.value);
                    setRegistrationCorrect("");
                }}
            />

            <input className='input' type="text" id="password" placeholder="Password"
                onChange={(e) => {
                    setPasswordReg(e.target.value);
                    setRegistrationCorrect("");
                }}
            />

            <input className='input' type="email" id="email" placeholder="E-mail"
                onChange={(e) => {
                    setEmailReg(e.target.value);
                    setRegistrationCorrect("");
                }}
            />
            <p id="loginErr">{registrationCorrect}</p>

            <button id="submit-btn-for-register" type="submit" onClick={registration}>Registration</button>
        </div>

    </>)
}