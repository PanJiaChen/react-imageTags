const Utils = {};
Utils.getElementLeft = function (element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
};

Utils.getElementransformLeft = function (element) {

    var reg=/\-?[0-9]+\.?[0-9]*/g;
    var transform=element.style.webkitTransform.match(reg);
    var transformLeft;
    if(transform){
        transformLeft=+transform[0];
    }else{
        transformLeft=0;
    }
    return transformLeft;
};

Utils.getElementTop = function (element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
};

Utils.isEmpty = function (obj) {

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

Utils.inArr=function(arr, name){
    if(arr.indexOf(name)!=-1){
        return true
    }else{
        return false
    }
}

export default Utils