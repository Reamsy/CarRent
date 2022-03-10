import Axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../layOut/layOut';


import './App.css';

export function Home({ id }) {

    const navigate = useNavigate();

    useEffect(() => {
        Axios.post('http://localhost:3001/home', {
            sendId: id,
        }).then((response) => {
            if (response) {
                console.log("siker")
            }
            else {
                console.log("hiba")
            }
        });
    });

    const checkProfile = () => {
        let hiba = false;
        Axios.get(`http://localhost:3001/checkProfile/${id}`)
            .then((response) => {
                console.log(response.data[0])
                for (const value of Object.values(response.data[0]))
                    if (value === null) {
                        hiba = true;
                    }
                if (!hiba) {
                    console.log("asdasdasddas")
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

        <section>
            <button onClick={checkProfile} id="homePageMidBtnHome">Rent</button>
            <p id="home-p">At PROFILE menu option you can set your datas!</p>
            <p id="home-p">You can text us bellow</p>
        </section>
        <footer>
            <address>
                Write us: <a href="mailto:szalanics.szabolcs@gmail.com"> info@carrent.com</a>
                4400, Nyíregyháza Valami utca 1.
            </address>
        </footer>
    </>)
}