'use strict';

/**
 * Custom object for handling database operations related errors.
 * Reference {@link https://rclayton.silvrback.com/custom-errors-in-node-js}
 */
module.exports = class RepositoryError extends Error {
    constructor(error) {
        super(error.message);
        this.name = this.constructor.name;
        this.code = error.code;
        Error.captureStackTrace(this, this.constructor);
    }
};