import React, { Component } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/RegularButton";

import NouHeader from "../components/NouHeader";

import "../Login.css";
import 'bootstrap/dist/css/bootstrap.css';
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
        console.log(this.state.usuari);
        console.log(this.state.password);
    }

    handleOnClick() {
        const { iniciaSessio } = this.props;

        iniciaSessio(this.state.usuari, this.state.password);
    }

    componentDidMount() {
        const { comprovarSessio } = this.props;

        comprovarSessio();
    }


    render() {

        return (
            <div>
                <Helmet>
                    <title>INICI SESSIÓ · Mallorca Rustic</title>
                </Helmet>
                <NouHeader tancarSessio={this.props.tancarSessio} />
            
                    <div className="container login text-center">
                        <div className="row">
                            <div className="col-md-6">

                                <h3 className='titol'>Inicia Sessió</h3>
                                <div className="row">
                                    <div className="col-lg-8 text-center mx-auto">


                                        <div className="form-group">
                                            <Label text="E-mail" per="usuari" classe="label" />
                                            <Input
                                                atributs={{
                                                    name: 'usuari',
                                                    inputType: 'text',
                                                    ph: ''
                                                }}
                                                className="form-control"
                                                handleChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group">

                                            <Label text="Contrasenya" per="password" classe="label" />
                                            <Input
                                                atributs={{
                                                    name: 'password',
                                                    inputType: 'password',
                                                    ph: ''
                                                }}
                                                className="form-control"
                                                handleChange={this.handleChange} />

                                        </div>
                                        <Button
                                            text='Iniciar Sessió'
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
                                        <h3 className='titol'>Registra't</h3>
                                        <h6 className="desc">Si encara no teniu compte d'usuari de <strong>mallorcarustic.me</strong>, utilitzeu aquesta opció per accedir al formulari de registre. Us sol.licitarem la informació imprescindible per agilitzar el procés de reserva.</h6>

                                        <a href="#" className="btn btn-outline-primary"> Registra't</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
     




        );
    }
}

export default LoginNou;