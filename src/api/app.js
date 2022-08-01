/* eslint-disable global-require */
const debug = require('debug')('app:koa-app');
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const KoaLogger = require('koa-logger');
const respond = require('koa-respond');
const helmet = require('koa-helmet');
const serve = require('koa-static');
const cors = require('@koa/cors');
const { join } = require('path');

const ComponentsRouter = require('./components/router');

const app = new Koa();

const {
  SERVER_PROXY: SERVERPROXY,
  NODE_ENV = 'development',
} = process.env;

if (SERVERPROXY === 'true') {
  debug('App behind proxy: %s', SERVERPROXY);
  app.proxy = true;
} else {
  app.use(serve(join(__dirname, './public'), {
    defer: true,
  }));
}

if (NODE_ENV !== 'production') {
  debug('Node env: %s', NODE_ENV);
  app.use(KoaLogger());
}

app.use(helmet());
app.use(respond({
  statusMethods: {
    conflict: 409,
  },
}));

/* CORS */
app.use(cors({
  allowHeaders: ['Authorization'],
}));

app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror(err, ctx) {
    return ctx.throw(422, {
      type: 'Server/JSONParseError',
      message: 'The body is in bad syntax. Please verify it.',
    });
  },
}));

/* Get router */
app.use(ComponentsRouter.allowedMethods());
app.use(ComponentsRouter.routes());

module.exports = app;
