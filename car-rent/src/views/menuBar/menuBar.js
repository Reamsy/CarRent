import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserIsUser } from '../roleDecide';

export function MenuBar() {

    const navigate = useNavigate();

    //logout
    const handleLogout = () => {
        window.localStorage.removeItem('user')
        navigate("/")
    }

    //NavBar Collapse
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    //checkForUser
    const isUser = UserIsUser();

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">

            {isUser && (<>

                <div className="container-fluid">

                    <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#NavBar" aria-controls="NavBar" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="NavBar">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/home' > Home</NavLink >
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/products'>Vehicles</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/drivers'>Drivers</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/rateus'>Rate</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/profile'>Profile</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </>)
            }
        </nav>
    )
}
