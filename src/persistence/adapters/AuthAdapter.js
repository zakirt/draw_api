'use strict';

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
            throw e;
        }
    }

    async createUserWithEmailAndPassword(email, password) {
        try {
            const result = await this.appAuth.createUserWithEmailAndPassword(email, password);
            const { email: userEmail } = result.user;
            return userEmail;
        } catch (e) {
            throw e;
        }
    }

    async signInWithEmailAndPassword(email, password) {
        try {
            const result = await this.appAuth.signInWithEmailAndPassword(email, password);
            const { uid } = result.user;
            return await this.adminAuth.createCustomToken(uid);
        } catch (e) {
            throw e;
        }
    }
};
