import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

//Import CSS 
import "./Menu.css";

export function MenuBar() {

    function ProductsDataUpdate() {

        const [products, setProducts] = useState([]);

        useEffect(() => {
            //meg kell adni a db elérési utat
            Axios.get('')
            //ide kell jönnie hogy mi történjen
            .then((response) => {
                console.log(response);
            })
            //error (lehet popup window is vagy egy alert)
            .catch(err => {
                console.log(err);
            })
              
        });
    }
    return (
        //linkek
        <nav className="ul">
            <NavLink className="navLeft" exact to='/App'>Home</NavLink>
            <NavLink className="navLeft" to='/Products'>Products</NavLink>
            <NavLink className="navLeft" to='/RateUs'>Rate Us</NavLink>
            <NavLink className="navLeft" to='/Profile'>Profile</NavLink>

            <NavLink className="navRight" to='/'>Logout</NavLink>
        </nav>
    )
}
