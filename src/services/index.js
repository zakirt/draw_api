'use strict';

const { firebaseApp, firebaseAppAuth, firebaseAdminAuth } = require('../persistence/db');
const AuthAdapter = require('../persistence/adapters/AuthAdapter');
const DS = require('./DrawingService');
const User = require('./UserService');
const UnitOfWork = require('../persistence/UnitOfWork');

const dbContext = firebaseApp.database();
const unitOfWork = new UnitOfWork(dbContext);

module.exports.AuthService = singletonify(AuthAdapter, {
    appAuth: firebaseAppAuth,
    adminAuth: firebaseAdminAuth,
    unitOfWork
});

module.exports.DrawingService = singletonify(DS, unitOfWork);

module.exports.UserService = singletonify(User, unitOfWork);

function singletonify(targetFunc, ...funcArgs) {
    return new Proxy(targetFunc, {
        instance: null,
        construct(target, args) {
            if (!this.instance) {
                this.instance = new target(...funcArgs, ...args);
            }
            return this.instance;
        }
    });
}