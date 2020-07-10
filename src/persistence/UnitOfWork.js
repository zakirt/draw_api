'use strict';

const DrawingRepository = require('./repositories/DrawingRepository');
const UserRepository = require('./repositories/UserRepository');

module.exports = class UnitOfWork {
    constructor(dbContext) {
        const ref = dbContext.ref();

        // Read only properties
        Object.defineProperties(this, {
            drawings: {
                value:  new DrawingRepository(ref.child('drawings'))
            },
            users: {
                value: new UserRepository(ref.child('users'))
            }
        });
    }
};