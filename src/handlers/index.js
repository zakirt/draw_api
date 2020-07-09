'use strict';

const { fromFirebaseError, getAuthTokenFromHeader } = require('../utils');
const { AuthService } = require('../services');

const authService = new AuthService();

module.exports.topErrorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        const error = fromFirebaseError(e);
        ctx.response.status = error.status;
        ctx.response.body = error;
    }
};

module.exports.requireAuth = async (ctx, next) => {
    const { headers } = ctx.request;
    const token = getAuthTokenFromHeader(headers.authorization);
    if (!token) {
        ctxThrow('auth/invalid-custom-token');
    }
    try {
        await authService.verifyJwtToken(token);
        next();
    } catch (e) {
        throw e;
    }
};