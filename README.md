@herberttn/bytenode-webpack-plugin
---

[![ci][badge-workflow-ci]][badge-workflow-ci-link]
[![coveralls][badge-coveralls]][badge-coveralls-link]
[![npm][badge-npm]][badge-npm-link]
[![license][badge-license]][badge-license-link]

[badge-coveralls]: https://img.shields.io/coveralls/github/herberttn/bytenode-webpack-plugin?logo=coveralls&style=flat-square
[badge-coveralls-link]: https://coveralls.io/github/herberttn/bytenode-webpack-plugin
[badge-license]: https://img.shields.io/github/license/herberttn/bytenode-webpack-plugin?style=flat-square
[badge-license-link]: LICENSE
[badge-npm]: https://img.shields.io/npm/v/@herberttn/bytenode-webpack-plugin?logo=npm&style=flat-square
[badge-npm-link]: https://www.npmjs.com/package/@herberttn/bytenode-webpack-plugin
[badge-workflow-ci]: https://img.shields.io/github/workflow/status/herberttn/bytenode-webpack-plugin/ci?label=ci&logo=github&style=flat-square
[badge-workflow-ci-link]: https://github.com/herberttn/bytenode-webpack-plugin/actions/workflows/ci.yml

Compile JavaScript into bytecode using [`bytenode`][link-to-bytenode].  
Inspired by [`bytenode-webpack-plugin`][link-to-bytenode-webpack-plugin].

[link-to-bytenode]: https://www.npmjs.com/package/bytenode
[link-to-bytenode-webpack-plugin]: https://www.npmjs.com/package/bytenode-webpack-plugin
[link-to-electron-forge]: https://www.npmjs.com/package/electron-forge
[link-to-electron-forge-typescript-webpack-template]: https://www.electronforge.io/templates/typescript-+-webpack-template
[link-to-electron-forge-webpack-template]: https://www.electronforge.io/templates/webpack-template
[link-to-nodejs]: https://nodejs.org
[link-to-webpack]: https://www.npmjs.com/package/webpack

### Install
```shell
npm install --save @herberttn/bytenode-webpack-plugin
```

### Supported versions
- [`node`][link-to-nodejs] `v14+` (this plugin is published in `ES2020` `CommonJS` syntax at the moment)
- [`webpack`][link-to-webpack] `v5.x`

### Supported features
- [`electron-forge`][link-to-electron-forge] with [caveats](#electron-forge-support)
  - :heavy_check_mark:  Default template: [`typescript-webpack`][link-to-electron-forge-typescript-webpack-template]
  - :heavy_check_mark:  Default template: [`webpack`][link-to-electron-forge-webpack-template]
- [`webpack`][link-to-webpack]
  - :heavy_check_mark:   `entry` as a `string` (e.g., `entry: 'src/index.js'`)
  - :heavy_check_mark:   `entry` as an `array` (e.g., `entry: ['src/index.js']`)
  - :heavy_check_mark:   `entry` as an `object` (e.g., `entry: { main: 'src/index.js' }`)
  - :heavy_check_mark:   `entry` middlewares (e.g., `entry: ['src/index.js', 'webpack-hot-middleware/client']`)
  - :x:   `entry.*.filename` (e.g., `entry: { main: { filename: 'index.js' } }`)
  - :heavy_check_mark:   Dynamic `output.filename` (e.g., `output: { filename: '[name].js' }`)
  - :x:   Static `output.filename` (e.g., `output: { filename: 'index.js' }`)

### Usage
```javascript
import { BytenodeWebpackPlugin } from '@herberttn/bytenode-webpack-plugin';

// webpack options
module.exports = {
  // ...

  plugins: [
    // using all defaults
    new BytenodeWebpackPlugin(),

    // overriding an option
    new BytenodeWebpackPlugin({
      compileForElectron: true,
    }),
  ],
};
```

### Options
```typescript
type FileMatcherIntent = string | RegExp; // glob or regex

interface Options {
  compileAsModule: boolean;      // wraps the code in a node module
  compileForElectron: boolean;   // compiles for electron instead of plain node
  debugLifecycle: boolean;       // enables webpack hooks lifecycle logs
  exclude?: FileMatcherIntent[]; // prevents assets from being compiled, accepts glob and regex
  include?: FileMatcherIntent[]; // filter assets to compile, accepts glob and regex
  keepSource: boolean;           // emits the original source files along with the compiled ones
  preventSourceMaps: boolean;    // prevents source maps from being generated
}
```
> Globs are handled using [`picomatch`](https://www.npmjs.com/package/picomatch)

#### Default options
```typescript
new BytenodeWebpackPlugin({
  compileAsModule: true,
  compileForElectron: false,
  debugLifecycle: false,
  keepSource: false,
  preventSourceMaps: true,
})
```

### Examples
Sample projects can be found in the [examples](./examples) directory.
- [examples/electron-forge-typescript-webpack](./examples/electron-forge-typescript-webpack): [`electron-forge`][link-to-electron-forge] with [`typescript-webpack`][link-to-electron-forge-typescript-webpack-template] template
- [examples/electron-forge-webpack](./examples/electron-forge-webpack): [`electron-forge`][link-to-electron-forge] with [`webpack`][link-to-electron-forge-webpack-template] template
- [examples/webpack](./examples/webpack): plain node/webpack project

### Caveats

#### `electron-forge` support
##### main process
You may need to change the default entry and output configurations. Probably something like this:

###### webpack.main.config.js
```diff
-  entry: './src/index.ts',
+  entry: {
+    index: './src/index.ts',
+  },
+  output: {
+    filename: '[name].js',
+  },
+  target: 'electron-main',
```

##### renderer process
You will probably run into [missing node core modules](#missing-node-core-modules). Should probably be fixed by something like this:

###### webpack.renderer.config.js
```diff
+  target: 'electron-renderer',
```

##### preload process
You may need to change the default entry and output configurations. Probably something like this:

###### webpack.preload.config.js
```diff
-  entry: './src/preload.ts',
+  entry: {
+    preload: './src/preload.ts',
+  },
+  output: {
+    filename: '[name].js',
+  },
+  target: 'electron-preload',
```

###### package.json
```diff
  "@electron-forge/plugin-webpack",
  {
    "mainConfig": "./webpack.main.config.js",
    "renderer": {
      "config": "./webpack.renderer.config.js",
      "entryPoints": [
        {
          "html": "./src/index.html",
          "js": "./src/renderer.ts",
          "name": "main_window",
+         "preload": {
+           "config": "webpack.preload.config.js"
+         }
        }
      ]
    }
  }
```

#### Missing node core modules
If you run into a webpack error similar to the one below, it's because `bytenode` requires some of node's code modules to properly do its job, and only you can decide the best way to provide them given your configuration.

Three possible solutions:
- Set webpack's target to `node`
- Set webpack's target to an appropriate `electron-*` target, when compiling for electron
- Provide polyfills for the necessary modules
>Other solutions may exist.

Error example:
```shell
ERROR in ../../node_modules/bytenode/lib/index.js 3:11-24
Module not found: Error: Can't resolve 'fs' in '../../node_modules/bytenode/lib'
 @ ./src/renderer.loader.js 1:0-19

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
	- add a fallback 'resolve.fallback: { "vm": require.resolve("vm-browserify") }'
	- install 'vm-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
	resolve.fallback: { "vm": false }
 @ ./src/renderer.loader.js 1:0-19
```


### Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/herberttn">
        <img src="https://avatars.githubusercontent.com/u/5903869?v=4" width="120;" alt="herberttn"/>
        <br />
        <sub><b>herberttn</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/jjeff">
        <img src="https://avatars.githubusercontent.com/u/321284?v=4" width="120;" alt="jjeff"/>
        <br />
        <sub><b>Jeff Robbins</b></sub>
      </a>
    </td>
  </tr>
</table>
