'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const { topErrorHandler } = require('./handlers');
const niv = require('./validators');

const app = new Koa();
const PORT = process.env.PORT || 3000;
const JSON_API_HEADER = 'application/vnd.api+json';

app.use(topErrorHandler);
app.use(bodyParser({
    extendTypes: {
        json: [JSON_API_HEADER]
    },
    onerror({ message }) {
        const e = new Error(message);
        e.code = 'malformed-request';
        throw e;
    }
}));
app.use(niv.koa());
app.use(router.routes());
app.listen(PORT);