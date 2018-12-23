import { terser } from 'rollup-plugin-terser';
import info from './package.json';

const bannerText = `/*!
 * ${info.name} v${info.version}
 * by ${info.author}
 */`;

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    name: 'optionsConfig',
    format: 'cjs',
    banner: bannerText
  },
  plugins: [
    terser({
      output: {
        comments: /^!/
      }
    })
  ]
};
