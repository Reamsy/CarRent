import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

//Import CSS
import './driverPage.css';

export function Driver() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    const [driverPrivjobs, setJobs] = useState([]);

    console.log("hook: " + driverPrivjobs)

    useEffect(() => {
        //Rendelések lekérése
        axios.get(`http://localhost:3001/getDriverRents/${user.id}`)
            .then((response) => {
                if (response) {
                    console.log(response.data);
                    setJobs(response.data);
                }
                else {
                    alert(response.data.message);
                }
            })
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        navigate("/")
    }

    return (<>
        <div>
            <button id='driverLogoutBTN' onClick={handleLogout}>Logout</button>
            {/*Info texts*/}
            <div className="containerDriver">
                <h4 id='driver-username'>Wellcome: {user.username}</h4>
                <h3 id="driver-h3">Check out your rides!</h3>
            </div>

            {/*Drives and holidays*/}
            <div className="jobsContainerText">
                <div id='jobsContainerText-p'>Start of driver</div>
                <div id='jobsContainerText-p'>End of drive</div>
                <div id='jobsContainerText-p'>Car</div>
            </div>

            {driverPrivjobs.map(rent =>
                <div className="jobsContainer" key={rent.id}>
                    <div id='jobsContainer-p'>{new Date(rent.start_date).toLocaleDateString()}</div>
                    <div id='jobsContainer-p'>{new Date(rent.end_date).toLocaleDateString()}</div>
                    <div id='jobsContainer-p'>{rent.brand.toString().toUpperCase()}</div>
                </div>
            )}
        </div>
    </>)
}