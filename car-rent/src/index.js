import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Products } from './views/Products/Products';
import { RateUs } from './views/RateUs/RateUs';
import { Profile } from './views/Profile/Profile';
import { Login } from './views/Login/Login';
import { Rent } from './views/Rent/Rent';




ReactDOM.render(

  <BrowserRouter>
    
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/App" element={<App />}/>
      <Route path="/Products" element={<Products />} />
      <Route path="/RateUs" element={<RateUs />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Rent" element={<Rent />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
