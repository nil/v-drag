/* eslint-disable global-require */
const info = require('../../package.json');

module.exports = {
  title: info.name,

  locales: {
    '/': {
      lang: 'en-US',
      name: 'English',
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
          { text: 'Docs', link: '/installation/' },
          { text: 'Playground', link: '/playground/' }
        ],

        sidebar: [
          '/installation/',
          {
            title: 'Options',
            link: '/options/',
            children: [
              '/options/axis',
              '/options/handle',
              '/options/shortcuts'
            ]
          },
          '/playground/'
        ]
      },

      '/es/': {
        localePickerLabel: 'Idioma',
        quickStartHeading: 'Inicio rápido',
        quickStartLink: 'Ir a instalación',
        featuresLabel: 'Características',
        learnMoreLabel: 'Aprender más',
        testPlaygroundLabel: 'Provar en el patio',

        nav: [
          { text: 'Docs', link: '/es/installation/' },
          { text: 'Patio', link: '/es/playground/' }
        ],

        sidebar: [
          '/es/installation/',
          {
            title: 'Options',
            link: '/es/options/',
            children: [
              '/es/options/axis',
              '/es/options/handle',
              '/es/options/shortcuts'
            ]
          },
          '/es/playground/'
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
};
