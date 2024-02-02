import console from "node:console";
import fs from "node:fs";
import fsm from "node:fs/promises";

import bld from "./bld.js";
import get from "./get/index.js";
import run from "./run.js";
import util from "./util.js";

/**
 * @typedef {object} Options Configuration options
 * @property {"./" | string}                       [srcDir="./"]                             String of space separated glob patterns which correspond to NW app code
 * @property {"get" | "run" | "build"}             [mode="build"]                            Run or build application
 * @property {"latest" | "stable" | string}        [version="latest"]                        NW runtime version
 * @property {"normal" | "sdk"}                    [flavor="normal"]                         NW runtime build flavor
 * @property {"linux" | "osx" | "win"}             platform                                  NW supported platforms
 * @property {"ia32" | "x64" | "arm64"}            arch                                      NW supported architectures
 * @property {"./out" | string}                    [outDir="./out"]                          Directory to store build artifacts
 * @property {"./cache" | string}                  [cacheDir="./cache"]                      Directory to store NW binaries
 * @property {"https://dl.nwjs.io" | string}       [downloadUrl="https://dl.nwjs.io"]        URI to download NW binaries from
 * @property {"https://nwjs.io/versions" | string} [manifestUrl="https://nwjs.io/versions"]  URI to download manifest from
 * @property {object}                              app                                       Refer to Linux/Windows Specific Options under Getting Started in the docs
 * @property {boolean}                             [cache=true]                              If true the existing cache is used. Otherwise it removes and redownloads it.
 * @property {boolean | "zip" | "tar" | "tgz"}     [zip=false]                               If true, "zip", "tar" or "tgz" the outDir directory is compressed.
 * @property {boolean}                             [cli=false]                               If true the CLI is used to glob srcDir and parse other options
 * @property {boolean}                             [ffmpeg=false]                            If true the chromium ffmpeg is replaced by community version
 * @property {boolean}                             [glob=true]                               If true globbing is enabled
 * @property {"error" | "warn" | "info" | "debug"} [logLevel="info"]                         Specified log level.
 */

/**
 * Main module exported
 *
 * @async
 * @function
 * 
 * @param  {Options}       options  Options
 * @return {Promise<void>}
 */
async function nwbuild (options) {
  let built;
  let releaseInfo = {};
  let manifest = {};

  try {
    // Parse options
    options = await util.parse(options, manifest);

    manifest = await util.getNodeManifest({ srcDir: options.srcDir, glob: options.glob });
    if (typeof manifest?.nwbuild === "object") {
      options = manifest.nwbuild;
    }

    options = await util.parse(options, manifest);

    //TODO: impl logging

    built = fs.existsSync(options.cacheDir);
    if (built === false) {
      await fsm.mkdir(options.cacheDir, { recursive: true });
    }

    if (options.mode === "build") {
      built = fs.existsSync(options.outDir);
      if (built === false) {
        await fsm.mkdir(options.outDir, { recursive: true });
      }
    }

    // Validate options.version to get the version specific release info
    releaseInfo = await util.getReleaseInfo(
      options.version,
      options.platform,
      options.arch,
      options.cacheDir,
      options.manifestUrl,
    );

    await util.validate(options, releaseInfo);

    // Remove leading "v" from version string
    options.version = releaseInfo.version.slice(1);

    // Download binaries
    await get({
      version: options.version,
      flavor: options.flavor,
      platform: options.platform,
      arch: options.arch,
      downloadUrl: options.downloadUrl,
      cacheDir: options.cacheDir,
      cache: options.cache,
      ffmpeg: options.ffmpeg,
      nativeAddon: options.nativeAddon,
    });

    if (options.mode === "get") {
      // Do nothing else since we have already downloaded the binaries.
      return;
    }

    if (options.mode === "run") {
      await run({
        version: options.version,
        flavor: options.flavor,
        platform: options.platform,
        arch: options.arch,
        srcDir: options.srcDir,
        cacheDir: options.cacheDir,
        glob: options.glob,
        argv: options.argv,
      });
    } else if (options.mode === "build") {
      await bld({
        version: options.version,
        flavor: options.flavor,
        platform: options.platform,
        arch: options.arch,
        manifestUrl: options.manifestUrl,
        srcDir: options.srcDir,
        cacheDir: options.cacheDir,
        outDir: options.outDir,
        app: options.app,
        glob: options.glob,
        managedManifest: options.managedManifest,
        nativeAddon: options.nativeAddon,
        zip: options.zip,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default nwbuild;
