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
        testPlaygroundLabel: 'Try it on playground',

        footerLicenseText: 'Released under the',
        footerLicenseName: 'MIT License',
        footerLicenseLink: `${info.homepage}/blob/master/LICENSE`,

        nav: [
          { text: 'Docs', link: '/installation/' },
          { text: 'Playground', link: '/playground/' },
          { text: 'Contribute', link: '/contribute/' }
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

        // footer: [
        //   {
        //     title: 'Docs',
        //     children: [
        //       '/installation/',
        //       '/options/',
        //       '/contribute/',
        //       '/playground/'
        //     ]
        //   },
        //   {
        //     title: 'Contribute',
        //     children: [
        //       { text: 'Go to GitHub', link: info.homepage },
        //       { text: 'Open an issue', link: info.bugs.url },
        //       { text: 'Edit this page', link: '/contribute/' },
        //       { text: 'Help translate', link: '/contribute/' }
        //     ]
        //   }
        // ]
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
          { text: 'Patio', link: '/es/playground/' },
          { text: 'Contribuir', link: '/es/contribute/' }
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
        ],

        footer: [
          {
            title: 'Docs',
            children: [
              '/es/installation/',
              '/es/options/',
              '/es/contribute/',
              '/es/playground/'
            ]
          },
          {
            title: 'Contribuir',
            children: [
              { text: 'Ir a GitHub', link: info.homepage },
              { text: 'Abrir un issue', link: info.bugs.url },
              { text: 'Editar esta página', link: '/es/contribute/' },
              { text: 'Ayudar a traducir', link: '/es/contribute/' }
            ]
          }
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
