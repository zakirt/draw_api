'use strict';

const niv = require('node-input-validator');

const jwtTokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*/;

niv.extend('jwtToken', ({ value }) => {
    return jwtTokenRegex.test(value);
});

module.exports = niv;
