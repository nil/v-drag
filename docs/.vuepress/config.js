const info = require('../../package.json');

module.exports = {
  plugins: ['@vuepress/i18n-ui'],

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

  themeConfig: {
    locales: {
      '/': {
        label: 'English',
        editLinkText: 'Edit this page',
        nav: [
          { text: 'Docs', link: '/installation.html' },
          { text: 'Playground', link: '/playground.html' }
        ],
        sidebar: [
          '/',
          '/installation',
          '/options',
          ['/playground', 'Explicit link text']
        ],
      },

      '/es/': {
        label: 'Español',
        editLinkText: 'Editar esta página',
        nav: [
          { text: 'Docs', link: '/es/installation.html' },
          { text: 'Patio', link: '/es/playground.html' }
        ],
        sidebar: [
          '/es/',
          '/es/installation',
          '/es/options',
          ['/es/playground', 'Explicit link text']
        ],
      }
    }
  },
}
