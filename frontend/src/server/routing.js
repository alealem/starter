'use strict';

const Router = require('koa-router');
const settings = require('./settings');

const router = new Router();

router.get('/*', async ctx => {
    return await ctx.render('index', {
        apiBaseUrl: settings.api.baseUrl,
        googleMapsKey: settings.googleMapsKey
    });
});

module.exports = router;
