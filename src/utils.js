const Utils = {};
Utils.getElementLeft = function (element) {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
};

Utils.getElementransformLeft = function (element) {
    const reg = /\-?[0-9]+\.?[0-9]*/g;
    const transform = element.style.webkitTransform.match(reg);
    let transformLeft;
    if (transform) {
        transformLeft = +transform[0];
    } else {
        transformLeft = 0;
    }
    return transformLeft;
};

Utils.getElementTop = function (element) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
};

Utils.isEmpty = function (obj) {
    // null and undefined are "empty"
    if (Object.keys(obj).length === 0) {
        return true;
    }
    return false;
};

Utils.inArr = function (arr, name) {
    if (arr.indexOf(name) != -1) {
        return true;
    }
    return false;
};

export default Utils;
