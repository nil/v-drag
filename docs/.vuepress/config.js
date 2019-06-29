/* eslint-disable global-require */
const pkg = require('../../package.json');

module.exports = {
  title: pkg.name,

  locales: {
    '/': {
      lang: 'en-US',
      name: 'English',
      description: pkg.description
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
        testPlaygroundLabel: 'Try it on playground',
        prevPageLabel: 'Previous page',
        nextPageLabel: 'Next page',
        editPageLabel: 'Edit this page on GitHub',
        lastUpdatedLabel: 'Last updated',

        footerLicenseText: 'Released under the',
        footerLicenseName: 'MIT License',
        footerLicenseLink: `${pkg.homepage}/blob/master/LICENSE`,

        nav: [
          {
            text: 'Docs',
            link: '/installation/'
          },
          {
            text: 'Playground',
            link: '/playground/'
          },
          {
            text: 'Contribute',
            link: '/contribute/'
          }
        ],

        sidebar: [
          {
            link: '/installation/',
            group: true
          },
          {
            title: 'Options',
            link: '/options/',
            children: [
              '/options/axis',
              '/options/handle',
              '/options/shortcuts'
            ]
          }
        ]
      },

      '/es/': {
        localePickerLabel: 'Idioma',
        quickStartHeading: 'Inicio rápido',
        quickStartLink: 'Ir a instalación',
        featuresLabel: 'Características',
        learnMoreLabel: 'Aprender más',
        testPlaygroundLabel: 'Provar en el patio',
        prevPageLabel: 'Página anterior',
        nextPageLabel: 'Página siguiente',
        editPageLabel: 'Editar esta página en GitHub',
        lastUpdatedLabel: 'Última actualicación',

        footerLicenseText: 'Publicado bajo la',
        footerLicenseName: 'Licencia MIT',
        footerLicenseLink: `${pkg.homepage}/blob/master/LICENSE`,

        nav: [
          {
            text: 'Docs',
            link: '/es/installation/'
          },
          {
            text: 'Patio',
            link: '/es/playground/'
          },
          {
            text: 'Contribuir',
            link: '/es/contribute/'
          }
        ],

        sidebar: [
          {
            link: '/es/installation/',
            group: true
          },
          {
            title: 'Options',
            link: '/es/options/',
            children: [
              '/es/options/axis',
              '/es/options/handle',
              '/es/options/shortcuts'
            ]
          }
        ]
      }
    }
  },

  postcss: {
    plugins: [
      require('postcss-import'),
      require('postcss-nested'),
      require('postcss-modular-scale'),
      require('postcss-css-variables'),
      require('postcss-calc')
    ]
  }
};
