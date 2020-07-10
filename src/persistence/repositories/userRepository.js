'use strict';

module.exports = class UserRepository {
    constructor(dbContext) {
        this.dbContext = dbContext;
    }

    async writeUserData(userId, userData) {
        try {
            return await this.dbContext.child(userId).set(userData);
        } catch (e) {
            throw e;
        }
    }
};