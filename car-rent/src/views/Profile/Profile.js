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
            ProfileSecondName: Email,

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
            <div className="containerProfile">

                <div className="leftInputProfile">
                    <input type="text" value={costumer.name}
                        onChange={(e) => {
                            setName(e.target.value);

                        }}
                    />
                </div>

                <div className="rightInputProfile">
                    <input type="text" value={costumer.email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
            </div>
        )}

        <div className="BTNProfile">
            <button id="saveBTNProfile" onClick={save}>Save</button>
        </div>
    </>)
}