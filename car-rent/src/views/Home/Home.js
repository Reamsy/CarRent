import  Axios  from 'axios';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout } from '../layOut/layOut';


import './App.css';

export function Home() {

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