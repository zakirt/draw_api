'use strict';

module.exports = class DrawingRepository {
    constructor(dbContext) {
        this.dbContext = dbContext;
    }

    async writeDrawing(drawing) {
        try {
            const result = await this.dbContext.push(drawing);
            return {
                drawingId: result.key
            };
        } catch (e) {
            throw e;
        }
    }

    async getDrawingById(drawingId) {
        try {
            const result = await this.dbContext.child(drawingId).once('value');
            return result.val();
        } catch (e) {
            throw e;
        }
    }

    async deleteDrawingById(drawingId) {
        try {
            const drawing = await this.getDrawingById(drawingId);
            if (drawing) {
                await this.dbContext.child(drawingId).remove();
            }
            return drawing;
        } catch (e) {
            throw e;
        }
    }
};