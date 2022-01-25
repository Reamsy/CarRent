import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from './views/layOut/layOut';
import { HomePage } from './views/homePage/HomePage';

//Import CSS 
import './App.css';



function App() {
  return (
    <Router>
      {/*Sablon*/}
      <Layout>
        {/*Kezdőlap*/}
        <Route>
          <HomePage />
        </Route>
      </Layout>
    </Router>
  );
}

export default App;
