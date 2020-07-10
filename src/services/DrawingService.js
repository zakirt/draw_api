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
        } catch (e) {
            throw e;
        }
    }
};