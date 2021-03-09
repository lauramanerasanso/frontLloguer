import React, { Component } from "react";
import NouHeader from '../components/NouHeader';
import Footer from '../components/Footer';
import Traduccio from "../components/Traduccio";
import { withRouter } from "react-router";

class RespostaPagament extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <NouHeader tancarSessio={this.props.tancarSessio} canviarLlenguatge={this.props.canviarLlenguatge} />
                <div className="container fitxa nocasa">
                    <h4><Traduccio string="error-pagament" /></h4>
                </div>
            </div>
        )
    }
}

export default withRouter(RespostaPagament);