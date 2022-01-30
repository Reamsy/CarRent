import React from 'react';

//Import CSS & Images
import './starterpage.css';

export function Login() {
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

                <p>Username</p>
                <input className='input' type="text" id="username" />

                <p>Password</p>
                <input className='input' type="password" id="password" />

                <button id="submit-btn-for-login">Login</button>

                <a href="#registration" id="login-btn">I don't have any account</a>
                <a href="#starting" id="home-btn">Home</a>

            </section>
            <br className="br" />

            {/*REGISTRATION SECTION */}
            <section id="registration">

                <h3>Registration</h3>

                <p>Username</p>
                <input className='input' type="text" id="username" />

                <p>Password</p>
                <input className='input' type="text" id="password" />

                <p>Email</p>
                <input className='input' type="email" id="email" />

                <button id="submit-btn-for-register" type="submit">Registration</button>

                <a href="#login" id="login-btn">I have an account, i'd like to log in</a>
                <a href="#starting" id="home-btn">Home</a>

            </section>
        </div>
    </>)
}