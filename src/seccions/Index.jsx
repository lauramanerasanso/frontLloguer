import React, {Component} from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js/dist/popper.js';
import CarouselCards from '../components/CarouselCards';
import Header from '../components/Header';
import Cerca from '../components/Cerca';
import Footer from '../components/Footer';

//import {Route, BrowserRouter, NavLink} from "react-router-dom";

class Index extends Component {

  constructor(props){
    super()
    
    this.state = {
      cases: []
    }

  }


  componentDidMount() {
    axios.post('https://api.mallorcarustic.me/casa/llegir')
      .then(res => {
        const cases = res.data;
        this.setState({ cases });
    })

    
  }
  
  render() {
    return (
      
        <div>
          <Cerca />
          <CarouselCards key="carouselCards" cases={this.state.cases} />      
        </div>
      
      
    );
  }
}

export default Index;