import React, { useContext, useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import axios from 'axios';


//Import CSS & Images
import './profilePage.css';
import driverIMG from '../../images/img_avatar.png';
import { UserContext } from '../../App';

export function Profile() {

    //user lekérése
    const { user } = useContext(UserContext);

    //hook for fetching costumer data
    const [costumers, setCostumers] = useState([]);

    //hooks for fetching costumer rents and error messages
    const [personalRents, setPrersonalRents] = useState([]);

    //fetching data from db by id 
    useEffect(() => {
        axios.get(`http://localhost:3001/profile/${user.id}`)
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
            axios.put(`http://localhost:3001/save/${user.id}`, {
                findId: user.id,
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

    //request for personal rents
    useEffect(() => {
        axios.get(`http://localhost:3001/getRents/${user.id}`)
            .then((response) => {
                if (response) {
                    console.log(response.data);
                    setPrersonalRents(response.data)

                }
                else {
                    alert(response.data.message);
                }
            })
    }, [])

    //rend delete
    const DeleteRents = (RentId) => {
        axios.delete(`http://localhost:3001/rentDelete/${RentId}`)
            .then((response) => {
                if (response) {
                    alert("Deleted!")
                    window.location.reload(false)
                } else {
                    alert("Delete Error")
                }
            }).catch(console.log)
    }


    return (<>
        <Layout />
        {/*Avatar Picture */}
        <div className="container-baseProfile">
            <img id='profile-img' src={driverIMG} alt="img_avatar" />
        </div>

        {/*Info Section*/}
        <div className="containerProfile">
            <div className="leftInputProfile">
                <p>Full Name</p>
                <input className='input' type="text" name="Fullname" placeholder={!costumers.Fullname && "Fill the line"}
                    value={costumers.Fullname}
                    onChange={(e) => {
                        setCostumers({ ...costumers, [e.target.name]: e.target.value });
                    }}
                />
            </div>
            <div className="rightInputProfile">
                <p>Phone_number</p>
                <input className='input' type="tel" name="Phone_number" placeholder={!costumers.Phone_number && "Fill the line"}
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
                <input className='input' type="text" name="License_category" placeholder={!costumers.License_category && "Fill the line"}
                    value={costumers.License_category}
                    onChange={(e) => {
                        setCostumers({ ...costumers, [e.target.name]: e.target.value });
                    }}
                />
            </div>
            <div className="rightInputProfile">
                <p>License Expiration</p>
                <input className='input' type="text" name="License_expiraton" format="YYYY-mm-dd" placeholder={!costumers.License_expiraton && "Fill the line"}
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
        <div><h3 id='profileRentsTittle'>Your Rents</h3></div>
        <div className="profileRentTitle">
            <div id='UserContainerText-p'>Start of rent</div>
            <div id='UserContainerText-p'>End of rent</div>
            <div id='UserContainerText-p'>Car</div>
            <div id='UserContainerText-p'>Driver</div>
        </div>

        {personalRents.map(rents =>
            <div key={rents.id}>
                <div className="containerUser">
                    <p id="UserContainer-p">{new Date(rents.start_date).toLocaleDateString()}</p>
                    <p id="UserContainer-p">{new Date(rents.end_date).toLocaleDateString()}</p>
                    <p id="UserContainer-p">{rents.brand}</p>
                    <p id="UserContainer-p">{rents.name || "------"}</p>
                    <p><button id="deleteRents" onClick={() => { DeleteRents(rents.id) }}>Delete</button></p>
                </div>
            </div>
        )}
    </>)
}