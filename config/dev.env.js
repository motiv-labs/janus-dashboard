var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  USE_MOCKS: process.env.USE_MOCKS || false,
  GATEWAY_BASE_URI: process.env.GATEWAY_BASE_URI ? `"${process.env.GATEWAY_BASE_URI}"` : '"http://localhost:8081"',
  GATEWAY_USERNAME: process.env.GATEWAY_USERNAME ? `"${process.env.GATEWAY_USERNAME}"` : '"admin"',
  GATEWAY_PASSWORD: process.env.GATEWAY_PASSWORD ? `"${process.env.GATEWAY_PASSWORD}"` : '"admin"',
});
