import React, { Component } from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js/dist/popper.js';
import Fitxa from './seccions/Fitxa';
import Principal from './seccions/Principal';
import LoginNou from './seccions/LoginNou';
import { BrowserRouter as Router, Route, useHistory , Redirect, withRouter} from "react-router-dom";
import UsuariContext from './context/UsuariContext';
import IdiomaContext from './context/IdiomaContext';
import Reserves from './seccions/Reserves';
import Configuracio from './seccions/Configuracio';
import SignUp from './seccions/SignUp';
import ComprovantReserva from './seccions/ComprovantReserva';
import Accessibilitat from './seccions/Accessibilitat';


class App extends Component {



  constructor(props) {
    super(props);


    this.state = {
      iniciat: false,
      error : false,
      llenguatge : "ca",

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

    if(localStorage.getItem("idioma") == undefined){
      localStorage.setItem("idioma", "ca");
      this.setState({llenguatge : "ca" });
    }else{

      const id = localStorage.getItem("idioma")

      this.setState({llenguatge : id})
    }

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
          this.props.history.goBack();


        } else {

          localStorage.removeItem("token");
          localStorage.removeItem("email");
          this.setState({ iniciat: false });
          this.setState({error : true});

        }

      });

  };

  tancarSessio(){

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.setState({ iniciat: false });
    window.location="/";

  };

  canviarLlenguatge = (id) => {
    localStorage.setItem("idioma",id);
    this.setState({
      llenguatge : localStorage.getItem("idioma")
    });
 };

  render() {
    return (


        <UsuariContext.Provider value={this.state.iniciat}>
          <IdiomaContext.Provider value={this.state.llenguatge}>

          <div className="App">
            <Route exact path="/" render={() => <Principal key={"principal-"+this.state.llenguatge} comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} canviarLlenguatge={this.canviarLlenguatge} />} />
            
            <Route exact path="/cases/:di/:df" render={() => <Principal key={"principal-"+this.state.llenguatge} comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} canviarLlenguatge={this.canviarLlenguatge} />} />
            
            <Route exact path="/cases/:esCercat/" render={() => <Principal key={"principal-"+this.state.llenguatge} comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} canviarLlenguatge={this.canviarLlenguatge} />} />

            <Route path="/iniciSessio" render={() => <LoginNou key={"Login-"+this.state.llenguatge} iniciaSessio={this.iniciaSessio} comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} error={this.state.error} canviarLlenguatge={this.canviarLlenguatge} />} />
            
            <Route path="/registre" render={() => <SignUp key={"registre-"+this.state.llenguatge} comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} canviarLlenguatge={this.canviarLlenguatge} />}/>
            
            <Route path="/casa/:id" render={() => <Fitxa key={"fitxa-"+this.state.llenguatge} comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} canviarLlenguatge={this.canviarLlenguatge} loggeat={this.state.iniciat} />} />
            
            <Route exact path="/reserves" render={() => <Reserves key={"reserves-"+this.state.llenguatge} comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} canviarLlenguatge={this.canviarLlenguatge} />} />
            
            <Route exact path="/configuracio" render={() => <Configuracio key={"conf-"+this.state.llenguatge} tancarSessio={this.tancarSessio} canviarLlenguatge={this.canviarLlenguatge} />} />
            
            <Route path="/reserva/:idCasa/:di" render={() => <ComprovantReserva key={"comprovant-"+this.state.llenguatge} comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} canviarLlenguatge={this.canviarLlenguatge}  />} />
            
            <Route exact path="/accessibilitat" render={() => <Accessibilitat key={"accessibilitat-"+this.state.llenguatge} comprovarSessio={this.comprovarSessio} tancarSessio={this.tancarSessio} canviarLlenguatge={this.canviarLlenguatge} />} />
            
          </div>

          </IdiomaContext.Provider>
        </UsuariContext.Provider>



    );
  }
}

export default withRouter(App);
