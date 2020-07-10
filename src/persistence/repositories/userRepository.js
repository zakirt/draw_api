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

    async addDrawingForUser(userId, drawingId) {
        try {
            const updates = {
                [`/${userId}/drawings/${drawingId}`]: true
            };
            return await this.dbContext.update(updates);
        } catch (e) {
            throw e;
        }
    }

    async removeDrawingFromUser(userId, drawingId) {
        try {
            const updates = {
                [`/${userId}/drawings/${drawingId}`]: null
            };
            return await this.dbContext.update(updates);
        } catch (e) {
            throw e;
        }
    }
};