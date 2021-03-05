import React, { Component } from "react";
import NouHeader from '../components/NouHeader';
import Footer from '../components/Footer';
import Traduccio from "../components/Traduccio";
import axios from 'axios';
import "../Reserves.css";
import CardReserva from "../components/CardReserva";
import Item from "../components/Label";

class Reserves extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            info: [],
            info_proxim:[],
            carregant: false,
            espera: "",
            iniciat: false,
            token: ""
           


        };

    }


    getDate = () => {
        var date = new Date().toISOString().split('T')[0];
        this.setState({ dia : date });
    };

    componentDidMount() {

        
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
                    this.setState({ espera: "OK" });
                    this.setState({ token: response.data.token })


                } else {

                    localStorage.removeItem("token");
                    localStorage.removeItem("email");
                    this.setState({ iniciat: false });
                    window.location = "/";


                }

            });

        this.setState({ carregant: true });

        var bodyRes = new FormData();
        var date = new Date().toISOString().split('T')[0];
     

        bodyRes.append("token", token);
        bodyRes.append("idioma", "ca");
        bodyRes.append("data", date);

        axios({
            method: 'post',
            url: 'https://api.mallorcarustic.me/client/proximes-reserves',
            data: bodyRes,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                this.setState({ info_proxim: response.data });
               

            });


        var bodyReserves = new FormData();

        bodyReserves.append("token", token);
        bodyReserves.append("idioma", "ca");
        bodyReserves.append("data", date);

        axios({
            method: 'post',
            url: 'https://api.mallorcarustic.me/client/reserves',
            data: bodyReserves,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                this.setState({ info: response.data });
                this.setState({ carregant: false });

            });



    };

    render() {

        if (this.state.carregant) {
            return <p>Carregant ...</p>;
        }
        if (this.state.espera.length > 0) {
            if (this.state.iniciat) {
                return (
                    <div>
                        <NouHeader tancarSessio={this.props.tancarSessio} canviarLlenguatge={this.props.canviarLlenguatge} />
                        <div className="container reserves">
                            {this.state.info_proxim < 1 && this.state.info < 1 && <h4 className="titol"><Traduccio string="no-reserves"/></h4>}
                        <h4 className="meves"> {this.state.info_proxim.length > 0 ? <Traduccio string="proximes-res"/> : ""}</h4>
                            {this.state.info_proxim.map(function (item, key) {
                                    return (
                                        <CardReserva key={key} id={item.casa_id} descripcio={item.tradDescripcio} nom={item.traduccioNom} entrada={item.entrada} sortida={item.sortida} preu={item.preu_final} pob={item.nom} inici={item.data_inici}/>                                         
                                       
                                    )
                                })}
                            <h4 className="meves mt-5 mb-4"> {this.state.info.length > 0 ? <Traduccio string="anteriors-res" /> :" "} </h4>
                            {this.state.info.map(function (item, key) {
                                    return (
                                        <CardReserva key={key} id={item.casa_id} descripcio={item.tradDescripcio} nom={item.traduccioNom} entrada={item.entrada} sortida={item.sortida} preu={item.preu_final} pob={item.nom} inici={item.data_inici}/>                                         
                                       
                                    )
                                })}
                            
                        </div>
                        <Footer />
                    </div>
                );

            } else {
                return (
                    <div>
                        <NouHeader />
                    </div>
                );
            }

        } else {
            return (
                <div>
                    <NouHeader />
                </div>
            );
        }
    }

}

export default Reserves;