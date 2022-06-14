import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';



export function CreateDriverLogin({ DriverId }) {

    const navigate = useNavigate()

    const [D_Username, setDriverUsername] = useState("");
    const [D_Password, setDriverPassword] = useState("");
    const [D_Email, setDriverEmail] = useState("");

    const addDriverLogin = () => {
        //ellenőrizzük azt hogy minen inputba került e adat
        let hiba = false;
        for (const item of document.getElementsByClassName("form-control")) {
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
    return (

        <div className="container">
            <div className='row text-center'>
                <h3 className='mt-5'>Create profile for your brand new driver</h3>
            </div>

            <div className='row text-center'>
                <div className='container col-lg-6 col-md-6 col-sm-12'>
                    <input className="form-control" onChange={(e) => { setDriverUsername(e.target.value) }} placeholder='Enter the Username' />
                </div>
                <div className='container col-lg-6 col-md-6 col-sm-12'>
                    <input className="form-control" onChange={(e) => { setDriverPassword(e.target.value) }} placeholder='Enter the Password' />
                </div>
            </div>

            <div className='row d-flex justify-content-center mb-5 pb-5'>
                <input id="img" className="form-control" onChange={(e) => { setDriverEmail(e.target.value) }} placeholder='Enter the Email' />
            </div>
            <div className='container d-flex justify-content-center mt-5 '>
                <button id='btn' className='btn btn-primary' onClick={addDriverLogin}>Add</button>
            </div>
        </div>
    )
}
