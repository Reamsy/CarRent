import React, { useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import Axios from 'axios';



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

        <div className='container'>

            {/*Page messages*/}
            <div className='row text-center pt-5'>
                <h3>Here are our Drivers</h3>
            </div>

            <div className='row text-center'>
                <p className='mt-5 mb-5'>Drivers</p>
            </div>

            {/*vehicles*/}
            {drivers.map(driver => <>
                <div className="row col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
                    <div className="cardCar">
                        <div className="d-flex justify-content-center" key={driver.id}>
                            <img id='img' src={`http://localhost:3001/${driver.image}`} alt="car"></img>
                            <div className="container text-light">
                                <div className='row text-center'>
                                    <p className='textSetting'><b>{driver.name}</b></p>
                                </div>
                                <div className='row text-center'>
                                    <p className='textSetting'>Licence Category: {driver.licence_category}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="rounded mt-4 mb-4"></hr>
            </>)}
        </div>
    </>);
}
