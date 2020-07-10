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
            const result = await this.dbContext.push({
                userId,
                dataUrl,
                dateCreated
            });
            return {
                drawingId: result.key
            };
        } catch (e) {
            throw e;
        }
    }
};