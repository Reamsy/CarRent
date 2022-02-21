import React from 'react';
import { NavLink } from 'react-router-dom';

//Import CSS 
import "./Menu.css";

export function MenuBar() {


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
