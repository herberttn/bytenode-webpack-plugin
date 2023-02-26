const { MakerDeb } = require('@electron-forge/maker-deb');
const { MakerRpm } = require('@electron-forge/maker-rpm');
const { MakerSquirrel } = require('@electron-forge/maker-squirrel');
const { MakerZIP } = require('@electron-forge/maker-zip');
const { WebpackPlugin } = require('@electron-forge/plugin-webpack');

const { mainConfig } = require('./webpack.main.config');
const { preloadConfig } = require('./webpack.preload.config');
const { rendererConfig } = require('./webpack.renderer.config');

const config = {
  makers: [
    new MakerDeb({}),
    new MakerRpm({}),
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/renderer.html',
            js: './src/renderer.js',
            name: 'main_window',
            preload: {
              config: preloadConfig,
              js: './src/preload.js',
            },
          },
        ],
      },
    }),
  ],
};

module.exports = config;
