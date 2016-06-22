import React, { Component } from 'react';
import Title from './title.jsx';
import ImgContainer from './imgContainer.jsx';
import utils from './utils';

export default class Tagged extends Component {
    state = {
        positionInfo: {},

    };

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
                offsetTop: utils.getElementTop(img),
                offsetLeft: utils.getElementLeft(img)
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
