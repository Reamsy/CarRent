import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function AddNewDriver({ pushedId }) {

    const navigate = useNavigate();

    const driverId = pushedId;
    const [Name, setName] = useState("");
    const [Sex, setSex] = useState("");
    const [LicenseCategory, setLicenseCategory] = useState("");

    const addDriver = () => {
        //megállapítjuk hogy van e érték az inputban, ha nincs hibával térünk vissza
        let hiba = false;
        for (const item of document.getElementsByClassName("form-control")) {
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
                    navigate('/admin')
                }
                else {
                    alert("Add went failed!");
                }
            }).catch(console.error);
        }
        else {
            alert("Fill all the lines!")
        }
    }

    return (

        <div className='container'>
            <div className='row text-center'>
                <h3 className='mt-5'>Fill the lines</h3>
            </div>

            <div className='row'>

                <div className='container col-lg-6 col-md-6 col-sm-12'>
                    <input className="form-control" onChange={(e) => { setName(e.target.value) }} placeholder='Enter Fullname' />
                </div>

                <div className='container col-lg-6 col-md-6 col-sm-12'>
                    <select className="form-control"
                        onChange={(e) => {
                            const Sex = e.target.value;
                            setSex(Sex);
                        }} >
                        <option selected disabled value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

            </div>

            <div className='container d-flex justify-content-center pb-5'>
                <select id="img" className="form-control"
                    onChange={(e) => {
                        const LicenseCategory = e.target.value;
                        setLicenseCategory(LicenseCategory);
                    }} >
                    <option selected disabled value="">Select License Category</option>
                    <option value="B">B</option>
                    <option value="D1">D1</option>
                    <option value="BE">BE</option>
                    <option value="D1E">D1E</option>
                    <option value="DE">DE</option>
                </select>
            </div>

            <div className='container d-flex justify-content-center mt-5'>
                <button id='btn' className='btn btn-primary' onClick={addDriver}>Add</button>
            </div>
        </div>
    )
}
