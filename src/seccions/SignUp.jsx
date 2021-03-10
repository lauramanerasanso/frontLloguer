import React, { Component } from 'react';
import { Form, Col, Button, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NouHeader from '../components/NouHeader';
import Footer from '../components/Footer';
import BotoLink from '../components/BotoLink'
import classnames from 'classnames';
import '../SignUp.css';
import axios from 'axios';
import Traduccio from "../components/Traduccio";


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
            creat : false,
        };
    }

    componentDidMount(){
      const { comprovarSessio } = this.props;

      comprovarSessio();
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
            errors.name = <div>
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i><Traduccio string="error-nom"/></p>
            </div>
            correcte = false;
        }

        if (this.state.llinatge1.length <= 2) {
            errors.llinatge1 = <div>
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i><Traduccio string="error-nom"/></p>
            </div>
            correcte = false;
        }
        if (this.state.DNI.length <= 2) {
            errors.DNI = <div>
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i><Traduccio string="error-dni"/></p>
            </div>
            correcte = false;
        }

        if (!this.state.email.match(/^\S+@\S+\.\S+$/)) {
            errors.email = <div>
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i><Traduccio string="error-email"/></p>
            </div>
            correcte = false;
        }

        if (this.state.password.length < 6) {
            errors.password = <div>
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i><Traduccio string="error-pas"/></p>
            </div>
            correcte = false;

        }

        if (this.state.password !== this.state.password2) {
            errors.password2 = <div>
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i><Traduccio string="error-pass2"/></p>
            </div>

            correcte = false;
        }

        if (this.state.poblacio.length <= 2) {
            errors.poblacio = <div>
                <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i><Traduccio string="error-pob"/></p>
            </div>
            correcte = false;

        }

        if (this.state.telefon.length > 9) {
            errors.telefon = <div><br />
            <p className="errorStyle"><i className="fas fa-exclamation-triangle"></i>Introdueix un telefon valid.</p>
        </div>
        correcte = false;
        }

        if (correcte == false) {
            this.setState({
                errors: errors
            });
            return;
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
            // if (res.data == "ERROR" && correcte == false) {
                
            //     this.setState({ content: "Hi ha camps incorrectes o sense omplir.", show: true });
            // } else 
            // if (res.data == "ERROR" && correcte != false) {
            if (res.data == "ERROR") {
                
                this.setState({ content:<Traduccio string="error-registre"/> ,show: true });
                
            } else if (res.data == "OK") {
                
                this.setState({ creat : true});

            } else {
                
                this.setState({ content: <Traduccio string="error-servidor"/>,show: true });
            }
        });


    };



    render() {

        const { errors } = this.state;

        return (
            <div className="contentSignUp">
                <NouHeader tancarSessio={this.props.tancarSessio}  canviarLlenguatge={this.props.canviarLlenguatge} />
                <div className="containerSignUp container">
                    <div className="row">
                        <div className="col-10 offset-1 text-center registerText">
                            <h3><Traduccio string="registrar"/></h3>

                        </div>
                    </div>
                    <br />
                    <br />

                    <div className="row">
                        <div className="col-12">

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="row">
                                    {/* Name */}
                                    <div className="col-12 col-md-5 offset-md-1 from-group">
                                        <label htmlFor="name"><Traduccio string="nom"/><strong> *</strong> :</label>

                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.name}

                                            id="name"
                                            className={classnames("form-control in", { invalid: errors.name })}
                                         
                                        />

                                        <span className="text-danger">{errors.name}</span>

                                    </div>



                                    {/*Llinatge1*/}
                                    <div className="col-12 col-md-5">
                                        <label htmlFor="llinatge1"><Traduccio string="llinatge1"/> <strong> *</strong> :</label>

                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.llinatge1}

                                            id="llinatge1"
                                            className={classnames("form-control in", { invalid: errors.llinatge1 })}
                                            
                                        />

                                        <span className="text-danger">{errors.llinatge1}</span>
                                    </div>
                                </div>
                              
                                <div className="row">
                                    {/*Llinatge2*/}
                                    <div className="col-12 col-md-5 offset-md-1">
                                        <label htmlFor="llinatge1"><Traduccio string="llinatge2"/> :</label>
                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.llinatge2}

                                            id="llinatge2"
                                            className={classnames("form-control in", { invalid: errors.name })}
                                            
                                        />

                                    </div>
                                    {/*DNI*/}
                                    <div className="col-12 col-md-5">
                                        <label htmlFor="DNI"><Traduccio string="dni"/><strong> *</strong> :</label>

                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.DNI}

                                            id="DNI"
                                            className={classnames("form-control in", { invalid: errors.DNI })}
                                           
                                        />

                                        <span className="text-danger">{errors.DNI}</span>
                                    </div>

                                </div>
                               
                                <div className="row">
                                    {/* Telefon */}
                                    <div className="col-12 col-md-5 offset-md-1">
                                        <label htmlFor="telefon">Telefon:</label>

                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.telefon}

                                            id="telefon"
                                            className={classnames("form-control", { invalid: errors.telefon })}
                                            placeholder="(No obligatori)..."
                                        />
                                        <span className="text-danger">{errors.telefon}</span>
                                    </div>
                                    {/* Email */}
                                    <div className="col-12 col-md-5">
                                        <label htmlFor="email">E-mail<strong>*</strong> :</label>

                                        <input
                                            type="email"
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            error={errors.email}
                                            id="email"
                                            className={classnames("form-control in", { invalid: errors.email })}
                                          
                                        />

                                        <span className="text-danger">{errors.email}</span>
                                    </div>

                                </div>
                              
                                <div className="row">
                                    {/* Password */}
                                    <div className="col-12 col-md-5 offset-md-1">
                                        <label htmlFor="password"><Traduccio string="contra"/><strong> *</strong> :</label>

                                        <input
                                            type="password"
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            error={errors.password}
                                            id="password"
                                            className={classnames("form-control in", { invalid: errors.password })}
                                            
                                        />

                                        <span className="text-danger">{errors.password}</span>
                                    </div>

                                    {/* Validate password */}
                                    <div className="col-12 col-md-5">
                                        <label htmlFor="password2"><Traduccio string="repeteix"/><strong> *</strong> :</label>

                                        <input
                                            type="password"
                                            onChange={this.onChange}
                                            value={this.state.password2}
                                            error={errors.password2}
                                            id="password2"
                                            className={classnames("form-control in", { invalid: errors.password2 })}
                                          
                                        />
                                        <span className="text-danger">{errors.password2}</span>
                                    </div>
                                </div>
                              
                                <div className="row">
                                    {/*Poblacio*/}
                                    <div className="col-12 col-md-5 offset-md-1">
                                        <label htmlFor="poblacio"><Traduccio string="poblacio"/><strong> *</strong> :</label>

                                        <input
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.poblacio}
                                            id="poblacio"
                                            className={classnames("form-control in", { invalid: errors.poblacio })}
                                           

                                        />

                                        <span className="text-danger">{errors.poblacio}</span>
                                    </div>
                                </div>
                                <div className="row col">
                                    <div className="offset-1">

                                    <h6 className="horari"><strong>* <Traduccio string="camps"/></strong></h6>
                                    </div>
                               </div> 

                          
                                <div className="row">
                                    <div className="col-12 text-center">
                                        <button className="btn btn-primary boto" type="submit">
                                        <Traduccio string="registrar"/>
			 	  				</button>
                                    </div>
                                </div>
                          
                                <div className="col-10 offset-1 text-center">
                                    <h6 className="horari"><Traduccio string="compte"/><a href="/iniciSessio"><Traduccio string="inici-sessio"/></a></h6>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title><Traduccio string="atencio"/></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.content}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                        <Traduccio string="tancar"/>
                        </Button>

                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.creat} onHide={() => window.location="/"}>
                    <Modal.Header closeButton>
                        <Modal.Title><Traduccio string="enhorabona"/></Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Traduccio string="ok"/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => window.location="/"}>
                        <Traduccio string="tancar"/>
                        </Button>

                    </Modal.Footer>
                </Modal>



                <Footer />
            </div>
        );
    }
}
export default SignUp;
