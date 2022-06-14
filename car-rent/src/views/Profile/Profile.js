import React, { useContext, useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import axios from 'axios';
import { UserContext } from '../../App';

import avatar from "../../images/img_avatar.png"
import { Table } from 'semantic-ui-react';

export function Profile() {

    //avatar


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
                    alert("Save Succes");
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


        <div className='container'>
            {/*Avatar Picture & Title*/}
            <div className='row d-flex justify-content-center pt-5'>
                <img className='roundedCircle' id='avatar' src={avatar} alt="img_avatar" />
            </div>




            {/*Info Section*/}
            <div className='row text-center'>
                <div className="container col-lg-6 col-md-6 col-sm-12">
                    <p className='text-center'>Full Name</p>
                    <input className='form-control' type="text" name="Fullname" placeholder={!costumers.Fullname && "Fill the line"}
                        value={costumers.Fullname}
                        onChange={(e) => {
                            setCostumers({ ...costumers, [e.target.name]: e.target.value });
                        }}
                    />
                </div>
                <div className="container col-lg-6 col-md-6 col-sm-12">
                    <p className='text-center'>Phone_number</p>
                    <input className='form-control' type="tel" name="Phone_number" placeholder={!costumers.Phone_number && "Fill the line"}
                        value={costumers.Phone_number}
                        onChange={(e) => {
                            setCostumers({ ...costumers, [e.target.name]: e.target.value });
                        }}
                    />
                </div>
            </div>

            <div className="row text-center">
                <div className="container col-lg-6 col-md-6 col-sm-12">
                    <p>License Category</p>
                    <input className='form-control' type="text" name="License_category" placeholder={!costumers.License_category && "Fill the line"}
                        value={costumers.License_category}
                        onChange={(e) => {
                            setCostumers({ ...costumers, [e.target.name]: e.target.value });
                        }}
                    />
                </div>
                <div className="container col-lg-6 col-md-6 col-sm-12">
                    <p>License Expiration</p>
                    <input className='form-control' type="text" name="License_expiraton" format="YYYY-mm-dd" placeholder={!costumers.License_expiraton && "Fill the line"}
                        value={costumers.License_expiraton}
                        onChange={(e) => {
                            setCostumers({ ...costumers, [e.target.name]: e.target.value });
                        }}
                    />
                </div>
            </div>

            <div className="row mt-5 d-flex justify-content-center">
                <button className='btn btn-primary' id="btn" onClick={save}>Save</button>
            </div>



            {/*List of rents*/}

            <div className='row text-center'>
                <h3 className='mt-5'>Your Rents</h3>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr className='text-light text-center'>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Car</th>
                        <th>Driver</th>
                        <th className='text-danger'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        personalRents.map(rents =>
                            <tr className='text-light text-center' key={rents.id}>
                                <td>{new Date(rents.start_date).toLocaleDateString()}</td>
                                <td>{new Date(rents.end_date).toLocaleDateString()}</td>
                                <td>{rents.brand}</td>
                                <td>{rents.name || "------"}</td>
                                <td><button className='btn btn-danger' onClick={() => { DeleteRents(rents.id) }}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    </>)
}