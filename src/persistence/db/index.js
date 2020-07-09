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
    credential: admin.credential.cert(serviceAccount)
});

module.exports.firebaseAdminAuth = firebaseAdmin.auth();

module.exports.firebaseApp = firebaseApp;

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