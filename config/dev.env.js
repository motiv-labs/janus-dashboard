var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  USE_MOCKS: process.env.USE_MOCKS,
  GATEWAY_BASE_URI: process.env.GATEWAY_BASE_URI,
});
