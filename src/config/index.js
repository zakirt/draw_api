'use strict';

module.exports.firebaseErrors = {
    'default': {
        status: 500,
        message: 'We are experiencing technical difficulties. Please try again later.'
    },
    'auth/email-already-exists': {
        status: 409,
        message: 'The email address is already in use by another account.'
    },
    'auth/email-already-in-use': {
        status: 409,
        message: 'The email address is already in use by another account.'
    },
    'auth/wrong-password': {
        status: 401,
        message: 'Invalid password.'
    },
    'auth/weak-password': {
        status: 409,
        message: 'Password should be at least 6 characters.'
    }
};
