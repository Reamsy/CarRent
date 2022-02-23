import React, { useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import Axios from 'axios';

//Import CSS & Images
import './profilePage.css';
import driverIMG from '../../images/img_avatar.png';

export function Profile() {

    //hooks for data
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [LicenseCat, setLicenseCat] = useState("");
    const [LicenseExpiraton, setLicenseExpiraton] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");

    //hook for fetching
    const [costumers, setCostumers] = useState([]);

    //fetching data from db
    useEffect(() => {
        Axios.get('http://localhost:3001/profile')
            .then((response) => {
                if (response) {
                    setCostumers(response.data);
                }
                else {
                    alert("Datas currently unavailable!")
                }
            });
    });



    //sending inputs data to node
    const save = () => {
        Axios.post('http://localhost:3001/save', {

            ProfileFirstName: Name,
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
            <div key={costumer.id}>
                <div className="containerProfile">
                    <div className="leftInputProfile">
                        <p>Full Name</p>
                        <input type="text" value={costumer.Fullname}
                            onChange={(e) => {
                                setName(e.target.value);

                            }}
                        />
                    </div>

                    <div className="rightInputProfile">
                        <p>E-mail</p>
                        <input type="text" value={costumer.email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="containerProfile">
                    <div className="leftInputProfile">
                        <p>License Category</p>
                        <input type="text" value={costumer.License_category}
                            onChange={(e) => {
                                setLicenseCat(e.target.value);

                            }}
                        />
                    </div>

                    <div className="rightInputProfile">
                        <p>License Expiration</p>
                        <input type="text" format="YYYY-mm-dd" value={costumer.License_expiraton}
                            onChange={(e) => {
                                setLicenseExpiraton(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="containerProfile">
                    <div className="leftInputProfile">
                        <p>Phone Number</p>
                        <input type="text" value={costumer.Phone_number}
                            onChange={(e) => {
                                setPhone(e.target.value);

                            }}
                        />
                    </div>

                    <div className="rightInputProfile">
                        <p>Address</p>
                        <input type="text" value={costumer.address}
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