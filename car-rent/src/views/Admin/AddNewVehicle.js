import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const INIT_FORM = {
    brand: "",
    model: "",
    plateNumber: "",
    price: "",
    year: "",
    fuel: "",
    color: "",
    chasissNumber: ""
};

export function AddNewCar() {

    const [formData, setFormData] = useState(INIT_FORM);

    const navigate = useNavigate();

    function addCar(e) {
        let hiba = false;
        for (const item of document.getElementsByClassName("form-control")) {
            if (item.value.trim() === "")
                hiba = true;
        }


        e.preventDefault();
        const form_data = new FormData();
        form_data.append("brand", formData.brand);
        form_data.append("model", formData.model);
        form_data.append("plateNumber", formData.plateNumber);
        form_data.append("price", formData.price);
        form_data.append("year", formData.year);
        form_data.append("fuel", formData.fuel);
        form_data.append("color", formData.color);
        form_data.append("chasissNumber", formData.chassisNumber);
        form_data.append("file", formData.file);


        if (!hiba) {
            axios.post("http://localhost:3001/addNewCar", form_data, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
                .then((result) => {
                    if (result) {
                        alert("Vehicle Added");
                        navigate('/admin');
                    }
                    else {
                        alert("Add failed");
                    }
                }).catch(console.error);
        }
    }

    const updateForm = (key) => (e) => {
        setFormData({ ...formData, [key]: e.target.value })
    }

    const updateFormFile = (key) => (e) => {
        setFormData({ ...formData, [key]: e.target.files[0] })
    }


    return (
        <div className='container'>
            <div className='row text-center'>
                <h3>Add New Cars</h3>
            </div>

            {/*Form*/}
            <form>

                <div className='row center'>

                    {/*Brand input*/}
                    <div className='container col-lg-6 col-md-6 col-sm-12'>
                        <input className='form-control' id='brand' name='brand' type="text" placeholder="Enter the Brand" value={formData.brand}
                            onChange={updateForm("brand")} />
                    </div>

                    {/*Model input*/}
                    <div className='container col-lg-6 col-md-6 col-sm-12'>
                        <input className='form-control' id='model' name='model' type="text" placeholder="Enter the Model" value={formData.model}
                            onChange={updateForm("model")} />
                    </div>

                </div>

                <div className='row center'>

                    {/*PlateNum input*/}
                    <div className='container col-lg-6 col-md-6 col-sm-12'>
                        <input className='form-control' id='plateNumber' name='plateNumber' type="text" placeholder="Enter the Platenumber" value={formData.plateNumber}
                            onChange={updateForm("plateNumber")} />
                    </div>

                    {/*Price input*/}
                    <div className='container col-lg-6 col-md-6 col-sm-12'>
                        <input className='form-control' id='price' name='price' type="text" placeholder="Enter the Price" value={formData.price}
                            onChange={updateForm("price")} />
                    </div>

                </div>

                <div className='row center'>

                    {/*Year input*/}
                    <div className='container col-lg-6 col-md-6 col-sm-12'>
                        <input className='form-control' id='year' name='year' type="text" placeholder="Enter the Year" value={formData.year}
                            onChange={updateForm("year")} />
                    </div>

                    {/*fuel input*/}
                    <div className='container col-lg-6 col-md-6 col-sm-12'>
                        <input className='form-control' id='fuel' name='fuel' type="text" placeholder="Enter the fuel" value={formData.fuel}
                            onChange={updateForm("fuel")} />
                    </div>

                </div>

                <div className='row center'>

                    {/*color input*/}
                    <div className='container col-lg-6 col-md-6 col-sm-12'>
                        <input className='form-control' id='color' name='color' type="text" placeholder="Enter the color" value={formData.color}
                            onChange={updateForm("color")} />
                    </div>

                    {/*chassisNum input*/}
                    <div className='container col-lg-6 col-md-6 col-sm-12'>
                        <input className='form-control' id='chasissNumber' name='chasissNumber' type="text" placeholder="Enter the Chasiss Number" value={formData.chasissNumber}
                            onChange={updateForm("chasissNumber")} />
                    </div>

                </div>

                {/*Image input*/}
                <div className='row d-flex justify-content-center'>
                    <input className='form-control' id='img' type="file" name='file' placeholder='Add an Image'
                        onChange={updateFormFile("file")} />
                </div>

            </form>
            {/*Button*/}
            <div className='row d-flex justify-content-center mt-5'>
                <button id='btn' className='btn btn-success'
                    onClick={addCar}>Add Car</button>
            </div>

        </div>


    )
}