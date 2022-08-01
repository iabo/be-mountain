const knex = require('#database');

async function solifiWebhook(ctx) {
  const event = ctx.request.body;
  if (!event.eventType) {
    return ctx.badRequest({
      type: 'Webhook/MissingEventType',
      message: 'The event type is missing in the object.',
    });
  }
  if (!event.data) {
    return ctx.badRequest({
      type: 'Webhook/MissingData',
      message: 'The data property is missing in the object.',
    });
  }
  await knex.transaction(async function onTransaction(trx) {
    return trx('webhook_events').insert({
      eventType: event.eventType,
      eventId: event.data.id,
      data: JSON.stringify(event.data),
    });
  });
  return ctx.ok('OK');
}

module.exports = {
  solifiWebhook,
};
