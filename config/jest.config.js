module.exports = {
  coverageDirectory: 'coverage',
  globals: {
    html: require('snabbdom-jsx').html,
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  rootDir: '..',
  testRegex: '.*\\.(test|spec)\\.(j|t)sx?$',
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
    '\\.svg$': 'jest-file',
  },
  snapshotSerializers: ['pretty-format-snabbdom'],
};
