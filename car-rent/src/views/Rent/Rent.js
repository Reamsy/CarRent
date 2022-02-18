import { React, useState } from 'react';
import Layout from '../layOut/layOut'
import Axios from 'axios';

//Import CSS & Images
import './Rent.css';

export function Rent() {

    //Date hooks for select
    const [startDate, setStartDate] = useState(Date);
    const [endDate, setEndDate] = useState(Date);

    //Backend error messages hook
    const [rentConfirmed, setRentConfirmed] = useState("Before you rent, CHECK AGAIN!");

    //Options
    const [selectedCar, setselectedCar] = useState("");
    const [selectedDriver, setselectedDriver] = useState("");

    //rent kérése elküldése
    const rent = () => {
        Axios.post('http://localhost:3001/rent', {

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



    }
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
                <form>
                    <select id="cars" name="cars"
                        onChange={(e) => {
                            const selectedCar = e.target.value;
                            setselectedCar(selectedCar);
                        }} >

                        {/*feltöltése DB-ből mindig a kiválasztott autó információi jelenjenek meg a lenti card-ban*/}
                        
                        <option value="noCar">Choose your Car</option>
                        <option value="car1" id="car1" >BMW</option>
                        <option value="car2" id="car2">Nissan</option>
                        <option value="car3" id="car3">Honda</option>
                    </select>
                    <></>
                </form>

                {/*Drivers*/}
                <form action="">
                    <select id="cars" name="cars" onChange={(e) => {
                        const selectedDriver = e.target.value;
                        setselectedDriver(selectedDriver);
                    }}>
                        {/*feltöltése DB-ből mindig a kiválasztott sofőr információi jelenjenek meg a lenti card-ban*/}
                        <option value="noDriver" id="noDriver">Choose a driver</option>
                        <option value="driver1" id="driver1">Kiss István</option>
                        <option value="driver2" id="driver2">Bakos Zsombor</option>
                        <option value="driver3" id="driver3">Szakács Péter</option>
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
                <button type="submit" id="finalRentBTN" onClick={rent}>Rent</button>
            </div>
        </div>
    </>)
}