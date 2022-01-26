import React from 'react';

//Import CSS & AOS & background
import './App.css';
import background from './images/homePageBgImage.jpg';

//App alatt fut a HomePage
function App() {

  return (<>
    <img src={background} alt="BG" />
    <div className="section">
      <div data-aos={fade-up} data-aos-delay={400}>
        <Button className="homePageMidBtn" to="/Rent">Rent</Button>
      </div>
      <div data-aos={fade-up} data-aos-delay={500}>
        <p>You can text us bellow</p>
      </div>
    </div>
    
    <div className="footer">
      <div>
        Write us:<NavLink href="mailto:szalanics.szabolcs@gmail.com">info@carrent.com </NavLink>
                4400, Nyíregyháza Valami utca 1.
            </div>
    </div>
  </>);
}

export default App;
