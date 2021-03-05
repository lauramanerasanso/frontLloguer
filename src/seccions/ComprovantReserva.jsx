import React, { useState, useEffect } from "react";
import axios from 'axios';
import { withRouter } from 'react-router';
import NouHeader from '../components/NouHeader';
import { Table } from 'react-bootstrap';
import Pdf from "react-to-pdf";
import Traduccio from "../components/Traduccio";
import '../Fitxa.css';

const ref = React.createRef();

function ComprovantReserva(props) {

  const { comprovarSessio } = props;

  const id = props.match.params.idCasa;
  const dataInici = props.match.params.di;

  let idioma = localStorage.getItem("idioma");

  const [list, setList] = useState([]);

  useEffect(() => {
    var bodyFormData = new FormData();

    bodyFormData.append('id', id);
    bodyFormData.append('idioma', idioma);
    bodyFormData.append('data_inici', dataInici);

    axios({
      method: 'post',
      url: 'https://api.mallorcarustic.me/reserva/informacio',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        setList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);


  return (
    <div>
      <NouHeader tancarSessio={props.tancarSessio} canviarLlenguatge={props.canviarLlenguatge} />
      <div className=" container fitxa">
        <Pdf targetRef={ref} options={{orientation: 'landscape'}} filename="reserva.pdf">
          {({ toPdf }) => <button className="btn btn-primary" onClick={toPdf}><Traduccio string="descarrega" /></button>}
        </Pdf>
        <div className="mt-3">
          <hr/>
          <div ref={ref}>
            <div className="container ">
              <div className="row mt-3">
                <div className="col">
                <Table bordered>
                    <thead>
                      <tr>
                        <th colSpan="4"><Traduccio string="dades-reserva" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong><Traduccio string="entrada" /> : </strong>{list[0]?.entrada}</td>
                        <td><Traduccio string="desde-hores" /></td>
                        <td><strong><Traduccio string="sortida" /> : </strong>{list[0]?.sortida}</td>
                        <td><Traduccio string="fins-hores" /></td>
                      </tr>
                      <tr>
                        <td colSpan="4"> <Traduccio string="preu" /> {list[0]?.preu_final} €</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                <Table bordered>
                    <thead>
                    <tr>
                        <th> DADES DE LA CASA </th>
                        <th> DADES DEL CLIENT </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td> 
                          <h2> {list[0]?.traduccioNom} </h2>
                          <h5> {list[0]?.tradDescripcio} </h5>
                          <h5><small> {list[0]?.nom}, Illes Balears. </small></h5>
                        </td>
                        <td>
                          <h5> {list[0]?.DNI} </h5>
                          <h5> {list[0]?.email} </h5>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ComprovantReserva);