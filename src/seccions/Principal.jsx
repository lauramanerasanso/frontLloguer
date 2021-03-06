import React, { Component } from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js/dist/popper.js';
import '../AppCerca.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js/dist/popper.js';
import CardCasa from '../components/CardCasa';
//import CarouselCards from '../components/CarouselCards';
import NouHeader from '../components/NouHeader';
//import Cerca from '../components/Cerca';
import Footer from '../components/Footer';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import $ from 'jquery';
import Icon from '../components/Icon';
import CarouselCards from '../components/CarouselCards';
import Cerca from '../components/Cerca';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Traduccio from "../components/Traduccio";
import { Helmet } from 'react-helmet';

//import {Route, BrowserRouter, NavLink} from "react-router-dom";



class Principal extends Component {

  constructor(props) {
    super()

    console.log(props);

    this.state = {
      dataInici: '',
      dataFi: '',
      cercat: false,
      caracteristiques: [],
      show: false,
      checked: [],
      cases: []
    }

    if (props != null) {

      if (props.match.params.di != null && props.match.params.df != null) {
        this.state.dataInici = props.match.params.di;
        this.state.dataFi = props.match.params.df;
        this.state.cercat = true;
      } else if (props.match.params.esCercat == "totes") {
        this.state.cercat = true;
      }
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.filtrar = this.filtrar.bind(this);
    this.datesCerca = this.datesCerca.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.showAllCards = this.showAllCards.bind(this);
  }

  componentDidMount() {

    const { comprovarSessio } = this.props;

    comprovarSessio();

    var bodyDates = new FormData();

    bodyDates.append('dataInici', this.state.dataInici);

    bodyDates.append('dataFi', this.state.dataFi);

    let idioma = localStorage.getItem("idioma");
    bodyDates.append('idioma', idioma);

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/cases',
      data: bodyDates,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        const cases = res.data;
        this.setState({ cases: cases });
      })

    var bodyIdioma = new FormData();

    bodyIdioma.append('idioma', idioma);

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/caracteristiques/llegir',
      data: bodyIdioma,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        const caracteristiques = res.data;
        this.setState({ caracteristiques: caracteristiques });
      })

  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleChangeInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  filtrar() {
    var isCheck = [];
    $("input[type=checkbox]:checked").each(function () {
      isCheck.push($(this).val());
    });
    this.state.checked = isCheck;
    console.log(this.state.checked);

    var bodyCaract = new FormData();

    bodyCaract.append('dataInici', this.state.dataInici);

    bodyCaract.append('dataFi', this.state.dataFi);
    let idioma = localStorage.getItem("idioma");
    bodyCaract.append('idioma', idioma);

    bodyCaract.append('array', isCheck);
    console.log(bodyCaract);
    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/filtrarCaracteristiques',
      data: bodyCaract,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        const casesFiltrades = res.data;
        console.log(casesFiltrades);
        this.setState({ cases: casesFiltrades });
      })
    this.handleClose();
  }

  datesCerca() {
    console.log("mem");
    this.setState({ cercat: true });

    var bodyDates = new FormData();

    bodyDates.append('dataInici', this.state.dataInici);

    bodyDates.append('dataFi', this.state.dataFi);

    let idioma = localStorage.getItem("idioma");
    bodyDates.append('idioma', idioma);

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/cases',
      data: bodyDates,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        const cases = res.data;
        this.setState({ cases: cases });
      })
  }

  showAllCards() {
    this.setState({ cercat: true });
  }

  render() {
    return (


      <div>
        <NouHeader tancarSessio={this.props.tancarSessio} canviarLlenguatge={this.props.canviarLlenguatge} />
        {!this.state.cercat ? (
          <div>
            <Cerca funcio={this.datesCerca} canviDates={this.handleChangeInput} />
            <CarouselCards key="carouselCards" cases={this.state.cases} />
          </div>
        )
          : (
            <div>
              <Helmet>
                <title>CASES · Mallorca Rustic</title>
              </Helmet>
              <div className="container filtres">
                <div className="row ">
                  <div className="col-sm-4 btFiltres">
                    <input type="date" onChange={this.handleChangeInput} id="dataInici" name="dataInici" placeholder="Data Entrada" className="form-control col" value={this.state.dataInici} required />
                  </div>
                  <div className="col-sm-4 btFiltres">
                    <input type="date" min={this.state.dataInici} onChange={this.handleChangeInput} id="dataFi" name="dataFi" placeholder="Data Sortida" className="form-control col" value={this.state.dataFi} required />
                  </div>
                  {(this.state.dataInici == '' && this.state.dataFi == '') ?
                    <div className="col-sm-4 col-lg-2 btFiltres">
                      <Link to={"/cases/totes/"}>
                        <Button variant="primary col botoNM" onClick={this.showAllCards} onClick={this.datesCerca}>
                          <i class="fas fa-search"></i> <Traduccio string="cerca" />
                        </Button>
                      </Link>
                    </div>
                    :
                    <div className="col-sm-4 col-lg-2 btFiltres">
                      <Link to={"/cases/" + this.state.dataInici + "/" + this.state.dataFi}>
                        <Button variant="primary col botoNM" onClick={this.datesCerca}>
                          <i class="fas fa-search"></i> <Traduccio string="cerca" />
                        </Button>
                      </Link>
                    </div>
                  }
                  <div className="col-sm-4 col-lg-2 btFiltres">
                    <Button variant="outline-primary col" onClick={this.handleShow}>
                      <Traduccio string="filtres" />
                    </Button>
                  </div>
                </div>
                <div className="row col" >
                  <button className="btn eliminarFiltres" onClick={this.datesCerca}><i class="fas fa-times"></i> Elimina tots els filtres</button>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="titol"><Traduccio string="filtres" /></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <div className="row">
                        {this.state.caracteristiques.map(function (caract, index) {
                          return (
                            <div className="col-sm-6 checkboxes">
                              <input className="form-check-input" type="checkbox" key={caract.caracteristica_id} value={caract.caracteristica_id} id={caract.caracteristica_id} />
                              <label className="form-check-label" for="defaultCheck1">
                                <Icon tipo={caract.caracteristica_id - 1} /> {caract.traduccioNom}
                              </label>
                            </div>

                          );
                        })}
                      </div>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="outline-primary" onClick={this.handleClose}>
                      <Traduccio string="tancar" />
                    </Button>
                    <Button variant="primary" onClick={this.filtrar}>
                      <Traduccio string="filtrar" />
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="container">
                <div className="row cards">
                  {this.state.cases.map(function (casa, index) {
                    return (
                      <div className="col-sm-6 col-md-4 oneCard">
                        <CardCasa key={casa.id} id={casa.id} img={"https://admin.mallorcarustic.me/imatges/" + casa.img_principal} nom={casa.traduccioNom} descripcio={casa.tradDescripcio} habitacions={casa.nHabitacions} banys={casa.nBanys} />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        <Footer />
      </div>


    );
  }
}

export default withRouter(Principal);