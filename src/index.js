import React from 'react';
import ReactDOM from 'react-dom';
import ImageTagContainer from './tagged';
import './index.styl';

export default class ImageTag {
    constructor(options = {}) {
        this.parentDom = options.parentDom;
        this.settings = options.settings
    }

    init() {
        this.pageElem = (<ImageTagContainer {...this.settings} src="./images/test1.jpg" />)
        this.ImageTagContainer = ReactDOM.render(this.pageElem, this.parentDom);
        return this;
    }
}

// export
window.ImageTag = ImageTag;