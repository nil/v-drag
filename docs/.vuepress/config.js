const info = require('../../package.json');

module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      name: 'English',
      title: info.name,
      description: info.description
    },
    '/es/': {
      lang: 'es-ES',
      name: 'Español',
      title: info.name,
      description: 'La forma más simple de integrar drag en Vue.js'
    }
  },

  postcss: {
    plugins: [
      require('postcss-import'),
      require('postcss-custom-media'),
      require('postcss-nested'),
      require('postcss-modular-scale'),
      require('postcss-css-variables'),
      require('postcss-calc')
    ]
  }
}
