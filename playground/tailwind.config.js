module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      '7xl': ['5.25rem', {
        letterSpacing: '-0.05em',
        lineHeight: '1',
      }],
      '6xl': ['4.4rem', {
        letterSpacing: '-0.05em',
        lineHeight: '1',
      }],
      '5xl': ['3.65rem', {
        letterSpacing: '-0.05em',
        lineHeight: '1.1',
      }],
      '4xl': ['3.05rem', {
        letterSpacing: '-0.04em',
        lineHeight: ' 1.1',
      }],
      '3xl': ['2.1rem', {
        letterSpacing: '-0.04em',
        lineHeight: '1.1',
      }],
      '2xl': ['1.75rem', {
        letterSpacing: '-0.04em',
        lineHeight: '1.2',
      }],
      xl: ['1.45rem', {
        letterSpacing: '-0.04em',
        lineHeight: '1.25',
      }],
      l: ['1.2rem', {
        letterSpacing: '-0.03em',
        lineHeight: '1.3',
      }],
      m: ['1rem', {
        letterSpacing: '-0.02em',
        lineHeight: '1.4',
      }],
      s: ['0.85rem', {
        letterSpacing: '-0.02em',
        lineHeight: '1.4',
      }],
      xs: ['0.7rem', {
        letterSpacing: '-0.02em',
        lineHeight: '1.4',
      }],
    },
    boxShadow: {
      outer: '0px 1px 0px #F1F5F9',
      DEFAULT: '0px 1px 0px #F1F5F9, inset 0px 1px 0px #F8FAFC',
      accent: '0px 1px 0px #F1F5F9, inset 0px 1px 0px #ECFCCB',
      lg: '0px 100px 80px rgba(15, 23, 42, 0.06), 0px 34.67px 24.12px rgba(15, 23, 42, 0.038), 0px 16.87px 10.02px rgba(15, 23, 42, 0.02), 0px 7.21px 3.62px rgba(15, 23, 42, 0.02)',
    },
    borderRadius: {
      DEFAULT: '5px',
      lg: '8px',
    },
    extend: {
      spacing: {
        '2xs': '0.4rem',
        xs: '0.8rem',
        s: '1.6rem',
        m: '2.4rem',
        l: '4rem',
        xl: '6.4rem',
        '2xl': '10.4rem',
        '3xl': '16.8rem',
        '4xl': '27.2rem',
      },
    },
  },
  plugins: [],
};
