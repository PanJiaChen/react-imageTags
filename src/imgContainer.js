import React, { Component } from 'react';
import Info from './info.js';
import utils from './utils';

export default class ImgContainer extends Component {
    state = {
        visualTags: this.props.visualTags
    }

    componentDidMount() {
        console.log('imgContaienr componentDidMount init');

        console.log('imgContaienr componentDidMount');
    }

    handleClick = (e) => {
        const positionInfo = this.props.imageInfo;
        const pageY = e.pageY;
        const pageX = e.pageX;
        console.log(pageX, pageY);
        if ((positionInfo.offsetTop + positionInfo.offsetHeight) - pageY < 20) {
            return false;
        }
        if ((positionInfo.offsetLeft + positionInfo.offsetWidth) - pageX < 20) {
            return false;
        }
        const x = (pageX - positionInfo.offsetLeft) / positionInfo.offsetWidth;
        const y = (pageY - positionInfo.offsetTop) / positionInfo.offsetHeight;
        const index = this.state.visualTags.length;
        const data = {
            id: index,
            source: {
                title: ''
            },
            x,
            y,
            edit: true,
            index,
            positionInfot: positionInfo
        };
        const newVisualTags = this.state.visualTags;
        newVisualTags.push(data);

        this.setState({
            visualTags: newVisualTags
        });
    };

    handleDeleteTagClick = (index) => {
        const newVisualTags = this.state.visualTags;
        newVisualTags.splice(index, 1);
        this.setState({
            visualTags: newVisualTags
        });
    };

    render() {
        const settings = this.props;
        const positionInfo = this.props.imageInfo;
        if (utils.isEmpty(positionInfo)) {
            return false;
        }
        const dataType = this.props.type;

        const visualTagsArr = this.state.visualTags;

        const tagComponents = visualTagsArr.map((tag, index) => {
            const data = {
                pointX: (tag.x * positionInfo.offsetWidth),
                pointY: (tag.y * positionInfo.offsetHeight),
                offset: settings.offset,
                id: tag.id,
                index,
                source: tag.source,
                positionInfo,
                couldEdit: tag.edit || false
            };
            return (<Info key={tag.id} handleDelTag={this.handleDeleteTagClick} {...data} />);
        });
        if (dataType == 'information') {
            //
        }
        return (<div className="tagged-wrapper" onClick={this.handleClick}> {tagComponents} </div>);
    }
}
