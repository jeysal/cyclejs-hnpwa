const { babelConfig } = require('./config/babel.config');

const config = babelConfig({ node: 'current' });

module.exports = config;
