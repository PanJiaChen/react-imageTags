import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from'classnames';

export default class Info extends Component {

    state = {
        active: true,
        title: this.props.source.title,
        left: 0,
        top: 0
    };

    constructor(props) {
        super(props);
    }

    judgeTagPositon() {
        const props = this.props;

        const thH = this.refs.taggedHover.offsetHeight;
        const tpH = this.refs.taggedPoint.offsetHeight;
        const tpW = this.refs.taggedPoint.offsetWidth;

        const left = props.pointX + props.offset.left + tpW;
        var top;
        if (thH > tpH) {
            top = props.pointY + props.offset.top - (thH - tpH) / 2;
        } else {
            top = props.pointY + props.offset.top;
        }
        this.setState({
            left: left,
            top: top
        })
    }

    componentDidMount(e) {
        console.log('info mount')
        this.judgeTagPositon()
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log(nextProps, nextState)
        if (nextState.top != this.state.top || nextState.active != this.state.active) {
            console.log('a')
            //this.judgeTagPositon(this)
            return true
        } else {
            console.log('b')
            return false;
        }
    }


    componentDidUpdate(e) {
        console.log('info updae')
        this.judgeTagPositon(this)
    }

    taggedHandleClick = (e) => {
        e.stopPropagation();
        this.setState({
            active: true
        })
    };

    completeHandleClick = (e) => {
        e.stopPropagation();
        this.setState({
            active: false,
            title: this.refs.editInput.value
        });
        //this.judgeTagPositon();
    };

    editInputHandleChange = (event) => {
        const length = event.target.value.length;
        if (length > 10) {
            alert('字数过多')
        }
    };
    linkHandleClick = (e)=> {
        e.stopPropagation();
        const taggedItemContainer = this.refs.taggedItemContainer;
    }

    removeHandleClick = (e)=> {
        const handler = this.props.handleDelTag;
        if (handler) handler(e);
    }


    render() {
        const props = this.props;
        const state = this.state;
        const title = state.title;
        const pointStyle = {
            left: props.pointX,
            top: props.pointY,
            position: 'absolute'
        };
        console.log(state.left, state.top)
        const infoStyle = {
            left: state.left,
            top: state.top,
            position: 'absolute'
        };
        var taggedClass = '';
        var taggedHover;
        if (props.edit) {
            taggedClass = 'edit';
            taggedHover = (
                <div style={infoStyle} ref="taggedHover" className="tagged-item-hover">
                    <span className="show-title">{title}</span>
                    <i onClick={this.removeHandleClick.bind(null,this.props.index)} className="icon iconfont delete-tag">&#xe600;</i>
                    <input onChange={this.editInputHandleChange} type="text" ref="editInput" className="edit-input"/>
                    <div className="icon-container"><i onClick={this.linkHandleClick}
                                                       className="icon iconfont iconfont_text">&#xe601;</i></div>
                    <div className="complete-tags" onClick={this.completeHandleClick}>添加标签</div>
                </div>
            )
        } else {
            taggedHover = (
                <span style={infoStyle} ref="taggedHover" className="tagged-item-hover">{title}</span>
            )
        }
        let classes = classNames('tagged-item-container info ' + taggedClass, {active: this.state.active});
        return (
            <div className={classes} key={props.index}
                 onClick={this.taggedHandleClick} ref="taggedItemContainer">
                <span style={pointStyle} ref="taggedPoint" className="tagged-item"></span>
                {taggedHover}
            </div>

        );
    }
}
