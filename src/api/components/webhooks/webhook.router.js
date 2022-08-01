const Router = require('@koa/router');
const controller = require('./webhook.controller');

const router = new Router();

router.post('/solidfi', controller.solifiWebhook);

module.exports = router;
