import React, { Component } from 'react';
import Title from './title.jsx';
import ImgContainer from './imgContainer.jsx'


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
                offsetTop: img.offsetTop,
                offsetLeft: img.offsetLeft
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
            <div className="taggd-wrapper_container">
                <Title />
                <div className="taggd-main">
                    <img ref="img" src={this.props.src} onLoad={this._onLoad.bind(this)}/>
                    {mask}
                    <ImgContainer {...settings} imageInfo={this.state.positionInfo}></ImgContainer>
                </div>
            </div>

        );
    }
}
