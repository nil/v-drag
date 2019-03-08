const info = require('../../package.json');

module.exports = {
  title: info.name,

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
      description: 'La forma más simple de integrar drag en Vue.js'
    }
  },

  themeConfig: {
    locales: {
      '/': {
        localePickerLabel: 'Language',
        quickStartHeading: 'Quick start',
        quickStartLink: 'Go to installation',
        featuresLabel: 'Features',
        learnMoreLabel: 'Learn more',
        testPlaygroundLabel: 'Test on playground',

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
        localePickerLabel: 'Idioma',
        quickStartHeading: 'Inicio rápido',
        quickStartLink: 'Ir a instalación',
        featuresLabel: 'Características',
        learnMoreLabel: 'Aprender más',
        testPlaygroundLabel: 'Provar en el patio',

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
