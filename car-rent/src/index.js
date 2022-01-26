import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './views/layOut/layOut';
import { Products } from './views/Products/Products';
import { RateUs } from './views/RateUs/RateUs';
import { Profile } from './views/Profile/Profile';



ReactDOM.render(
  <BrowserRouter>
      <Layout />
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/RateUs" element={<RateUs />} /> 
          <Route path="/Profile" element={<Profile />} /> 
        </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
