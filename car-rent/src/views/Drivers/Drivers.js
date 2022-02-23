import React, { useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import Axios from 'axios';

//import CSS & Images
import './Drivers.css';


export function Drivers() {

    const [drivers, setdrivers] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/drivers')

            //itt kezeljük le az backendről érkező adatokat
            .then((response) => {
                if (response) {
                    setdrivers(response.data);
                }
                //alertbe kezeljük ha hiba történt
                else {
                    alert("drivers not available right now!");
                }
            });

    }, []);



    return (<>

        <Layout />

        {/*Page message*/}
        <h3 id="h3Driver">Here are our Drivers</h3>

        {/*Culomn Signs*/}
        <div className="signsDriver">
            <p id="culDrivers">Drivers</p>
        </div>

        {/*Cards for the drivers*/}
        {/*Driver1*/}
        {drivers.map(driver =>
            <><div className="rowDriver">
                <div className="cardDriver">
                    {/*Végigmegyünk a drivers-okon és minden egyed driver id-nál kiíratjuk a hozzátartozó adatot*/}

                    <div key={driver.id}>
                        <img className="imgDriver" src={driver.image} alt="driver"></img>
                        <div className="containerDriver">
                            <h4><b>{driver.name}</b></h4>
                            <p>License category: {driver.licence_category}</p>
                            <p>KMs {driver.drivedKMs}</p>
                        </div>
                    </div>

                </div>
            </div><hr className="roundedDriver"></hr></>
        )}

    </>);
}
