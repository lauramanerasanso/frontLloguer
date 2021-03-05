import React, { Component } from "react";
import NouHeader from '../components/NouHeader';
import Footer from '../components/Footer';
import Traduccio from "../components/Traduccio";
import contacte from "../imatges/contacte_final.png"
import tel from "../imatges/tel.png"
import email from "../imatges/email.png"
import "../Contacte.css";
import axios from 'axios';

class Contacte extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            tel: "",
            email: ""

        };



    }

    componentDidMount() {

        const { comprovarSessio } = this.props;

        comprovarSessio();

        axios({
            method: 'post',
            url: 'http://api.home/propietari',
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                const info = response.data;

                this.setState({ tel: info[0].telefon });
                this.setState({ email: info[0].email });


            });


    }


    render() {

        return (
            <div>
                <NouHeader tancarSessio={this.props.tancarSessio} canviarLlenguatge={this.props.canviarLlenguatge} />
                <div className="contacte" style={{ backgroundImage: "url(" + contacte + ")", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                    <h1 className="text-white titol text-center cont"><Traduccio string="contacte"/></h1>
                </div>
                <div className="container inform">
                    <div className="row bordes">
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-3">
                                    <img src={tel} alt="telefono" width="100px" />
                                </div>
                                <div className="col-lg-9">
                                    <h5 className="tema"><Traduccio string="cridada"/> </h5>
                                    <h6 className="horari"><Traduccio string="horari"/></h6>
                                    <h6 className="horari"><Traduccio string="tel"/><strong> :  {this.state.tel}</strong></h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-3">
                                    <img src={email} className="email" alt="email" width="100px" />
                                </div>
                                <div className="col-lg-9">
                                    <h5 className="tema"><Traduccio string="correu"/> </h5>
                                    <h6 className="horari">E-mail : <strong>  {this.state.email}</strong></h6>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer/>

            </div>
        );


    }

}

export default Contacte;