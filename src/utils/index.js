'use strict';

const { responseErrors } = require('../config');

module.exports.getAuthTokenFromHeader = (authorization) => {
    if (typeof authorization !== 'string' || !authorization.startsWith('Bearer')) {
        return false;
    }
    const split = authorization.split(' ');
    if (split.length !== 2) {
        return false;
    }
    const token = split[1];
    if (typeof token !== 'string' || token.trim().length < 1) {
        return false;
    }
    return token;
};

module.exports.getResponseError = (error) => {
    if (error && error.code in responseErrors) {
        return responseErrors[error.code];
    }
    return responseErrors['default'];
};