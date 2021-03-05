import React, { Component } from "react";
import NouHeader from '../components/NouHeader';
import Footer from '../components/Footer';
import Traduccio from "../components/Traduccio";
import axios from 'axios';
import "../Login.css";
import Label from "../components/Label";
import $ from 'jquery';
import 'popper.js/dist/popper.js';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

class Configuracio extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            carregant: false,
            espera: "",
            iniciat: false,
            token: "",
            password_actual: "",
            password_nova: "",
            show_ok: false,
            show_error: false,
            error_pass: false

        };

        this.canviarPass = this.canviarPass.bind(this);

    }



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



    };

    handleChange(name, value) {
        switch (name) {
            case 'password-nova':
                this.setState({ password_nova: value });
                if (value.length == 0) {
                    this.setState({ error_pass: false });
                } else if (value.length < 6) {
                    this.setState({ error_pass: true });
                    this.setState({ show_error: false });
                } else if (value.length >= 6) {

                    this.setState({ error_pass: false });
                }

                break;
            case 'password-actual':

                this.setState({ password_actual: value });
                break;
            default:
                console.log('no hay valores')
        }



    }

    canviarPass() {

        if (this.state.password_nova.length >= 6) {

            var bodyCanviar = new FormData();
            bodyCanviar.append("actual", this.state.password_actual);
            bodyCanviar.append("nova", this.state.password_nova);
            bodyCanviar.append("token", this.state.token);

            axios({
                method: 'post',
                url: 'https://api.mallorcarustic.me/client/canviar-password',
                data: bodyCanviar,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(response => {

                    if (response.data.success === true) {

                        this.setState({ show_ok: true });
                        this.setState({ show_error: false });
                        this.setState({ error_pass: false });

                    } else {

                        this.setState({ show_error: true });
                        this.setState({ error_pass: false });

                    }

                });

        }else{
            this.setState({ error_pass: true});
        }

    }

    mostarContrasenya1() {
        let x = document.getElementById("password_actual");

        if (x.type === "password") {
            x.type = "text";

            $("#ull").attr('class', "fa fa-eye-slash");


        } else {

            x.type = "password";

            $("#ull").attr('class', "fas fa-eye");


        }

    }

    mostarContrasenya2() {
        let y = document.getElementById("password_nova");

        if (y.type === "password") {
            y.type = "text";

            $("#ull2").attr('class', "fa fa-eye-slash");


        } else {

            y.type = "password";

            $("#ull2").attr('class', "fas fa-eye");


        }

    }




    render() {

        if (this.state.carregant) {
            return <p>Carregant ...</p>;
        }
        if (this.state.espera.length > 0) {
            if (this.state.iniciat) {
                return (
                    <div>
                        <NouHeader tancarSessio={this.props.tancarSessio} canviarLlenguatge={this.props.canviarLlenguatge} />
                        <div className="container login">
                            <h3 className='titol mb-4 text-center'><Traduccio string="conf" /></h3>
                            <div className="container">

                                <div className="row">
                                    <div className="col-md-4 col-sm-6 offset-md-2">
                                        <div className="form-group">

                                            <Label text={<Traduccio string="pas-actual" />} per="password-actual" classe="label" />

                                            <div class="input-group text-center">

                                                <input type="password" name="password-actual" className="form-control" id="password_actual" onChange={(e) => this.handleChange(e.target.name, e.target.value)} required />
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text" onClick={this.mostarContrasenya1}> <i id="ull" className="fas fa-eye"></i></div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="col-md-4 col-sm-6">
                                        <div className="form-group">

                                            <Label text={<Traduccio string="pas-nova" />} per="password-nova" classe="label" />

                                            <div class="input-group text-center">

                                                <input type="password" name="password-nova" className="form-control" id="password_nova" onChange={(e) => this.handleChange(e.target.name, e.target.value)} required />
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text" onClick={this.mostarContrasenya2}> <i id="ull2" className="fas fa-eye"></i></div>
                                                </div>

                                            </div>


                                        </div>



                                    </div>
                                    {this.state.error_pass &&
                                        <div className="offset-6 col-4">

                                            <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i><Traduccio string="error-pass" /></p>
                                        </div>
                                    }

                                </div>
                                <div className="row">
                                    {this.state.show_error &&
                                        <div className="offset-2 col-4">

                                            <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i><Traduccio string="error-canvi" /></p>
                                        </div>
                                    }
                                    <div className="offset-lg-8 offset-md-6 col-lg-2 col-md-4">
                                        <button className="btn btn-primary col boto" onClick={this.canviarPass}> <Traduccio string="actualitzar" /></button>
                                    </div>
                                </div>

                                <Modal show={this.state.show_ok} onHide={() => this.setState({ show_ok: false })}>
                                    <Modal.Body><Traduccio string="actualitzar-pass" /></Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={() => this.setState({ show_ok: false })}>
                                            <Traduccio string="tancar" />
                                        </Button>

                                    </Modal.Footer>
                                </Modal>

                            </div>

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

export default Configuracio;