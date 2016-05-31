import React, { Component } from 'react';
import Info from './info.jsx'
import { findDOMNode } from 'react-dom';


export default class ImgContainer extends Component {

    componentDidMount(){


    }

    handleClick = (e) => {
        console.log(e.pageX)
    };

    render() {
        //var options = this.pros.settings;
        var dataType = this.props.type;

        var visualTagsArr = this.props.visualTags;

        var tagComponents = visualTagsArr.map((tag, index) => {
            const data = {
                pointX: tag.x,
                pointY: tag.y,
                id: tag.id
            };
            return (<Info key={tag.id} {...data}></Info>)
        });
        if (dataType == 'information') {

        }
        return (
            <div className="taggd-wrapper" onClick={this.handleClick}>
                {tagComponents}
            </div>
        );
    }
}
