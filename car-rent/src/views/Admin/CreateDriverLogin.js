import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

import './add.css';

export function CreateDriverLogin({ DriverId }) {

    const navigate = useNavigate()

    const [D_Username, setDriverUsername] = useState("");
    const [D_Password, setDriverPassword] = useState("");
    const [D_Email, setDriverEmail] = useState("");

    const addDriverLogin = () => {
        //ellenőrizzük azt hogy minen inputba került e adat
        let hiba = false;
        for (const item of document.getElementsByClassName("input")) {
            if (item.value.trim() === "")
                hiba = true;
        }
        if (!hiba) {
            axios.post("http://localhost:3001/driverLogin", {
                D_Username,
                D_Password,
                D_Email,
            }).then((result) => {
                if (result) {
                    alert("Succes!");
                    DriverId(result.data.insertId);
                    navigate("/addNewDriver")
                }
                else {
                    alert("Login creating error!");
                }
            }).catch(console.error);
        }
        else {
            alert("Fill all the lines!")
        }
    }
    return (<>
        <div className='addWelcomeMessage'>
            <h1>Create profile for your brand new driver</h1>
        </div>

        <div className='addCarInput'>
            <input className="input" onChange={(e) => { setDriverUsername(e.target.value) }} placeholder='Enter the Username' />
            <input className="input" onChange={(e) => { setDriverPassword(e.target.value) }} placeholder='Enter the Password' />
        </div>
        <div className='addCarInput'>
            <input className="input" onChange={(e) => { setDriverEmail(e.target.value) }} placeholder='Enter the Email' />
        </div>
        <div className='addCarButton'>
            <button id='addCarButton' onClick={addDriverLogin}>Add</button>
        </div>
    </>)
}
