'use strict';

const Promise = require('bluebird');
const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const etag = require('koa-etag');
const mount = require('koa-mount');
const serve = require('koa-static');
const views = require('koa-views');
const conditional = require('koa-conditional-get');
const routing = require('./routing');
const settings = require('./settings');

var app = new Koa();
app.proxy = true;

app.use(compress());
app.use(helmet());
app.use(conditional());
app.use(etag());
app.use(bodyParser());

app.use(mount('/assets', serve('dist/assets', { maxage: settings.assets.maxAge })));
app.use(views(path.join(process.cwd(), 'dist'), { extension: 'ejs' }));

app.use(routing.routes());

module.exports = new Promise(resolve => {
    var server = app.listen(settings.server.port, settings.server.host, () => {
        console.log(`Listening on http://${server.address().address}:${server.address().port}`); // eslint-disable-line no-console
        resolve(server);
    });
});
