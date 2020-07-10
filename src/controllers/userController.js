'use strict';

const { AuthService } = require('../services');

const authService = new AuthService();

const userValidationConfig = {
    email: 'required|email',
    password: 'required|minLength:6|maxLength:20'
};

module.exports.loginUser = async (ctx) => {
    try {
        await ctx.validate(userValidationConfig, ctx.request.body);
        const { email, password } = ctx.request.body;
        const token = await authService.signInWithEmailAndPassword(email, password);
        ctx.body = {
            email,
            token
        };
    } catch (e) {
        ctx.throw(e);
    }
};

module.exports.logoutUser = (ctx) => {
    ctx.body = 'Logout';
};

module.exports.registerUser = async (ctx) => {
    try {
        await ctx.validate(userValidationConfig, ctx.request.body);
        const { email, password } = ctx.request.body;
        const res = await authService.createUserWithEmailAndPassword(email, password);
        ctx.body = {
            user: {
                email: res
            }
        };
    } catch (e) {
        ctx.throw(e);
    }
};
