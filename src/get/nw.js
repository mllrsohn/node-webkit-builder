import fs from "node:fs";
import path from "node:path";

import request from "./request.js";

/**
 * Download NW.js binary.
 * 
 * @param {string} downloadUrl 
 * @param {string} version 
 * @param {string} flavor 
 * @param {string} platform 
 * @param {string} arch 
 * @param {string} cacheDir 
 * @return {Promise<string>} 
 */
export default async function nw(downloadUrl, version, flavor, platform, arch, cacheDir) {

    /**
     * Name of directory which contains NW.js binaries.
     * @type {string}
     */
    const nwDir = [
        `nwjs`,
        flavor === 'sdk' ? '-sdk' : '',
        `-v${version}-${platform}-${arch}`,
    ].join('');

    /**
     * Name of compressed file which contains NW.js binaries.
     * @type {string}
     */
    const nwFile = [
        nwDir,
        platform === 'linux' ? "tar.gz" : "zip"
    ].join('.');

    /**
     * URL to download specific NW.js binary from.
     * @type {string}
     */
    const url = [
        downloadUrl,
        `v${version}`,
        nwFile,
    ].join('/');
    console.log(url)

    /**
     * Absolute path of compressed file which contains NW.js binaries.
     */
    const nwFileAbs = path.resolve(
        cacheDir,
        nwFile
    );

    const buffer = await request(url);
    
    await fs.promises.writeFile(nwFileAbs, buffer);

    return out;
}
