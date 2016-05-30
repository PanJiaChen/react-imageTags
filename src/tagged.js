import React, { Component } from 'react';
import Title from './title.jsx';
import ImgContainer from './imgContainer.jsx'

export default class Tagged extends Component {

    render() {
        return (
            <div className="taggd-wrapper-container">
                <Title />
                <ImgContainer />
            </div>

        );
    }
}
