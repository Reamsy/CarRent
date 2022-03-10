import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './add.css';

export function AddNewDriver({ pushedId }) {

    const navigate = useNavigate();

    const driverId = pushedId;
    const [Name, setName] = useState("");
    const [Sex, setSex] = useState("");
    const [LicenseCategory, setLicenseCategory] = useState("");

    const addDriver = () => {
        //megállapítjuk hogy van e érték az inputban, ha nincs hibával térünk vissza
        let hiba = false;
        for (const item of document.getElementsByClassName("input")) {
            if (item.value.trim() === "")
                hiba = true;
        }
        if (!hiba) {
            //ha mindenhol van érték, elindul az axios kérés
            axios.post('http://localhost:3001/addNewDriver', {
                driverId,
                Name,
                Sex,
                LicenseCategory,
            }).then((result) => {
                if (result) {
                    alert("Success!");
                    navigate("/admin")
                }
                else {
                    alert("Add went failed!");
                }
            }).catch(console.error);
        }
        else{
            alert("Fill all the lines!")
        }
    }
    return (<>
        <div className='addWelcomeMessage'>
            <h1>Fill the lines</h1>
        </div>
        <div className='addCarInput'>
            <input className="input" onChange={(e) => { setName(e.target.value) }} placeholder='Enter Fullname' />
            <select id="select" className="input"
                onChange={(e) => {
                    const Sex = e.target.value;
                    setSex(Sex);
                }} >
                <option value="">Select Sex</option>
                <option value="férfi">Férfi</option>
                <option value="nő">Nő</option>
                <option value="egyéb">Egyéb</option>
            </select>
        </div>
        <div className='addCarInput'>
            <select id="select" className="input"
                onChange={(e) => {
                    const LicenseCategory = e.target.value;
                    setLicenseCategory(LicenseCategory);
                }} >
                <option value="">Select License Category</option>
                <option value="B">B</option>
                <option value="D1">D1</option>
                <option value="BE">BE</option>
                <option value="D1E">D1E</option>
                <option value="DE">DE</option>
            </select>
        </div>

        <div className='RentButton'>
            <button id='RentButton' onClick={addDriver}>Add</button>
        </div>
    </>)
}
