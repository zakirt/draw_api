'use strict';

module.exports = class DrawingRepository {
    constructor(dbContext) {
        this.dbContext = dbContext;
    }

    async writeDrawing({
        userId,
        dataUrl,
        dateCreated
    }) {
        try {
            return await this.dbContext.push({
                userId,
                dataUrl,
                dateCreated
            });
        } catch (e) {
            throw e;
        }
    }
};