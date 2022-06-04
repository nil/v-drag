import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import info from './package.json';

const bannerText = `/*!
 * ${info.name} v${info.version}
 * by ${info.author} and contributors
 */`;

const pluginsList = [
  nodeResolve(),
  commonjs(),
  terser({
    output: {
      comments: /^!/,
    },
  }),
];

export default [
  {
    input: 'src/index.js',
    output: {
      file: info.main,
      name: 'vdrag',
      format: 'cjs',
      exports: 'default',
      banner: bannerText,
    },
    plugins: pluginsList,
  },
  {
    input: 'src/index.js',
    output: {
      file: info.module,
      name: 'vdrag',
      format: 'esm',
      exports: 'default',
      banner: bannerText,
    },
    plugins: pluginsList,
  },
  {
    input: 'src/index.js',
    output: {
      file: info.unpkg,
      name: 'vdrag',
      format: 'iife',
      exports: 'default',
      banner: bannerText,
    },
    plugins: pluginsList,
  },
];
