// tslint:disable:variable-name
import * as webpack from 'webpack';

const { base, resolvePath, htmlPlugin } = require('./webpack-common.config');
const { babelLoaderRule } = require('./babel.config');

const config: webpack.Configuration = {
  ...base,

  entry: resolvePath('src', 'client.ts'),

  module: {
    ...base.module,
    rules: [
      babelLoaderRule({ browsers: ['last 2 Chrome versions'] }),
      ...base.module.rules,
    ],
  },

  plugins: [htmlPlugin, ...base.plugins],

  devServer: {
    historyApiFallback: true,
    compress: true,
  },
};

module.exports = config;
