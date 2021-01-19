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
    },
    '/fr/': {
      lang: 'es-ES',
      name: 'Français',
      title: info.name,
      description: 'La forma más simple de integrar drag en Vue.js'
    },
    '/it/': {
      lang: 'es-ES',
      name: 'Italiano',
      title: info.name,
      description: 'La forma más simple de integrar drag en Vue.js'
    },
    '/ch/': {
      lang: 'es-ES',
      name: 'Chino',
      title: info.name,
      description: 'La forma más simple de integrar drag en Vue.js'
    }
  },

  themeConfig: {
    locales: {
      '/': {
        label: 'English',
        editLinkText: 'Edit this page',
        nav: [
          { text: 'Docs', link: '/installation.html' },
          { text: 'Playground', link: '/playground.html' }
        ]
      },

      '/es/': {
        label: 'Español',
        editLinkText: 'Editar esta página',
        nav: [
          { text: 'Docs', link: '/es/installation.html' },
          { text: 'Patio', link: '/es/playground.html' }
        ]
      }
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
