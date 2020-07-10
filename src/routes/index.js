'use strict';

const Router = require('koa-router');
const { requireAuth } = require('../handlers');
const { loginUser, logoutUser, registerUser } = require('../controllers/userController');
const { saveDrawing } = require('../controllers/drawController');

const router = new Router();

// User routes
router.post('/user/login', loginUser);
router.post('/user/logout', requireAuth, logoutUser);
router.put('/user/register', registerUser);

// Drawing routes
router.put('/drawing/save', requireAuth, saveDrawing);

module.exports = router;