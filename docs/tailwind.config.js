module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  theme: {
    fontFamily: {
      display: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Arial', 'sans-serif'],
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Arial', 'sans-serif'],
      mono: ['IBM Plex Mono', 'monospace'],
    },
    fontSize: {
      '7xl': ['5.25rem', {
        letterSpacing: '-0.04em',
        lineHeight: '1',
      }],
      '6xl': ['4.4rem', {
        letterSpacing: '-0.04em',
        lineHeight: '1',
      }],
      '5xl': ['3.65rem', {
        letterSpacing: '-0.04em',
        lineHeight: '1.1',
      }],
      '4xl': ['3.05rem', {
        letterSpacing: '-0.03em',
        lineHeight: ' 1.1',
      }],
      '3xl': ['2.1rem', {
        letterSpacing: '-0.02em',
        lineHeight: '1.1',
      }],
      '2xl': ['1.75rem', {
        letterSpacing: '-0.02em',
        lineHeight: '1.2',
      }],
      xl: ['1.45rem', {
        letterSpacing: '-0.02em',
        lineHeight: '1.25',
      }],
      l: ['1.2rem', {
        letterSpacing: '-0.01em',
        lineHeight: '1.3',
      }],
      m: ['1rem', {
        letterSpacing: '-0.01em',
        lineHeight: '1.4',
      }],
      s: ['0.85rem', {
        letterSpacing: '-0.01em',
        lineHeight: '1.4',
      }],
      xs: ['0.7rem', {
        letterSpacing: '0em',
        lineHeight: '1.4',
      }],
    },
    transitionDuration: {
      DEFAULT: '150ms',
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
    extend: {
      spacing: {
        '2xs': '8px',
        xs: '16px',
        s: '32px',
        m: '48px',
        l: '80px',
        xl: '128px',
        '2xl': '208px',
      },
    },
  },

  plugins: [],
};
