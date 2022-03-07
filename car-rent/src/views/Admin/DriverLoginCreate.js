import React, { useState } from 'react'
import axios from 'axios';

import './add.css';

export function CreateDriverLogin() {

    const [D_Username, setDriverUsername] = useState("");
    const [D_Password, setDriverPassword] = useState("");
    const [D_Email, setDriverEmail] = useState("");

    const addDriverLogin = () => {
        axios.post("http://localhost:3001/driverLogin", {
            D_Username,
            D_Password,
            D_Email,
        }).then((result) => {
            if (result) {
               alert(result.data.message);
            }
            else {
                alert("Login creating error");
            }
        }).catch(console.error);
    }
    return (<>
        <div className='addWelcomeMessage'>
            <h1>Create profile for your brand new driver</h1>
        </div>

        <div className='addCarInput'>
            <input onChange={(e) => { setDriverUsername(e.target.value) }} placeholder='Enter the Username' />
            <input onChange={(e) => { setDriverPassword(e.target.value) }} placeholder='Enter the Password' />
        </div>
        <div className='addCarInput'>
            <input onChange={(e) => { setDriverEmail(e.target.value) }} placeholder='Enter the Email' />
        </div>
        <div className='addCarButton'>
            <button id='addCarButton' onClick={addDriverLogin}>Add</button>
        </div>
    </>)
}
