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
        const drawing = new Drawing({
            ...{
                creatorId,
                dateCreated: Date.now()
            }, ...ctx.request.body
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
        const { userId: creatorId } = ctx.state.user;
        await drawingService.deleteDrawing(id, creatorId);
        ctx.body = '';
    } catch (e) {
        ctx.throw(e);
    }
};