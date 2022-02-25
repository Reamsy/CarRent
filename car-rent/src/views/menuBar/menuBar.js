import React from 'react';
import { NavLink } from 'react-router-dom';

//Import CSS 
import "./Menu.css";

export function MenuBar() {


    return (
        //linkek
        <nav className="ul">
            <NavLink className="navLeft" to='/home'>Home</NavLink>
            <NavLink className="navLeft" to='/products'>Vehicles</NavLink>
            <NavLink className="navLeft" to='/drivers'>Drivers</NavLink>
            <NavLink className="navLeft" to='/rateus'>Rate Us</NavLink>
            <NavLink className="navLeft" to='/profile'>Profile</NavLink>

            <NavLink className="navRight" to='/'>Logout</NavLink>
        </nav>
    )
}
