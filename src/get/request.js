import fs from "node:fs";
import stream from "node:stream";

import axios from "axios";

/**
 * Download from `url`.
 *
 * @async
 * @function
 * 
 * @param  {string}          url  - Download server
 * @param {string}           filePath - file path of downloaded content
 * @return {Promise<Buffer>}      - Downloaded content
 */
export default async function request(url, filePath) {

  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    method: "get",
    url: url,
    responseType: "stream"
  });

  await stream.promises.pipeline(response.data, writer);
}
