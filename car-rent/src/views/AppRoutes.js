import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Products } from './Vehicles/Products';
import { RateUs } from './RateUs/RateUs';
import { Profile } from './Profile/Profile';
import { Login } from './Login/Login';
import { Rent } from './Rent/Rent';
import { Drivers } from './Drivers/Drivers';
import { Home } from './Home/Home';
import { Admin } from './Admin/Admin';
import { AddNewCar } from './Admin/AddNewVehicle';
import { CreateDriverLogin } from './Admin/CreateDriverLogin';
import { AddNewDriver } from './Admin/AddNewDrivers';
import { Driver } from './DriverPriv/Driver';
import { UserIsAdmin, UserIsDriver, UserIsUser } from './roleDecide';
import { ErrorPage } from './ErrorPage/ErrorPage';


export function AppRoutes() {

    //hook for adding new Driver
    const [pushed_driver_id, setDriverID] = React.useState(null);

    //id átadása a driverUserCreate page-ről hogy az azt követő page-en fel tudjuk vinni az adatokat db-be
    const D_login_id = (gotId) => {
        setDriverID(gotId);
    }



    const isAdmin = UserIsAdmin();
    const isDriver = UserIsDriver();
    const isUser = UserIsUser();

    return (
        <BrowserRouter>
            <Routes>

                <Route exact path="/" element={<Login />} />

                {isUser && (<>
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/products" element={<Products />} />
                    <Route exact path="/drivers" element={<Drivers />} />
                    <Route exact path="/rateus" element={<RateUs />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/rent" element={<Rent />} />
                </>)} <Route exact path='*' element={<ErrorPage />} />

                {isAdmin && (<>
                    <Route exact path="/admin" element={<Admin />} />
                    <Route exact path='/addNewVehicle' element={<AddNewCar />} />
                    <Route exact path='/addNewDriver' element={<AddNewDriver pushedId={pushed_driver_id} />} />
                    <Route exact path='/createDriverLogin' element={<CreateDriverLogin DriverId={D_login_id} />} />
                </>)} <Route exact path='*' element={<ErrorPage />} />

                {isDriver && (<>
                    <Route exact path='/driverPrivate' element={<Driver />} />
                </>)} <Route exact path='*' element={<ErrorPage />} />

            </Routes >
        </BrowserRouter >
    )
}