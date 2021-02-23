import React, { Component } from "react";

class BotoLink extends React.Component {

    constructor(props) {
        super(props); 
    }

    render() {
        return <a href={this.props.url} className={this.props.estil}>{this.props.text}</a>;
    }
}

BotoLink.defaultProps = {
  estil : "btn btn-primary"
};

export default BotoLink;