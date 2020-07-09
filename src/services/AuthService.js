'use strict';

const { getAuthTokenFromHeader } = require('../utils');

module.exports = class Auth {
    constructor(appAuth, adminAuth) {
        this.appAuth = appAuth;
        this.adminAuth = adminAuth;
    }

    async verifyJwtToken(token) {
        return this.adminAuth.verifyIdToken(token);
    }

    async createUserWithEmailAndPassword(email, password) {
        try {
            const result = await this.appAuth.createUserWithEmailAndPassword(email, password);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async signInWithEmailAndPassword(email, password) {
        try {
            const result = await this.appAuth.signInWithEmailAndPassword(email, password);
            return result;
        } catch (e) {
            throw e;
        }
    }
};