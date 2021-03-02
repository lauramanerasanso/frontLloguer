import React, { Component } from "react";
import IdiomaContext from '../context/IdiomaContext';

import en from "../components/en.json";
import ca from "../components/ca.json";

class Traduccio extends Component {
  
  constructor(props) {
    super(props);

   
    this.state = {
      idiomes: {
        en,
        ca
      }
    };
  }


  render() {
      const {idiomes} = this.state 
      const {string} = this.props
    return (
      <IdiomaContext.Consumer>
        {value => idiomes[value][string]}
      </IdiomaContext.Consumer>
    );
  }

}

export default Traduccio;