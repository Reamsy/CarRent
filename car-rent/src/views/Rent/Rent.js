import React from 'react';

//Import CSS & Images
import './Rent.css';
import carIMG from '../../images/img_car.png';
import driverIMG from '../../images/img_avatar.png';

export function Rent() {





    return (<>
        <div>
            {/*Title for rent*/}
            <div className="container">
                <h3 >Now, choose your vehicle, than choose your rent's start & end time
                </h3>
                <p > You only able to choose whole days</p>
            </div>

            {/*Form to choose date, car, driver*/}
            {/*
    Car default value = id1
    Driver default value = none
     */}

            <div className="container_choose" >
                {/*Cars*/}
                <form>
                    <select id="cars" name="cars">
                        {/*feltöltése DB-ből mindig a kiválasztott autó információi jelenjenek meg a lenti card-ban*/}
                        <option value="car1" id="car1">BMW</option>
                        <option value="car2" id="car2">Nissan</option>
                        <option value="car2" id="car3">Honda</option>
                    </select>
                </form>

                {/*Drivers*/}
                <form action="">
                    <select id="cars" name="cars">
                        {/*feltöltése DB-ből mindig a kiválasztott sofőr információi jelenjenek meg a lenti card-ban*/}
                        <option value="noDriver" id="noDriver" selected>Nem kérek sofőrt!</option>
                        <option value="driver1" id="driver1">Kiss István</option>
                        <option value="driver2" id="driver2">Bakos Zsombor</option>
                        <option value="driver2" id="driver3">Szakács Péter</option>
                    </select>
                </form>
            </div>

            {/*Start/End date choosing*/}
            <p id="date-p" >Choose your Start and End date</p>

            <div className="container_date" >

                <div className="startDate">
                    {/*Start/End date choosing<!--Start date*/}
                    <label for="start">Start date:</label>
                    {/*current date alapján jelenjen meg*/}
                    <input type="date" id="startInput" name="start-date" value="" />
                </div>
                <div className="endDate">
                    {/*End date*/}
                    <label for="end">End date:</label>
                    {/*A kiválasztott nap alapértelmezettként mindig a maid dátum +1 nap legyen*/}
                    <input type="date" id="endInput" name="end-date" />
                </div>
            </div>

            {/*Choosed Car & Driver card*/}
            <div className="container_cards">

                <div className="cardPosition">
                    {/*Car*/}
                    <div className="card" id="car">
                        <img className="img" src={carIMG} alt="car" />
                        <div className="container">
                            <h4 id="car"><b>Brand</b></h4>
                            <p>price/day</p>
                            <p id="startTime">start time</p>
                            <p id="endTime">end time</p>
                        </div>

                    </div>
                </div>

                <p id="total">total</p>

                <div >
                    {/*Driver*/}
                    {/*Ha a vásárló nem kér sofőrt ne jelenjen meg se név se semmi, opacity: 0.4;*/}
                    <div className="card" id="car">
                        <img className="img" src={driverIMG} />
                        <div className="container">
                            <h4 id="name"><b>Name</b></h4>
                            <p id="age">Age</p>
                            <p>férfi</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*Rent button*/}
            <div className="container_button" >
                <p id="rent-p">Before you rent, check again!</p>
                <button type="submit" id="finalRentBTN">Rent</button>
            </div>
        </div>
    </>)
}