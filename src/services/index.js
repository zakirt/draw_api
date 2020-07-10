'use strict';

const { firebaseAppAuth, firebaseAdminAuth } = require('../persistence/db');
const AuthAdapter = require('../persistence/adapters/AuthAdapter');

module.exports.AuthService = new Proxy(AuthAdapter, {
    instance: null,
    construct(target, args) {
        if (!this.instance) {
            this.instance = new target({
                appAuth: firebaseAppAuth,
                adminAuth: firebaseAdminAuth
            }, ...args);
        }
        return this.instance;
    }
});