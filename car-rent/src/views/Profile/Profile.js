import React, { useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

//Import CSS & Images
import './profilePage.css';
import driverIMG from '../../images/img_avatar.png';

export function Profile({id}) {

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

            ProfileFirstName: costumers.Fullname,
            ProfileEmail: costumers.Email,
            ProfileLicenseCat: costumers.LicenseCat,
            ProfileLicenseExpiration: costumers.LicenseExpiraton,
            ProfilePhone: costumers.Phone,
            ProfileAddress: costumers.Address,

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
                        <input type="text" name="Fullname" placeholder={!costumer.Fullname && "Adja meg az adatot"}
                            value={costumer.Fullname}
                            onChange={(e) => {
                                setCostumers({ ...costumers, [e.target.name]: e.target.value });

                            }}
                        />
                    </div>

                    <div className="rightInputProfile">
                        <p>E-mail</p>
                        <input type="text" name="email" placeholder={!costumer.email && "Adja meg az adatot"}
                            value={costumer.email}
                            onChange={(e) => {
                                setCostumers({ ...costumers, [e.target.name]: e.target.value });
                            }}
                        />
                    </div>
                </div>
                <div className="containerProfile">
                    <div className="leftInputProfile">
                        <p>License Category</p>
                        <input type="text" name="License_category" placeholder={!costumer.License_category && "Adja meg az adatot"}
                            value={costumer.License_category}
                            onChange={(e) => {
                                setCostumers({ ...costumers, [e.target.name]: e.target.value });

                            }}
                        />
                    </div>

                    <div className="rightInputProfile">
                        <p>License Expiration</p>
                        <input type="text" name="License_expiraton" format="YYYY-mm-dd" placeholder={!costumer.License_expiraton && "Adja meg az adatot"}
                            value={costumer.License_expiraton}
                            onChange={(e) => {
                                setCostumers({ ...costumers, [e.target.name]: e.target.value });
                            }}
                        />
                    </div>
                </div>

                <div className="containerProfile">
                    <div className="leftInputProfile">
                        <p>Phone Number</p>
                        <input type="text" name="Phone_number" placeholder={!costumer.Phone_number && "Adja meg az adatot"}
                            value={costumer.Phone_number}
                            onChange={(e) => {
                                setCostumers({ ...costumers, [e.target.name]: e.target.value });

                            }}
                        />
                    </div>

                    <div className="rightInputProfile">
                        <p>Address</p>
                        <input type="text" name="address" placeholder={!costumer.address && "Adja meg az adatot"}
                            value={costumer.address}
                            onChange={(e) => {
                                setCostumers({ ...costumers, [e.target.name]: e.target.value });
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