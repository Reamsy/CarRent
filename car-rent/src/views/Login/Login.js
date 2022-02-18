import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

//Import CSS & Images
import './starterpage.css';


export function Login() {
    //Adatok kiolvasása az inputokból (Regisztráció)
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    
    //Adatok kiolvasása az inputokból (Login)
    const [usernameLog, setUsernameLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");

    //Uncorrect or Coorect login state condescension (hibaüzenet lekezelése)
    const [loginCorrect, setLoginCorrect] = useState("");
    const [registrationCorrect, setRegistrationCorrect] = useState("");

    //ez felel az odalk közötti navigálásért sikeres belépés esetén
    const navigate = useNavigate();
  

    //adatok elküldése onClick={registration} meghívása után
    const registration = () => {

        //localhostál állítsd be a portot amin fut majd a node 
        Axios.post('http://localhost:3001/registration', {

            //ennek kell egyeznie a backenddel-->> RegistrationUsername.... mert ezt fogod átvenni frontendről req.body-val
            RegistrationUsername: usernameReg,
            RegistrationPassword: passwordReg,
            RegistrationEmail: emailReg
        }).then((response) => {

            //itt jön vissza a backend hibaüzenet (ha van)
            if (response.data.message) {
                setRegistrationCorrect(response.data.message)
            }
            else {
                //ha nincs nem történik semmi csak kiíratjuk konzolba
                console.log(setRegistrationCorrect)
            }
        })
    }

    //Login adatok lekérdezése
    const login = () => {
        
        //node port egyezés szükséges
        Axios.post('http://localhost:3001/login', {

            //ennek kell egyeznie a backenddel-->> LoginUsername.... mert ezt fogod átvenni frontendről req.body-val
            LoginUsername: usernameLog,
            LoginPassword: passwordLog,
        }).then((response) => { 

            //itt jön vissza a backend hibaüzenet (ha van)
            if (response.data.message) {
                setLoginCorrect(response.data.message)
            }

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
                    //kiolvassuk a beírt adatokat
                    setUsernameLog(e.target.value);

                    //ha hibás a felhasználónév akkor ha a user elkezd gépelni, kitörli a hibaüzenetet
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
                    //kiolvassuk a beírt adatokat
                    setUsernameReg(e.target.value);

                    //ha hiba jön vissza backendről, ha a user elkezd gépelni kitöli a hibaüzenetet
                    setRegistrationCorrect("");
                }}
            />

            <input className='input' type="password" id="password" placeholder="Password"
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