// tslint:disable:variable-name
import * as path from 'path';
import * as webpack from 'webpack';

const resolvePath = path.resolve.bind(path, __dirname, '..');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const autoprefixer = require('autoprefixer');

const extractCssPlugin = new ExtractTextPlugin({
  filename: 'bundle.[name].[chunkhash].css',
  allChunks: true,
  ignoreOrder: true,
});

const base: webpack.Configuration = {
  context: resolvePath(),

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: extractCssPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer({ browsers: ['last 2 versions'] }),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.d\.ts$/, // these are only useful for tsc
        use: {
          loader: 'null-loader',
        },
      },
    ],
  },

  plugins: [
    new ProgressBarPlugin(),

    new webpack.ProvidePlugin({
      html: ['snabbdom-jsx', 'html'], // global 'html' JSX factory
    }),
    extractCssPlugin,

    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: '[name].[hash].js',
      minChunks: 2,
      minSize: 8 * 1024,
    }),
  ],
};

const htmlPlugin = new HtmlWebpackPlugin({
  template: 'src/index.html',
});

module.exports = { base, resolvePath, htmlPlugin };
