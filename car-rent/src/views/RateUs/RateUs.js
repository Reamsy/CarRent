import React, { useContext, useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import axios from 'axios';
import { UserContext } from '../../App';

//Import CSS & Images
import './rateUs.css';
import carIMG from '../../images/img_car.png';
import driverIMG from '../../images/img_avatar.png';



export function RateUs() {

    //hook for disable rate input if no driver in rent
    const [disable, setDisable] = useState(false);

    //user lekérése
    const { user } = useContext(UserContext);

    //Mapping rents
    const [ProductsRate, setCarsRate] = useState([]);

    //hooks for rates
    const [CarRating, setCarRating] = useState();
    const [DriverRating, setDriverRating] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3001/getCarsForRate/${user.id}`)
            .then((response) => {
                if (response) {
                    console.log(response.data);
                    setCarsRate(response.data);
                }
                else {
                    alert("Cars rate not available")
                }
            })
    }, []);


    const sendRating = (carId, driverId) => {
        axios.post("http://localhost:3001/sendRating", {
            userId: user.id,
            carId: carId,
            carRating: CarRating,
            driverId: driverId,
            driverRating: DriverRating
        }).then((response) => {
            if (response) {
                alert("Thank you for Rating!");
            }
            else {
                alert(response.data.message);
            }
        })
    }

    const handleSubmit = (e) => { 
        console.log(e);
    }




    return (<>

        <Layout />

        {/*Page message*/}
        <h3 id="h3rate">Here you can rate our vehicles and drivers!</h3>

        {ProductsRate.map(rateable =>
            <div key={rateable.id}>
                <form onSubmit={e => handleSubmit(e)}>
                    <section id='ratrSection'>
                        {/*Cards for the rate us*/}
                        {/*vehicle1*/}
                        <div className='rateDates'>
                            <p>Start Date: {new Date(rateable.start_date).toLocaleDateString()}</p>
                            <p>End Date: {new Date(rateable.end_date).toLocaleDateString()}</p>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className=" justify-content-center">
                                    <div className="card" id="car">
                                        {/*IMAGE*/}<img className="img" src={carIMG} alt="car" />
                                        <div className="container">
                                            {/*ezeket adatbázisból kellene feltölteni*/}
                                            <h4><b>Car: {rateable.car_id}</b></h4>
                                            <p>Rate the Car</p>
                                            <p><input disable={disable} id='rateInput' type='range' onChange={(e) => { setCarRating(e.target.value) }} defaultValue={null}></input></p>
                                        </div>
                                    </div>
                                </div>

                                {/*rate button*/}
                                <p id='rate-p'><button id='rateBTN' onClick={() => { sendRating(rateable.car_id, rateable.driver_id) }}>Send</button></p>

                                {/*driver1*/}
                                {rateable.driver_id &&
                                    <div className=" justify-content-center">
                                        <div className="card" id="people">
                                            <img className="img" src={driverIMG} alt="Avatar" />
                                            <div className="container">
                                                {/*ezeket adatbázisból kellene feltölteni*/}
                                                <h4><b>Driver: {rateable.driver_id || "----"}</b></h4>
                                                <p>Rate the Driver</p>
                                                <p><input id='rateInput' type='range'
                                                    onChange={(e) => { setDriverRating(e.target.value) }}></input></p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        <hr className="rounded" />
                    </section>
                </form>
            </div>
        )}

    </>)
}