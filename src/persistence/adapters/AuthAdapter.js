'use strict';

const AuthError = require('../errors/AuthError');

module.exports = class AuthAdapter {
    constructor({
        appAuth,
        adminAuth
    }) {
        this.appAuth = appAuth;
        this.adminAuth = adminAuth;
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
            const { uid } = result.user;
            return await this.adminAuth.createCustomToken(uid);
        } catch (e) {
            throw new AuthError(e);
        }
    }
};
