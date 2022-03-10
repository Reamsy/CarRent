import axios from 'axios';
import React, { useEffect, useState } from 'react';

//Import CSS
import './driverPage.css';

export function Driver({ id }) {

    const [driverPrivjobs, setJobs] = useState([]);

    console.log("hook: "+driverPrivjobs)

    useEffect(() => {
        //Rendelések lekérése
        axios.get(`http://localhost:3001/getDriverRents/${id}`)
            .then((response) => {
                if (response) {
                    const data = [response.data[0]];
                    setJobs(data);
                    console.log("data: "+ response.data[0] )
                }
                else {
                    alert(response.data.message);
                }
            })
    }, [])

    return (<>
        <div>
            {/*Info texts*/}
            <div className="containerDriver">
                <h3 id="driver-h3">Check out your working days!</h3>
                <p id="infoP">Below you can choos your holidays.</p>
                <p id="infoPlittle">In a month ONLY 3 days besides weekends.</p>
            </div>

            {/*Drives and holidays*/}
            <div className="jobsContainerText">
                <p id='jobsContainer-p'>Start of driver</p>
                <p id='jobsContainer-p'>End of drive</p>
                <p id='jobsContainer-p'>Car</p>
            </div>
            {driverPrivjobs.map(rent =>
                <div className="jobsContainer" key={rent.id}>
                    <p id='jobsContainer-p'>{rent.start_date}</p>
                    <p id='jobsContainer-p'>{rent.end_date}</p>
                    <p id='jobsContainer-p'>{rent.car_id}</p>
                </div>
            )}




            <div className="buttons">
                {/*amely napokon az adott sofőr ki lett bérelve, azok a napok zölddel jelölődjenek
            ahol a sofőr kivett szabadságot (havi 3) ott a napok pirossal legyenek jelölve,
            és ne lehessen arra a napra bérelni a sofőrt*/}
                {/*Save button*/}
                <button className="saveBTN"><span>SAVE</span></button>
            </div>
        </div>
    </>)
}