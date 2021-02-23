import React, { Component } from "react";

class Icon extends Component {

    constructor(props) {

      super(props);

      this.state = {

        icons:[
            'fas fa-swimming-pool',
            'fas fa-snowflake',
            'fas fa-temperature-high',
            'fas fa-parking',
            'fas fa-tv',
            'fas fa-wifi',
            'fas fa-lock',
            'fas fa-baby',
            'fas fa-archway',
            'fas fa-hamburger',
            'fas fa-umbrella-beach',
            'fas fa-paw'
        ]

      };

    }

    render(){
        return(
            <i className={this.state.icons[this.props.tipo]}></i>
        );
    }

}

export default Icon;