const debug = require('debug')('app:database');
const Knex = require('knex').default;
const { Model } = require('objection');

const {
  NODE_ENV = 'development',
  DATABASE_CONNECTION,
} = process.env;

debug('Creating database connection...');
const knex = Knex({
  client: 'mysql2',
  connection: DATABASE_CONNECTION,
});

if (NODE_ENV !== 'production') {
  knex.on('query', (message) => debug(`[QUERY] ${message.sql}`));
}

// Knex instance to objection
Model.knex(knex);

// Object.defineProperty(knex, 'Model', Model);

debug('Connection to database...');
knex.select(knex.raw('1+1'))
  .then(() => {
    debug('Successfully connected to database.');
  }).catch((error) => {
    debug('Error on connecting to database.', error);
    process.nextTick(() => {
      process.exit(1);
    });
  });

module.exports = knex;
