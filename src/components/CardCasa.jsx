import React, {Component} from 'react';


class CardCasa extends Component {

    constructor(props){
        super();
    }

    render() {
      return (
        <div>
            <div className="card" >
                <img src={this.props.img} className="card-img-top" alt={this.props.descripcio}/>
                <div className="card-body">
                    <h5 className="card-title titol">{this.props.nom}</h5>
                    <div className="card-text">
                        <p>{this.props.descripcio}</p>
                        <table className="table table-bordered table-primary">
                            <tbody>
                                <tr>
                                    <td scope="col"><i className="fas fa-bed"></i> {this.props.habitacions}</td>
                                    <td scope="col"><i className="fas fa-bath"></i> {this.props.banys}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div >
                    <a href={"/casa/"+this.props.id} className="stretched-link"></a>
                </div>
            </div>
        </div>
      );
    }
}

export default CardCasa;