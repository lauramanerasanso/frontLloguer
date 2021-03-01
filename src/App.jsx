import React, { Component } from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js/dist/popper.js';
import Fitxa from './seccions/Fitxa';
import Principal from './seccions/Principal';
import LoginNou from './seccions/LoginNou';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import UsuariContext from './context/UsuariContext';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      iniciat: false
    };

    this.comprovarSessio = this.comprovarSessio.bind(this);
    this.tancarSessio = this.tancarSessio.bind(this);

  }

  comprovarSessio() {

    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("token", token);

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/usuari/comprovar-login',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {

        if (response.data.success === true) {

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.email);
          this.setState({ iniciat: true });

        } else {

          localStorage.removeItem("token");
          localStorage.removeItem("email");
          this.setState({ iniciat: false });

        }
      });
  };

  componentDidMount() {
    this.comprovarSessio();
  };

  iniciaSessio = (usuari, password) => {

    var bodyFormData = new FormData();
    bodyFormData.append("usuari", usuari);
    bodyFormData.append("password", password);

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/usuari/login',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {

        if (response.data.success === true) {

          this.setState({ iniciat: true });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.email);
          window.location = "/";

        } else {

          localStorage.removeItem("token");
          localStorage.removeItem("email");
          this.setState({ iniciat: false });

        }
      });
  };

  tancarSessio(){

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.setState({ iniciat: false });

  };

  render() {
    return (
      <Router>
        <UsuariContext.Provider value={this.state.iniciat}>
          <div className="App">
            <Route exact path="/" render={() => <Principal comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} />} />
            <Route exact path="/cases/:di/:df" render={() => <Principal comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} />} />
            <Route exact path="/cases/:esCercat/" render={() => <Principal comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} />} />

            <Route path="/iniciSessio" render={() => <LoginNou iniciaSessio={this.iniciaSessio} comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} />} />

            <Route path="/casa/:id" render={() => <Fitxa comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} loggeat={this.state.iniciat} />} />

          </div>
        </UsuariContext.Provider>

      </Router>


    );
  }
}

export default App;
