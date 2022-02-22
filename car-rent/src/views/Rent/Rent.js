import { React, useCallback, useState } from 'react';
import Layout from '../layOut/layOut'
import Axios from 'axios';

//Import CSS & Images
import './Rent.css';

export function Rent() {

    //data fetching for cars and drivers

    const [cars, setCars] = useState([]);
    const [drivers, setDrivers] = useState([]);

    //Date hooks for select
    const [startDate, setStartDate] = useState(Date);
    const [endDate, setEndDate] = useState(Date);

    //Backend error messages hook
    const [rentConfirmed, setRentConfirmed] = useState("Before you rent, CHECK AGAIN!");

    //Options
    const [selectedCar, setselectedCar] = useState("");
    const [selectedDriver, setselectedDriver] = useState("");

    //rent kérése elküldése
    const Rent = () => {
        console.log(startDate, endDate, selectedCar, selectedDriver);
        Axios.post('http://localhost:3001/Rent', {
            //Kiszervezés ami át fog menni backendre
            //Ezeket használd: RentStartDate, RentEndDate...
            RentStartDate: startDate,
            RentEndDate: endDate,
            RentCar: selectedCar,
            RentDriver: selectedDriver,

        }).then((response) => {

            //és a válasz ami backendről fog jönni
            if (response.data.message) {
                setRentConfirmed(response.data.message);
            }
            else {
                //sikeres bérés esetén visszajelző alert
                alert("Bérlését sikeresen rögzítettük!");
            }
        });
    };

    //fetching Cars
        const CheckCars = useCallback(() => {
            Axios.get('http://localhost:3001/rentCars')

                //itt kezeljük le az backendről érkező adatokat
                .then((response) => {
                    console.log("response");
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
    const CheckDrivers = useCallback(() => {
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
            <div className="container">
                <h3 >Now, choose your vehicle, than choose your rent's start & end time
                </h3>
                <p > You only able to choose whole days</p>
            </div>

            {/*Form to choose date, car, driver*/}
            <div className="container_choose" >

                {/*Cars*/}
                <form onMouseEnter={CheckCars}>
                    <select id="cars" name="cars"
                        onChange={(e) => {
                            const selectedCar = e.target.value;
                            setselectedCar(selectedCar);
                        }} >
                        {/*feltöltése DB-ből mindig a kiválasztott autó információi jelenjenek meg a lenti card-ban*/}
                        <option value="0">Nincs autó kiválasztva</option>
                        {cars.map(car =>
                            <option key={car.id} value={car.id}>{car.brand}</option>
                        )}
                    </select>
                </form>

                {/*Drivers*/}
                <form onMouseEnter={CheckDrivers}>
                    <select id="cars" name="cars"
                        onChange={(e) => {
                            const selectedDriver = e.target.value;
                            setselectedDriver(selectedDriver);
                        }} >
                        {/*feltöltése DB-ből mindig a kiválasztott sofőr információi jelenjenek meg a lenti card-ban*/}
                        <option value="00">Nem kérek sofőrt</option>
                        {drivers.map(driver =>
                            <option value={driver.id}>{driver.name}</option>
                        )}
                    </select>
                </form>
            </div>

            {/*Start/End date choosing*/}
            <p id="date-p" >Choose your Start and End date</p>

            <div className="dateChoose">
                {/*Start date*/}
                <input type="date"
                    onChange={(e) => {
                        setStartDate(e.target.value);
                    }}
                />

                {/*End date*/}
                <input type="date"
                    id="enddate"
                    onChange={(e) => {
                        setEndDate(e.target.value);
                    }}
                />
            </div>

            {/*Rent button*/}
            <div className="container_button" >
                <p id="rent-p">{rentConfirmed}</p>
                <button type="submit" id="finalRentBTN" onClick={Rent}>Rent</button>
            </div>
        </div>
    </>)
}