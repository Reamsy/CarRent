import React from 'react';

//import CSS & Images
import './Products.css';
import carIMG from '../../images/img_car.png';
import driverIMG from '../../images/img_avatar.png';

export function Products() {
    return (<>
        {/*Page message*/}
        <h3>Here Are our Drivers and Vehicles you can choose from!</h3>

        {/*Culomn Signs*/}
        <div className="signs">
            <p id="culVehicle">Vehicles</p>
            <p id="culDriver">Drivers</p>
        </div>

        {/*Cards for the Products*/}
        {/*vehicle1*/}
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card" id="car">
                        <img src={"../../images/img_car.png"} alt="car" />
                        <div className="container">
                            {/*ezeket adatbázisból kellene feltölteni*/}
                            <h4><b>Brand</b></h4>
                            <p>fuel type </p>
                            <p>bérlési ár</p>
                            <p>évjárat</p>
                        </div>
                    </div>

                    {/*driver1*/}
                    <div className="col-12">
                        <div className="card" id="people">
                            <img src={"../../images/avatar_car.png"} alt="avatar" />
                            <div className="container">
                                {/*ezeket adatbázisból kellene feltölteni*/}
                                <h4><b>name</b></h4>
                                <p>sex</p>
                                <p>license category</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr className="rounded"></hr>
    </>);
}