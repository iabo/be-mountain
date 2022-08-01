const { normalize } = require('path');
const dotEnv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { type } = require('os');

const globalEnv = dotEnv.config({
  path: normalize(`${__dirname}/../.env`),
});
dotenvExpand.expand(globalEnv);
console.log(process.env)

require('./database');
require('./api');
require('./vendor');
