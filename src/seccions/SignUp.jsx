import React, { Component } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BotoLink from '../components/BotoLink'
import classnames from 'classnames';
import '../SignUp.css';
import axios from 'axios';



class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            llinatge1: "",
            llinatge2: "",
            DNI: "",
            telefon: "",
            email: "",
            password: "",
            password2: "",
            poblacio: "",
            errors: {},
            content: "",
        };
    }

    handleClose = e => {
        this.setState({ show: false });
    };


    handleShow = e => {
        this.setState({ show: true });
    }



    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        var correcte = true;
        var errors = {};

        if (this.state.name.length <= 2) {
            errors.name = <div><br />
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i>Introdueix un nom de minim 3 lletres.</p>
            </div>
            correcte = false;
        }

        if (this.state.llinatge1.length <= 2) {
            errors.llinatge1 = <div><br />
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i>Introdueix un llinatge de minim 3 lletres.</p>
            </div>
            correcte = false;
        }
        if (this.state.DNI.length <= 2) {
            errors.DNI = <div><br />
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i>Introdueix un DNI correcte.</p>
            </div>
            correcte = false;
        }

        if (!this.state.email.match(/^\S+@\S+\.\S+$/)) {
            errors.email = <div><br />
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i>El correu es incorrecte.</p>
            </div>
            correcte = false;
        }

        if (this.state.password.length < 6) {
            errors.password = <div><br />
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i>La contrasenya ha de tenir minim 6 caracters.</p>
            </div>
            correcte = false;

        }

        if (this.state.password !== this.state.password2) {
            errors.password2 = <div><br />
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i>Aquesta contrasenya no es igual a l'anterior.</p>
            </div>

            correcte = false;
        }

        if (this.state.poblacio.length <= 2) {
            errors.poblacio = <div><br />
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i>Introdueix un poble.</p>
            </div>
            correcte = false;

        }

        if (correcte == false) {
            this.setState({
                errors: errors
            })

        }

        // const newUser = {
        //     name: this.state.name,
        //     email: this.state.email,
        //     password: this.state.password,
        //     password2: this.state.password2
        // };

        const data = new FormData();

        data.append("nom", this.state.name);
        data.append("llinatge1", this.state.llinatge1);
        data.append("llinatge2", this.state.llinatge2);
        data.append("DNI", this.state.DNI);
        data.append("telefon", this.state.telefon);
        data.append("email", this.state.email);
        data.append("password", this.state.password);
        data.append("poblacio", this.state.poblacio);

        axios.post("https://api.mallorcarustic.me/client/crear", data).then((res) => {
            console.log(res);
            if (res.data == "ERROR" && correcte == false) {
                this.setState({ show: true });
                this.setState({ content: "Hi ha camps incorrectes o sense omplir." });
            } else if (res.data == "ERROR" && correcte != false) {
                this.setState({ show: true });
                this.setState({ content: "Aquest compte ja esta actiu." });
            } else {
                this.setState({ show: true });
                this.setState({ content: "Compte creat, confirmi clicant al enllaç del correu que li acabem d'enviar." });
            }
        });


    };



    render() {

        const { errors } = this.state;

        return (
            <div className="contentSignUp text-center">
                <Header />
                <div className="containerSignUp container">
                    <div className="row">
                        <div className="col-10 offset-1 text-center registerText">
                            <h3>Registra't</h3>

                        </div>
                    </div>
                    <br />
                    <br />

                    <div className="row">
                        <div className="col-10 offset-1">

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="row">
                                    {/* Name */}
                                    <div className="col-12 col-md-5 offset-md-1">
                                        <label htmlFor="name">Nom:</label>

                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.name}

                                            id="name"
                                            className={classnames("form-control", { invalid: errors.name })}
                                            placeholder="Introdueix el teu nom..."
                                        />
                                        
                                        <span className="text-danger">{errors.name}</span>

                                    </div>



                                    {/*Llinatge1*/}
                                    <div className="col-12 col-md-5">
                                        <label htmlFor="llinatge1">Primer llinatge:</label>

                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.llinatge1}

                                            id="llinatge1"
                                            className={classnames("form-control", { invalid: errors.llinatge1 })}
                                            placeholder="Introdueix el teu primer llinatge..."
                                        />
                                        
                                        <span className="text-danger">{errors.llinatge1}</span>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    {/*Llinatge2*/}
                                    <div className="col-12 col-md-5 offset-md-1">
                                        <label htmlFor="llinatge1">Segon llinatge:</label>
                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.llinatge2}

                                            id="llinatge2"
                                            className={classnames("form-control", { invalid: errors.name })}
                                            placeholder="(No obligatori)"
                                        />

                                    </div>
                                    {/*DNI*/}
                                    <div className="col-12 col-md-5">
                                        <label htmlFor="DNI">DNI:</label>

                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.DNI}

                                            id="DNI"
                                            className={classnames("form-control", { invalid: errors.DNI })}
                                            placeholder="Introdueix el teu DNI..."
                                        />
                                        
                                        <span className="text-danger">{errors.DNI}</span>
                                    </div>

                                </div>
                                <br />
                                <div className="row">
                                    {/* Telefon */}
                                    <div className="col-12 col-md-5 offset-md-1">
                                        <label htmlFor="telefon">Telefon:</label>

                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.telefon}
                                            error={errors.name}
                                            id="telefon"
                                            className={classnames("form-control", { invalid: errors.name })}
                                            placeholder="(No obligatori)..."
                                        />
                                    </div>
                                    {/* Email */}
                                    <div className="col-12 col-md-5">
                                        <label htmlFor="email">Email:</label>

                                        <input
                                            type="email"
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            error={errors.email}
                                            id="email"
                                            className={classnames("form-control", { invalid: errors.email })}
                                            placeholder="Enter your email..."
                                        />
                                        
                                        <span className="text-danger">{errors.email}</span>
                                    </div>

                                </div>
                                <br />
                                <div className="row">
                                    {/* Password */}
                                    <div className="col-12 col-md-5 offset-md-1">
                                        <label htmlFor="password">Contrasenya:</label>

                                        <input
                                            type="password"
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            error={errors.password}
                                            id="password"
                                            className={classnames("form-control", { invalid: errors.password })}
                                            placeholder="Introdueix una contrasenya..."
                                        />
                                        
                                        <span className="text-danger">{errors.password}</span>
                                    </div>

                                    {/* Validate password */}
                                    <div className="col-12 col-md-5">
                                        <label htmlFor="password2">Confirma contrasenya:</label>

                                        <input
                                            type="password"
                                            onChange={this.onChange}
                                            value={this.state.password2}
                                            error={errors.password2}
                                            id="password2"
                                            className={classnames("form-control", { invalid: errors.password2 })}
                                            placeholder="Re-introdueix la teva contrasenya..."
                                        />
                                      
                                        <span className="text-danger">{errors.password2}</span>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    {/*Poblacio*/}
                                    <div className="col-12 col-md-5 offset-md-1">
                                        <label htmlFor="poblacio">Població:</label>

                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.poblacio}
                                            id="poblacio"
                                            className={classnames("form-control", { invalid: errors.poblacio })}
                                            placeholder="Introdueix la teva població."

                                        />
                                       
                                        <span className="text-danger">{errors.poblacio}</span>
                                    </div>
                                </div>

                                <br />
                                <div className="row">
                                    {/* Submit button */}
                                    <div className="col-12 text-center">
                                        <button className="btn signupbtn" type="submit">
                                            Registra't
			 	  				</button>
                                    </div>
                                </div>
                                <br />
                                <div className="col-10 offset-1 text-center registerText">

                                    <p>Ja tens un compte? <a href="/login" className="link">Inicia sessió.</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Atenció!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.content}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                            Tanca
          </Button>

                    </Modal.Footer>
                </Modal>



                <Footer />
            </div>
        );
    }
}
export default SignUp;