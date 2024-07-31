function binaryToAscii(binaryStr) {
    return binaryStr.match(/.{1,8}/g).map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
}

module.exports = binaryToAscii;