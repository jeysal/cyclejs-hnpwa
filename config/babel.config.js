const babelConfig = targets => ({
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        targets: {
          targets,
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-transform-react-jsx', { pragma: 'html' }],
    '@babel/plugin-proposal-object-rest-spread',
  ],
});

const babelLoaderRule = targets => ({
  test: /\.(j|t)sx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: babelConfig(targets),
  },
});

module.exports = { babelConfig, babelLoaderRule };
