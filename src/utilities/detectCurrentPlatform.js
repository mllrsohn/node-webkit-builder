import Platform from "../constants/Platform.js";
/**
 *
 * @param  {NodeJS.Process}       process
 * @return {Platform | undefined}
 */
const detectCurrentPlatform = (process) => {
  switch (process.platform) {
    case "darwin":
      return process.arch === "x64" ? Platform.OSX_64 : Platform.OSX_32;

    case "win32":
      return process.arch === "x64" ? Platform.WIN_64 : Platform.WIN_32;

    case "linux":
      return process.arch === "x64" ? Platform.NIX_64 : Platform.NIX_32;
    default:
      return undefined;
  }
};

export default detectCurrentPlatform;
