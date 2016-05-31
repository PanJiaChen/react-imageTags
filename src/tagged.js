import React, { Component } from 'react';
import Title from './title.jsx';
import ImgContainer from './imgContainer.jsx'


export default class Tagged extends Component {

    componentWillReceiveProps(){
        var img = this.refs.img;
        console.log('a')
        console.log(img.offsetHeight)
}
    componentDidMount() {
        console.log('b')
        var img = this.refs.img;
        console.log(img.offsetHeight)
        console.log(img.offsetWidth)
        console.log(img.offsetTop)
        console.log(img.offsetLeft)
    }
    _onLoad(){

        var img = this.refs.img;
        console.log(img.offsetHeight)
        console.log(img.offsetWidth)
        console.log(img.offsetTop)
        console.log(img.offsetLeft)
    }
    render() {
        var settings;
        settings = this.props;
        return (
            <div className="taggd-wrapper_container">
                <Title />
                <img  ref="img" src={this.props.src} onLoad={this._onLoad.bind(this)} />
                <ImgContainer {...settings}>
                </ImgContainer>
            </div>

        );
    }
}
