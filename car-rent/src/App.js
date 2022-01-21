import logo from './logo.svg';
import './App.css';
import { homePage } from './views/homePage/homePage';


function App() {
  return (
    <Router>
      {/*Sablon*/}
      <Layout>
        <Switch>
          {/*Kezdőlap*/}
          <Router exact path="/">
            <homePagege />
          </Router>

        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
