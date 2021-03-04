import usuariContext from "../context/UsuariContext";

import React, { Component, useContext, useState } from 'react';
import UsuariContext from '../context/UsuariContext';
import IdiomaContext from '../context/IdiomaContext';

import logo from "../imatges/logo_final.png"
import ca from "../imatges/ca.png"
import en from "../imatges/reino-unido.png"
import BotoLink from "../components/BotoLink"
import '../Header.css';
import Traduccio from "../components/Traduccio";
import 'bootstrap/js/src/dropdown.js';
import 'bootstrap/js/src/collapse.js';
import 'popper.js/dist/popper.js';

const Img = () => {

    if(localStorage.getItem("idioma") === "en"){
        return (
            en
        )
    }else{
        return(
            ca
        )
    }
  
};

function NouHeader(props) {
   

    const Loginiciat = useContext(UsuariContext);
    const IContext = useContext(IdiomaContext);
    
    const email = localStorage.getItem("email");
    const [idioma, setIdioma] = useState(Img);

 
    if (Loginiciat) {
        return (<div >
            <nav className="navbar navbar-expand-md fixed-top" >
                <a href="/" > < img className="navbar-brand" src={logo} /></a >
                <button className="navbar-toggler custom-toggler text-center" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle btn-outline-primary mr-3 text-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={idioma} width="20px" className="bandera" />
                                </button>
                                <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" id="en" onClick={() => props.canviarLlenguatge("en") + setIdioma(en)}> <img src={en} width="20px" className="bandera mr-2" /><Traduccio string="idioma.angles" /></a>
                                    <a className="dropdown-item" id="ca" onClick={() => props.canviarLlenguatge("ca") + setIdioma(ca)}>  <img src={ca} width="20px" className="bandera mr-2" /><Traduccio string="idioma.catala" /></a>

                                </div>
                            </div>

                        </li>
                        <li className="nav-item">
                            <div className="dropdown">
                                <button className="btn btn-outline-primary dropdown-toggle mr-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user"></i> {email}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href={"/configuracio"}><i class="fas fa-cog"></i> <Traduccio string="config" /></a>
                                    <a className="dropdown-item" href={"/reserves"}><i class="fas fa-suitcase"></i> <Traduccio string="reserves" /></a>
                                    <a className="dropdown-item" onClick={props.tancarSessio}><i class="fas fa-sign-out-alt"></i> <Traduccio string="tancar-sessio" /></a>
                                    

                                </div>
                            </div>
                        </li>


                    </ul>
                </div>
            </nav>
        </div>);
    }
    return (<div >
        <nav className="navbar navbar-expand-md  fixed-top" >
            <a href="/" > < img className="navbar-brand" src={logo} /></a >
            <button className="navbar-toggler custom-toggler text-center" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                <ul className="navbar-nav ml-auto ">
                <li className="nav-item">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle btn-outline-primary mr-3 text-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={idioma} width="20px" className="bandera" />
                                </button>
                                <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" id="en" onClick={() => props.canviarLlenguatge("en") + setIdioma(en)}> <img src={en} width="20px" className="bandera mr-2" /><Traduccio string="idioma.angles" /></a>
                                    <a className="dropdown-item" id="ca" onClick={() => props.canviarLlenguatge("ca") + setIdioma(ca)}>  <img src={ca} width="20px" className="bandera mr-2" /><Traduccio string="idioma.catala" /></a>

                                </div>
                            </div>

                        </li>

                    <li className="nav-item" >
                        <BotoLink url="/iniciSessio" estil="btn btn-outline-primary nav-link mr-3" text={<Traduccio string="inici-sessio" />} />
                    </li>
                    <li className="nav-item" >
                        <BotoLink url="http://www.google.es" estil="btn btn-primary nav-link mr-3" text={<Traduccio string="registrar" />} />
                    </li>
                </ul>
            </div>
        </nav>
    </div>);

}


export default NouHeader;
