import { access, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { log } from "../log.js";

import { getManifest } from "./getManifest.js";

/**
 * Get version specific release metadata
 *
 * @param  {string} version      NW version
 * @param  {string} platform     NW platform
 * @param  {string} arch         NW architecture
 * @param  {string} cacheDir     Directory to store NW binaries
 * @param  {string} manifestUrl  Url to manifest
 * @return {object}              Version specific release info
 */
export const getReleaseInfo = async (version, platform, arch , cacheDir, manifestUrl) => {
  let releaseData = undefined;
  try {
    // Don't cache manifest for osx arm64
    // Cached manifest may not have the osx arm64 info 
    if (platform === "osx" && arch === "arm64") {
      throw new Error("No manifest available for osx arm64");
    }
    await access(resolve(cacheDir, "manifest.json"));
    log.debug(`Manifest file already exists locally under ${cacheDir}`);
  } catch (e) {
    log.debug(`Manifest file does not exist locally`);
    log.debug(`Downloading latest manifest file under ${cacheDir}`);
    const data = await getManifest(manifestUrl);
    await writeFile(resolve(cacheDir, "manifest.json"), data.slice(9));
  } finally {
    log.debug("Store manifest metadata in memory");
    let manifest = JSON.parse(
      await readFile(resolve(cacheDir, "manifest.json")),
    );
    log.debug(`Search for ${version} specific release data`);
    if (version === "latest" || version === "stable" || version === "lts") {
      // Remove leading "v" from version string
      version = manifest[version].slice(1);
    }

    releaseData = manifest.versions.find(
      (release) => release.version === `v${version}`,
    );
  }
  return releaseData;
};
