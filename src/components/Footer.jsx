import React, { Component } from 'react';
import '../Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        {/*Columna1*/}
                        <div className="col">
                            <ul className="XSList">
                                <li className="list-unstyled"><h4>XARXES SOCIALS</h4></li>
                                <li className="list-unstyled"><a href="https://www.instagram.com/lauramanerasanso/"><i className="fab fa-instagram"></i> Segueix-nos a Instagram </a></li>
                                <li className="list-unstyled"><a href="#"><i className="fab fa-facebook"></i> Segueix-nos a Facebook </a></li>
                                <li className="list-unstyled"><a href="#"><i class="fab fa-twitter"></i> Segueix-nos a Twitter </a></li>
                            </ul>
                        </div>
                        {/*Columna2*/}
                        <div className="col">
                            <ul>
                                <li className="list-unstyled"><h4>DESENVOLUPADORS</h4></li>
                                <li className="list-unstyled">Laura Manera Sansó</li>
                                <li className="list-unstyled">Amanda Mula Riera</li>
                                <li className="list-unstyled">Joan Baltasar Binimelis Martín</li>
                            </ul>

                        </div>
                        {/*Columna3*/}
                        <div className="col">
                            <ul>
                                <li className="list-unstyled"><h4>PROFESSORS</h4></li>
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
                            &copy;{new Date().getFullYear()} MallorcaRustic | All right reserved | Terms Of Service | Privacy
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Footer;