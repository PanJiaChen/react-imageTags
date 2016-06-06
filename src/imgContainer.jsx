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
        const positionInfo = this.props.imageInfo;
        const x = (e.pageX - positionInfo.offsetLeft) / positionInfo.offsetWidth;
        const y = (e.pageY - positionInfo.offsetTop) / positionInfo.offsetHeight;
        const index = this.state.visualTags.length;
        const data = {
            id: index,
            source: {
                title: ''
            },
            x: x,
            y: y,
            edit: true,
            index: index
        };
        const newVisualTags = this.state.visualTags;
        newVisualTags.push(data);

        this.setState({
            visualTags: newVisualTags
        })
    };

    handleDeleteTagClick=(index)=>{
        const newVisualTags = this.state.visualTags;
        newVisualTags.splice(index, 1);
        this.setState({
            visualTags: newVisualTags
        })
    }

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
                index: index,
                source: tag.source,
                edit: tag.edit||false
            };
            return (<Info key={tag.id} {...data} handleDelTag={this.handleDeleteTagClick}></Info>)
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
