import React, { useState } from 'react'
import axios from 'axios';


export function AddNewDriver() {

    const [Name, setName] = useState("");
    const [Sex, setSex] = useState("");
    const [Email, setEmail] = useState("");
    const [LicenseCategory, setLicenseCategory] = useState("");

    const addDriver = () => {
        axios.post("http://localhost:3001/addNewDriver", {
            Name,
            Sex,
            Email,
            LicenseCategory,
        }).then((result) => {
            if (result) {
                alert("Sofőr hozzáadva");
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
            <input type="text"onChange={(e) => { setName(e.target.value) }} placeholder='Enter Fullname' />
            <input type="text" onChange={(e) => { setSex(e.target.value) }} placeholder='Enter Sex' />
        </div>
        <div className='addCarInput'>
            <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter E-mail' />
            <input type="text" onChange={(e) => { setLicenseCategory(e.target.value) }} placeholder='Enter LicenseCategory' />
        </div>

        <div className='addCarButton'>
            <button onClick={addDriver}>Add</button>
        </div>
    </>)
}
