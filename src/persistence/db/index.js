'use strict';

const firebase = require('firebase');
const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../../../secret/admin.json');
const { API_KEY } = require('../../../secret/firebaseConfig');

const firebaseApp = firebase.initializeApp({
    apiKey: API_KEY,
    databaseURL: 'https://draw-api.firebaseio.com/',
    projectId: 'draw-api',
});

module.exports.firebaseAdmin = firebaseAdmin.initializeApp({
    databaseURL: 'https://draw-api.firebaseio.com/',
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

module.exports.firebaseAdminAuth = firebaseAdmin.auth();

module.exports.firebaseApp = firebaseApp;

module.exports.firebaseAppAuth = firebaseApp.auth();