import React, { useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import axios from 'axios';


//Import CSS & Images
import './profilePage.css';
import driverIMG from '../../images/img_avatar.png';

export function Profile({ id }) {

    //hook for fetching costumer data
    const [costumers, setCostumers] = useState([]);

    //hooks for fetching costumer rents and error messages
    const [personalRents, setPrersonalRents] = useState([]);
    const [rentError, setRentsError] = useState();

    //fetching data from db by id 
    useEffect(() => {
        axios.get(`http://localhost:3001/profile/${id}`)
            .then((response) => {
                if (response) {
                    setCostumers(response.data[0]);
                }
                else {
                    alert('hiba')
                }
            })
    }, [])

    //sending inputs data to node
    const save = () => {
        let hiba = false;
        for (const item of document.getElementsByClassName("input")) {
            if (item.value.trim() === "")
                hiba = true;
        }
        if (!hiba) {
            axios.put(`http://localhost:3001/save/${id}`, {
                findId: id,
                ...costumers
            }).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                }
                else {
                    alert("Mentés sikeresen megtörtént!");
                }
            })
        }
        else {
            alert("Fill every lines");
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/getRents/${id}`)
            .then((response) => {
                if (response) {
                    setPrersonalRents([response.data[0]])

                }
                else {
                    setRentsError(response.data.message);
                }
            })
    }, [])


    return (<>
        <Layout />
        {/*Avatar Picture */}
        <div className="container-baseProfile">
            <img src={driverIMG} alt="img_avatar" id="profileImageProfile" />
        </div>

        {/*Info Section*/}
        <div className="containerProfile">
            <div className="leftInputProfile">
                <p>Full Name</p>
                <input className='input' type="text" name="Fullname" placeholder={!costumers.Fullname && "Adja meg az adatot"}
                    value={costumers.Fullname}
                    onChange={(e) => {
                        setCostumers({ ...costumers, [e.target.name]: e.target.value });
                    }}
                />
            </div>
            <div className="rightInputProfile">
                <p>Phone_number</p>
                <input className='input' type="tel" name="Phone_number" placeholder={!costumers.Phone_number && "Adja meg az adatot"}
                    value={costumers.Phone_number}
                    onChange={(e) => {
                        setCostumers({ ...costumers, [e.target.name]: e.target.value });
                    }}
                />
            </div>
        </div>
        <div className="containerProfile">
            <div className="leftInputProfile">
                <p>License Category</p>
                <input className='input' type="text" name="License_category" placeholder={!costumers.License_category && "Adja meg az adatot"}
                    value={costumers.License_category}
                    onChange={(e) => {
                        setCostumers({ ...costumers, [e.target.name]: e.target.value });
                    }}
                />
            </div>
            <div className="rightInputProfile">
                <p>License Expiration</p>
                <input className='input' type="text" name="License_expiraton" format="YYYY-mm-dd" placeholder={!costumers.License_expiraton && "Adja meg az adatot"}
                    value={costumers.License_expiraton}
                    onChange={(e) => {
                        setCostumers({ ...costumers, [e.target.name]: e.target.value });
                    }}
                />
            </div>
        </div>

        <div className="BTNProfile">
            <button id="saveBTNProfile" onClick={save}>Save</button>
        </div>

        {/*List of rents*/}
        <div className="profileRentTitle">
            <div id='adminContainerText-p'>Start of rent</div>
            <div id='adminContainerText-p'>End of rent</div>
            <div id='adminContainerText-p'>Car</div>
            <div id='adminContainerText-p'>Driver</div>
        </div>

        {personalRents.map(rents =>
            <div key={rents.id}>
                <div className="containerAdmin">
                    <p id="adminContainer-p">{new Date(rents.start_date).toLocaleDateString()}</p>
                    <p id="adminContainer-p">{new Date(rents.end_date).toLocaleDateString()}</p>
                    <p id="adminContainer-p">{rents.car_id}</p>
                    <p id="adminContainer-p">{rents.driver_id || "----"}</p>
                </div>
            </div>
        )}
    </>)
}