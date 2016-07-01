import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from'classnames';
import utils from './utils';
import Draggable from 'react-draggable';

export default class Info extends Component {

    state = {
        active: true,
        title: this.props.source.title,
        hoverOnLeft: false,
        left: 0,
        top: 0,
        pointControlledPosition: {
            x: 0,
            y: 0
        },
        hoverControlledPosition: {
            x: 0,
            y: 0
        }
    };

    constructor(props) {
        super(props);
    }

    judgeTagPositon() {
        console.log('judgeTagPositon');
        const props = this.props;
        let target = this.refs.taggedItemContainer;
        let hoverOnLeft = utils.inArr(target.classList.value, 'on_left');
        let isEdit = utils.inArr(target.classList.value, 'edit');
        const taggedHover = this.refs.taggedHover;
        const taggedPoint = this.refs.taggedPoint;
        const taggedHoverLeft = utils.getElementLeft(taggedHover) - props.positionInfo.offsetLeft;
        const thH = taggedHover.offsetHeight;
        const thW = taggedHover.offsetWidth;

        const tpH = taggedPoint.offsetHeight;
        const tpW = taggedPoint.offsetWidth;

        let left = props.pointX + props.offset.left + tpW;
        var top;
        if (thH > tpH) {
            top = props.pointY + props.offset.top - (thH - tpH) / 2;
        } else {
            top = props.pointY + props.offset.top;
        }
        //
        //if(props.pointX>props.positionInfo.offsetWidth/2){
        //    left = props.pointX - thW - tpW;
        //    hoverOnLeft = true;
        //}else{
        //    hoverOnLeft = false;
        //}


        //if (!hoverOnLeft) {
            console.log(thW, left)
            if (thW + left > props.positionInfo.offsetWidth) {
                left = props.pointX - thW - tpW;
                hoverOnLeft = true;
            }
        //}


        this.setState({
            left: left,
            top: top,
            hoverOnLeft: hoverOnLeft
        })
    }

    componentDidMount(e) {
        console.log('info mount')
        this.judgeTagPositon()
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log(nextProps, nextState)
        if (nextState.top != this.state.top || nextState.active != this.state.active || nextState.pointControlledPosition != this.state.pointControlledPosition) {
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
        this.judgeTagPositon()
    }

    stopHandleClick = (e) => {
        e.stopPropagation();
    };

    taggedHandleClick = (e) => {
        e.stopPropagation();
        this.setState({
            active: true
        })
        ;
    };

    completeHandleClick = (e) => {
        e.stopPropagation();
        const length = this.refs.editInput.value.length;
        if (length > 20) {
            alert('字数过多');
            return false;
        }
        this.setState({
            active: false,
            title: this.refs.editInput.value
        });
        //this.judgeTagPositon();
    };

    editInputHandleChange = (event) => {
        const length = event.target.value.length;
        if (length > 20) {
            alert('字数过多')
        }
    };
    linkHandleClick = (e)=> {
        e.stopPropagation();
        const taggedItemContainer = this.refs.taggedItemContainer;
    };

    removeHandleClick = (e)=> {
        const handler = this.props.handleDelTag;
        if (handler) handler(e);
    };

    onControlledDrag = (e, position)=> {

        let target = this.refs.taggedItemContainer;
        let hoverOnLeft = utils.inArr(target.classList.value, 'on_left');
        const {x, y} = position;
        let hoverX = x;
        let hoverY = y;

        const props = this.props;
        const taggedHover = this.refs.taggedHover;
        const taggedPoint = this.refs.taggedPoint;

        const thW = taggedHover.offsetWidth;

        const tpW = taggedPoint.offsetWidth;

        const tpLeft = utils.getElementLeft(taggedPoint)
        const thLeft = utils.getElementLeft(taggedHover)
        let left = props.pointX + props.offset.left + tpW + x;

        if (thW + left > props.positionInfo.offsetWidth) {
            if (thLeft > tpLeft) {
                hoverX = x - thW - tpW;
            }
            hoverOnLeft = true;
        } else {
            if (thLeft < tpLeft) {
                hoverX = x + thW + tpW;
            }
            hoverOnLeft = false;
        }

        //let left = props.pointX + props.offset.left  + x;
        //console.log(tpLeft,thLeft)
        //if(left>props.positionInfo.offsetWidth/2){
        //    if(thLeft>tpLeft){
        //        hoverX = x - thW - tpW;
        //    }
        //    hoverOnLeft =true;
        //}else{
        //    if(thLeft<tpLeft){
        //        hoverX = x +thW + tpW;
        //    }
        //    hoverOnLeft = false;
        //}

        this.setState({
            pointControlledPosition: {x, y},
            hoverControlledPosition: {
                x: hoverX,
                y: y
            },
            hoverOnLeft: hoverOnLeft
        });
    };


    render() {
        const props = this.props;
        const state = this.state;
        const title = state.title;
        const pointStyle = {
            left: props.pointX - 10,
            top: props.pointY - 10,
            position: 'absolute'
        };

        const infoStyle = {
            left: state.left,
            top: state.top - 10,
            position: 'absolute'
        };
        var taggedClass = '';
        var taggedHover;
        if (props.couldEdit) {
            taggedClass = 'could_edit';
            taggedHover = (
                <div style={infoStyle} ref="taggedHover" className="tagged-item-hover" onClick={this.taggedHandleClick}>
                    <span className="show-title">{title}</span>
                    <i onClick={this.removeHandleClick.bind(null,this.props.index)}
                       className="icon iconfont delete-tag">&#xe600;</i>
                    <input type="text" ref="editInput" className="edit-input"/>
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

        let classes = classNames('tagged-item-container info ' + taggedClass, {edit: this.state.active}, {on_left: this.state.hoverOnLeft});

        return (

            <div className={classes} key={props.index}
                 onClick={this.stopHandleClick} ref="taggedItemContainer">
                <Draggable position={state.pointControlledPosition} bounds=".tagged-main"
                           onDrag={this.onControlledDrag}><span
                    style={pointStyle} ref="taggedPoint" className="tagged-item"></span></Draggable>
                <Draggable cancel=".tagged-item-hover" position={state.hoverControlledPosition}
                >{taggedHover}</Draggable>
            </div>


        );
    }
}
