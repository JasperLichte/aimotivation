function textListToArray(text) {
    return text.split("\n").filter(t => t.length > 5);
}

module.exports = textListToArray;
