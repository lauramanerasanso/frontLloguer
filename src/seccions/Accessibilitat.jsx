import React, {Component} from 'react';
import NouHeader from '../components/NouHeader';
import foto from  '../imatges/accessibilitat.jpg';
import FotoNivell from  '../imatges/nivellAccessibilitat.png';
import { Helmet } from 'react-helmet';
import Traduccio from "../components/Traduccio";
import Footer from '../components/Footer';

class Accessibilitat extends Component {

    constructor(props){
        super();
    }

    render() {
      return (
        <div>
            <NouHeader tancarSessio={this.props.tancarSessio} canviarLlenguatge={this.props.canviarLlenguatge} />
            <div  style={{ backgroundImage: "url("+foto+")", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "350px"}}>
                <h1 className="tit_access text-white">
                    <Traduccio string="accessibilitat" />
                </h1>
            </div>
            <br/>
            <div className="container mb-5">
                <div className="row">
                    <div className="col">
                        <h3 className="mb-4 titol">
                            <Traduccio string="accessibilitat" />
                        </h3>
                        <p className="text_access">
                            <Traduccio string="p1-access" />
                        </p>
                        <p className="text_access">
                            <Traduccio string="p2-access" />
                        </p>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <div className="col">
                        <h3 className="mb-4 titol">
                            <Traduccio string="abans-de" />
                        </h3>
                        <p className="text_access">
                            <Traduccio string="p3-access" />
                        </p>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <div className="col">
                        <h3 className="mb-4 titol">
                            <Traduccio string="nivell" />
                        </h3>
                        <p className="text_access">
                            <Traduccio string="p4-access" />
                        </p>
                        <div>
                            <img src={FotoNivell} alt="AAA WCAG 2.0 LEVEL" height="30px"/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      );
    }
}

export default Accessibilitat;