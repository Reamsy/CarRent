import React from 'react';

//Import CSS & Images
import './rateUs.css';
import carIMG from '../../images/img_car.png';
import driverIMG from '../../images/img_avatar.png';

export function RateUs() {
    return (<>
        {/*Page message*/}
        <h3>Here you can rate our vehicles and drivers!</h3>

        <section>
            {/*Cards for the rate us*/}
            {/*vehicle1*/}
            <div className="container">
                <div className="row">
                    <div className=" justify-content-center">
                        <div className="card" id="car">
                            <img className="img" src={carIMG} alt="car" />
                            <div className="container">
                                {/*ezeket adatbázisból kellene feltölteni*/}
                                <h4><b>Brand</b></h4>
                                <p>Értékelje a csillagok segítségével játművünket</p>
                                {/*Értékelés*/}
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                            </div>
                        </div>
                    </div>

                    {/*driver1*/}
                    <div className=" justify-content-center">
                        <div className="card" id="people">
                            <img className="img" src={driverIMG} alt="Avatar" />
                            <div className="container">
                                {/*ezeket adatbázisból kellene feltölteni*/}
                                <h4><b>name</b></h4>
                                {/*Értékelés*/}
                                <p>Értékelje a csillagok segítségével játművünket</p>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="rounded" />
        </section>
    </>)
}