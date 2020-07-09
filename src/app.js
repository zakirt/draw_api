'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const { topErrorHandler } = require('./handlers');

const app = new Koa();
const PORT = process.env.PORT || 3000;
const JSON_API_HEADER = 'application/vnd.api+json';

app.use(topErrorHandler);

app.use(bodyParser({
    // extendTypes: {
    //     json: [JSON_API_HEADER]
    // },
    // onerror({ message }, ctx) {
    //     throwResponseError({
    //         code: '1007',
    //         errorDetail: message,
    //         ctx
    //     });
    // }
}));

app.use(router.routes());
app.listen(PORT);