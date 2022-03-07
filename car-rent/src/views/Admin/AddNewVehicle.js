import React, { useState } from 'react'
import axios from 'axios';

import './add.css';

export function AddNewCar() {

    const [Brand, setBrand] = useState("");
    const [Model, setModel] = useState("");
    const [Year, setYear] = useState("");
    const [ChassisNumber, setChassisNumber] = useState("");
    const [Price, setPrice] = useState("");
    const [Fule, setFule] = useState("");
    const [PlateNumber, setPlateNumber] = useState("");
    const [Color, setColor] = useState("");

    const addCar = () => {
        axios.post("http://localhost:3001/addNewCar", {
            Brand,
            Model,
            Year,
            ChassisNumber,
            Price,
            Fule,
            PlateNumber,
            Color
        }).then((result) => {
            if (result) {
                alert("Jármű hozzáava");
            }
            else {
                alert("Hozzáadás sikertelen");
            }
        }).catch(console.error);
    }
    return (<>
        <div className='addWelcomeMessage'>
            <h1>Add New Cars</h1>
        </div>
        <div className='addCarInput'>
            <input onChange={(e) => { setBrand(e.target.value) }} placeholder='Enter the Brand' />
            <input onChange={(e) => { setModel(e.target.value) }} placeholder='Enter the Model' />
        </div>
        <div className='addCarInput'>
            <input onChange={(e) => { setYear(e.target.value) }} placeholder='Enter the Year' />
            <input onChange={(e) => { setChassisNumber(e.target.value) }} placeholder='Enter the ChassisNumber' />
        </div>
        <div className='addCarInput'>
            <input onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter the Price/day' />
            <input onChange={(e) => { setFule(e.target.value) }} placeholder='Enter the Fuel type' />
        </div>
        <div className='addCarInput'>
            <input onChange={(e) => { setPlateNumber(e.target.value) }} placeholder='Enter the Plate number' />
            <input onChange={(e) => { setColor(e.target.value) }} placeholder='Enter the Color' />
        </div>

        <div className='addCarButton'>
            <button id='addCarButton' onClick={addCar}>Add</button>
        </div>
    </>)
}
