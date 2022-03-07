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
import { AddNewDriver } from './views/Admin/AddNewDriver';
import { CreateDriverLogin } from './views/Admin/DriverLoginCreate';
import { Driver } from './views/DriverPriv/Driver';

function App() {

  const [id, setId] = React.useState(null);

  const changeID = (newId) => {
    setId(newId);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login getID={changeID} />} />
        <Route exact path="/home" element={<Home id={id} />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/drivers" element={<Drivers />} />
        <Route exact path="/rateus" element={<RateUs />} />
        <Route exact path="/profile" element={<Profile id={id} />} />
        <Route exact path="/rent" element={<Rent />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path='/driverPrivate' element={<Driver />} />
        <Route exact path='/admin/addNewVehicle' element={<AddNewCar />} />
        <Route exact path='/admin/addNewDriver' element={<AddNewDriver />} />
        <Route exact path='/createDriverLogin' element={<CreateDriverLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
