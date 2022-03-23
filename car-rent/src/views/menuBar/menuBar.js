import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { UserIsUser, userIsUser } from '../roleDecide';

//Import CSS 
import "./Menu.css";

export function MenuBar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        navigate("/")
    }


    const isUser = UserIsUser();

    return (
        //linkek
        <nav className="ul">
            {isUser && (<>
                <NavLink className="navLeft" to='/home'>Home</NavLink>
                <NavLink className="navLeft" to='/products'>Vehicles</NavLink>
                <NavLink className="navLeft" to='/drivers'>Drivers</NavLink>
                <NavLink className="navLeft" to='/rateus'>Rate Us</NavLink>
                <NavLink className="navLeft" to='/profile'>Profile</NavLink>

                <button className="navRight" id="navButton" onClick={handleLogout}>Logout</button>
            </>)}
        </nav>
    )
}
