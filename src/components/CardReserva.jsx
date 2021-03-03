import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Traduccio from "../components/Traduccio";

class CardReserva extends Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <div className="card mb-3 cardreserva" >
                    <div className="row no-gutters">
                        <div className="col-md-3">
                            <img src={"https://admin.mallorcarustic.me/imatges/" + this.props.id + "_1.jpg"} className="card-img foto" alt={this.props.descripcio} />
                            <Link to={"/casa/" + this.props.id} className="stretched-link">

                            </Link>
                        </div>

                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title titol mb-3 mt-2"><Link className="link" to={"/casa/" + this.props.id}>{this.props.nom}</Link></h5>
                                <div className="card-text ">
                                    <h6 className="mb-2"><Traduccio string="desde"/> <strong>{this.props.entrada} </strong> <Traduccio string="fins" /> <strong>{this.props.sortida}   </strong> </h6>
                                    <p> {this.props.pob}, Illes Balears. </p>

                                </div >


                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="card-text mt-4">
                                <h6><strong>{this.props.preu} €</strong> </h6>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default CardReserva;