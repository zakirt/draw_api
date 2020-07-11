'use strict';

const RepositoryError = require('../errors/RepositoryError');

module.exports = class UserRepository {
    constructor(dbContext) {
        this.dbContext = dbContext;
    }

    async writeUserData(userId, userData) {
        try {
            return await this.dbContext.child(userId).set(userData);
        } catch (e) {
            throw new RepositoryError(e);
        }
    }

    async addDrawingForUser(userId, drawingId) {
        try {
            const updates = {
                [`/${userId}/drawings/${drawingId}`]: true
            };
            return await this.dbContext.update(updates);
        } catch (e) {
            throw new RepositoryError(e);
        }
    }

    async removeDrawingFromUser(userId, drawingId) {
        try {
            const updates = {
                [`/${userId}/drawings/${drawingId}`]: null
            };
            return await this.dbContext.update(updates);
        } catch (e) {
            throw new RepositoryError(e);
        }
    }

    async getUserById(userId) {
        try {
            const result = await this.dbContext.child(userId).once('value');
            return result.val();
        } catch (e) {
            new RepositoryError(e);
        }
    }
};