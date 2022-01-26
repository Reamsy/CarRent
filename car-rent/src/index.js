import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from './views/layOut/layOut';
import { Products } from './views/Products/Products';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Layout />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/Products" component={Products} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
