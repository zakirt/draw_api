'use strict';

const { DrawingService } = require('../services');
const Drawing = require('../models/Drawing');

const drawingService = new DrawingService();

module.exports.saveDrawing = async (ctx) => {
    try {
        const { userId } = ctx.state.user;
        const { dataUrl, isPrivate } = ctx.request.body;
        const drawing = new Drawing({
            userId,
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