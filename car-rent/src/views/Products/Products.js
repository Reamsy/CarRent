import React from 'react';

//import CSS & Images
import './Products.css';
import carIMG from '../../images/img_car.jpg';
import driverIMG from '../../images/img_avatar.jpg';

export function Products() {
    return (<>
        {/*Page message*/}
        <h3>Here Are our Drivers and Vehicles you can choose from!</h3>

        {/*Culomn Signs*/}
        <div class="signs">
            <p id="culVehicle">Vehicles</p>
            <p id="culDriver">Drivers</p>
        </div>

        {/*Cards for the Products*/ }
        {/*vehicle1*/}
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="card" data-aos="fade-right" data-aos-delay="300" id="car">
                        <img src={carIMG} alt="car">
                        <div class ="container">
                        {/*ezeket adatbázisból kellene feltölteni*/}
                        <h4><b>Brand</b></h4>
                        <p>fuel type </p>
                        <p>bérlési ár</p>
                        <p>évjárat</p>
                        </div>
                    </div>
                </div>

                {/*driver1*/}
                <div class="col-12">
                    <div class="card" data-aos="fade-left" data-aos-delay="300" id="people">
                        <img src="../images/img_avatar.png" alt="Avatar">
                        <div class ="container">
                        {/*ezeket adatbázisból kellene feltölteni*/}
                        <h4><b>name</b></h4>
                        <p>sex</p>
                        <p>license category</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr class="rounded">

            {/*vehicle2*/}
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="card" data-aos="fade-right" data-aos-delay="300" id="car">
                            <img src="../images/img_car.png" alt="car">
                            <div class ="container">
                            {/*ezeket adatbázisból kellene feltölteni*/}
                            <h4><b>Brand</b></h4>
                            <p>fuel type </p>
                            <p>bérlési ár</p>
                            <p>évjárat</p>
                            </div>
                        </div>
                    </div>

                    {/*driver2*/}
                    <div class="col-12">
                        <div class="card" data-aos="fade-left" data-aos-delay="300" id="people">
                            <img src="../images/img_avatar.png" alt="Avatar">
                            <div class ="container">
                            {/*ezeket adatbázisból kellene feltölteni*/}
                            <h4><b>name</b></h4>
                            <p>sex</p>
                            <p>license category</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="rounded">

                {/*vehicle3*/}
                <div class="container" id="bottomContainer">
                    <div class="row">
                        <div class="col-12">
                            <div class="card" data-aos="fade-right" data-aos-delay="300" id="car">
                                <img src="../images/img_car.png" alt="car">
                                <div class ="container">
                            {/*ezeket adatbázisból kellene feltölteni*/}
                                <h4><b>Brand</b></h4>
                                <p>fuel type </p>
                                <p>bérlési ár</p>
                                <p>évjárat</p>
                                </div>
                            </div>
                        </div>

                        {/*driver3*/}
                        <div class="col-12">
                            <div class="card" data-aos="fade-left" data-aos-delay="300" id="people">
                                <img src="../images/img_avatar.png" alt="Avatar">
                                <div class ="container">
                            {/*ezeket adatbázisból kellene feltölteni*/}
                                <h4><b>name</b></h4>
                                <p>sex</p>
                                <p>license category</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>);   
}