'use strict';

const RepositoryError = require('../errors/RepositoryError');
const { drawingDtoCollectionToModel } = require('../adapters/dto');

const MAX_DRAWING_ENTRIES_TO_QUERY = 100;

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
            throw new RepositoryError(e);
        }
    }

    async getDrawingById(drawingId) {
        try {
            const result = await this
                .dbContext
                .child(drawingId)
                .once('value');
            return result.val();
        } catch (e) {
            throw new RepositoryError(e);
        }
    }

    async deleteDrawingById(drawingId) {
        try {
            const drawing = await this.getDrawingById(drawingId);
            if (drawing) {
                await this
                    .dbContext
                    .child(drawingId)
                    .remove();
            }
            return drawing;
        } catch (e) {
            throw new RepositoryError(e);
        }
    }

    async getMostRecentDrawings(limit = 10) {
        try {
            const result = await this
                .dbContext
                .orderByChild('dateCreated')
                .limitToFirst(Math.min(limit, MAX_DRAWING_ENTRIES_TO_QUERY))
                .once('value');
            const drawings = drawingDtoCollectionToModel(result.val());
            return drawings.reverse(); // until Firebase provide desc order sort
        } catch (e) {
            throw new RepositoryError(e);
        }
    }

    async getPublicDrawings(limit = 10) {
        try {
            const result = await this
                .dbContext
                .orderByChild('isPrivate')
                .equalTo(false)
                .limitToFirst(Math.min(limit, MAX_DRAWING_ENTRIES_TO_QUERY))
                .once('value');
            const drawings = drawingDtoCollectionToModel(result.val());
            return drawings;
        } catch (e) {
            throw new RepositoryError(e);
        }
    }
};