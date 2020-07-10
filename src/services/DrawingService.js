'use strict';

const UnitOfWork = require('../persistence/UnitOfWork');

module.exports = class DrawingService {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }

    async saveDrawing(drawing) {
        try {
            return await this.unitOfWork.drawings.writeDrawing(drawing);
        } catch (e) {
            throw e;
        }
    }
};