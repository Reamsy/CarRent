import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Products } from './views/Vehicles/Products';
import { RateUs } from './views/RateUs/RateUs';
import { Profile } from './views/Profile/Profile';
import { Login } from './views/Login/Login';
import { Rent } from './views/Rent/Rent';
import { Drivers } from './views/Drivers/Drivers';
import { Home } from './views/Home/Home';
import { Admin } from './views/Admin/Admin';
import { AddNewCar } from './views/Admin/AddNewVehicle';
import { CreateDriverLogin } from './views/Admin/CreateDriverLogin';
import { AddNewDriver } from './views/Admin/AddNewDrivers';
import { Driver } from './views/DriverPriv/Driver';

function App() {

  const [id, setId] = React.useState(null);
  const [pushed_driver_id, setDriverID] = React.useState(null);

  const changeID = (newId) => {
    setId(newId);
  }

  const D_login_id = (gotId) => {
    setDriverID(gotId);
  }

  const isLoggedIn = !!window.localStorage.getItem('user')


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login getID={changeID} />} />
        {isLoggedIn ? <>
          <Route exact path="/home" element={<Home id={id} />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/drivers" element={<Drivers />} />
          <Route exact path="/rateus" element={<RateUs />} />
          <Route exact path="/profile" element={<Profile id={id} />} />
          <Route exact path="/rent" element={<Rent userId={id} />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path='/driverPrivate' element={<Driver />} />
          <Route exact path='/addNewVehicle' element={<AddNewCar />} />
          <Route exact path='/addNewDriver' element={<AddNewDriver pushedId={pushed_driver_id} />} />
          <Route exact path='/createDriverLogin' element={<CreateDriverLogin DriverId={D_login_id} />} />
        </> : null}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
