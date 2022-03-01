import React, { useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import Axios from 'axios';

//Import CSS & Images
import './profilePage.css';
import driverIMG from '../../images/img_avatar.png';

export function Profile({ id }) {

    //hook for fetching
    const [costumers, setCostumers] = useState([]);
    const [Name, setName] = useState();
    const [Email, setEmail] = useState();
    const [LicenseCat, setLicenseCat] = useState();
    const [LicenseExp, setLicenseExp] = useState();
    const [Phone, setPhone] = useState();

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
        Axios.put(`http://localhost:3001/save/${id}`, {
            findId: id,
            ProfileName: Name,
            ProfileEmail: Email,
            ProfileLicenseCat: LicenseCat,
            ProfileLicenseExp: LicenseExp,
            ProfilePhone: Phone,

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
                        <input type="text" placeholder={costumer.Fullname}
                            onChange={(e) => { setName(e.target.value) }} />

                    </div>
                    <div className="rightInputProfile">
                        <p>E-mail</p>
                        <input type="text" placeholder={costumer.email}
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                </div>
                <div className="containerProfile">
                    <div className="leftInputProfile">
                        <p>License Category</p>
                        <input type="text" placeholder={costumer.License_category}
                            onChange={(e) => { setLicenseCat(e.target.value) }} />

                    </div>
                    <div className="rightInputProfile">
                        <p>License Expiration</p>
                        <input type="text" placeholder={costumer.License_expiraton}
                            onChange={(e) => { setLicenseExp(e.target.value) }} />
                    </div>
                </div>
                <div className="containerProfile">
                    <div className="leftInputProfile">
                        <p>Phone_number</p>
                        <input type="tel" placeholder={costumer.Phone_number}
                            onChange={(e) => { setPhone(e.target.value) }} />
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