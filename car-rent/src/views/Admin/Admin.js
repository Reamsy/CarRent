import axios from 'axios';
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
                } else {
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
                } else {
                    setErrorMessage(response.data.message);
                }
            })
    }, [])

    useEffect(() => {
        handleDrivers();
    }, [])

    const handleDrivers = () => {
        //Sofőrők lekérése
        Axios.get("http://localhost:3001/AdminDrivers")
            .then((response) => {
                if (response) {
                    setDrivers(response.data);
                } else {
                    setErrorMessage(response.data.message);
                }
            })
    }
    //delete Rents
    const DeleteRents = (RentId) => {
        Axios.delete(`http://localhost:3001/rentDelete/${RentId}`)
            .then((response) => {
                if (response) {
                    alert("Deleted!")
                    window.location.reload(false)
                } else {
                    alert("Delete Error")
                }
            }).catch(console.log)
    }

    //delete Vehicles
    const DeleteVehicles = (CarId) => {
        Axios.delete(`http://localhost:3001/vehicleDelete/${CarId}`)
            .then((response) => {
                if (response) {
                    alert("Deleted!")
                    window.location.reload(false)
                } else {
                    alert("Delete Error")
                }
            }).catch(console.log);
    }

    //delete Drivers
    const DeleteDrivers = (DriverId) => {
        Axios.delete(`http://localhost:3001/driverDelete/${DriverId}`)
            .then((response) => {
                if (response) {
                    alert("Deleted!")
                    window.location.reload(false)
                }
                else {
                    alert("Delete Error")
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

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        navigate("/")
    }

    const checkHoliday = (id, value) => {
        axios.post(`http://localhost:3001/checkHoliday/${id}`, {
            value,
        }).then((response) => {
            handleDrivers();
        })
    }

    return (<>
        <div>
            <button id='driverLogoutBTN' onClick={handleLogout}>Logout</button>
            {/*Welcome message*/}
            <div className="containerAdmin">
                <h3 id='admin-h3'>Here, you can manage your busines!</h3>
            </div>

            {/*tittle of rents*/}
            <div>
                <p id="rent">{!errorMessage && "Rents"}</p>
            </div>
            <div className="adminContainerText">
                <div id='adminContainerText-p'>Rent num.</div>
                <div id='adminContainerText-p'>Start of rent</div>
                <div id='adminContainerText-p'>End of rent</div>
                <div id='adminContainerText-p'>Car</div>
                <div id='adminContainerText-p'>Model</div>
                <div id='adminContainerText-p'>Driver</div>
            </div>

            {/*Map of rents*/}
            {rents.map(rent =>
                <div key={rent.id}>
                    <div className="containerAdmin">
                        <p id="adminContainer-p">{rent.id}</p>
                        <p id="adminContainer-p">{new Date(rent.start_date).toLocaleDateString()}</p>
                        <p id="adminContainer-p">{new Date(rent.end_date).toLocaleDateString()}</p>
                        <p id="adminContainer-p">{rent.brand}</p>
                        <p id="adminContainer-p">{rent.model}</p>
                        <p id="adminContainer-p">{rent.name || "----"}</p>
                        <p><button id="deleteRent" onClick={() => { DeleteRents(rent.id) }}>Delete</button></p>
                    </div>
                </div>
            )}

            {/*tittle of vehicles*/}
            <div>
                <p id="rent">{!errorMessage && "Vehicles"}</p>
            </div>
            <div className="adminContainerText">
                <div id='adminContainerText-p'>id</div>
                <div id='adminContainerText-p'>Brand</div>
                <div id='adminContainerText-p'>Model</div>
                <div id='adminContainerText-p'>Plate num.</div>
                <div id='adminContainerText-p'>Price / day</div>
                <div id='adminContainerText-p'>Year</div>
            </div>

            {/*Map of vehicles*/}
            {vehicles.map(vehicle =>
                <div key={vehicle.id}>
                    <div className="containerAdmin">
                        <p id="adminContainer-p">{vehicle.id}</p>
                        <p id="adminContainer-p">{vehicle.brand}</p>
                        <p id="adminContainer-p">{vehicle.model}</p>
                        <p id="adminContainer-p">{vehicle.plateNumber}</p>
                        <p id="adminContainer-p">{vehicle.rentprice}</p>
                        <p id="adminContainer-p">{vehicle.year}</p>
                        <p><button id="deleteRent" onClick={() => { DeleteVehicles(vehicle.id) }}>Delete</button></p>
                    </div>
                </div>
            )}

            {/*Add new vehicle button*/}
            <div>
                <button id="add" onClick={addNewCar}> New Car</button>
            </div>

            {/*tittle of Drivers*/}
            < div >
                <p id="rent">{!errorMessage && "Drivers"}</p>
            </div>
            <div className="adminContainerText">
                <div id='adminContainerText-p'>id</div>
                <div id='adminContainerText-p'>Name</div>
                <div id='adminContainerText-p'>Sex</div>
                <div id='adminContainerText-p'>Licence cat.</div>
                <div id='adminContainerText-p'>Available</div>
            </div>

            {/*Map of Drivers*/}
            {drivers.map(driver =>
                <div key={driver.id}>
                    <div className="containerAdmin">
                        <p id="adminContainer-p">{driver.user_id}</p>
                        <p id="adminContainer-p">{driver.name}</p>
                        <p id="adminContainer-p">{driver.sex}</p>
                        <p id="adminContainer-p">{driver.licence_category}</p>
                        <p id="adminContainer-p"><input id="adminContainer-p-input" type="checkbox" defaultChecked={driver.available} value={driver.available}
                            onChange={e => { e.target.value = e.target.checked; checkHoliday(driver.id, e.target.value) }} /></p>
                        <p><button id="deleteRent" onClick={() => { DeleteDrivers(driver.id) }}>Delete</button></p>
                    </div>
                </div>
            )
            }

            {/*Add new Drivers button*/}
            <div className="drivers">
                <button id="add" onClick={addNewDriver}> New Driver</button>
            </div>
        </div >
    </>)
}