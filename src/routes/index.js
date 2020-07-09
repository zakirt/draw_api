'use strict';

const Router = require('koa-router');
const { requireAuth } = require('../handlers');
const { loginUser, logoutUser, registerUser } = require('../controllers/userController');

const router = new Router();

// User routes
router.post('/user/login', loginUser);
router.post('/user/logout', requireAuth, logoutUser);
router.put('/user/register', registerUser);

router.put('/draw/save', requireAuth, (ctx) => {
    ctx.body = 'Save drawing';
});

module.exports = router;