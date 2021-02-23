import React, {Component} from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import '../AppCerca.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js/dist/popper.js';
import CardCasa from '../components/CardCasa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import queryString from 'query-string';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';



class ResultatCerca extends Component {

  constructor(props){
    super();

    this.state = {
      cases: [],
      caracteristiques: [],
      show: false,
      checked: []
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.filtrar = this.filtrar.bind(this);
  }

  handleShow(){
    this.setState({show: true });
  }

  handleClose(){
    this.setState({show: false });
  }

  filtrar(){
    var isCheck = [];
    $("input[type=checkbox]:checked").each(function () {
      isCheck.push($(this).val());
    });
    this.state.checked= isCheck;
    console.log(this.state.checked);

    var bodyCaract = new FormData();

    bodyCaract.append('dataInici', '' );

    bodyCaract.append('dataFi', '' ); 

    bodyCaract.append('array', isCheck );
    console.log(bodyCaract);
    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/filtrarCaracteristiques',
      data: bodyCaract,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        const casesFiltrades = res.data;
        console.log(casesFiltrades);
        this.setState({ cases: casesFiltrades });
    })
    this.handleClose();
  }

  componentDidMount() {
    var bodyDates = new FormData();

    bodyDates.append('dataInici', '' );

    bodyDates.append('dataFi', '' ); 

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/cases',
      data: bodyDates,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        const cases = res.data;
        this.setState({ cases: cases });
    })
    
    var bodyIdioma = new FormData();

    bodyIdioma.append('idIdioma', 'CA' );

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/caracteristiques/llegir',
      data: bodyIdioma,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        const caracteristiques = res.data;
        this.setState({ caracteristiques: caracteristiques });
    })

  }
  
  render() {
    return (
      <div>
        <div className="container filtres">
          <div className="row">
            <input type="date" onChange={this.handleChangeInput} id="dataInici" name="dataInici" placeholder="Data Entrada" className="form-control col-md-5" />
            <input type="date" onChange={this.handleChangeInput} id="dataFi" name="dataFi" placeholder="Data Sortida" className="form-control col-md-5" />

            <button className="btn btn-primary"> Cerca </button>
          
          <Button variant="outline-primary" onClick={this.handleShow}>
            Filtres
          </Button>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Filtres</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <div className="row">
                  {this.state.caracteristiques.map( function (caract, index){
                      return (
                        <div className="col-sm-6 checkboxes">
                          <input className="form-check-input" type="checkbox" key={caract.caracteristica_id} value={caract.caracteristica_id} id={caract.caracteristica_id} />
                          <label className="form-check-label" for="defaultCheck1">
                            <Icon tipo={caract.caracteristica_id - 1}/> {caract.traduccioNom}
                          </label>
                        </div>
                        
                      );
                  })}
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Tanca
              </Button>
              <Button variant="primary" onClick={this.filtrar}>
                Filtra
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="container">
          <div className="row cards">
            {this.state.cases.map( function (casa, index){
                return (
                  <div className="col-sm-6 col-md-4 oneCard">
                      <CardCasa key={casa.id} img={"http://admin.mallorcarustic.me/imatges/"+casa.img_principal} nom={casa.traduccioNom} descripcio={casa.tradDescripcio} habitacions={casa.nHabitacions} banys={casa.nBanys}/>
                  </div>
                );
            })}
          </div>
        </div>
                                
      </div>
    );
  }
}

export default ResultatCerca;