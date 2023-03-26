# Get NW.js binaries

There are multiple ways to get NW.js binaries.

Module usage:

```javascript
nwbuild({
  mode: "get",
});
```

CLI usage:

```shell
nwbuild --mode=get
```

This downloads the latest version of the normal build flavor for the host platform and architecture. This might be useful as a `postInstall` step in your `package.json` or when running `Chromedriver` tests you don't want to run or build your app.

There are some more options/flags which allow you to customise this behaviour. Let's look at what these options allow us to do:

## Download unofficial MacOS ARM builds:

> Thank you [`@corwin-of-amber`](https://github.com/corwin-of-amber/)!

Module usage:

```javascript
nwbuild({
  mode: "get",
  platform: "osx",
  arch: "arm64",
  downloadUrl: "https://github.com/corwin-of-amber/nw.js/releases/download",
  manifestUrl:
    "https://raw.githubusercontent.com/nwutils/nw-builder/main/src/util/osx.arm.versions.json",
});
```

CLI usage:

```shell
nwbuild --mode=get --platform=osx --arch=arm64 --downloadUrl=https://github.com/corwin-of-amber/nw.js/releases/download --manifestUrl=https://raw.githubusercontent.com/nwutils/nw-builder/main/src/util/osx.arm.versions.json
```

## Download from mirrors

China:

Module usage:

```javascript
nwbuild({
  mode: "get",
  downloadUrl: "https://npm.taobao.org/mirrors/nwjs/",
});
```

```shell
nwbuild --mode=get --downloadUrl=https://npm.taobao.org/mirrors/nwjs/
```

Singapore:

Module usage:

```javascript
nwbuild({
  mode: "get",
  downloadUrl: "https://cnpmjs.org/mirrors/nwjs/",
});
```

CLI usage:

```shell
nwbuild --mode=get --downloadUrl=https://cnpmjs.org/mirrors/nwjs/
```

## Download `nwjs-ffmpeg-prebuilt`

`ffmpeg` contains [proprietary codecs](https://nwjs.readthedocs.io/en/latest/For%20Developers/Enable%20Proprietary%20Codecs/#get-ffmpeg-binaries-from-the-community) which is why NW.js excludes them from its builds. The prebuilt `ffmpeg` on the other hand does contain proprietary codecs.

> Using the H.264 codec requires you to pay attention to the patent royalties and the license of the source code. Consult a lawyer if you do not understand the licensing constraints and using patented media formats in your application. For more information about the license of the source code, check [here](https://chromium.googlesource.com/chromium/third_party/ffmpeg.git/+/master/CREDITS.chromium).

`nw-builder` by default does not download the prebuilt `ffmpeg`. The user has to explicitly enable this:

```javascript
nwbuild({
  mode: "get",
  ffmpeg: true,
});
```

CLI usage:

```shell
nwbuild --mode=get --ffmpeg
```