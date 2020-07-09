'use strict';

const { AuthService } = require('../services');

const authService = new AuthService();

module.exports.loginUser = async (ctx) => {
    try {
        const { email, password } = ctx.request.body;
        await authService.signInWithEmailAndPassword(email, password);
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
