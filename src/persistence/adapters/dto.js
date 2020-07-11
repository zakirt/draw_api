'use strict';

module.exports.drawingDtoCollectionToModel = (dtoCollection) => {
    const keys = Object.keys(dtoCollection);
    const drawingModels = [];
    for (let i = 0, len = keys.length; i < len; ++i) {
        const drawingId = keys[i];
        const drawing = dtoCollection[drawingId];
        drawing.drawingId = drawingId;
        delete drawing.creatorId; // don't expose user IDs in collections
        drawingModels.push(drawing);
    }
    return drawingModels;
};