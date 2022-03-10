import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

//Import CSS 
import "./Menu.css";

export function MenuBar() {

    const navigate = useNavigate();

    const handleLogout = () =>{
        window.localStorage.removeItem('user')
        navigate("/")
    }
    
    const isLoggedIn = !!window.localStorage.getItem('user')

    return (
        //linkek
        <nav className="ul">
            {isLoggedIn ? <>
            <NavLink className="navLeft" to='/home'>Home</NavLink>
            <NavLink className="navLeft" to='/products'>Vehicles</NavLink>
            <NavLink className="navLeft" to='/drivers'>Drivers</NavLink>
            <NavLink className="navLeft" to='/rateus'>Rate Us</NavLink>
            <NavLink className="navLeft" to='/profile'>Profile</NavLink>

            <button className="navRight" onClick={handleLogout}>Logout</button></>
            :null}
        </nav>
    )
}
