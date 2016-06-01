import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

export default class Info extends Component {

    state = {
        hoverAdjustTop: 0,
        hoverAdjustLeft: 0
    };

    componentDidMount(e) {
        console.log('info mount')
        const thH = this.refs.taggdHover.offsetHeight;
        const tpH = this.refs.taggdPoint.offsetHeight;

        const tpW = this.refs.taggdPoint.offsetWidth;

        if (thH > tpH) {
            this.setState({
                hoverAdjustTop: +(thH - tpH) / 2,
                hoverAdjustLeft: tpW
            })
        } else {
            this.setState({
                hoverAdjustLeft: tpW
            })
        }

    }

    render() {
        const props = this.props;
        const state = this.state;
        const source = props.source;
        const title = source.title;
        const pointStyle = {
            left: props.pointX,
            top: props.pointY,
            position: 'absolute'
        };

        const infoStyle = {
            left: props.pointX + props.offset.left + state.hoverAdjustLeft,
            top: props.pointY + props.offset.top - state.hoverAdjustTop,
            position: 'absolute'
        };
        return (
            <div className="tagged-item-container info">
                <span style={pointStyle} ref="taggdPoint" className="tagged-item"></span>
                <span style={infoStyle} ref="taggdHover" className="taggd-item-hover">{title}</span>
            </div>

        );
    }
}
