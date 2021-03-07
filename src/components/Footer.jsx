import React, { Component } from 'react';
import '../Footer.css';
import Traduccio from "../components/Traduccio";

class Footer extends Component {
    render() {
        return (
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                        
                           <h4><Traduccio string="footer.segueixnos" />   <a href="https://www.instagram.com/lauramanerasanso/" className="text-white ins"> <i className="fab fa-instagram"></i></a> <a href="#" className="text-white"><i class="fab fa-facebook-f"></i></a> <a href="#" className="text-white"><i class="fab fa-twitter"></i>  </a></h4>
                                
                               
                                
                           
                        </div>
                       
                        <div className="col-md-6">
                          <h4><Traduccio string="dubte" /><i class="far fa-envelope ins"></i><a href="/contacte" className="text-white co"><Traduccio string="contacte"/></a></h4>
                       
                                
                            
                        </div>
                    </div>
                    <div className="row">
                        <h6 className="col-sm copy">
                            &copy;{new Date().getFullYear()} MallorcaRustic | <a href="/accessibilitat" className="text-white"><Traduccio string="accessibilitat"/></a>
                        </h6>
                    </div>
                </div>
            </div>
        );
    }

}

export default Footer;