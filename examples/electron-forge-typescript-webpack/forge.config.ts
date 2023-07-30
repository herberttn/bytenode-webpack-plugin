import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import type { ForgeConfig } from '@electron-forge/shared-types';

import { mainConfig } from './webpack.main.config';
import { preloadConfig } from './webpack.preload.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
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
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              config: {
                ...preloadConfig,
                entry: {
                  preload: './src/preload.ts',
                },
              },
              js: './src/preload.ts',
            },
          },
          {
            name: 'frame',
            preload: {
              config: {
                ...preloadConfig,
                entry: {
                  preload: './src/frame_preload.ts',
                },
              },
              js: './src/frame_preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
