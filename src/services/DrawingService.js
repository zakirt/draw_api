'use strict';

module.exports = class DrawingService {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }

    async getListOfDrawings() {
        return await this.unitOfWork.drawings.getMostRecentDrawings();
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

    async deleteDrawing(drawingId) {
        const drawing = await this.unitOfWork.drawings.deleteDrawingById(drawingId);
        if (!drawing) {
            throwDrawingNotFoundError(`Could not locate drawing for ID ${drawingId}.`);
        }
        await this.unitOfWork.users.removeDrawingFromUser(drawing.creatorId, drawingId);
    }
};

function throwDrawingNotFoundError(message) {
    const err = new Error(message);
    err.code = 'resource-not-found';
    err.status = 404;
    throw err;
}