import React, {Component} from 'react';
import BotoLink from './BotoLink';
import logo from '../imatges/logo_final.png';
import '../Header.css';

class Header extends Component {

    constructor(props){
        super();
    }

    render() {
      return (
        <div>
                <nav className="navbar navbar-expand-md navbar-primary fixed-top" >
                    <a href="/" > < img className="navbar-brand" src={logo} /></a >
                    <button className="navbar-toggler" >
                        <span class="navbar-toggler-icon" > </span> </button>
                    <div className="collapse navbar-collapse"
                        id="navbarSupportedContent" >
                        <ul className="navbar-nav ml-auto ">
                            <li className="nav-item" >
                                <BotoLink url="http://www.google.es/" estil="btn btn-outline-primary nav-link mr-3" text="Iniciar Sessió"/>
                            </li>
                            <li className="nav-item" >
                                <BotoLink url="http://www.google.es/" estil="btn btn-primary nav-link mr-3" text="Registra't"/>
                            </li>
                        </ul>
                    </div>
                </nav>
            
        </div>
      );
    }
}

export default Header;