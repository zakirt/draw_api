'use strict';

const { AuthService, UserService } = require('../services');
const User = require('../models/User');

const authService = new AuthService();
const userService = new UserService();

const userValidationConfig = {
    email: 'required|email',
    password: 'required|minLength:6|maxLength:20'
};
const registerUserValidationConfig = {
    displayName: 'required|maxLength:100',
    ...userValidationConfig
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
        await ctx.validate(registerUserValidationConfig, ctx.request.body);
        const { email, password, displayName } = ctx.request.body;
        const { userId } = await authService.createUserWithEmailAndPassword(email, password);
        const user = new User({
            email,
            displayName,
            dateCreated: Date.now()
        });
        await userService.createNewUser(userId, user);
        ctx.body = {
            user
        };
    } catch (e) {
        ctx.throw(e);
    }
};
