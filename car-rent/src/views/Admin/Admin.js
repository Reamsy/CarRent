import Axios from 'axios';
import React, { useEffect, useState } from 'react';

//Import CSS
import './adminPage.css';

export function Admin() {
    const [errorMessage, setErrorMessage] = useState()
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
                    console.log("Vehicles:" +response.data)
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
                    console.log("Drivers:" +response.data)
                    setDrivers([response.data]);
                }
                else {
                    setErrorMessage(response.data.message);
                }
            })
    }, [])

    return (<>
        <div >
            {/*Welcome message*/}
            <div className="container">
                <h3>Here, you can manage your busines!</h3>
            </div>

            {/*Listing of rents*/}
            <div>
                <p id="Admin-p" id="rent">{!errorMessage && "Rents"}</p>
            </div>
            <div id="tagline">
                <p id="tagline-p">Bérlés kezdete</p>
                <p id="tagline-p">Bérlés vége</p>
                <p id="tagline-p">Választott autó</p>
                <p id="tagline-p">Választott sofőr</p>
                <p id="tagline-p">törlés</p>
            </div>

            {rents.map(rent =>
                <div key={rent.id}>
                    <div className="container">
                        <ul id="listBox">
                            <li id="listElement">
                                <p id="rent.start_date">{rent.start_date}</p>
                                <p id="rent.end_date">{rent.end_date}</p>
                                <p id="rent.car_id">{rent.car_id}</p>
                                <p id="rent.car_id">{rent.driver_id}</p>
                                <p><button id="deleteRent">Delete</button></p>
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
                                <p id="vehicle.brand">{vehicle.brand}</p>
                                <p id="vehicle.fuel">{vehicle.fuel}</p>
                                <p id="vehicle.rentPrice">{vehicle.rentprice}Ft / day</p>
                                <p id="vehicle.year">{vehicle.year}</p>
                                <p><button id="deleteRent">Delete</button></p>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div>
                <button id="add"> New Car</button>
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
                                <p id="driver.name">{driver.name}</p>
                                <p id="driver.license_category">{driver.license_category}</p>
                                <p id="driver.drivedKMs">{driver.drivedKMs}</p>
                                <p><button id="deleteRent">Delete</button></p>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="drivers">
                <button id="add"> New Driver</button>
            </div>
        </div>
    </>)
}