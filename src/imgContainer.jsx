import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Info from './info.jsx';


export default class ImgContainer extends Component {

    state = {
        visualTags: this.props.visualTags
    };


    isEmpty(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }

    componentDidMount() {
        console.log('imgContaienr componentDidMount init')

        console.log('imgContaienr componentDidMount')
    }

    handleClick = (e) => {
        console.log(e.pageX, e.pageY);
        const x = 200;
        const y = 200;
        const data = {
            id: '',
            source: {
                title: ''
            },
            x: x,
            y: y
        }
        const newVisualTags = this.state.visualTags;
        newVisualTags.push(data)
        console.log(newVisualTags)
        this.setState({
            visualTags: newVisualTags
        })
    };

    render() {
        const settings = this.props;
        const positionInfo = this.props.imageInfo;
        if (this.isEmpty(positionInfo)) {
            return false
        }
        var dataType = this.props.type;

        var visualTagsArr = this.state.visualTags;

        var tagComponents = visualTagsArr.map((tag, index) => {
            const data = {
                pointX: (tag.x * positionInfo.offsetWidth),
                pointY: (tag.y * positionInfo.offsetHeight),
                offset: settings.offset,
                id: tag.id,
                source: tag.source
            };
            return (<Info key={tag.id} {...data}></Info>)
        });
        if (dataType == 'information') {

        }
        return (
            <div className="tagged-wrapper" onClick={this.handleClick}>
                {tagComponents}
            </div>
        );
    }
}
