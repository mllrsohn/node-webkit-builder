import child_process from "node:child_process";
import fs from "node:fs";
import fsp from "node:fs/promises";
import https from "node:https";
import path from "node:path";
import process from "node:process";

import progress from "cli-progress";
import compressing from "compressing";
import yauzl from "yauzl-promise";

import * as logger from "./log.js";
import * as util from "./util.js";

const { log } = logger;
const { ARCH_KV, PLATFORM_KV, replaceFfmpeg } = util;

/**
 * Get binaries.
 *
 * _Note: This an internal function which is not called directly. Please see example usage below._
 *
 * @example
 * // Minimal Usage (uses default values)
 * nwbuild({
 *   mode: "get",
 * });
 *
 * @example
 * // Unofficial macOS builds (upto v0.75.0)
 * nwbuild({
 *   mode: "get",
 *   platform: "osx",
 *   arch: "arm64",
 *   downloadUrl: "https://github.com/corwin-of-amber/nw.js/releases/download",
 *   manifestUrl: "https://raw.githubusercontent.com/nwutils/nw-builder/main/src/util/osx.arm.versions.json",
 * });
 *
 * @example
 * // China mirror
 * nwbuild({
 *  mode: "get",
 *  downloadUrl: "https://npm.taobao.org/mirrors/nwjs",
 * });
 *
 * @example
 * // Singapore mirror
 * nwbuild({
 *  mode: "get",
 *  downloadUrl: "https://cnpmjs.org/mirrors/nwjs/",
 * });
 *
 * @example
 * // FFMPEG (proprietary codecs)
 * // Please read the license's constraints: https://nwjs.readthedocs.io/en/latest/For%20Developers/Enable%20Proprietary%20Codecs/#get-ffmpeg-binaries-from-the-community
 * nwbuild({
 *   mode: "get",
 *   ffmpeg: true,
 * });
 *
 * @example
 * // Node headers
 * nwbuild({
 *   mode: "get",
 *   nativeAddon: "gyp",
 * });
 *
 * @param  {object}                   options              Get mode options
 * @param  {string}                   options.version      NW.js runtime version. Defaults to "latest".
 * @param  {"normal" | "sdk"}         options.flavor       NW.js build flavor. Defaults to "normal".
 * @param  {"linux" | "osx" | "win"}  options.platform     Target platform. Defaults to host platform.
 * @param  {"ia32" | "x64" | "arm64"} options.arch         Target architecture. Defaults to host architecture.
 * @param  {string}                   options.downloadUrl  File server to download from. Defaults to "https://dl.nwjs.io". Set "https://npm.taobao.org/mirrors/nwjs" for China mirror or "https://cnpmjs.org/mirrors/nwjs/" for Singapore mirror.
 * @param  {string}                   options.cacheDir     Cache directory path. Defaults to "./cache"
 * @param  {boolean}                  options.cache        If false, remove cache before download. Defaults to true.
 * @param  {boolean}                  options.ffmpeg       If true, ffmpeg is not downloaded. Defaults to false.
 * @param  {false | "gyp"}            options.nativeAddon  Rebuilds native modules. Defaults to false.
 * @return {Promise<void>}
 */
export async function get({
  version = "latest",
  flavor = "normal",
  platform = PLATFORM_KV[process.platform],
  arch = ARCH_KV[process.arch],
  downloadUrl = "https://dl.nwjs.io",
  cacheDir = "./cache",
  cache = true,
  ffmpeg = false,
  nativeAddon = false,
}) {
  await getNwjs({
    version,
    flavor,
    platform,
    arch,
    downloadUrl,
    cacheDir,
    cache,
  });
  if (ffmpeg === true) {
    await getFfmpeg({
      version,
      flavor,
      platform,
      arch,
      downloadUrl,
      cacheDir,
      cache,
    });
  }
  if (nativeAddon === "gyp") {
    await getNodeHeaders({
      version: version,
      platform: platform,
      arch: arch,
      cacheDir: cacheDir,
      cache: cache,
    });
  }
}

/**
 * Get NW.js binaries
 *
 * @param  {object}                   options              Get mode options
 * @param  {string}                   options.version      NW.js runtime version. Defaults to "latest".
 * @param  {"normal" | "sdk"}         options.flavor       NW.js build flavor. Defaults to "normal".
 * @param  {"linux" | "osx" | "win"}  options.platform     Target platform. Defaults to host platform.
 * @param  {"ia32" | "x64" | "arm64"} options.arch         Target architecture. Defaults to host architecture.
 * @param  {string}                   options.downloadUrl  File server to download from. Defaults to "https://dl.nwjs.io". Set "https://npm.taobao.org/mirrors/nwjs" for China mirror or "https://cnpmjs.org/mirrors/nwjs/" for Singapore mirror.
 * @param  {string}                   options.cacheDir     Cache directory path. Defaults to "./cache"
 * @param  {boolean}                  options.cache        If false, remove cache before download. Defaults to true.
 * @return {Promise<void>}
 */
async function getNwjs({
  version = "latest",
  flavor = "normal",
  platform = PLATFORM_KV[process.platform],
  arch = ARCH_KV[process.arch],
  downloadUrl = "https://dl.nwjs.io",
  cacheDir = "./cache",
  cache = true,
}) {
  const bar = new progress.SingleBar({}, progress.Presets.rect);
  const out = path.resolve(
    cacheDir,
    `nwjs${flavor === "sdk" ? "-sdk" : ""}-v${version}-${platform}-${arch}.${
      platform === "linux" ? "tar.gz" : "zip"
    }`,
  );
  // If options.cache is false, remove cache.
  if (cache === false) {
    log.debug(`Removing existing NW.js binaries.`);
    await fsp.rm(out, {
      recursive: true,
      force: true,
    });
    log.debug(`Existing NW.js binaries removed.`);
  }

  if (fs.existsSync(out) === true) {
    log.debug(`Found existing NW.js binaries.`);
    await fsp.rm(
      path.resolve(
        cacheDir,
        `nwjs${flavor === "sdk" ? "-sdk" : ""}-v${version}-${platform}-${arch}`,
      ),
      { recursive: true, force: true },
    );
    await compressing[platform === "linux" ? "tgz" : "zip"].uncompress(
      out,
      cacheDir,
    );

    return;
  }

  const stream = fs.createWriteStream(out);
  const request = new Promise((res, rej) => {
    let url = "";

    // Set download url and destination.
    if (
      downloadUrl === "https://dl.nwjs.io" ||
      downloadUrl === "https://npm.taobao.org/mirrors/nwjs" ||
      downloadUrl === "https://npmmirror.com/mirrors/nwjs"
    ) {
      url = `${downloadUrl}/v${version}/nwjs${
        flavor === "sdk" ? "-sdk" : ""
      }-v${version}-${platform}-${arch}.${
        platform === "linux" ? "tar.gz" : "zip"
      }`;
    }

    https.get(url, (response) => {
      // For GitHub releases and mirrors, we need to follow the redirect.
      if (
        downloadUrl === "https://npm.taobao.org/mirrors/nwjs" ||
        downloadUrl === "https://npmmirror.com/mirrors/nwjs"
      ) {
        url = response.headers.location;
      }

      https.get(url, (response) => {
        log.debug(`Downloading from ${url}`);
        let chunks = 0;
        bar.start(Number(response.headers["content-length"]), 0);
        response.on("data", (chunk) => {
          chunks += chunk.length;
          bar.increment();
          bar.update(chunks);
        });

        response.on("error", (error) => {
          rej(error);
        });

        response.on("end", () => {
          log.debug(`NW.js download complete.`);
          bar.stop();
          res();
        });

        response.pipe(stream);
      });

      response.on("error", (error) => {
        rej(error);
      });
    });
  });

  return request.then(async () => {
    log.debug("Remove existing NW.js before decompression.");
    await fsp.rm(
      path.resolve(
        cacheDir,
        `nwjs${flavor === "sdk" ? "-sdk" : ""}-v${version}-${platform}-${arch}`,
      ),
      { recursive: true, force: true },
    );
    log.debug("Decompress NW.js binaries.");
    if (platform === "osx" && process.platform === "darwin") {
      const zip = await yauzl.open(out);
      try {
        for await (const entry of zip) {
          const fullEntryPath = path.resolve(cacheDir, entry.filename);

          if (entry.filename.endsWith("/")) {
            // Create directory
            await fsp.mkdir(fullEntryPath, { recursive: true });
          } else {
            // Create the file's directory first, if it doesn't exist
            const directory = path.dirname(fullEntryPath);
            await fsp.mkdir(directory, { recursive: true });

            const readStream = await entry.openReadStream();
            const writeStream = fs.createWriteStream(fullEntryPath);

            await new Promise((res, rej) => {
              readStream.pipe(writeStream);
              readStream.on("error", rej);
              writeStream.on("error", rej);
              writeStream.on("finish", res);
            });
          }
        }
      } catch (e) {
        log.error(e);
      } finally {
        await zip.close();
      }
    } else {
      await compressing[platform === "linux" ? "tgz" : "zip"].uncompress(
        out,
        cacheDir,
      );
    }
  });
}

/**
 * Get FFmpeg binary.
 *
 * @param  {object}                   options           Get mode options
 * @param  {string}                   options.version   NW.js runtime version. Defaults to "latest".
 * @param  {"normal" | "sdk"}         options.flavor    NW.js build flavor. Defaults to "normal".
 * @param  {"linux" | "osx" | "win"}  options.platform  Target platform. Defaults to host platform.
 * @param  {"ia32" | "x64" | "arm64"} options.arch      Target architecture. Defaults to host architecture.
 * @param  {string}                   options.cacheDir  Cache directory path. Defaults to "./cache"
 * @param  {boolean}                  options.cache     If false, remove cache before download. Defaults to true.
 * @return {Promise<void>}
 */
async function getFfmpeg({
  version = "latest",
  flavor = "normal",
  platform = PLATFORM_KV[process.platform],
  arch = ARCH_KV[process.arch],
  cacheDir = "./cache",
  cache = true,
}) {
  const nwDir = path.resolve(
    cacheDir,
    `nwjs${flavor === "sdk" ? "-sdk" : ""}-v${version}-${platform}-${arch}`,
  );
  const bar = new progress.SingleBar({}, progress.Presets.rect);

  // If options.ffmpeg is true, then download ffmpeg.
  const downloadUrl =
    "https://github.com/nwjs-ffmpeg-prebuilt/nwjs-ffmpeg-prebuilt/releases/download";
  let url = `${downloadUrl}/${version}/${version}-${platform}-${arch}.zip`;
  const out = path.resolve(
    cacheDir,
    `ffmpeg-v${version}-${platform}-${arch}.zip`,
  );

  // If options.cache is false, remove cache.
  if (cache === false) {
    log.debug(`Removing existing FFmpeg binary.`);
    await fsp.rm(out, {
      recursive: true,
      force: true,
    });
    log.debug(`Existing FFmpeg binary removed.`);
  }

  // Check if cache exists.
  if (fs.existsSync(out) === true) {
    log.debug(`Found existing FFmpeg binary.`);
    await compressing.zip.uncompress(out, nwDir);
    return;
  }

  const stream = fs.createWriteStream(out);
  const request = new Promise((res, rej) => {
    https.get(url, (response) => {
      // For GitHub releases and mirrors, we need to follow the redirect.
      url = response.headers.location;

      https.get(url, (response) => {
        log.debug(`Downloading from ${url}`);
        let chunks = 0;
        bar.start(Number(response.headers["content-length"]), 0);
        response.on("data", (chunk) => {
          chunks += chunk.length;
          bar.increment();
          bar.update(chunks);
        });

        response.on("error", (error) => {
          rej(error);
        });

        response.on("end", () => {
          log.debug(`FFmpeg download complete.`);
          bar.stop();
          res();
        });

        response.pipe(stream);
      });

      response.on("error", (error) => {
        rej(error);
      });
    });
  });

  // Remove compressed file after download and decompress.
  return request.then(async () => {
    await compressing.zip.uncompress(out, nwDir);
    await replaceFfmpeg(platform, nwDir);
  });
}

/**
 * Get Node headers
 *
 * @param  {object}                   options           Get mode options
 * @param  {string}                   options.version   NW.js runtime version. Defaults to "latest".
 * @param  {"linux" | "osx" | "win"}  options.platform  Target platform. Defaults to host platform.
 * @param  {"ia32" | "x64" | "arm64"} options.arch      Target architecture. Defaults to host architecture.
 * @param  {string}                   options.cacheDir  Cache directory path. Defaults to "./cache"
 * @param  {string}                   options.cache     If false, remove cache before download. Defaults to true.
 * @return {Promise<void>}
 */
async function getNodeHeaders({
  version = "latest",
  platform = PLATFORM_KV[process.platform],
  arch = ARCH_KV[process.arch],
  cacheDir = "./cache",
  cache = true,
}) {
  const bar = new progress.SingleBar({}, progress.Presets.rect);
  const out = path.resolve(
    cacheDir,
    `headers-v${version}-${platform}-${arch}.tar.gz`,
  );

  // If options.cache is false, remove cache.
  if (cache === false) {
    log.debug(`Removing existing Node headers.`);
    await fsp.rm(out, {
      recursive: true,
      force: true,
    });
    log.debug(`Existing Node headers removed.`);
  }

  if (fs.existsSync(out) === true) {
    log.debug(`Found existing Node headers cache.`);
    await compressing.tgz.uncompress(out, cacheDir);
    await fsp.rm(
      path.resolve(cacheDir, `node-v${version}-${platform}-${arch}`),
      {
        recursive: true,
        force: true,
      },
    );
    await fsp.rename(
      path.resolve(cacheDir, "node"),
      path.resolve(cacheDir, `node-v${version}-${platform}-${arch}`),
    );

    child_process.exec(
      "patch " +
        path.resolve(
          cacheDir,
          `node-v${version}-${platform}-${arch}`,
          "common.gypi",
        ) +
        " " +
        path.resolve("..", "..", "patches", "node_header.patch"),
      (error) => {
        log.error(error);
      },
    );

    return;
  }

  const stream = fs.createWriteStream(out);
  const request = new Promise((res, rej) => {
    const urlBase = "https://dl.nwjs.io/";
    const url = `${urlBase}/v${version}/nw-headers-v${version}.tar.gz`;
    https.get(url, (response) => {
      log.debug(`Response from ${url}`);
      let chunks = 0;
      bar.start(Number(response.headers["content-length"]), 0);
      response.on("data", (chunk) => {
        chunks += chunk.length;
        bar.increment();
        bar.update(chunks);
      });

      response.on("error", (error) => {
        rej(error);
      });

      response.on("end", () => {
        log.debug(`FFMPEG fully downloaded`);
        bar.stop();
        res();
      });

      response.pipe(stream);
    });
  });

  return request.then(async () => {
    await compressing.tgz.uncompress(out, cacheDir);
    await fsp.rename(
      path.resolve(cacheDir, "node"),
      path.resolve(cacheDir, `node-v${version}-${platform}-${arch}`),
    );
  });
}
