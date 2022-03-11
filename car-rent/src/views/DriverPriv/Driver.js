import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Import CSS
import './driverPage.css';

export function Driver({ id }) {

    const navigate = useNavigate();
    const [driverPrivjobs, setJobs] = useState([]);

    console.log("hook: " + driverPrivjobs)

    useEffect(() => {
        //Rendelések lekérése
        axios.get(`http://localhost:3001/getDriverRents/${id}`)
            .then((response) => {
                if (response) {
                    setJobs(response.data);
                }
                else {
                    alert(response.data.message);
                }
            })
    }, [])

    const handleLogout = () =>{
        window.localStorage.removeItem('user')
        navigate("/")
    }

    return (<>
        <div>
            {/*Info texts*/}
            <div className="containerDriver">
                <button id='driverLogoutBTN' onClick={handleLogout}>Logout</button>
                <h3 id="driver-h3">Check out your working days!</h3>
                <p id="driver-p">Below you can choos your holidays.</p>
            </div>

            {/*Drives and holidays*/}
            <div className="jobsContainerText">
                <div id='jobsContainerText-p'>Start of driver</div>
                <div id='jobsContainerText-p'>End of drive</div>
                <div id='jobsContainerText-p'>Car</div>
            </div>

            {driverPrivjobs.map(rent =>
                <div className="jobsContainer" key={rent.id}>
                    <div id='jobsContainer-p'>{rent.start_date}</div>
                    <div id='jobsContainer-p'>{rent.end_date}</div>
                    <div id='jobsContainer-p'>{rent.car_id}</div>
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