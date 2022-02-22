import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout } from '../layOut/layOut';

//Import CSS & AOS & background
import './App.css';



//App alatt fut a HomePage
function App() {

  return (<>

    <Layout />

    <section>
      <NavLink to="/rent" id="homePageMidBtnHome">Rent</NavLink>
      <p>You can text us bellow</p>
    </section>
    <footer>
      <address>
        Write us: <a href="mailto:szalanics.szabolcs@gmail.com"> info@carrent.com</a>
        4400, Nyíregyháza Valami utca 1.
      </address>
    </footer>
  </>);
}

export default App;
