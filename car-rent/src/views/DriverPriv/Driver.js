import axios from 'axios';
import React, { useEffect, useState } from 'react';

//Import CSS
import './driverPage.css';

export function Driver({ loginDriverId }) {

    const [drivers, setDirvers] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3001/driversPrivate/${loginDriverId}`)
            .then((response) => {
                if (response) {
                    setDirvers(response.data[0]);
                }
            })
    }, [])

    return (<>
        <div>
            {/*Info texts*/}
            <div className="containerDriver">
                <h3 data-aos="fade-up" data-aos-delay="300">Check out your working days!</h3>
                <p data-aos="fade-up" data-aos-delay="600" id="infoP">Below you can choos your holidays.</p>
                <p data-aos="fade-up" data-aos-delay="700" id="infoPlittle">In a month ONLY 3 days besides weekends.</p>
            </div>

            <div className="buttons">
                {/*amely napokon az adott sofőr ki lett bérelve, azok a napok zölddel jelölődjenek
            ahol a sofőr kivett szabadságot (havi 3) ott a napok pirossal legyenek jelölve,
            és ne lehessen arra a napra bérelni a sofőrt*/}
                <button className="selectBTN" id="setButton" data-aos="fade-up" data-aos-delay="800">SET HOLIDAY</button>

                {/*Save button*/}
                <button className="saveBTN" data-aos="fade-up" data-aos-delay="900"><span>SAVE </span></button>
            </div>
        </div>
    </>)
}