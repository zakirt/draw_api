'use strict';

const { getResponseError, getAuthTokenFromHeader } = require('../utils');
const { AuthService } = require('../services');
const { Validator } = require('../validators');
const { createJsonApiError } = require('../serializers');

const authService = new AuthService();

module.exports.topErrorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.error(e);
        const error = getResponseError(e);
        ctx.response.status = error.status;
        const jsonApiErrors = createJsonApiError(error.jsonApi);
        ctx.response.body = jsonApiErrors;
    }
};

module.exports.requireAuth = async (ctx, next) => {
    const { headers } = ctx.request;
    const token = getAuthTokenFromHeader(headers.authorization);
    const validator = new Validator({ token }, {
        token: 'required|jwtToken'
    });
    const matched = await validator.check();
    if (!matched) {
        throwAuthError(validator.errors.token.message);
    }
    const result = await authService.verifyJwtToken(token);
    ctx.state.user = result;
    await next();
};

function throwAuthError(message) {
    const e = new Error(message);
    e.code = 'auth/invalid-custom-token';
    throw e;
}