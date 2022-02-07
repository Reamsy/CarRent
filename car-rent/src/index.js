import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Layout } from './views/layOut/layOut';
import { Products } from './views/Products/Products';
import { RateUs } from './views/RateUs/RateUs';
import { Profile } from './views/Profile/Profile';
import { Admin } from './views/Admin/Admin';




ReactDOM.render(

  <BrowserRouter>
    <Layout />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/RateUs" element={<RateUs />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
