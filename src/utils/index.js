'use strict';

const firebase = require('firebase');
const admin = require('firebase-admin');
const { firebaseErrors } = require('../config');
const serviceAccount = require('../../secret/admin.json');
const { API_KEY } = require('../../secret/firebaseConfig');

module.exports.firebaseAdmin = admin.initializeApp({
    databaseURL: 'https://draw-api.firebaseio.com/',
    credential: admin.credential.cert(serviceAccount)
});

module.exports.firebaseAuth = this.firebaseAdmin.auth();

module.exports.fromFirebaseError = (error) => {
    if (error && error.code in firebaseErrors) {
        return firebaseErrors[error.code];
    }
    return firebaseErrors['default'];
};

const app = firebase.initializeApp({
    apiKey: API_KEY,
    databaseURL: 'https://draw-api.firebaseio.com/',
    projectId: 'draw-api',
});

module.exports.firebaseApp = app;

module.exports.requireAuth = async (ctx, next) => {
    const ctxThrow = (message) => ctx.throw(401, 'unauthorized', {
        message
    });
    const { headers } = ctx.request;
    const token = getAuthTokenFromHeader(headers.authorization);
    if (!token) {
        ctxThrow();
    }
    try {
        await admin.auth().verifyIdToken(token);
        next();
    } catch (e) {
        ctxThrow(e.message);
    }
};

function getAuthTokenFromHeader(authorization) {
    if (typeof authorization !== 'string' || !authorization.startsWith('Bearer')) {
        return false;
    }
    const split = authorization.split(' ');
    if (split.length !== 2) {
        return false;
    }
    const token = split[1];
    if (typeof token !== 'string' || token.trim().length < 1) {
        return false;
    }
    return token;
}

const db = app.database();

module.exports.firebaseDb = db;

module.exports.getAuthTokenFromHeader = getAuthTokenFromHeader;