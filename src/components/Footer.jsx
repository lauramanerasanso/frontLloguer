import React, { Component } from 'react';
import '../Footer.css';
import Traduccio from "../components/Traduccio";

class Footer extends Component {
    render() {
        return (
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        {/*Columna1*/}
                        <div className="col">
                            <ul className="XSList">
                                <li className="list-unstyled"><h4><Traduccio string="footer.xarxes" /></h4></li>
                                <li className="list-unstyled"><a href="https://www.instagram.com/lauramanerasanso/" className="text-white"><i className="fab fa-instagram"></i> <Traduccio string="footer.segueixnos" /> Instagram </a></li>
                                <li className="list-unstyled"><a href="#" className="text-white"><i className="fab fa-facebook"></i> <Traduccio string="footer.segueixnos" /> Facebook </a></li>
                                <li className="list-unstyled"><a href="#" className="text-white"><i class="fab fa-twitter"></i> <Traduccio string="footer.segueixnos" /> Twitter </a></li>
                            </ul>
                        </div>
                        {/*Columna2*/}
                        <div className="col">
                            <ul>
                                <li className="list-unstyled"><h4><Traduccio string="footer.desenv" /></h4></li>
                                <li className="list-unstyled">Laura Manera Sansó</li>
                                <li className="list-unstyled">Amanda Mula Riera</li>
                                <li className="list-unstyled">Joan Baltasar Binimelis Martín</li>
                            </ul>

                        </div>
                        {/*Columna3*/}
                        <div className="col">
                            <ul>
                                <li className="list-unstyled"><h4><Traduccio string="footer.prof" /></h4></li>
                                <li className="list-unstyled">Antoni Moragues</li>
                                <li className="list-unstyled">Antoni Ramirez Duran</li>
                                <li className="list-unstyled">Antoni Ginard Moyà</li>
                                <li className="list-unstyled">Apolonia Garcias Pallarés</li>
                                <li className="list-unstyled">Antoni Mas Gutierrez</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <p className="col-sm">
                            &copy;{new Date().getFullYear()} MallorcaRustic
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Footer;