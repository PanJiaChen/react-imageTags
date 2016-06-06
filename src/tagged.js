import React, { Component } from 'react';
import Title from './title.jsx';
import ImgContainer from './imgContainer.jsx'


export default class Tagged extends Component {
    state = {
        positionInfo: {},

    };

    getElementLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }

    getElementTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }

    componentWillReceiveProps() {


        console.log('b')
    }

    componentDidMount() {
        console.log('a')
    }

    _onLoad() {
        var img = this.refs.img;
        this.setState({
            positionInfo: {
                offsetHeight: img.offsetHeight,
                offsetWidth: img.offsetWidth,
                offsetTop: this.getElementTop(img),
                offsetLeft: this.getElementLeft(img)
            }
        });
    }

    render() {
        var settings;
        settings = this.props;
        const hasMask = settings.hasMask;
        var mask;
        if (hasMask) {
            mask = (<div className="tagged-mask"></div>)
        } else {
            mask = null;
        }
        return (
            <div className="tagged-wrapper_container">
                <Title />
                <div className="tagged-main">
                    <img ref="img" src={this.props.src} onLoad={this._onLoad.bind(this)}/>
                    {mask}
                    <ImgContainer {...settings} imageInfo={this.state.positionInfo}></ImgContainer>
                </div>
            </div>

        );
    }
}
