# [2.2.0](https://github.com/herberttn/bytenode-webpack-plugin/compare/v2.1.1...v2.2.0) (2022-11-03)


### Features

* add include and exclude options ([5d0e213](https://github.com/herberttn/bytenode-webpack-plugin/commit/5d0e213e810f2eb60587bd6211120f590fa0c611))
* warn when compiling to but not targeting electron ([cbf0536](https://github.com/herberttn/bytenode-webpack-plugin/commit/cbf05361d5a912522e206de5cdf5d9cd2b7015e3))

## [2.1.1](https://github.com/herberttn/bytenode-webpack-plugin/compare/v2.1.0...v2.1.1) (2022-10-24)


### Bug Fixes

* strip-shebang should be a production dependency ([fd5a570](https://github.com/herberttn/bytenode-webpack-plugin/commit/fd5a5707006256cb4f1a6cef3fae0b1e518ab210))

# [2.1.0](https://github.com/herberttn/bytenode-webpack-plugin/compare/v2.0.0...v2.1.0) (2022-10-24)


### Features

* electron-forge v6 support ([8131cf7](https://github.com/herberttn/bytenode-webpack-plugin/commit/8131cf7860032dbb564e1bf865f0cdaa0f0ec1f8))

# [2.0.0](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.2.5...v2.0.0) (2022-10-20)


### Features

* **deps:** bump bytenode ([c1826d7](https://github.com/herberttn/bytenode-webpack-plugin/commit/c1826d7c129b18280881b3ed8e16d6f257121a0e))
* **deps:** bump webpack-hot-middleware ([3766ba0](https://github.com/herberttn/bytenode-webpack-plugin/commit/3766ba0fcf4caefee1c3180ac64d8df36c310166))
* **deps:** bump webpack-merge ([bcc6366](https://github.com/herberttn/bytenode-webpack-plugin/commit/bcc636682164b602129cffdb52accc1e1cfbf38b))
* **deps:** bump webpack-virtual-modules ([e47de32](https://github.com/herberttn/bytenode-webpack-plugin/commit/e47de32664150f9481a60dcf1b7601d3b89ee5e8))
* webpack v5 ([2fc5d72](https://github.com/herberttn/bytenode-webpack-plugin/commit/2fc5d72f48fa9d31974a5fa7a8d21ae79e745ed7))


### BREAKING CHANGES

* This version adds support to `webpack` `v5` and
drops `webpack` `v4`. Use a previous version if using `webpack` `v4`.

DEPRECATED: This version drops the options `debugLogs` and `silent`,
as it now uses webpack's built-in logging system. Logging should be
enabled through webpack's own configuration. The option
`debugLifecycle` is still present, but it also works in conjunction
with webpack's logging system, so both need to be enabled for logs to
 be seen.

## [1.2.5](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.2.4...v1.2.5) (2021-04-24)


### Bug Fixes

* webpack externals need to receive posix style paths ([ba012c5](https://github.com/herberttn/bytenode-webpack-plugin/commit/ba012c5e9cffb509640be73d070f1dcdbf114f90))

## [1.2.4](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.2.3...v1.2.4) (2021-04-23)


### Bug Fixes

* misplaced dependency ([3e564b3](https://github.com/herberttn/bytenode-webpack-plugin/commit/3e564b34a72826871d9f47d71aba7235108c3b13))

## [1.2.3](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.2.2...v1.2.3) (2021-04-23)


### Bug Fixes

* normalize loader import path to compiled file ([1bb918f](https://github.com/herberttn/bytenode-webpack-plugin/commit/1bb918f7320ba5a1a172c050e52d7e33066e6592))

## [1.2.2](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.2.1...v1.2.2) (2021-04-10)


### Bug Fixes

* bump bytenode to fix bytenode/bytenode[#122](https://github.com/herberttn/bytenode-webpack-plugin/issues/122) ([e7de4eb](https://github.com/herberttn/bytenode-webpack-plugin/commit/e7de4eb2c3c84ae05992339cd98e0e90062a1352))

## [1.2.1](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.2.0...v1.2.1) (2021-04-04)


### Bug Fixes

* dependency detection should ignore absolute and relative paths ([2bd5d7f](https://github.com/herberttn/bytenode-webpack-plugin/commit/2bd5d7fa6e7f7c4e8e7469c29f2a564fcba094d3))

# [1.2.0](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.1.0...v1.2.0) (2021-04-03)


### Features

* better entry middlewares support ([25218e5](https://github.com/herberttn/bytenode-webpack-plugin/commit/25218e5402013d54402f934f0b6ee231b6e508ae))
* depend on webpack as peer only ([2724ee2](https://github.com/herberttn/bytenode-webpack-plugin/commit/2724ee23b46848141e49d8aacbbb7f61394473f1))

# [1.2.0-rc.1](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.1.0...v1.2.0-rc.1) (2021-04-03)


### Features

* better entry middlewares support ([25218e5](https://github.com/herberttn/bytenode-webpack-plugin/commit/25218e5402013d54402f934f0b6ee231b6e508ae))
* depend on webpack as peer only ([2724ee2](https://github.com/herberttn/bytenode-webpack-plugin/commit/2724ee23b46848141e49d8aacbbb7f61394473f1))

# [1.1.0](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.0.2...v1.1.0) (2021-04-01)


### Bug Fixes

* add throw description for entry as function ([446219e](https://github.com/herberttn/bytenode-webpack-plugin/commit/446219ec3744d1a7465cc2736025a5ca09ba6b46))
* debug logs should always use console.debug ([93979e2](https://github.com/herberttn/bytenode-webpack-plugin/commit/93979e29e8bfe92beb91ccbc10c849466783e4c0))
* remove moot config checks ([e408ccb](https://github.com/herberttn/bytenode-webpack-plugin/commit/e408ccba0149193554537a0b3a384679a4333577))

## [1.0.2](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.0.1...v1.0.2) (2021-03-31)

## [1.0.1](https://github.com/herberttn/bytenode-webpack-plugin/compare/v1.0.0...v1.0.1) (2021-03-31)


### Bug Fixes

* need to build before publishing obviously ([fead0bd](https://github.com/herberttn/bytenode-webpack-plugin/commit/fead0bd4b470f5e5b9d8a033e380c7c477a371b0))

# 1.0.0 (2021-03-31)


### Features

* add silent mode ([7e2768e](https://github.com/herberttn/bytenode-webpack-plugin/commit/7e2768e1b5a0231b83bd00f33ba42e2a9e5e4294))
* bump bytenode to v1.2.1 ([2640985](https://github.com/herberttn/bytenode-webpack-plugin/commit/2640985c54dce93ca686c98c59fa64a26560a409))
* migrate to ts ([1879a01](https://github.com/herberttn/bytenode-webpack-plugin/commit/1879a01c7d05b825a0f0c2d909256217be5aa045))
