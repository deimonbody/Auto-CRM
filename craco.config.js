/* eslint-disable */
const {CracoAliasPlugin} = require('react-app-rewire-alias')

const aliasMap = {
  '@src': './src',
  '@images': "./src/images"
}

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {alias: aliasMap}
    },
  ]
}