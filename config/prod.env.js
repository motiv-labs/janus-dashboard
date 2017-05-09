module.exports = {
  NODE_ENV: '"production"',
  USE_MOCKS: false,
  GATEWAY_BASE_URI: `"${process.env.GATEWAY_BASE_URI}"`,
  GATEWAY_USERNAME: `${process.env.GATEWAY_USERNAME}`,
  GATEWAY_PASSWORD: `${process.env.GATEWAY_PASSWORD}`
};
