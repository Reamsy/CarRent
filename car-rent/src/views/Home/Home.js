import Axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { Layout } from '../layOut/layOut';


export function Home() {

    //user lekérése
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (user.id != null) {
            Axios.post('http://localhost:3001/home', {
                sendId: user.id,
            }).then((response) => {
                if (response) {
                    console.log(".");
                }
            });
        }
    });


    const checkProfile = () => {
        let hiba = false;
        Axios.get(`http://localhost:3001/checkProfile/${user.id}`)
            .then((response) => {
                for (const value of Object.values(response.data[0]))
                    if (value === null) {
                        hiba = true;
                    }
                if (!hiba) {
                    navigate('/rent');
                }
                else {
                    alert("Fill profile datas")
                    navigate("/profile");
                }
            })
    }

    return (<>
        <Layout />

        <div className='container'>

            <div className='row text-center pb-5 pt-5 mb-5 mt-5'>
                <p id="home-p ">At PROFILE menu option you can set your datas!</p>
            </div>
            <div className='row text-center mb-5 pb-5'>
                <p id="home-p">You can text us bellow</p>
            </div>

            <div className='row mt-5 pt-5 d-flex justify-content-center'>
                <button className='btn btn-primary' id="btn" onClick={checkProfile}>Rent</button>
            </div>


            <div className='row text-center' >
                <nav className='fixed-bottom'>
                    <address className='text-light'>
                        Write us: <a class="text-light" href="mailto:szalanics.szabolcs@gmail.com"> info@carrent.com</a>
                        <br></br>
                        4400, Nyíregyháza Valami utca 1.
                    </address>
                </nav>
            </div>
        </div>
    </>)
}