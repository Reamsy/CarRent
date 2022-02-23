import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './views/Home/App';
import { Products } from './views/Vehicles/Products';
import { RateUs } from './views/RateUs/RateUs';
import { Profile } from './views/Profile/Profile';
import { Login } from './views/Login/Login';
import { Rent } from './views/Rent/Rent';
import { Drivers } from './views/Drivers/Drivers';




ReactDOM.render(

  <BrowserRouter>
    
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/app" element={<App />}/>
      <Route exact path="/products" element={<Products />} />
      <Route exact path="/drivers" element={<Drivers />} />
      <Route exactpath="/rateUs" element={<RateUs />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/rent" element={<Rent />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
