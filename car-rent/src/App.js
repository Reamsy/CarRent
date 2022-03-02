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

function App() {
const[id, setId] = React.useState(null);
console.log("Router id: "+id)
const changeID = (newId) =>{
  setId(newId);
}
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login getID={changeID}/>} />
        <Route exact path="/home" element={<Home id={id}/>} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/drivers" element={<Drivers />} />
        <Route exact path="/rateus" element={<RateUs />} />
        <Route exact path="/profile" element={<Profile id={id}/>} />
        <Route exact path="/rent" element={<Rent />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
