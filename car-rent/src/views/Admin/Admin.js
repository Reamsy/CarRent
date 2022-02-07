import React from 'react';

//Import CSS
import './adminPage.css';

export function Admin() {
    return (<>
        <div>
            {/*Welcome message*/}
            <div className="container">
                <h3>Here, you can manage your busines!</h3>
            </div>

            {/*Listing of rents*/}
            <div>
                <p id="rent">Rents</p>
            </div>

            <div className="container">
                <ul id="listBox">
                    {/*mindig +1 listElement (komplett "li" box) ha beérkezik egy rendelés(feltölteni)*/}
                    <li id="listElement">
                        {/*ide az adatbázisból kellene feltölteni az adatokat (bérlő, melyik autót, milyen idő intervallumban)*/}
                        <p id="name">név</p>
                        <p id="car">kocsi</p>
                        <p id="time">időhossz(mettől-meddig)</p>
                        <p><button id="deleteRent">Delete</button></p>
                    </li>
                </ul>
            </div>

            {/*Listing of vehicles*/}
            <div>
                <p id="rent">Vehicles</p>
            </div>
            <div className="container">
                <ul id="listBox">
                    {/*mindig +1 listElement (komplett "li" box) ha felvesznek egy új autót*/}
                    <li id="listElement">
                        {/*ide az adatbázisból kellene feltölteni az adatokat (bérlő, melyik autót, milyen idő intervallumban)*/}
                        <p id="brand">márka</p>
                        <p id="type">típus</p>
                        <p id="km">km</p>
                        <p><button id="deleteRent">Delete</button></p>
                    </li>
                </ul>
            </div>
            <div>
                <button id="add"> New Car</button>
            </div>

            {/*Listing of Drivers*/}
            <div>
                <p id="rent">Drivers</p>
            </div>
            <div className="container">
                <ul id="listBox">
                    {/*mindig +1 listElement (komplett "li" box) ha felvesznek egy új autót*/}
                    <li id="listElement">
                        {/*ide az adatbázisból kellene feltölteni az adatokat (bérlő, melyik autót, milyen idő intervallumban)*/}
                        <p id="driverName">név</p>
                        <p id="work">dolgozik-e(boolean)</p>
                        <p id="end">munka vége(date)</p>
                        <p><button id="deleteRent">Delete</button></p>
                    </li>
                </ul>
            </div>

            <div className="drivers">
                <button id="add"> New Driver</button>
            </div>
        </div>
    </>)
}