const {resolve} = require('path')
const {name} = require('./package.json')

module.exports = (options, context) => {
  return {
    name,
    define() {
      return {
        GITALK_CONFIG: options
      };
    },
    enhanceAppFiles: resolve(__dirname, './enhanceApp.js')
  };
}
