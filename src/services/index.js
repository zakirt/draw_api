'use strict';

const { requireAuth, firebaseAuth: auth, fromFirebaseError, firebaseApp, drawingDbRef, firebaseDb } = require('../utils');
const Auth = require('../persistence/auth/Auth');

module.exports.AuthService = new Proxy(Auth, {
    instance: null,
    construct(target, args) {
        if (!this.instance) {
            this.instance = new target({
                appAuth: firebaseApp.auth(),
                adminAuth: auth
            }, ...args);
        }
        return this.instance;
    }
});