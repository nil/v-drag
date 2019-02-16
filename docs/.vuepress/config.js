const info = require('../../package.json');

module.exports = {
  title: info.name,
  description: info.description,

  themeConfig: {
    nav: [
      {
        text: 'Docs',
        link: 'https://google.com'
      },
      // ['https://google.com', `v${info.version}`],
      // ['https://google.com', 'github']
    ]
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
