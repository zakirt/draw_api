'use strict';

const { DrawingService } = require('../services');

const drawingService = new DrawingService();

module.exports.saveDrawing = async (ctx) => {
    try {
        const { userId } = ctx.state.user;
        const drawing = ctx.request.body;
        drawing.userId = userId;
        const res = await drawingService.saveDrawing(drawing);
        ctx.body = 'Drawing saved.';
    } catch (e) {
        ctx.throw(e);
    }
};