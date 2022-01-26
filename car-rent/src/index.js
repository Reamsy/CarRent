import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Routes , Route} from "react-router-dom";
import { Layout } from './views/layOut/layOut';

ReactDOM.render(
  <React.StrictMode>
    <Routes>
      <Layout />
        <Route exact path="/" element={<App />} />
    </Routes>
  </React.StrictMode>,
  document.getElementById('root')
);
