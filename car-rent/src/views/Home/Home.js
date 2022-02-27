import Axios from 'axios';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout } from '../layOut/layOut';


import './App.css';

export function Home({ id }) {

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

    return (<>
        <Layout />

        <section>
            <NavLink to="/rent" id="homePageMidBtnHome">Rent</NavLink>
            <p>You can text us bellow</p>
        </section>
        <footer>
            <address>
                Write us: <a href="mailto:szalanics.szabolcs@gmail.com"> info@carrent.com</a>
                4400, Nyíregyháza Valami utca 1.
            </address>
        </footer>
    </>)
}