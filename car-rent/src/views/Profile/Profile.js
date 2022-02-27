import React, { useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

//Import CSS & Images
import './profilePage.css';
import driverIMG from '../../images/img_avatar.png';

export function Profile({ id }) {

    //hooks for data
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [LicenseCat, setLicenseCat] = useState("");
    const [LicenseExpiraton, setLicenseExpiraton] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");

    //hook for fetching
    const [costumers, setCostumers] = useState([]);

    //fetching data from db by id
    useEffect(() => {
        Axios.get(`http://localhost:3001/profile/${id}`)
            .then((response) => {
                if (response) {
                    setCostumers(response.data);
                }
                else {
                    alert('hiba')
                }
            })
    }, [])

    //sending inputs data to node
    const save = () => {
        Axios.post('http://localhost:3001/save', {

            ProfileName: Name,
            ProfileEmail: Email,
            ProfileLicenseCat: LicenseCat,
            ProfileLicenseExpiration: LicenseExpiraton,
            ProfilePhone: Phone,
            ProfileAddress: Address,

        }).then((response) => {
            if (response.data.message) {
                alert(response.data.message)
            }
            else {
                alert("Mentés sikeresen megtörtént!")
            }
        })
    }

    return (<>

        <Layout />
        {/*Avatar Picture */}
        <div className="container-baseProfile">
            <img src={driverIMG} alt="img_avatar" id="profileImageProfile" />
        </div>

        {/*Info Section*/}
        {costumers.map(costumer =>
            <div>
                <div className="containerProfile">
                    <div className="leftInputProfile">
                        <p>Full Name</p>
                        <input type="text" name="Fullname" placeholder={!Name && "Adja meg az adatot"}
                            onChange={(e) => {
                                setName(e.target.value);

                            }}
                        />
                    </div>

                    <div className="rightInputProfile">
                        <p>E-mail</p>
                        <input type="text" name="email" placeholder={!Email && "Adja meg az adatot"}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="containerProfile">
                    <div className="leftInputProfile">
                        <p>License Category</p>
                        <input type="text" name="License_category" placeholder={!LicenseCat && "Adja meg az adatot"}
                            onChange={(e) => {
                                setLicenseCat(e.target.value);

                            }}
                        />
                    </div>

                    <div className="rightInputProfile">
                        <p>License Expiration</p>
                        <input type="text" name="License_expiraton" format="YYYY-mm-dd" placeholder={!LicenseExpiraton && "Adja meg az adatot"}
                            onChange={(e) => {
                                setLicenseExpiraton(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="containerProfile">
                    <div className="leftInputProfile">
                        <p>Phone Number</p>
                        <input type="text" name="Phone_number" placeholder={!Phone && "Adja meg az adatot"}
                            onChange={(e) => {
                                setPhone(e.target.value);

                            }}
                        />
                    </div>

                    <div className="rightInputProfile">
                        <p>Address</p>
                        <input type="text" name="address" placeholder={!Address && "Adja meg az adatot"}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
        )
        }

        <div className="BTNProfile">
            <button id="saveBTNProfile" onClick={save}>Save</button>
        </div>
    </>)
}