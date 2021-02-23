import React, {Component} from 'react';
import CardCasa from './CardCasa';
import '../CarouselCards.css';
import $ from 'jquery';
import 'bootstrap/js/src/carousel.js';
import foto from  '../imatges/fotoFiltres.jpg';


class CarouselCards extends Component{

    constructor(props){
        super();

        this.carregarCarousel = this.carregarCarousel.bind(this);
    }

    carregarCarousel(){
        $('#recipeCarousel').carousel({
            interval: 5000
        })

        $('.carousel .carousel-item').each(function(){
            var minPerSlide = 3;
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
            
            for (var i=0;i<minPerSlide;i++) {
                next=next.next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }
                next.children(':first-child').clone().appendTo($(this));
            }
        });
    }

    componentDidMount() {
        this.carregarCarousel();
    }

    componentDidUpdate(){
        this.carregarCarousel();
    }

    render(){
        return(
            <div>
                <div className="container text-center my-3" style={{paddingTop: "50px"}}>
                    <div className="row mx-auto my-auto">
                        <div id="recipeCarousel" className="carousel slide w-100" data-ride=" carousel">
                            <div className="carousel-inner w-100" role="listbox">
                                {this.props.cases.map( function (casa, index){
                                    return (
                                        <div className={(index == 0 ? " carousel-item active" : " carousel-item")}>
                                            <div className="col-md-4 ">
                                                <CardCasa key={casa.id} id={casa.id} img={"http://admin.mallorcarustic.me/imatges/"+casa.img_principal} nom={casa.traduccioNom} descripcio={casa.tradDescripcio} habitacions={casa.nHabitacions} banys={casa.nBanys}/>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <a className="carousel-control-prev w-auto" href="#recipeCarousel" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon bg-primary border border-primary rounded-circle" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next w-auto" href="#recipeCarousel" role="button" data-slide="next">
                                <span className="carousel-control-next-icon bg-primary border border-primary rounded-circle" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CarouselCards;