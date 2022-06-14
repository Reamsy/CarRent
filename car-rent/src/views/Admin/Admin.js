import axios from 'axios';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'semantic-ui-react';


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
        handleDrivers();
    }, [])

    const handleDrivers = () => {
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
    }
    //delete Rents
    const DeleteRents = (RentId) => {
        Axios.delete(`http://localhost:3001/rentDelete/${RentId}`)
            .then((response) => {
                if (response) {
                    alert("Deleted!")
                    window.location.reload(false)
                }
                else {
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
                }
                else {
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

        <div className='container'>

            <div className='d-flex flex-row-reverse text-center'>
                <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
            </div>


            {/*Welcome message*/}
            <div className='row text-center'>
                <h3 className='pb-5'>Here, you can manage your busines!</h3>
            </div>

            {/*tittle of rents*/}
            <div className='row text-center'>
                <p className='text-danger'>{!errorMessage && "Rents"}</p>
            </div>

            <Table striped bordered hover className="adminTable">
                <thead>
                    <tr className='text-light text-center'>
                        <th>Rent number</th>
                        <th>Start of rent</th>
                        <th>End of rent</th>
                        <th>Car</th>
                        <th>Model</th>
                        <th>Driver</th>
                        <th className='text-danger'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Map of rents*/}
                    {rents.map(rent =>
                        <tr className='text-light text-center' key={rent.id}>
                            <td>{rent.id}</td>
                            <td>{new Date(rent.start_date).toLocaleDateString()}</td>
                            <td>{new Date(rent.end_date).toLocaleDateString()}</td>
                            <td>{rent.brand.toUpperCase()}</td>
                            <td>{rent.model.toUpperCase()}</td>
                            <td>{rent.name || "------"}</td>
                            <td><button className='btn btn-danger' onClick={() => { DeleteRents(rents.id) }}>Delete</button></td>
                        </tr>
                    )
                    }
                </tbody>
            </Table>

            {/*tittle of vehicles*/}
            <div className='row text-center'>
                <p className='text-danger'>{!errorMessage && "Vehicles"}</p>
            </div>

            <Table striped bordered hover className="adminTable">
                <thead>
                    <tr className='text-light text-center'>
                        <th>Id</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Plate number</th>
                        <th>Price / day</th>
                        <th>Year</th>
                        <th className='text-danger'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Map of rents*/}
                    {vehicles.map(vehicle =>
                        <tr className='text-light text-center' key={vehicle.id}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.brand.toUpperCase()}</td>
                            <td>{vehicle.model.toUpperCase()}</td>
                            <td>{vehicle.plateNumber.toUpperCase()}</td>
                            <td>{vehicle.price} - HUF</td>
                            <td>{vehicle.year}</td>
                            <td><button className='btn btn-danger' onClick={() => { DeleteVehicles(vehicle.id) }}>Delete</button></td>
                        </tr>
                    )
                    }
                </tbody>
                {/*Add new Vehicle button*/}
                <button className='btn btn-success d-flex justify-content-end' onClick={addNewCar}> New Vehicle</button>
            </Table>

            {/*tittle of drivers*/}
            <div className='row text-center'>
                <p className='text-danger'>{!errorMessage && "Drivers"}</p>
            </div>

            <Table striped bordered hover className="adminTable">
                <thead>
                    <tr className='text-light text-center'>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>License category</th>
                        <th>Available</th>
                        <th className='text-danger'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Map of drivers*/}
                    {drivers.map(driver =>
                        <tr className='text-light text-center' key={driver.id}>
                            <td>{driver.user_id}</td>
                            <td>{driver.name.toString().toUpperCase()}</td>
                            <td>{driver.sex.toString().toUpperCase()}</td>
                            <td>{driver.licence_category.toString().toUpperCase()}</td>
                            <td>
                                <input className='mt-3' type="checkbox"
                                    defaultChecked={driver.available} value={driver.available}
                                    onChange={e => { e.target.value = e.target.checked; checkHoliday(driver.id, e.target.value) }} />
                            </td>
                            <td><button className='btn btn-danger' onClick={() => { DeleteDrivers(driver.id) }}>Delete</button></td>
                        </tr>
                    )
                    }
                </tbody>

                {/*Add new Drivers button*/}
                <button className='btn btn-success d-flex justify-content-end' onClick={addNewDriver}> New Driver</button>
            </Table>
        </div >
    </>)
}