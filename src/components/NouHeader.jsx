import usuariContext from "../context/UsuariContext";

import React, { Component, useContext } from 'react';
import UsuariContext from '../context/UsuariContext';

import logo from "../imatges/logo_final.png"
import BotoLink from "../components/BotoLink"
import '../Header.css';
import { Button } from "bootstrap";

const NouHeader = (props) => {

    const Loginiciat = useContext(UsuariContext)



    if (Loginiciat) {
        return (<div >
            <nav className="navbar navbar-expand-xl navbar-primary fixed-top" >
                <a href="/" > < img className="navbar-brand" src={logo} /></a >
                <button className="navbar-toggler" >
                    <span className="navbar-toggler-icon" > </span> </button>
                <div className="collapse navbar-collapse"
                    id="navbarSupportedContent" >
                    <ul className="navbar-nav ml-auto ">

                        <li className="nav-item" >
                            <button className="btn btn-primary nav-link mr-3" onClick={props.tancarSessio}> Sortir </button>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>);
    }
    return (<div >
        <nav className="navbar navbar-expand-xl navbar-primary fixed-top" >
            <a href="/" > < img className="navbar-brand" src={logo} /></a >
            <button className="navbar-toggler" >
                <span className="navbar-toggler-icon" > </span> </button>
            <div className="collapse navbar-collapse"
                id="navbarSupportedContent" >
                <ul className="navbar-nav ml-auto ">

                    <li className="nav-item" >
                        <BotoLink url="/iniciSessio" estil="btn btn-outline-primary nav-link mr-3" text="Iniciar Sessió" />
                    </li>
                    <li className="nav-item" >
                        <BotoLink url="http://www.google.es" estil="btn btn-primary nav-link mr-3" text="Registra't" />
                    </li>
                </ul>
            </div>
        </nav>
    </div>);

}


export default NouHeader;
