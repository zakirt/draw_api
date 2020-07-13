'use strict';

const AuthError = require('../errors/AuthError');

module.exports = class AuthAdapter {
    constructor({
        appAuth,
        adminAuth,
        unitOfWork
    }) {
        this.appAuth = appAuth;
        this.adminAuth = adminAuth;
        this.unitOfWork = unitOfWork;
    }

    async verifyJwtToken(token) {
        try {
            const result = await this.appAuth.signInWithCustomToken(token);
            const { uid: userId, displayName, email } = result.user;
            return {
                userId,
                displayName,
                email
            };
        } catch (e) {
            throw new AuthError(e);
        }
    }

    async createUserWithEmailAndPassword(email, password) {
        try {
            const result = await this.appAuth.createUserWithEmailAndPassword(email, password);
            const { email: userEmail, uid: userId } = result.user;
            return {
                email: userEmail,
                userId
            };
        } catch (e) {
            throw new AuthError(e);
        }
    }

    async signInWithEmailAndPassword(email, password) {
        try {
            const result = await this.appAuth.signInWithEmailAndPassword(email, password);
            const user = result.user;
            const userId =  user.uid;
            const token = await this.adminAuth.createCustomToken(userId);
            const { displayName, dateCreated } = await this.unitOfWork.users.getUserById(userId);
            return {
                userId,
                token,
                email: user.email,
                displayName,
                dateCreated
            };
        } catch (e) {
            throw new AuthError(e);
        }
    }
};
