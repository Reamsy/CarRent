import logo from './logo.svg';
import './App.css';
import {menuBar} from './views/homePage/menuBar';

function App() {
  return (
    <Router>
      {/*Sablon*/}
      <Layout>
        <Switch>
          {/*Kezdőlap*/}
          <Router exact path="/">
            <menuBar />
          </Router>

        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
