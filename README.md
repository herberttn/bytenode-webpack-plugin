## @herberttn/bytenode-webpack-plugin
Compile JavaScript into bytecode using [bytenode](https://www.npmjs.com/package/bytenode).  
Inspired by [bytenode-webpack-plugin](https://www.npmjs.com/package/bytenode-webpack-plugin).

### Install
```shell
npm install --save @herberttn/bytenode-webpack-plugin
```

### Webpack support
#### Versions
|Supported|Version range|
|:---:|---|
|:x:|< 4|
|:heavy_check_mark:|\> 4 < 5|
|:grey_question:|\> 5|

#### Features
|Supported|Entry type|Output type|
|:---:|---|---|
|:grey_question:|one or more, as an `array`|dynamic or named|
|:heavy_check_mark:|one or more, as an `object`|dynamic or named|
|:heavy_check_mark:|one or more, as an `string`|dynamic or named|

Examples:
- Dynamic output filename: `[name].js`  
- Named output filename: `index.js`

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
interface Options {
  compileAsModule: boolean;    // wraps the code in a node module
  compileForElectron: boolean; // compiles for electron instead of plain node
  debugLifecycle: boolean;     // enables webpack hooks lifecycle logs
  debugLogs: boolean;          // enables debug logs
  keepSource: boolean;         // emits the original source files along with the compiled ones
  preventSourceMaps: boolean;  // prevents source maps from being generated
  silent: boolean;             // disables all logs, but not errors thrown (overrides debug flags)
}
```

#### Default options
```typescript
new BytenodeWebpackPlugin({
  compileAsModule: true,
  compileForElectron: false,
  debugLifecycle: false,
  debugLogs: false,
  keepSource: false,
  preventSourceMaps: true,
  silent: false,
})
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
