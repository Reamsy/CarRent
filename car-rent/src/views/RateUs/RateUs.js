import React, { useContext, useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import axios from 'axios';
import { UserContext } from '../../App';

export function RateUs() {

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
                    setCarsRate(response.data);
                }
                else {
                    alert("Cars rate not available")
                }
            })
    }, []);


    const sendRating = (carId, driverId) => {

        let hiba = false;
        if (CarRating === undefined) {
            hiba = true;
        }
        if (DriverRating === undefined) {
            hiba = true;
        }

        if (!hiba) {
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
        else {
            alert("You must rate before sending!");
        }
    }

    const handleSubmit = (e) => {
        console.log(e);
    }




    return (<>

        <Layout />

        <div className='container'>

            <div className='row text-center pt-5'>
                <h3 className='mb-5'>Here you can rate our vehicles and drivers!</h3>
            </div>

            {/*Rate */}
            <div className='row text-center'>
                {ProductsRate.map(rateable =>
                    <div key={rateable.id}>
                        <form onSubmit={e => handleSubmit(e)}>
                            <section>
                                {/*Cards for the rate us*/}

                                {/*vehicle1*/}
                                <div className='row center'>
                                    <div className="container col-lg-6 col-md-6 col-sm-12">
                                        <p>Start Date: {new Date(rateable.start_date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="container col-lg-6 col-md-6 col-sm-12">
                                        <p>End Date: {new Date(rateable.end_date).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="row center">
                                    <div className="container col-lg-6 col-md-6 col-sm-12">
                                        <div className="card" id="car">
                                            {/*IMAGE*/}<img className="img" alt="car" />
                                            <div className="container">
                                                {/*ezeket adatbázisból kellene feltölteni*/}
                                                <h4><b>Car: {rateable.brand}</b></h4>
                                                <p>Rate the Car</p>
                                                <p><input id='rateInput' type='range' onChange={(e) => { setCarRating(e.target.value) }} defaultValue={null}></input></p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container col-lg-6 col-md-6 col-sm-12">
                                        {/*driver1*/}
                                        {rateable.driver_id &&
                                            <div className="row">
                                                <div className="card" id="people">
                                                    <img className="img" alt="Avatar" />
                                                    <div className="container">
                                                        {/*ezeket adatbázisból kellene feltölteni*/}
                                                        <h4><b>Driver: {rateable.name || "----"}</b></h4>
                                                        <p>Rate the Driver</p>
                                                        <p><input id='rateInput' type='range'
                                                            onChange={(e) => { setDriverRating(e.target.value) }}></input></p>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>

                                <div className='row center mt-5 d-flex justify-content-center'>
                                    {/*rate button*/}
                                    <button className='btn btn-primary' id='btn' onClick={() => { sendRating(rateable.car_id, rateable.driver_id) }}>Send</button>
                                </div>

                                <hr className="rounded" />
                            </section>
                        </form>
                    </div>
                )}
            </div>
        </div>
    </>)
}