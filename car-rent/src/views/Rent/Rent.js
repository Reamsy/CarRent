import { React, useContext, useEffect, useState } from 'react';
import Layout from '../layOut/layOut'
import Axios from 'axios';

//Import CSS & Images
import './Rent.css';
import { UserContext } from '../../App';

export function Rent() {

    //id from login
    const {user} = useContext(UserContext);

    //data fetching for cars and drivers
    const [cars, setCars] = useState([]);
    const [drivers, setDrivers] = useState([]);

    //Date hooks for select
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    //Options
    const [selectedCar, setselectedCar] = useState("");
    const [selectedDriver, setselectedDriver] = useState("");

    //rent kérése elküldése(NINCS LEKEZELVE!!!)
    const Rent = () => {
        let hiba = false;
        for (const item of document.getElementsByClassName("input")) {
            if (item.value === null || item.value === "")
                hiba = true;
        }
        if (!hiba) {
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
            alert("To rent, you must choose your car, start & end date")
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
                    alert("Vehicles currently unavailable!");
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
                    alert("Drivers currently unavailable!");
                }
            });
    }, []);


    return (<>

        <Layout />

        <div>
            {/*Title for rent*/}
            <div className="containerRent">
                <h3 >Now, choose your vehicle, than choose your rent's start & end time
                </h3>
                <p id="rentUpper-p"> You only able to choose whole days</p>
            </div>

            {/*Form to choose date, car, driver*/}
            <div className="container_chooseRent" >

                {/*Cars*/}
                <select className="input" id="cars" name="cars"
                    onChange={(e) => {
                        const selectedCar = e.target.value;
                        setselectedCar(selectedCar);
                    }} >
                    <option disabled selected>No car selected!</option>
                    {cars.map(car =>
                        <option key={car.id} value={car.id}>{car.brand}</option>
                    )}
                </select>


                {/*Drivers*/}
                <select id="cars" name="cars"
                    onChange={(e) => {
                        const selectedDriver = e.target.value;
                        setselectedDriver(selectedDriver);
                    }} >
                    <option value="NULL">No driver selected!</option>
                    {drivers.map(driver =>
                        <option key={driver.id} value={driver.user_id}>{driver.name}</option>
                    )}
                </select>
            </div>

            {/*Start/End date choosing*/}
            <p id="date-p" >Choose your Start and End date</p>

            <div className="dateChooseRent">
                {/*Start date*/}
                <input className="input" type="date"
                    onChange={(e) => {
                        setStartDate(e.target.value);
                    }}
                />

                {/*End date*/}
                <input className="input" type="date"
                    id="enddate"
                    onChange={(e) => {
                        setEndDate(e.target.value);
                    }}
                />
            </div>

            {/*Rent button*/}
            <div className="container_button" >
                <p id="rent-p">Before you rent, check again!</p>
                <button type="submit" id="finalRentBTN" onClick={Rent}>Rent</button>
            </div>
        </div>
    </>)
}