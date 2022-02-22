import React from 'react';

//Import CSS
import './driverPage.css';

export function Driver(){
    return(<>
        {/*Info texts*/}
    <div className="container">
        <h3 data-aos="fade-up" data-aos-delay="300">Check out your working days!</h3>
        <p data-aos="fade-up" data-aos-delay="400"> You can decide when you want to work, but on a day, when you get
            Rented, you can't go on vacation!</p>
        <p data-aos="fade-up" data-aos-delay="500">You work on green colored days, on red colored days you are out of
            work.</p>
        <p data-aos="fade-up" data-aos-delay="600" id="infoP">Below you can choos your holidays.
        </p>
        <p data-aos="fade-up" data-aos-delay="700" id="infoPlittle">In a month ONLY 3 days besides weekends.</p>
    </div>

    {/*Calendar*/}
    <div className="row">
        <div className="containerCalendar" data-aos="fade up" data-aos-delay="800">
            <div className="month">
                <ul>
                    <li className="prev">&#10094;</li>
                    <li className="next">&#10095;</li>
                    {/*a hónap, nap  és év automatikusan current date alapján működjön*/}
                    <li id="currentDateYear">1</li>
                    <li id="currentDateMonth">1</li>
                    <li id="currentDateDay">1</li>
                </ul>
            </div>

            <ul className="weekdays">
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
                <li>Su</li>
            </ul>
            {/*Napok feltöltése után CSS-hez visszatérni a padding beállításai miatt*/}
            <div className="days">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
            </div>
        </div>
    </div>

    <div className="buttons">
        {/*amely napokon az adott sofőr ki lett bérelve, azok a napok zölddel jelölődjenek
            ahol a sofőr kivett szabadságot (havi 3) ott a napok pirossal legyenek jelölve,
            és ne lehessen arra a napra bérelni a sofőrt*/}
        <button className="selectBTN" id="setButton" data-aos="fade-up" data-aos-delay="800">SET HOLIDAY</button>

        {/*Save button*/}
        <button className="saveBTN" data-aos="fade-up" data-aos-delay="900"><span>SAVE </span></button>
    </div>
    </>)
}