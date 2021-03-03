import React, { Component } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/RegularButton";

import NouHeader from "../components/NouHeader";



import "../Login.css";
import 'bootstrap/dist/css/bootstrap.css';
import Traduccio from "../components/Traduccio";
import $ from 'jquery';
import { Helmet } from 'react-helmet';

class LoginNou extends React.Component {

    constructor(props) {

        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);


        this.state = {
            usuari: '',
            password: '',


        };

    }

    handleChange(name, value) {
        switch (name) {
            case 'usuari':
                this.setState({ usuari: value });

                break;
            case 'password':
                this.setState({ password: value });
                break;
            default:
                console.log('no hay valores')
        }

        

    }

    handleOnClick() {
        const { iniciaSessio } = this.props;

        iniciaSessio(this.state.usuari, this.state.password);
    }

    componentDidMount() {
        const { comprovarSessio } = this.props;

        comprovarSessio();
    }

    mostarContrasenya() {
        let x = document.getElementById("password");


        if (x.type === "password") {
            x.type = "text";

            $("#ull").attr('class', "fa fa-eye-slash");


        } else {

            x.type = "password";

            $("#ull").attr('class', "fas fa-eye");


        }




    }


    render() {

        return (
            <div>
                <Helmet>
                    <title>INICI SESSIÓ · Mallorca Rustic</title>
                </Helmet>
                <NouHeader tancarSessio={this.props.tancarSessio} canviarLlenguatge={this.props.canviarLlenguatge} />

                <div className="container login text-center">
                    <div className="row">
                        <div className="col-md-6">

                            <h3 className='titol'><Traduccio string="inici-sessio" /></h3>
                            <div className="row">
                                <div className="col-lg-8 text-center mx-auto">


                                    <div className="form-group">
                                        <Label text="E-mail" per="usuari" classe="label" />
                                        <Input
                                            atributs={{
                                                name: 'usuari',
                                                inputType: 'email',
                                                ph: ''
                                            }}
                                            className="form-control"
                                            handleChange={this.handleChange}

                                        />
                                    </div>
                                    <div className="form-group">

                                        <Label text={<Traduccio string="contrasenya" />} per="password" classe="label" />

                                        <div class="input-group text-center">

                                            <input type="password" name="password" className="form-control" id="password" onChange={(e) => this.handleChange(e.target.name, e.target.value)} required />
                                            <div className="input-group-prepend">
                                                <div className="input-group-text" onClick={this.mostarContrasenya}> <i id="ull" className="fas fa-eye"></i></div>
                                            </div>
                                        </div>

                                    </div>
                                    {this.props.error &&
                                        <div>

                                            <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i><Traduccio string="error" /></p>
                                        </div>
                                    }
                                    <Button
                                        text={<Traduccio string="inici-sessio" />}
                                        handleOnClick={this.handleOnClick}
                                        param={true}
                                        className="btn btn-primary"
                                    />

                                </div>
                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="row">
                                <div className="col-md-10 text-center mx-auto">
                                    <h3 className='titol'><Traduccio string="registrar" /></h3>
                                    <h6 className="desc"><Traduccio string="text1" /> <strong>mallorcarustic.me</strong><Traduccio string="text2" /></h6>

                                    <a href="#" className="btn btn-outline-primary"><Traduccio string="registrar" /></a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>





        );
    }
}

export default LoginNou;