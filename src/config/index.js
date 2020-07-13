'use strict';

module.exports.responseErrors = {
    'default': {
        status: 500,
        message: 'We are experiencing technical difficulties. Please try again later.',
        jsonApi: {
            code: '5001',
            status: '500',
            title: 'Server error.',
            detail: 'We are experiencing technical difficulties. Please try again later.'
        }
    },
    'auth/wrong-password': {
        status: 401,
        message: 'Authentication required.',
        jsonApi: {
            code: '2001',
            status: '401',
            title: 'Authenticaiton required.',
        }
    },
    'auth/invalid-custom-token': {
        status: 401,
        message: 'Authentication required.',
        jsonApi: {
            code: '2002',
            status: '401',
            title: 'Authentication required.',
        }
    },
    'auth/weak-password': {
        status: 409,
        message: 'Password should be at least 6 characters.',
        jsonApi: {
            code: '2003',
            status: '409',
            title: 'Weak password.',
            detail: 'Password should be at least 6 characters.'
        }
    },
    'auth/email-already-exists': {
        status: 409,
        message: 'The email address is already in use by another account.',
        jsonApi: {
            code: '2004',
            status: '409',
            title: 'The email address is already in use by another account.'
        }
    },
    'auth/email-already-in-use': {  // duplicates auth/email-already-exists
        status: 409,
        message: 'The email address is already in use by another account.',
        jsonApi: {
            code: '2004',
            status: '409',
            title: 'The email address is already in use by another account.',
        }
    },
    'auth/user-not-found': {
        status: 404,
        message: 'User account not found.',
        jsonApi: {
            code: '2005',
            status: '404',
            title: 'User account not found.',
        }
    },
    'resource-not-found': {
        status: 404,
        message: 'Specified resource not found.',
        jsonApi: {
            code: '3001',
            status: '404',
            title: 'Specified resource not found.',
        }
    },
    'malformed-request': {
        status: 400,
        message: 'Malformed, or invalid request.',
        jsonApi: {
            code: '4001',
            status: '400',
            title: 'Malformed, or invalid request.',
        }
    },
    'PERMISSION_DENIED': {
        status: 500,
        message: 'We are experiencing technical difficulties. Please try again later.',
        jsonApi: {
            code: '5002',
            status: '500',
            title: 'Server error.',
            detail: 'We are experiencing technical difficulties. Please try again later.'
        }
    }
};
