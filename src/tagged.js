import React, { Component } from 'react';
import Title from './title.js';
import ImgContainer from './imgContainer.js';
import utils from './utils';

export default class Tagged extends Component {
    state = {
        positionInfo: {}
    };

    componentDidMount() {
        console.log('a');
    }

    componentWillReceiveProps() {
        console.log('b');
    }

    onLoad() {
        const img = this.refs.img;
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
        const settings = this.props;
        const hasMask = settings.hasMask;
        let mask;
        if (hasMask) {
            mask = (<div className="tagged-mask"></div>);
        } else {
            mask = null;
        }
        return (
            <div className="tagged-wrapper_container">
                <Title />
                <div className="tagged-main">
                    <img alt="" ref="img" src={this.props.src} onLoad={this.onLoad.bind(this)} />
                    {mask}
                    <ImgContainer {...settings} imageInfo={this.state.positionInfo}/>
                </div>
            </div>

        );
    }
}
