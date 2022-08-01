const Router = require('@koa/router');
const WebhookRouter = require('./webhooks/webhook.router');

const router = new Router();

router.get('/', function mainGet(ctx) {
  ctx.ok({
    name: 'Backend',
    version: '1.0.0',
  });
});

router.use('/webhooks', WebhookRouter.allowedMethods(), WebhookRouter.routes());

module.exports = router;
