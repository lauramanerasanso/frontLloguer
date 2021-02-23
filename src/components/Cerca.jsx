import React, {Component} from 'react';
import foto from  '../imatges/fotoFiltres.jpg';
import '../Cerca.css';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';


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
                        <input type="date" onChange={this.props.canviDates} onChange={this.handleChangeInput} id="dataInici" name="dataInici" placeholder="Data Entrada" className="form-control col-md-6 col-lg-5"/>
                        <input type="date" min={this.state.dataInici} onChange={this.props.canviDates} onChange={this.handleChangeInput} id="dataFi" name="dataFi" placeholder="Data Sortida" className="form-control col-md-6 col-lg-5" />
                        
                        
                        {(this.state.dataInici == '' && this.state.dataFi == '') ? 
                            <div className="col-lg-2">
                                <Link to={"/cases/totes/"}>
                                    <Button variant="primary" onClick={this.showAllCards}>
                                        Cerca
                                    </Button>
                                </Link>
                            </div>
                         :  
                            <div className="col-lg-2">
                                <Link to={"/cases/"+this.state.dataInici+"/"+this.state.dataFi}>
                                    <button className="btn btn-primary col" onClick={this.datesCerca}> Cerca </button>
                                </Link>
                            </div>
                          }
                            
                        
                </div>
            </div>
            </div>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Body closeButton>
                <div>Ups... no has introduït dates per la cerca, vols veure totes les cases?</div>
            </Modal.Body>
            <Modal.Footer>
            <Link to={"/cases/"+true+"/"}>
                <Button variant="primary" onClick={this.showAllCards}>
                    Veure totes les cases
                </Button>
            </Link>

            </Modal.Footer>
          </Modal>
        </div>
      );
    }
}

export default Cerca;