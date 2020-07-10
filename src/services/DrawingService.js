'use strict';

const UnitOfWork = require('../persistence/UnitOfWork');

module.exports = class DrawingService {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }

    async saveDrawing(drawing) {
        try {
            const { drawingId } = await this.unitOfWork.drawings.writeDrawing(drawing);
            await this.unitOfWork.users.addDrawingForUser(drawing.userId, drawingId);
            return {
                id: drawingId,
                dateCreated: drawing.dateCreated
            };
        } catch (e) {
            throw e;
        }
    }

    async deleteDrawing(drawingId) {
        try {
            const drawing = await this.unitOfWork.drawings.deleteDrawingById(drawingId);
            if (!drawing) {
                throwDrawingNotFoundError(`Cound not locate drawing for ID ${drawingId}.`);
            }
            await this.unitOfWork.users.removeDrawingFromUser(drawing.userId, drawingId);
        } catch (e) {
            throw e;
        }
    }
};

function throwDrawingNotFoundError(message) {
    const err = new Error(message);
    err.code = 'resource-not-found';
    err.status = 404;
    throw err;
}