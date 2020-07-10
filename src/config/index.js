'use strict';

module.exports.responseErrors = {
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
        message: 'Authentication required.'
    },
    'auth/weak-password': {
        status: 409,
        message: 'Password should be at least 6 characters.'
    },
    'auth/invalid-custom-token': {
        status: 401,
        message: 'Authentication required.'
    },
    'malformed-request': {
        status: 400,
        message: 'Malformed, or invalid request.'
    },
    'PERMISSION_DENIED': {
        status: 500,
        message: 'We are experiencing technical difficulties. Please try again later.'
    }
};
