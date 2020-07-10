'use strict';

const { AuthService } = require('../services');

const authService = new AuthService();

module.exports.loginUser = async (ctx) => {
    try {
        await ctx.validate({
            email: 'required|email',
            password: 'required|minLength:6|maxLength:20'
        }, ctx.request.body);
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
        await authService.createUserWithEmailAndPassword('test@test3.com', '123');
    } catch (e) {
        ctx.throw(e);
    }
};
