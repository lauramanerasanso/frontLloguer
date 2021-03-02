import React, {Component} from 'react';
import foto from  '../imatges/fotoFiltres.jpg';
import '../Cerca.css';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import Traduccio from "../components/Traduccio";

class Cerca extends Component{

    constructor(props){
        super(props);
    
        this.state = {
            show: false,
            dataInici: '',
            dataFi: ''
        };
    
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
    handleChangeInput(event){
      this.setState({[event.target.name]: event.target.value});
      sessionStorage.removeItem([event.target.name]);
      sessionStorage.setItem([event.target.name], event.target.value);
    }

    handleShow(){
        this.setState({show: true });
      }
    
      handleClose(){
        this.setState({show: false });
      }

    render() {
      return (
        <div>
            <div id="cercaInici" style={{ backgroundImage: "url("+foto+")", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
            <div className="container cercar">
                <div className="row rwcercar col-8 offset-2">
                        <input type="date" onChange={this.props.canviDates} onChange={this.handleChangeInput} id="dataInici" name="dataInici" placeholder="Data Entrada" className="form-control col-md-6 col-lg-4"/>
                        <input type="date" min={this.state.dataInici} onChange={this.props.canviDates} onChange={this.handleChangeInput} id="dataFi" name="dataFi" placeholder="Data Sortida" className="form-control col-md-6 col-lg-4" />
                        
                        
                        {(this.state.dataInici == '' && this.state.dataFi == '') ? 
                            <div className="col-lg-4">
                                <Link to={"/cases/totes/"}>
                                    <Button variant="primary col" onClick={this.showAllCards} onClick={this.props.datesCerca}>
                                    <i class="fas fa-search"></i> <Traduccio string="cerca" />
                                    </Button>
                                </Link>
                            </div>
                         :  
                            <div className="col-lg-2">
                                <Link to={"/cases/"+this.state.dataInici+"/"+this.state.dataFi}>
                                    <button className="btn btn-primary col" onClick={this.props.datesCerca}> <Traduccio string="cerca" /> </button>
                                </Link>
                            </div>
                          }
                </div>
            </div>
            </div>
        </div>
      );
    }
}

export default Cerca;