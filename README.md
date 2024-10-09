# nw-builder

> Version 3 will no longer be supported. Please consider upgrading to version 4.

[![npm](https://img.shields.io/npm/v/nw-builder/stable)](https://www.npmjs.com/package/nw-builder/v/stable)
[![Join the chat at https://gitter.im/nwjs/nw-builder](https://badges.gitter.im/repo.svg)](https://app.gitter.im/#/room/#nwjs_nw-builder:gitter.im)

Build [NW.js](https://github.com/nwjs/nw.js) applications for Mac, Windows and Linux.

For version 4, please go to the [corresponding branch](https://github.com/nwutils/nw-builder/tree/main).

## Table of Contents

- [Installation](https://github.com/nwutils/nw-builder#installation)
- [Usage](https://github.com/nwutils/nw-builder#usage)
- [API Reference](https://github.com/nwutils/nw-builder#api-reference)
- [Migration Guide v3->v4](https://github.com/nwutils/nw-builder#migration)
- [Contributing](https://github.com/nwutils/nw-builder#contributing)
- [License](https://github.com/nwutils/nw-builder#license)

## Installation

> Tested and runs on Node 14, 16 and 18!

Using npm:

```javascript
npm install nw-builder
```

Using yarn:

```javascript
yarn add nw-builder
```

Using pnpm:

```javascript
pnpm add nw-builder
```

## Usage

Check out the the demo under `/test/demo` directory for examples of module usage. For CLI, type in `nwbuild --help` in your terminal.

## API Reference

> Stay up to date via the [Changelog](https://github.com/nwjs-community/nw-builder/blob/master/.github/CHANGELOG.md).

### Options

#### options.files _Required_

Type: `String`
Default value: `null`

The path to your node webkit app. It supports [simple-glob](https://github.com/jedmao/simple-glob) so you can do stuff like `['foo/*.js', '!foo/bar.js', 'foo/bar.js']`.

#### options.version

Type: `String`
Default value: `'latest'`

The version of NW.js you want to use. Per default it looks up the latest version. [Here is a list](https://github.com/nwjs/nw.js/tags) of all available releases.

#### options.flavor

Type: `String`
Default value: `'sdk'`

The flavor of NW.js you want to use. Per default it will be `sdk`. [Here is a list](https://github.com/nwjs/nw.js/wiki/Build-Flavors) of all flavor available.

The value `sdk` is most used for development whereas `normal` for production.

#### options.platforms

Type `(CLI)`: `String` (comma separated values)
Type `(API)`: `Array` of `String`
Default value: [`<current OS>`]

The platforms you want to build. Can be `['win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64']`

The values `['win', 'osx', 'linux']` can also be used and will build both the 32 and 64 bit versions of the specified platforms.

Be aware that the osx32 version can only be built with legacy version of nwjs. Since > 0.12.0, only 64 bits for osx works.

#### options.appName

Type: `String`
Default value: `false`

The Name of your NW.js app. If this value is set to null, it will autodetect the `name` from your project's package.json. This will be used to generate a plist file for mac.

#### options.appVersion

Type: `String`
Default value: `false`

The version of your NW.js app. If this value is set to null, it will autodetect the `version` form your projects package.json. This will be used to generate a plist file for mac.

#### options.buildDir

Type: `String`
Default value: `./build`

This is where the releases are saved.

#### options.cacheDir

Type: `String`
Default value: `./cache`

This is where the cached NW.js downloads are.

#### options.buildType

Type: `String` or `function`
Default value: `default`

How you want to save your build.

- `default` [appName]
- `versioned` [appName] -v[appVersion]
- `timestamped` [appName] - [timestamp];
- A function with options as scope (e.g `function () {return this.appVersion;}` )

#### options.forceDownload

Type: `Boolean`
Default value: `false`

This will delete everything in your `build_dir` directory, including the cached downloaded prebuilt binaries.

#### options.argv

Type `(CLI)`: `String` (comma separated values)
Type `(API)`: `Array` of `String`
Default Value: []

Pass Command Line Options when you run an NW.js instance. Ignored in case of build.

#### options.macCredits

Type: `String`
Default value: `false`

MAC ONLY: The path to your credits.html file. If your don't provide your own it will use the one provided by NW.js

#### options.macIcns

Type: `String`
Default value: `false`

MAC ONLY: The path to your ICNS icon file. If your don't provide your own it will use the one provided by NW.js

#### options.zip

Type: `Boolean`
Default value: `null`

WINDOW ONLY: Instead of zipping the application and merging it into the executable the application content is placed next to the application (which speed up the startup time for large apps). The default behaviour is platform specific. For `windows` and `linux`, the application is zipped and merged into the executable. For `mac`, the application is not zipped.

#### options.zipOptions

Type: `Object`
Default value: `null`

Allows to configure the underling zip library parameters, like store or compression ratio.

See [archiver](http://archiverjs.com/docs/global.html#ZipOptions) documentation for detailed description of properties.

#### options.macPlist

Type: `String` or `Object`
Default value: `false`

MAC ONLY: Pass a string containing the path to your own plist file. If a string isn't passed, a plist file will be generated from your package.json. Pass an object to overwrite or add properties to the generated plist file.

#### options.winVersionString

Type: `Object`
Default value: `{}`

WINDOWS ONLY: Some descriptors of the executable. If your don't provide your own `FileDescription`, it will default to `options.appName`. If you are building on MAC or LINUX you must have [Wine](https://www.winehq.org/) installed to use this option.

See [the MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/aa381058.aspx#string-name) for more options than the basic list below,

```
winVersionString: {
  'CompanyName': 'Some Company',
  'FileDescription': 'Process Name',
  'ProductName': 'Some Product',
  'LegalCopyright': 'Copyright 2017',
}
```

#### options.winIco

Type: `String`
Default value: `null`

WINDOWS ONLY: The path to your ICO icon file. If your don't provide your own it will use the one provided by NW.js. If you are building on MAC or LINUX you must have [Wine](https://www.winehq.org/) installed to use this option.

#### options.macZip (DEPRECATED)

Type: `Boolean`
Default value: `null`

MAC ONLY: Use a `app.nw` folder instead of `ZIP` file, this significantly improves the startup speed of applications on `mac`, since no decompressing is needed. Builds on other platforms will still use `ZIP` files. The default behaviour of node-webkit-builder is to not use `ZIP` files on the `mac` platform. In case of the `mac` platform the option `macZip` can override the option `zip`.

#### options.mergeZip

Type: `Boolean`
Default value: `true`

WINDOWS AND LINUX ONLY: Merge the source file package with the Node Webkit executable.

#### options.downloadUrl

Type: `string`
Default value: `https://dl.nwjs.io`

Server to download binaries from.

#### options.manifestUrl

Type: `string`
Default value: `https://nwjs.io/versions`

Server to download binaries from.

#### options.quiet

Type: `string`
Default: `"info"`

Set the log level. Valid options are `"error"`, `"warn"`, `"info"`, `"debug"` and `"off"`.

#### options.useRcedit

Type: `Boolean`
Default: `false`

`winresourcer` is used to update Windows executable resources by default. `rcedit` can be used if preferred.

### Manifest Options

#### platformOverrides

Allows you to specify platform-specific manifest values. Example manifest:

```json
{
    "name": "nw-demo",
    "version": "0.1.0",
    "main": "index.html",
    "window": {
        "frame": false,
        "toolbar": false
    },
    "platformOverrides": {
        "win": {
            "window": {
                "toolbar": true
            }
        },
        "win32": {
            "window": {
                "frame": true,
                "toolbar": false
            }
        },
        "win64": {
            "window": {
                "frame": true
            }
        },
        "osx": {
            ...
        },
        "osx32": {
            ...
        },
        "osx64": {
            ...
        },
        "linux": {
            ...
        },
        "linux32": {
            ...
        },
        "linux64": {
            ...
        },
    }

```

The platform-specific options will override the others only when building that platform only and the `platformOverrides` property will be removed.

For example, when building for Windows, the manifest generated and put into the end app (from the manifest above) would be:

```json
{
  "name": "nw-demo",
  "version": "0.1.0",
  "main": "index.html",
  "window": {
    "frame": true,
    "toolbar": false
  }
}
```

Additionally, when specifying multiple version of the same platform such as "win", "win32", and "win64", changes will be applied such that "win" applies to both "win32" and "win64", while "win32" and "win64" apply only to the specified version. Also note that "win32" and "win64" can further override changes made in "win".

See [#85](https://github.com/nwjs/nw-builder/issues/85) and [#94](https://github.com/nwjs/nw-builder/pull/94) for more information. If you need this during development too, see [platform-overrides](https://github.com/adam-lynch/platform-overrides) and [gulp-platform-overrides](https://github.com/adam-lynch/gulp-platform-overrides). There is no Grunt plugin, [yet](https://github.com/new).

## Troubleshooting

### OSX ulimit

Darwin (OS X kernel) has a low limit for file descriptors (256 per process) by default, so you might get an `EMFILE` error or an error mentioning "too many open files" if youtry to open more file descriptors than this.

To get around it, run `ulimit -n 1024` (or add it to your `~/.bash_profile`). For more information, see [henvic/osx-ulimit](https://github.com/henvic/osx-ulimit).

## Team

This project was created by [Steffen Müller](https://github.com/steffenmllr) and has been maintained by [Gabe Paez](https://github.com/gabepaez), [Andy Trevorah](https://github.com/trevorah), [Adam Lynch](https://github.com/adam-lynch) and [Rémy Boulanouar](https://github.com/DblK) in the past. This project is currently maintained by [Ayushman Chhabra](https://github.com/ayushmxn).

## Migration

## Migration Guide (v3 -> v4)

> We are working on making the migration process smoother. If you encounter any issues with the current guide, please open an issue or start a discussion.

### Update `nw-builder`

With npm:

```shell
npm update nw-builder@latest
```

With yarn:

```shell
yarn upgrade nw-builder@latest
```

With pnpm:

```shell
pnpm update nw-builder@latest
```

### Update options

Let's take an example of v3 code and migrate it to v4.

```javascript
const NwBuilder = require("nw-builder");

const nw = new NwBuilder({
  files: ["./nwapp/**/*", "./other/**/*.js"],
  version: "latest",
  flavor: "normal",
  platforms: ["win32", "win64", "osx32", "osx64", "linux32", "linux64"],
  cacheDir: "./cache",
  buildDir: "./build",
  buildType: "versioned",
  forceDownload: true,
  appName: "nwdemo",
  appVersion: "0.1.0",
  argv: "--nw-stderr-logging",
  macCredits: "./nwapp/credits.html",
  macIcns: "./nwapp/mac.icns",
  macPlist: { ... },
  winVersionString: { ... },
  winIco: "./nwapp/win.ico",
  zip: true,
  macZip: false,
  mergeZip: false,
});

nw.build();
```

Update the import path

```diff
-const NwBuilder = require("nw-builder");
+const nwbuild = require("nw-builder");
```

Replace the `NwBuilder` initialization with a function

```diff
-const nw = new NwBuilder({
+await nwbuild({
```

The `files` property has been renamed to `srcDir`.

```diff
-  files: ["./nwapp/**/*", "./other/**/*.js"],
+  srcDir: "./nwapp/**/* ./other/**/*.js",
```

Add the `mode` option and remove the now redundant `nw.build` function call. The `build` call is made by `nwbuild` internally.

```diff
+  mode: "build",

-nw.build();
```

The `platforms` option has been removed and replaced with `platform` and `arch`. Notice that one `nwbuild` function call now creates one build for one platform and one arch only.

```diff
-  platforms: ["win32", "win64", "osx32", "osx64", "linux32", "linux64"],
+  platform: "linux", // "osx" for MacOS "win",  for Windows
+  arch: "x64", // "ia32" for 32 bit or "arm64" for arm based 65 bit architectures
```

The `buildDir` option has been rename to `outDir`.

```diff
-  buildDir: "./build",
+  outDir: "./build",
```

The `buildType` option has been removed.

```diff
-  buildType: "versioned",
```

The `forceDownload` option has been changed to `cache`.

```diff
-  forceDownload: true,
+  cache: false,
```

The `appName` option has been changed to `app.name`.

```diff
-  appName: "nwdemo",
+  app: { name: "nwdemo" },
```

The `appVersion` option has been changed to `app.version`.

```diff
-  appVersion: "0.1.0",
+  app: { version: "0.1.0" },
```

The `macCredit` option has been removed.

```diff
-  macCredits: "./nwapp/credits.html",
```

The `macIcns` option has been replaced with `icon`.

```diff
-  macIcns: "./nwapp/mac.icns",
+  icon: "./nwapp/mac.icns",
```

The `macPlist` option has been replaced by `app.*` options. Consult the [documentation](https://nwutils.io/nw-builder/mode-build.html#osxrc-object) for valid properties.

```diff
-  macPlist: { ... },
+  app: { ... },
```

The `winVersionString` option has been replaced with `app`. Consult the [documentation](https://nwutils.io/nw-builder/mode-build.html#winrc-object) for valid properties.

```diff
-  winVersionString: {
-    'CompanyName': 'Some Company',
-    'FileDescription': 'Process Name',
-    'ProductName': 'Some Product',
-    'LegalCopyright': 'Copyright 2017',
-  }
+  app: {
+    company: "Some Company",
+    fileDescription: "Process Name",
+    productName: "Some Product",
+    legalCopyright: "Copyright (c) 2023",
+  }
```

The `winIco` option has been replaced by `app.icon`.

```diff
-  winIco: "./nwapp/win.ico",
+  app: { icon: "./nwapp/win.ico" },
```

The `macZip` option has been removed.

```diff
-  macZip: false,
```

The `mergeZip` option has been removed.

```diff
-  mergeZip: false,
```

The final code should look like this.

```javascript
const { nwbuild } = require("nw-builder");

await nwbuild({
  srcDir: "./nwapp/**/* ./other/**/*.js",
  mode: "build",
  version: "latest",
  flavor: "normal",
  platform: "linux",
  arch: "x64",
  outDir: "./build",
  cache: false,
  app: { ... },
});
```

## Contributing

### Getting Started

1. Pick and install a Node version manager
   - Linux/OSX - [nvm](https://github.com/nvm-sh/nvm)
   - Win 7+/Linux/OSX - [volta](https://volta.sh)
1. Use your version manager to install Node 14.19 or above
1. Run `npm install`
1. `npm run demo` to test your changes at first glance
1. `npm t` to run unit tests
1. Don't forget to run `npm run format && npm run lint` before commiting your changes

### General Guidelines

- Whenever possible, open an issue before submitting a pull request.
- PRs should have short descriptive titles. For example:
  - fix(docs): fix typo in `options.platform` description
  - feat(platform): add support for mac m1
- Ideally, a PR should reference a related issue
- Ensure there are tests that cover your changes

## License

[MIT](https://github.com/nwutils/nw-builder/blob/master/.github/LICENSE)
