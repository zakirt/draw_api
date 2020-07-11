'use strict';

const { DrawingService } = require('../services');
const Drawing = require('../models/Drawing');

const drawingService = new DrawingService();

module.exports.listDrawings = async (ctx) => {
    try {
        const drawings = await drawingService.getListOfDrawings();
        ctx.body = {
            drawings
        };
    } catch (e) {
        ctx.throw(e);
    }
};

module.exports.saveDrawing = async (ctx) => {
    try {
        const { userId: creatorId } = ctx.state.user;
        const { dataUrl, isPrivate } = ctx.request.body;
        const drawing = new Drawing({
            creatorId,
            dateCreated: Date.now(),
            dataUrl,
            isPrivate
        });
        const res = await drawingService.saveDrawing(drawing);
        ctx.body = res;
    } catch (e) {
        ctx.throw(e);
    }
};

module.exports.deleteDrawing = async (ctx) => {
    try {
        const { id } = ctx.params;
        await drawingService.deleteDrawing(id);
        ctx.body = '';
    } catch (e) {
        ctx.throw(e);
    }
};