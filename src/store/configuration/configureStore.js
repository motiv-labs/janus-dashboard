// eslint-disable-next-line
if (process.env.NODE_ENV === 'production' || (location && location.hostname !== 'localhost')) {
  module.exports = require('./configureStore.prod.js');
} else {
  module.exports = require('./configureStore.dev.js');
}
