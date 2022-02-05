import cleanup from 'rollup-plugin-cleanup';
import typescript from 'rollup-plugin-typescript2';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    typescript({
      // https://github.com/ezolenko/rollup-plugin-typescript2
      clean: true,
      // objectHashIgnoreUnknownHack: true,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist',
          allowJs: false,
          isolatedModules: false,
        },
        exclude: ['node_modules', 'dist', '**/__tests__/*'],
      },
    }),
    json(),
    nodeResolve(),
    commonjs(),
    getBabelOutputPlugin({ presets: ['@babel/preset-env'] }),
    cleanup(),
  ],
  external: (id) => id.search(/^[./]|([a-zA-Z]:\/)/) === -1,
  inlineDynamicImports: true,
};
