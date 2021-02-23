import React, { Component } from "react";
import axios from "axios";
import "../Fitxa.css";

import Header from '../components/Header';
import Input from "../components/Input";
import Label from "../components/Label";
import Icon from "../components/Icon";
import Maps from "../components/Maps";
import 'popper.js/dist/popper.js';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Footer from '../components/Footer';



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
    }

    this.handleOnClick = this.handleOnClick.bind(this);

  }

  componentDidMount() {

    let i = this.props.match.params.id;


    var bodyFormData = new FormData();

    bodyFormData.append('id', i);
    bodyFormData.append('idioma', 'CA');


    axios({
      method: 'post',
      url: 'http://api.mallorcarustic.me/casa/llegir-casa',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {

        const info = response.data;
        //console.log(info[0].img_principal);
        this.setState({ info });
        // console.log(this.state.info[0].img_principal);

      });

    axios({
      method: 'post',
      url: 'http://api.mallorcarustic.me/casa/llegir-caract',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {

        const caract = response.data;
        //console.log(info[0].img_principal);
        this.setState({ caract });
        console.log(this.state.info);


      });


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


  render() {


    if (this.state.info.length > 0 && this.state.caract.length > 0) {
      return (
        <div>
          <Header />
          <div className="container fitxa">

            <h3 className="nom">{this.state.info[0].traduccioNom}</h3>


            <div className="row">

              <div className="col-sm-6 ">
                <a href="#" onClick={() => this.handleOnClick("img_principal")}>
                  <img className="d-block w-100 img-fluid" src={"http://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_principal} alt={this.state.info[0].tradDescripcio} />
                </a>
              </div>
              <div className="col-sm-3">
                <a id="img_2" onClick={() => this.handleOnClick("img_2")}>
                  <img className="d-block w-100 img-fluid" src={"http://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_2} alt={this.state.info[0].tradDescripcio} />
                </a>
                <a id="img_3" href="#" onClick={() => this.handleOnClick("img_3")}>
                  <img className="d-block w-100 img-fluid" src={"http://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_3} alt={this.state.info[0].tradDescripcio} />
                </a>
              </div>
              <div className="col-sm-3">
                <a id="img_4" href="#" onClick={() => this.handleOnClick("img_4")}>
                  <img className="d-block w-100 img-fluid" src={"http://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_4} alt={this.state.info[0].tradDescripcio} />
                </a>
                <a href="#" onClick={() => this.handleOnClick("img_5")}>
                  <img className="d-block w-100 img-fluid" src={"http://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_5} alt={this.state.info[0].tradDescripcio} />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9">
                <h6 className="pob">{this.state.info[0].nom}, Illes Balears. </h6>
              </div>
              <div className="col-md-3">
                <Button variant="outline-primary" className="boto" onClick={() => this.setState({ show: true })}>Veure totes les Imatges</Button>


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
                          <img className="d-block w-100" src={"http://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_principal} alt={this.state.info[0].tradDescripcio} />
                        </div>
                        <div className={(this.state.img_2 === true ? " carousel-item active" : " carousel-item")}>
                          <img className="d-block w-100" src={"http://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_2} alt={this.state.info[0].tradDescripcio} />
                        </div>
                        <div className={(this.state.img_3 ? " carousel-item active" : " carousel-item")}>
                          <img className="d-block w-100" src={"http://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_3} alt={this.state.info[0].tradDescripcio} />
                        </div>
                        <div className={(this.state.img_4 ? " carousel-item active" : " carousel-item")}>
                          <img className="d-block w-100" src={"http://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_4} alt={this.state.info[0].tradDescripcio} />
                        </div>
                        <div className={(this.state.img_5 ? " carousel-item active" : " carousel-item")}>
                          <img className="d-block w-100" src={"http://admin.mallorcarustic.me/imatges/" + this.state.info[0].img_5} alt={this.state.info[0].tradDescripcio} />
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
                <h6 className="serveis serv"> Distribució</h6>
                <div className="row">
                  <div className="col-lg-4 col-md-5">
                    <div className="borde">
                      <h6 className="localitzacio">Habitacions</h6>
                      <i className="fas fa-bed"></i> {this.state.info[0].nHabitacions}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5">
                    <div className="borde">
                      <h6 className="localitzacio">Banys</h6>
                      <i className="fas fa-bath"></i> {this.state.info[0].nBanys}
                    </div>
                  </div>
                </div>
                <ul>
                  <h6 className="serveis serv"> Serveis </h6>
                  <div className="row">


                    {this.state.caract.map(function (caract) {
                      return (
                        <div className="col-md-6">
                          <li><Icon tipo={caract.caracteristica_id - 1} />  {caract.traduccioNom}</li>
                        </div>
                      );
                    })

                    }
                  </div>

                </ul>
              </div>
              <div className="col-6">
                <div className="tarifes">
                  <h3 className="nom text-white text-center"> Tarifes</h3>
                  <div className="container">
                    <div className="row">
                      <div className='col-6'>
                        <Label text="Data Inici" classe="text-white text-center" />
                        <Input
                          atributs={{
                            name: 'dataInici',
                            inputType: 'date',
                            ph: ''

                          }}
                          handleChange={this.handleChange} />
                      </div>
                      <div className='col-6'>
                        <Label text="Data Fi" classe="text-white text-center" />
                        <Input
                          atributs={{
                            name: 'dataFi',
                            inputType: 'date',
                            ph: ''

                          }}
                          handleChange={this.handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <h6 className="serveis"> Ubicació </h6>
              </div>
              <div className="row">
                <h6 className="localitzacio">{this.state.info[0].nom}, Illes Balears. </h6>
                <Maps lat={this.state.info[0].y} lng={this.state.info[0].x} />
              </div>
            </div>

          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>



      );
    } else {
      return (
        <div>
          <Header />
        </div>
      );
    }

  }

}




export default Fitxa;