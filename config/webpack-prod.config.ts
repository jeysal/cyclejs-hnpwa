// tslint:disable:variable-name
import * as webpack from 'webpack';

const { base, resolvePath, htmlPlugin } = require('./webpack-common.config');
const { babelLoaderRule } = require('./babel.config');

const webpackNodeExternals = require('webpack-node-externals');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const clientConfig: webpack.Configuration = {
  ...base,

  entry: resolvePath('src', 'client.ts'),

  output: {
    path: resolvePath('dist', 'static'),
    filename: '[name].[hash].js',
  },

  module: {
    ...base.module,
    rules: [babelLoaderRule({ browsers: ['> 2%'] }), ...base.module.rules],
  },

  plugins: [
    ...base.plugins,

    htmlPlugin,
    new FaviconsWebpackPlugin('./img/cyclejs.svg'),

    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};

const serverConfig: webpack.Configuration = {
  ...base,

  entry: resolvePath('src', 'server.ts'),

  output: {
    path: resolvePath('dist'),
    filename: '[name].js',
  },

  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [webpackNodeExternals()],

  module: {
    ...base.module,
    rules: [babelLoaderRule({ node: 'current' }), ...base.module.rules],
  },
};

module.exports = [clientConfig, serverConfig];
