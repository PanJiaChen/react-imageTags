import React, { Component } from 'react';
import classNames from 'classnames';
import utils from './utils';
import Draggable from 'react-draggable';

export default class Info extends Component {

    state = {
        active: true,
        showLink: true,
        title: this.props.source.title,
        link: '#',
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

    componentDidMount() {
        console.log('info mount');
        this.judgeTagPositon();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.top != this.state.top || nextState.active != this.state.active || nextState.pointControlledPosition != this.state.pointControlledPosition || nextState.showLink != this.state.showLink) {
            console.log('a');
            return true;
        }
        console.log('b');
        return false;
    }

    componentDidUpdate() {
        console.log('info updae');
        this.judgeTagPositon();
    }


    onControlledDrag = (e, position) => {
        const target = this.refs.taggedItemContainer;
        let hoverOnLeft = utils.inArr(target.classList.value, 'on_left');
        const { x, y } = position;
        let hoverX = x;

        const props = this.props;
        const taggedHover = this.refs.taggedHover;
        const taggedPoint = this.refs.taggedPoint;

        const thW = taggedHover.offsetWidth;

        const tpW = taggedPoint.offsetWidth;

        const tpLeft = utils.getElementLeft(taggedPoint);
        const thLeft = utils.getElementLeft(taggedHover);
        const left = props.pointX + props.offset.left + tpW + x;

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

        this.setState({
            pointControlledPosition: {x, y},
            hoverControlledPosition: {
                x: hoverX,
                y
            },
            hoverOnLeft
        });
    };


    judgeTagPositon() {
        console.log('judgeTagPositon');
        const props = this.props;
        const target = this.refs.taggedItemContainer;
        let hoverOnLeft = utils.inArr(target.classList.value, 'on_left');
        const taggedHover = this.refs.taggedHover;
        const taggedPoint = this.refs.taggedPoint;
        const thH = taggedHover.offsetHeight;
        const thW = taggedHover.offsetWidth;

        const tpH = taggedPoint.offsetHeight;
        const tpW = taggedPoint.offsetWidth;

        let left = props.pointX + props.offset.left + tpW / 2;
        let top;
        if (thH > tpH) {
            top = props.pointY + props.offset.top - (thH - tpH) / 2;
        } else {
            top = props.pointY + props.offset.top;
        }

        console.log(utils.getElementransformLeft(taggedPoint));
        if (thW + left + utils.getElementransformLeft(taggedPoint) > props.positionInfo.offsetWidth) {
            left = props.pointX - thW - tpW / 2;
            hoverOnLeft = true;
        } else {
            hoverOnLeft = false;
        }

        this.setState({
            left,
            top,
            hoverOnLeft
        });
    }

    stopHandleClick = (e) => {
        e.stopPropagation();
    };

    taggedHandleClick = (e) => {
        e.stopPropagation();
        this.setState({
            active: true
        });
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
            title: this.refs.editInput.value,
            link: this.refs.linkInput.value
        });
    };

    editInputHandleChange = (event) => {
        const length = event.target.value.length;
        if (length > 20) {
            alert('字数过多');
        }
    };
    linkHandleClick = (e) => {
        e.stopPropagation();
        /* const taggedItemContainer = this.refs.taggedItemContainer; */
        this.setState({
            showLink: !this.state.showLink
        });
    };

    removeHandleClick = (e) => {
        const handler = this.props.handleDelTag;
        if (handler) handler(e);
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
        let taggedHover;
        let showTitle;
        if (props.couldEdit) {
            const linkClasses = classNames({show: state.showLink});
            taggedHover = (
                <div style={infoStyle} ref="taggedHover" className="tagged-item-hover" onClick={this.taggedHandleClick}>
                    <span className="show-title">{title}</span>
                    <i onClick={this.removeHandleClick.bind(null, this.props.index)}
                       className="icon iconfont delete-tag">&#xe600;</i>
                    <input type="text" ref="editInput" className="edit-input"/>
                    <div className={'icon-container link ' + linkClasses}>
                        <i onClick={this.linkHandleClick}
                           className="icon iconfont iconfont_text">&#xe601;</i>
                    </div>
                    <input type="text" ref="linkInput" className={'link-input ' + linkClasses}/>
                    <div className="complete-tags" onClick={this.completeHandleClick}>添加标签</div>
                </div>
            );
        } else {
            if (state.showLink) {
                showTitle = (
                    <a target="_blank" href={state.link} className="hasLink">{title}
                        <i className="icon iconfont">&#xe601;</i>
                    </a>
                );
            } else {
                showTitle = (
                    <span className="hasLink">{title}</span>
                );
            }
            taggedHover = (
                <span style={infoStyle} ref="taggedHover" className="tagged-item-hover">{showTitle}</span>
            );
        }

        const classes = classNames('tagged-item-container info ', {could_edit: props.couldEdit}, {edit: this.state.active && props.couldEdit}, {on_left: this.state.hoverOnLeft});

        return (
            <div className={classes} key={props.index} onClick={this.stopHandleClick} ref="taggedItemContainer">
                <Draggable onDrag={this.onControlledDrag} position={state.pointControlledPosition}
                           bounds=".tagged-main">
                    <span style={pointStyle} ref="taggedPoint" className="tagged-item"/>
                </Draggable>
                <Draggable cancel=".tagged-item-hover" position={state.hoverControlledPosition}>
                    {taggedHover}
                </Draggable>
            </div>
        );
    }
}
