function arrayToArrOfArrs(arr) {
    return arr.map(l => [...l.split('$')]);
}

module.exports = arrayToArrOfArrs;
