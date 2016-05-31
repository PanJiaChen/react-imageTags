import React, { Component } from 'react';


export default class Info extends Component {


    render() {
        const props = this.props;
        const divStyle = {
            left: props.pointX,
            top: props.pointY,
            position:'absolute'
        };
        return (
            <div style={divStyle} className="info">点</div>
        );
    }
}
