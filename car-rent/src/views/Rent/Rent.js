import { React, useContext, useEffect, useState } from 'react';
import Layout from '../layOut/layOut'
import Axios from 'axios';

import { UserContext } from '../../App';

export function Rent() {

    //id from login
    const { user } = useContext(UserContext);

    //data fetching for cars and drivers
    const [cars, setCars] = useState([]);
    const [drivers, setDrivers] = useState([]);

    //Date hooks for select
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    //Options
    const [selectedCar, setselectedCar] = useState("");
    const [selectedDriver, setselectedDriver] = useState(null);

    //errors
    const [errorMessage, setErrorMessage] = useState("");

    //currentDate & rent_start_date
    const currentDate = new Date(Date.now()).toLocaleDateString()
    const rentStartDate = new Date(startDate).toLocaleDateString()

    //rent send
    const Rent = () => {

        let hiba = false;
        let currentDateErr = false;
        let starterDateError = false;

        for (const item of document.getElementsByClassName("input")) {

            if (item.value === null || item.value.trim() === "")
                hiba = true;

            if (currentDate > rentStartDate) {
                currentDateErr = true;
                setErrorMessage("Rent's end date can't be before today's date!")
                return;
            }

            if (startDate > endDate)
                starterDateError = true;
        }

        if (!hiba && !currentDateErr && !starterDateError) {
            Axios.post('http://localhost:3001/Rent', {
                //Kiszervezés ami át fog menni backendre
                //Ezeket használd: RentStartDate, RentEndDate...
                userRentId: user.id,
                RentStartDate: startDate,
                RentEndDate: endDate,
                RentCar: selectedCar,
                RentDriver: selectedDriver,

            }).then((response) => {
                //és a válasz ami backendről fog jönni
                if (response.data.message) {
                    alert(response.data.message);
                }
            });
        }
        else {
            setErrorMessage("To rent, you must choose your car, start & end date correctly!")
            return
        }
    }

    //fetching Cars
    useEffect(() => {
        Axios.get('http://localhost:3001/rentCars')

            //itt kezeljük le az backendről érkező adatokat
            .then((response) => {
                if (response) {
                    setCars(response.data);
                }
                //alertbe kezeljük ha hiba történt
                else {
                    setErrorMessage("Vehicles currently unavailable!");
                }
            });
    }, []);


    //fetching Drivers
    useEffect(() => {
        Axios.get('http://localhost:3001/rentDrivers')

            //itt kezeljük le az backendről érkező adatokat
            .then((response) => {
                if (response) {
                    setDrivers(response.data);
                }
                //alertbe kezeljük ha hiba történt
                else {
                    setErrorMessage("Drivers currently unavailable!");
                }
            });
    }, []);


    return (<>

        <Layout />

        <div className='container'>

            {/*Title for rent*/}
            <div className='row text-center pt-5'>
                <h3 >Now, choose your vehicle, than choose your rent's start & end time</h3>
            </div>
            <div className='row text-center pt-5'>
                <p> You only able to choose whole days</p>
            </div>

            {/*Form to choose date, car, driver*/}
            <div className='row text-center pb-5'>

                {/*Cars*/}
                <div className='container col-lg-6 col-md-6 col-sm-12'>
                    <select className="form-control" id="cars" name="cars"
                        onChange={(e) => {
                            const selectedCar = e.target.value;
                            setselectedCar(selectedCar);
                            setErrorMessage("Before you rent, check again!")
                        }} >
                        <option selected disabled value="">No car selected!</option>
                        {cars.map(car =>
                            <option key={car.id} value={car.id}>{car.brand.toUpperCase()}</option>
                        )}
                    </select>
                </div>

                {/*Drivers*/}
                <div className='container col-lg-6 col-md-6 col-sm-12'>
                    <select className='form-control' id="cars" name="cars"
                        onChange={(e) => {
                            const selectedDriver = e.target.value;
                            setselectedDriver(selectedDriver);
                            setErrorMessage("Before you rent, check again!")
                        }} >
                        <option value={null}>No driver selected!</option>
                        {drivers.map(driver =>
                            <option key={driver.id} value={driver.id}>{driver.name.toUpperCase()}</option>
                        )}
                    </select>
                </div>
            </div>

            {/*Start/End date choosing*/}
            <div className='row text-center pt-5'>
                <p id="date-p" >Choose your Start and End date</p>
            </div>

            {/*Start date*/}
            <div className='row text-center'>
                <div className='container col-lg-6 col-md-6 col-sm-12'>
                    <input className="input" type="date"
                        onChange={(e) => {
                            setStartDate(e.target.value);
                            setErrorMessage("Before you rent, check again!")
                        }}
                    />
                </div>

                {/*End date*/}
                <div className='container col-lg-6 col-md-6 col-sm-12'>
                    <input className="input" type="date"
                        onChange={(e) => {
                            setEndDate(e.target.value);
                            setErrorMessage("Before you rent, check again!")
                        }}
                    />
                </div>

            </div>

        </div>

        {/*Rent button*/}
        <div className="row text-center d-flex justify-content-center pt-5" >
            <p className='text-danger'>{errorMessage ? errorMessage : "Before you rent, check again!"}</p>
            <button className='btn btn-primary mt-5 mb-5' id='btn' type="submit" onClick={Rent}>Rent</button>
        </div>
    </>)
}