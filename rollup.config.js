import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
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
    format: 'umd',
    banner: bannerText
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    terser({
      output: {
        comments: /^!/
      }
    })
  ]
};
