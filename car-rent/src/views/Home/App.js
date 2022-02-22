import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../layOut/layOut';

//Import CSS & AOS & background
import './App.css';



//App alatt fut a HomePage
function App() {

  return (<>

    <Layout />

    <section>
      <Link to="./rent" id="homePageMidBtnHome">Rent</Link>
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
