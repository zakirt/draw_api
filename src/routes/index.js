'use strict';

const Router = require('koa-router');
const { requireAuth } = require('../handlers');
const { loginUser, logoutUser, registerUser } = require('../controllers/userController');
const { listDrawings, saveDrawing, deleteDrawing } = require('../controllers/drawingController');

const router = new Router();

// User routes
router.post('/user/login', loginUser);
router.post('/user/logout', requireAuth, logoutUser);
router.put('/user/register', registerUser);

// Drawing routes
router.get('/drawing/list', requireAuth, listDrawings);
router.put('/drawing/save', requireAuth, saveDrawing);
router.delete('/drawing/delete/:id', requireAuth, deleteDrawing);

module.exports = router;