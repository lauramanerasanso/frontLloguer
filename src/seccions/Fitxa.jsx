import React, { Component } from "react";
import axios from "axios";
import "../Fitxa.css";

import NouHeader from '../components/NouHeader';
import Input from "../components/Input";
import Label from "../components/Label";
import Icon from "../components/Icon";
import Maps from "../components/Maps";
import 'popper.js/dist/popper.js';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Footer from '../components/Footer';
import { withRouter } from "react-router";
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import Traduccio from "../components/Traduccio";

import { Table } from 'react-bootstrap';

const ExampleCustomInput = ({ value, onClick }) => (
  <input className="form-control" value={value} onClick={onClick} />
);

class Fitxa extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      info: [],
      show: false,
      caract: [],
      img_principal: true,
      img_2: false,
      img_3: false,
      img_4: false,
      img_5: false,
      startDate: (sessionStorage.getItem("dataInici") != null ? new Date(sessionStorage.getItem("dataInici")) : new Date()),
      endDate: (sessionStorage.getItem("dataFi") != null ? new Date(sessionStorage.getItem("dataFi")) : new Date()),
      disableDatesArray: [],
      disableDates: [],
      preuTotal: 0,
      goReserva: false,
      dataEntrada: sessionStorage.getItem("dataInici"),
      dataSortida: sessionStorage.getItem("dataFi"),
      preuReserva: sessionStorage.getItem("preuTotal"),
      showConfirm: false,
      ds_params: "",
      ds_version: "",
      ds_signature: "",
      codiPagament : ""
    }

    if (props != null) {
      if (props.match.params.esReserva === "pagament") {
        this.state.goReserva = true;
      }
    }

    this.handleOnClick = this.handleOnClick.bind(this);
    this.calculPreu = this.calculPreu.bind(this);
    this.sessionDates = this.sessionDates.bind(this);
    this.changePantallaReserva = this.changePantallaReserva.bind(this);
    this.handleCalendarClose = this.handleCalendarClose.bind(this);
    this.anarPagament = this.anarPagament.bind(this);
    this.anarModalPagar = this.anarModalPagar.bind(this);
    this.handleClose = this.handleClose.bind(this);
  
  }

  handleClose() {
    this.setState({ showConfirm: false })
    var bodyEliminarReserva = new FormData();

    bodyEliminarReserva.append('codiPagament', this.state.codiPagament);


    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/reserva/eliminar',
      data: bodyEliminarReserva,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      const del = response.data;

      if(del !== "ERROR"){
        this.setState({codiPagament: ""});
      }
    });
  }

  componentDidMount() {

    const { comprovarSessio } = this.props;

    comprovarSessio();

    let i = this.props.match.params.id;
    let idioma = localStorage.getItem("idioma");


    var bodyFormData = new FormData();

    bodyFormData.append('id', i);
    bodyFormData.append('idioma', idioma);


    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/casa/llegir-casa',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {

        const info = response.data;

        this.setState({ info });


      });

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/casa/llegir-caract',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {

        const caract = response.data;
        //console.log(info[0].img_principal);
        this.setState({ caract });
        console.log(this.state.info);


      });

    var bodyDates = new FormData();
    bodyDates.append('id', i);

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/dates',
      data: bodyDates,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {

        const dates = response.data;

        this.setState({ disableDatesArray: dates });

        this.setState({ disableDates: this.state.disableDatesArray.map((dat) => new Date(dat)) })
      });
  }

  sessionDates() {
    sessionStorage.removeItem("dataInici");
    sessionStorage.removeItem("dataFi");

    const dataIni = this.state.startDate.getFullYear() + "-" + (this.state.startDate.getMonth() < 9 ? "0" + (this.state.startDate.getMonth() + 1) : this.state.startDate.getMonth() + 1) + "-" + (this.state.startDate.getDate() < 9 ? "0" + (this.state.startDate.getDate()) : this.state.startDate.getDate());
    const dataFini = this.state.endDate.getFullYear() + "-" + (this.state.endDate.getMonth() < 9 ? "0" + (this.state.endDate.getMonth() + 1) : this.state.endDate.getMonth() + 1) + "-" + (this.state.endDate.getDate() < 9 ? "0" + (this.state.endDate.getDate()) : this.state.endDate.getDate());

    sessionStorage.setItem("dataInici", dataIni);
    sessionStorage.setItem("dataFi", dataFini);

  }

  calculPreu() {
    let i = this.props.match.params.id;

    sessionStorage.removeItem("dataInici");
    sessionStorage.removeItem("dataFi");

    const dataIni = this.state.startDate.getFullYear() + "-" + (this.state.startDate.getMonth() < 9 ? "0" + (this.state.startDate.getMonth() + 1) : this.state.startDate.getMonth() + 1) + "-" + (this.state.startDate.getDate() < 9 ? "0" + (this.state.startDate.getDate()) : this.state.startDate.getDate());
    const dataFini = this.state.endDate.getFullYear() + "-" + (this.state.endDate.getMonth() < 9 ? "0" + (this.state.endDate.getMonth() + 1) : this.state.endDate.getMonth() + 1) + "-" + (this.state.endDate.getDate() < 9 ? "0" + (this.state.endDate.getDate()) : this.state.endDate.getDate());

    sessionStorage.setItem("dataInici", dataIni);
    sessionStorage.setItem("dataFi", dataFini);

    var bodyFormData = new FormData();

    bodyFormData.append('id', i);
    bodyFormData.append('dataInici', dataIni);
    bodyFormData.append('dataFi', dataFini);

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/dates/preuTotal',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {

        const preu = response.data;

        this.setState({ preuTotal: preu });

        sessionStorage.setItem("preuTotal", preu);
      });
  }
  
  changePantallaReserva() {

    this.calculPreu();
    this.setState({ goReserva: true })
  }

  handleOnClick(id) {

    switch (id) {
      case 'img_principal':
        this.setState({ img_principal: true });
        this.setState({ img_2: false });
        this.setState({ img_3: false });
        this.setState({ img_4: false });
        this.setState({ img_5: false });
        break;

      case 'img_2':
        this.setState({ img_principal: false });
        this.setState({ img_2: true });
        this.setState({ img_3: false });
        this.setState({ img_4: false });
        this.setState({ img_5: false });
        break;

      case 'img_3':
        this.setState({ img_principal: false });
        this.setState({ img_2: false });
        this.setState({ img_3: true });
        this.setState({ img_4: false });
        this.setState({ img_5: false });
        break;

      case 'img_4':
        this.setState({ img_principal: false });
        this.setState({ img_2: false });
        this.setState({ img_3: false });
        this.setState({ img_4: true });
        this.setState({ img_5: false });
        break;

      case 'img_5':
        this.setState({ img_principal: false });
        this.setState({ img_2: false });
        this.setState({ img_3: false });
        this.setState({ img_4: false });
        this.setState({ img_5: true });
        break;
    }
    this.setState({ show: true });
  }

  handleCalendarClose() {
    this.setState({ calendariSortidaOpen: true });
  }

  anarPagament() {

    var bodyPagament = new FormData();

    bodyPagament.append('Ds_MerchantParameters', this.state.ds_params);
    bodyPagament.append('Ds_SignatureVersion', this.state.ds_version);
    bodyPagament.append('Ds_Signature', this.state.ds_signature);

    axios({
      method: 'post',
      url: 'https://sis-t.redsys.es:25443/sis/realizarPago',
      data: bodyPagament,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {

      const dates = response.data;
      console.log(dates);

    });


  }

  anarModalPagar() {
    let i = this.props.match.params.id;

    var bodyFormData = new FormData();

    bodyFormData.append('preu_total', this.state.preuReserva);

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/pagament/generar',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      const variables = response.data;

      this.setState({ ds_params: variables["params"] });
      this.setState({ ds_version: variables["version"] });
      this.setState({ ds_signature: variables["signature"] });
      this.setState({ showConfirm: true });
    });

    var BodyInsertReserva = new FormData();

    BodyInsertReserva.append('id_casa', i);
    BodyInsertReserva.append('token', localStorage.getItem('token'));
    BodyInsertReserva.append('data_inici', this.state.dataEntrada);
    BodyInsertReserva.append('data_fi', this.state.dataSortida);
    BodyInsertReserva.append('preu_total', this.state.preuReserva);

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/reserva/inserir',
      data: BodyInsertReserva,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      const insert = response.data;

      if(insert !== "ERROR"){
        this.setState({codiPagament: insert});
      }
    });


  }

  render() {
    if (this.state.info.length > 0 && this.state.caract.length > 0) {
      return (
        <div>
          <NouHeader tancarSessio={this.props.tancarSessio}  canviarLlenguatge={this.props.canviarLlenguatge} />
          {!this.state.goReserva ?
            <div className="container fitxa">
              <Helmet>
                <title>{this.state.info[0].traduccioNom} · Mallorca Rustic</title>
              </Helmet>
              <h3 className="nom">{this.state.info[0].traduccioNom}</h3>


              <div className="row">

                <div className="col-sm-6 ">
                  <a href="#" onClick={() => this.handleOnClick("img_principal")}>
                    <img className="d-block w-100 img-fluid" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_principal} alt={this.state.info[0].tradDescripcio} />
                  </a>
                </div>
                <div className="col-sm-3">
                  <a id="img_2" onClick={() => this.handleOnClick("img_2")}>
                    <img className="d-block w-100 img-fluid" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_2} alt={this.state.info[0].tradDescripcio} />
                  </a>
                  <a id="img_3" href="#" onClick={() => this.handleOnClick("img_3")}>
                    <img className="d-block w-100 img-fluid" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_3} alt={this.state.info[0].tradDescripcio} />
                  </a>
                </div>
                <div className="col-sm-3">
                  <a id="img_4" href="#" onClick={() => this.handleOnClick("img_4")}>
                    <img className="d-block w-100 img-fluid" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_4} alt={this.state.info[0].tradDescripcio} />
                  </a>
                  <a href="#" onClick={() => this.handleOnClick("img_5")}>
                    <img className="d-block w-100 img-fluid" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_5} alt={this.state.info[0].tradDescripcio} />
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-9">
                  <h6 className="pob">{this.state.info[0].nom}, Illes Balears. </h6>
                </div>
                <div className="col-md-3">
                  <Button variant="outline-primary" className="boto" onClick={() => this.setState({ show: true })}><Traduccio string="imatges" /></Button>


                  <Modal
                    size="lg"
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg" className="titol">
                        {this.state.info[0].traduccioNom}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                          <div className={(this.state.img_principal === true ? " carousel-item active" : " carousel-item")}>
                            <img className="d-block w-100" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_principal} alt={this.state.info[0].tradDescripcio} />
                          </div>
                          <div className={(this.state.img_2 === true ? " carousel-item active" : " carousel-item")}>
                            <img className="d-block w-100" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_2} alt={this.state.info[0].tradDescripcio} />
                          </div>
                          <div className={(this.state.img_3 ? " carousel-item active" : " carousel-item")}>
                            <img className="d-block w-100" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_3} alt={this.state.info[0].tradDescripcio} />
                          </div>
                          <div className={(this.state.img_4 ? " carousel-item active" : " carousel-item")}>
                            <img className="d-block w-100" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_4} alt={this.state.info[0].tradDescripcio} />
                          </div>
                          <div className={(this.state.img_5 ? " carousel-item active" : " carousel-item")}>
                            <img className="d-block w-100" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_5} alt={this.state.info[0].tradDescripcio} />
                          </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="sr-only">Next</span>
                        </a>
                      </div>
                    </Modal.Body>
                  </Modal>

                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h5>{this.state.info[0].tradDescripcio}</h5>
                  <h6 className="serveis serv"><Traduccio string="distribucio" /></h6>
                  <div className="row">
                    <div className="col-lg-4 col-md-5">
                      <div className="borde">
                        <h6 className="localitzacio"><Traduccio string="habitacions" /></h6>
                        <i className="fas fa-bed"></i> {this.state.info[0].nHabitacions}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-5">
                      <div className="borde">
                        <h6 className="localitzacio"><Traduccio string="banys" /></h6>
                        <i className="fas fa-bath"></i> {this.state.info[0].nBanys}
                      </div>
                    </div>
                  </div>
                  <ul>
                    <h6 className="serveis serv"><Traduccio string="serveis" /></h6>
                    <div className="row">


                      {this.state.caract.map(function (caract) {
                        return (
                          <div className="col-md-6">
                            <li><Icon tipo={caract.caracteristica_id - 1} />  {caract.traduccioNom}</li>
                          </div>
                        );
                      })}

                    </div>

                  </ul>
                </div>
                <div className="col-md-6">
                  <div className="tarifes">
                    <h3 className="nom text-center"> <Traduccio string="disponible" /></h3>
                    <div className="container">
                      <div className="row">
                        <div className="col-6 dates">
                          <Label text={<Traduccio string="entrada"/>} classe="text-center" />
                          <DatePicker
                            customInput={<ExampleCustomInput />}
                            dateFormat="yyyy-MM-dd"
                            selected={this.state.startDate}
                            onChange={date => this.setState({ startDate: date, endDate: date, preuTotal: 0 })}
                            selectsStart
                            excludeDates={this.state.disableDates}
                            startDate={this.state.startDate}
                            minDate={new Date()}
                            endDate={this.state.endDate}
                            required={true}
                            withPortal
                          />

                        </div>
                        <div className="col-6 dates">
                          <Label text={<Traduccio string="sortida"/>} classe="text-center" />
                          <DatePicker
                            customInput={<ExampleCustomInput />}
                            dateFormat="yyyy-MM-dd"
                            selected={this.state.endDate}
                            onChange={date => this.setState({ endDate: date })}
                            selectsEnd
                            excludeDates={this.state.disableDates}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            minDate={this.state.startDate}
                            required={true}
                            withPortal
                          />
                        </div>
                      </div>
                      <br />
                      <hr />
                      <div className="row">

                        <div className="col-12">
                          <Button variant="outline-primary col" className="botoPreu" onClick={this.calculPreu}><Traduccio string="calcula-preu"/></Button>
                        </div>
                        <br />
                        <br />
                        <div className="col preu">
                          {(this.state.preuTotal === 0 ? "" : <><Traduccio string="preu"/>{ this.state.preuTotal + " € "}</>)}
                        </div>

                      </div>

                      <hr />
                      <div className="row">
                        {!this.props.loggeat ?
                          <div className="row col">
                            <div className="col-7"> <Traduccio string="inici-reserva"/></div>
                            <div className="col-5">
                              <Link to="/iniciSessio">
                                <Button variant="primary col" className="botoModalIniciSessió" onClick={this.sessionDates}><Traduccio string="inici-sessio"/></Button>
                              </Link>
                            </div>
                          </div>
                          :
                          <div className="col">
                            <Button variant="primary col" onClick={this.changePantallaReserva}>
                            <Traduccio string="reserva"/>
                          </Button>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <h6 className="serveis"> <Traduccio string="ubicacio"/> </h6>
                </div>
                <div className="row">
                  <h6 className="localitzacio">{this.state.info[0].nom}, Illes Balears. </h6>
                  <Maps lat={this.state.info[0].y} lng={this.state.info[0].x} />
                </div>
              </div>

            </div>
            :
            <div>
              <Helmet>
                <title> RESERVA · Mallorca Rustic</title>
              </Helmet>
              <div className="container fitxa">
                <div className="row col">
                  <Link to={"/casa/" + this.state.info[0].id}>
                    <Traduccio string="altres-dates" />
                  </Link>
                </div>
                <div className="row">
                  <div className="col">
                    <Table bordered>
                      <thead>
                        <tr>
                          <th colSpan="4"><Traduccio string="dades-reserva" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong><Traduccio string="entrada" /> : </strong>{this.state.dataEntrada}</td>
                          <td><Traduccio string="desde-hores" /></td>
                          <td><strong><Traduccio string="sortida" /> : </strong>{this.state.dataSortida}</td>
                          <td><Traduccio string="fins-hores" /></td>
                        </tr>
                        <tr>
                          <td colSpan="4"> <Traduccio string="preu" /> {this.state.preuReserva} €</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="card mb-3" >
                      <div className="row no-gutters">
                        <div className=" col-md-6 col-lg-4">
                          <img className="card-img" src={"https://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_principal} alt={this.state.info[0].tradDescripcio} />
                        </div>
                        <div className=" col-md-6 col-lg-8">
                          <div className="card-body">
                            <h5 className="card-title titol">{this.state.info[0].traduccioNom}</h5>
                            <p className="card-text"><small className="text-muted">{this.state.info[0].nom}, Illes Balears.</small></p>
                            <p className="card-text">

                              <div className="row">
                                <div className="col-6 col-md-3">
                                  <i className="fas fa-bed"></i> {this.state.info[0].nHabitacions}
                                </div>
                                <div className="col-6 col-md-3">
                                  <i className="fas fa-bath"></i> {this.state.info[0].nBanys}
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                {this.state.caract.map(function (caract) {
                                  return (
                                    <div className=" col-md-6 col-lg-3">
                                      <Icon tipo={caract.caracteristica_id - 1} />  {caract.traduccioNom}
                                    </div>
                                  );
                                })}
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 ml-auto">
                    <Button variant="primary col botoNM" onClick={this.anarModalPagar}>
                      <Traduccio string="pagar" />
                    </Button>
                  </div>
                </div>
              </div>
              <Modal show={this.state.showConfirm} onHide={this.handleClose}>
              <form name="from" action="https://sis-t.redsys.es:25443/sis/realizarPago" method="POST">
                <Modal.Body>
                  <div className="row col">
                    <Traduccio string="segur-pagar" />
                    
                      <input type="hidden" name="Ds_SignatureVersion" value={this.state.ds_version} />
                      <input type="hidden" name="Ds_MerchantParameters" value={this.state.ds_params} />
                      <input type="hidden" name="Ds_Signature" value={this.state.ds_signature} />

                      <input type="hidden" name="data_entrada" value={this.state.dataEntrada} />
                      <input type="hidden" name="data_sortida" value={this.state.dataSortida} />
                      <input type="hidden" name="id_casa" value={this.props.match.params.id} />
                      <input type="hidden" name="preu_final" value={this.state.preuReserva} />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary botoNM" onClick={this.handleClose}>
                    <Traduccio string="tancar" />
                  </Button>
                  <Button variant="primary botoNM" type="submit">
                        <Traduccio string="pagar" />
                  </Button>
                </Modal.Footer>
                </form>
              </Modal>
            </div>

          }
          <div className="footer">
            <Footer />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <NouHeader tancarSessio={this.props.tancarSessio} canviarLlenguatge={this.props.canviarLlenguatge}/>
          <div className="container fitxa nocasa">
          
            <h4><Traduccio string="nocasa" /></h4>
          </div>
        </div>
      );
    }

  }

}




export default withRouter(Fitxa);