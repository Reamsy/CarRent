import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './add.css';

export function AddNewDriver() {

    const navigate = useNavigate();

    const [Name, setName] = useState("");
    const [Sex, setSex] = useState("");
    const [Email, setEmail] = useState("");
    const [LicenseCategory, setLicenseCategory] = useState("");

    const addDriver = () => {
        axios.post('http://localhost:3001/addNewDriver', {
            Name,
            Sex,
            Email,
            LicenseCategory,
        }).then((result) => {
            if (result) {
                alert("Sofőr hozzáadva");
                navigate("/DriverCreateLogin")
            }
            else {
                alert("Hozzáadás sikertelen");
            }
        }).catch(console.error);
    }
    return (<>
        <div className='addWelcomeMessage'>
            <h1>Add New Drivers</h1>
        </div>
        <div className='addCarInput'>
            <input onChange={(e) => { setName(e.target.value) }} placeholder='Enter Fullname' />
            <input onChange={(e) => { setSex(e.target.value) }} placeholder='Enter Sex' />
        </div>
        <div className='addCarInput'>
            <input onChange={(e) => { setLicenseCategory(e.target.value) }} placeholder='Enter License category' />
        </div>

        <div className='addCarButton'>
            <button id='addCarButton' onClick={addDriver}>Add</button>
        </div>
    </>)
}
