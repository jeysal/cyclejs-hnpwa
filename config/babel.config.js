const babelConfig = targets => ({
  presets: [
    [
      'env',
      {
        useBuiltIns: 'usage',
        targets: {
          targets,
        },
      },
    ],
    'typescript',
  ],
  plugins: [
    ['transform-react-jsx', { pragma: 'html' }],
    'transform-object-rest-spread',
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
