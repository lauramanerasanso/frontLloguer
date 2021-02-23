import React, {Component} from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js/dist/popper.js';
import Fitxa from './seccions/Fitxa';
import Principal from './seccions/Principal';
import { BrowserRouter as Router, Route } from "react-router-dom";

/*
            <Route path="/cases/:id">
              <Fitxa />
            </Route>
            <Route path="/reserva">
              <Reserva />
            </Route>
            <Route path="/registre">
              <Registre />
            </Route>
            <Route path="/iniciSessio">
              <IniciSessio />
            </Route>
*/


class App extends Component {
  
  render() {
    return (
      
      <Router>
        <div className="App">
            <Route exact path="/" component={Principal}/>
            <Route exact path="/cases/:di/:df" component={Principal}/>
            <Route exact path="/cases/:esCercat/" component={Principal}/>
            <Route path="/casa/:id" component={Fitxa}/>
        </div>
      </Router>
      
    );
  }
}

export default App;
