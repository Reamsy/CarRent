import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Import CSS
import './adminPage.css';

export function Admin() {

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState();
    const [rents, setRents] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        //Rendelések lekérése
        Axios.get("http://localhost:3001/AdminRents")
            .then((response) => {
                if (response) {
                    setRents(response.data);
                }
                else {
                    setErrorMessage(response.data.message);
                }
            })
    }, [])

    useEffect(() => {
        //Járművek lekérése
        Axios.get("http://localhost:3001/AdminVehicles")
            .then((response) => {
                if (response) {
                    setVehicles(response.data);
                }
                else {
                    setErrorMessage(response.data.message);
                }
            })
    }, [])

    useEffect(() => {
        //Sofőrők lekérése
        Axios.get("http://localhost:3001/AdminDrivers")
            .then((response) => {
                if (response) {
                    setDrivers(response.data);
                }
                else {
                    setErrorMessage(response.data.message);
                }
            })
    }, [])

    //delete Rents
    const DeleteRents = (RentId) => {
        Axios.delete(`http://localhost:3001/rentDelete/${RentId}`)
            .then((response) => {
                if (response) {
                    console.log(response.data)
                    alert("Sikeres Törlés")
                }
                else {
                    console.log("törlési hiba")
                }
            }).catch(console.log)
    }

    //delete Vehicles
    const DeleteVehicles = (CarId) => {
        Axios.delete(`http://localhost:3001/vehicleDelete/${CarId}`)
            .then((response) => {
                if (response) {
                    alert("Sikeres törlés")
                    console.log(response.data)
                }
                else {
                    console.log("törlési hiba")
                }
            }).catch(console.log);
    }

    //delete Drivers
    const DeleteDrivers = (DriverId) => {
        Axios.delete(`http://localhost:3001/driverDelete/${DriverId}`)
            .then((response) => {
                if (response) {
                    console.log(response.data)
                    alert("Sikeres Törlés")
                }
                else {
                    console.log("törlési hiba")
                }
            }).catch(console.log);
    }

    //Adding car
    const addNewCar = () => {
        navigate("/addNewVehicle");
    }

    //Adding driver
    const addNewDriver = () => {
        navigate("/createDriverLogin");
    }

    return (<>
        <div >
            {/*Welcome message*/}
            <div className="container">
                <h3>Here, you can manage your busines!</h3>
            </div>

            {/*Listing of rents*/}
            <div>
                <p id="rent">{!errorMessage && "Rents"}</p>
            </div>


            {rents.map(rent =>
                <div key={rent.id}>
                    <div className="container">
                        <ul id="listBox">
                            <li id="listElement">
                                <p id="rent.id">{rent.id}</p>
                                <p id="rent.start_date">{rent.start_date}</p>
                                <p id="rent.end_date">{rent.end_date}</p>
                                <p id="rent.car_id">{rent.car_id}</p>
                                <p id="rent.car_id">{!rent.driver_id && "----"}</p>
                                <p><button id="deleteRent" onClick={() => { DeleteRents(rent.id) }}>Delete</button></p>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {/*Listing of vehicles*/}
            <div>
                <p id="rent">{!errorMessage && "Vehicles"}</p>
            </div>

            {vehicles.map(vehicle =>
                <div key={vehicle.id}>
                    <div className="container">
                        <ul id="listBox">
                            <li id="listElement">
                                <p id="vehicle.id">{vehicle.id}</p>
                                <p id="vehicle.brand">{vehicle.brand}</p>
                                <p id="vehicle.fuel">{vehicle.fuel}</p>
                                <p id="vehicle.rentPrice">{vehicle.rentprice}</p>
                                <p id="vehicle.year">{vehicle.year}</p>
                                <p><button id="deleteRent" onClick={() => { DeleteVehicles(vehicle.id) }}>Delete</button></p>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div>
                <button id="add" onClick={addNewCar}> New Car</button>
            </div>

            {/*Listing of Drivers*/}
            < div >
                <p id="rent">{!errorMessage && "Drivers"}</p>
            </div>

            {drivers.map(driver =>
                <div key={driver.id}>
                    <div className="container">
                        <ul id="listBox">
                            <li id="listElement">
                                <p id="driver.id">{driver.id}</p>
                                <p id="driver.name">{driver.name}</p>
                                <p id="driver.license_category">{driver.licence_category}</p>
                                <p id="driver.drivedKMs">{driver.drivedKMs}</p>
                                <p><button id="deleteRent" onClick={() => { DeleteDrivers(driver.id) }}>Delete</button></p>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="drivers">
                <button id="add" onClick={addNewDriver}> New Driver</button>
            </div>
        </div>
    </>)
}