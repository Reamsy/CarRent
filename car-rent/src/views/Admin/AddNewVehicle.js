import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
//import base64 from 'base-64';

import './add.css';

export function AddNewCar() {

    const navigate = useNavigate();

    const [Brand, setBrand] = useState("");
    const [Model, setModel] = useState("");
    const [Year, setYear] = useState("");
    const [ChassisNumber, setChassisNumber] = useState("");
    const [Price, setPrice] = useState("");
    const [Fule, setFule] = useState("");
    const [PlateNumber, setPlateNumber] = useState("");
    const [Color, setColor] = useState("");
    //const [image, setImage] = useState("");


    const addCar = () => {

        let hiba = false;
        for (const item of document.getElementsByClassName("input")) {
            if (item.value.trim() === "")
                hiba = true;
        }

        if (!hiba) {
            axios.post("http://localhost:3001/addNewCar", {
                Brand,
                Model,
                Year,
                ChassisNumber,
                Price,
                Fule,
                PlateNumber,
                Color
                //,image
            }).then((result) => {
                if (result) {
                    alert("Vehicle Added");
                    navigate('/admin');
                }
                else {
                    alert("Add failed");
                }
            }).catch(console.error);
        }
        else {
            alert("Fill all the lines!")
        }
    }

    /*image upload handler
    const handleFileChange = (e) => {
        const img = base64.encode(e.target.files[0]);
        
        setImage(img)
    }*/


    return (<>
        <div className='addWelcomeMessage'>
            <h1 id='add-h1'>Add New Cars</h1>
        </div>
        <div className='addCarInput'>
            <input className='input' type="text" onChange={(e) => { setBrand(e.target.value) }} placeholder='Enter the Brand' />
            <input className='input' type="text" onChange={(e) => { setModel(e.target.value) }} placeholder='Enter the Model' />
        </div>
        <div className='addCarInput'>
            <input className='input' type="number" onChange={(e) => { setYear(e.target.value) }} placeholder='Enter the Year' />
            <input className='input' type="text" onChange={(e) => { setChassisNumber(e.target.value) }} placeholder='Enter the ChassisNumber' />
        </div>
        <div className='addCarInput'>
            <input className='input' type="number" onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter the Price/day' />
            <input className='input' type="text" onChange={(e) => { setFule(e.target.value) }} placeholder='Enter the Fuel type' />
        </div>
        <div className='addCarInput'>
            <input className='input' type="text" onChange={(e) => { setPlateNumber(e.target.value) }} placeholder='Enter the Plate number' />
            <input className='input' type="text" onChange={(e) => { setColor(e.target.value) }} placeholder='Enter the Color' />
        </div>

        <div className='addCarInput' >
            <input type="file" name='file' /*onChange={handleFileChange}*/ />
        </div>

        <div className='RentButton'>
            <button id='RentButton' onClick={addCar}>Add</button>
        </div>
    </>)
}