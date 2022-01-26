import React from 'react';


//Import CSS & AOS & background
import './App.css';

//App alatt fut a HomePage
function App() {

  return (<>
    <section>
        <a href="../view/rentPage.html" id="homePageMidBtn">Rent</a>
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
