'use strict';

module.exports = class DrawingService {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }

    async getListOfDrawings() {
        return await this.unitOfWork.drawings.getPublicDrawings();
    }

    async getDrawing(drawingId) {
        const drawing = await this.unitOfWork.drawings.getDrawingById(drawingId);
        if (!drawing) {
            throwDrawingNotFoundError(`Could not locate drawing for ID ${drawingId}.`);
        }
        delete drawing.creatorId;
        return drawing;
    }

    async saveDrawing(drawing) {
        const user = await this.unitOfWork.users.getUserById(drawing.creatorId);
        if (!user) {
            throwDrawingNotFoundError(`Could not locate user for ID ${drawing.creatorId}.`);
        }
        drawing.creatorName = user.displayName;
        const { drawingId } = await this.unitOfWork.drawings.writeDrawing(drawing);
        await this.unitOfWork.users.addDrawingForUser(drawing.creatorId, drawingId);
        return {
            id: drawingId,
            dateCreated: drawing.dateCreated
        };
    }

    async deleteDrawing(drawingId, creatorId) {
        const drawing = await this.unitOfWork.drawings.getDrawingById(drawingId);
        if (!drawing) {
            throwDrawingNotFoundError(`Could not locate drawing for ID ${drawingId}.`);
        }
        if (drawing.creatorId !== creatorId) {
            throwDrawingNotFoundError(`Drawing ${drawingId} does not belong to user ${creatorId}.`);
        }
        await this.unitOfWork.drawings.deleteDrawingById(drawingId);
        await this.unitOfWork.users.removeDrawingFromUser(drawing.creatorId, drawingId);
    }
};

function throwDrawingNotFoundError(message) {
    const err = new Error(message);
    err.code = 'resource-not-found';
    err.status = 404;
    throw err;
}