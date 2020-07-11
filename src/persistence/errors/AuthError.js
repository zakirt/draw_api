'use strict';

/**
 * Custom object for handling authentication related errors.
 * Reference {@link https://rclayton.silvrback.com/custom-errors-in-node-js}
 */
module.exports = class AuthError extends Error {
    constructor(error) {
        super(error.message);
        this.name = this.constructor.name;
        this.code = error.code;
        Error.captureStackTrace(this, this.constructor);
    }
};