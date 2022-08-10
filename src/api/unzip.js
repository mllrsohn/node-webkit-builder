import extract from "extract-zip";
import tar from "tar";

import getNwId from "../utilities/getNwId";

const unzip = (version, flavour, platform, arch, outDir) => {
  return new Promise((resolve) => {
    if (platform === "linux") {
      tar.x({
        file: `${outDir}/${getNwId(version, flavour, platform, arch)}`,
        C: `${outDir}`,
      });
      resolve();
    } else {
      extract(`${outDir}/${getNwId(version, flavour, platform, arch)}`, {
        dir: `${outDir}`,
      });
      resolve();
    }
  });
};

export default unzip;
