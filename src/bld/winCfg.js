import { rename } from "node:fs/promises";

import rcedit from "rcedit";

/**
 * Windows specific configuration steps
 * https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2015/deployment/trustinfo-element-clickonce-application?view=vs-2015#requestedexecutionlevel
 * https://learn.microsoft.com/en-us/windows/win32/msi/version
 * https://learn.microsoft.com/en-gb/windows/win32/sbscs/application-manifests
 * https://learn.microsoft.com/en-gb/windows/win32/menurc/versioninfo-resource
 *
 * @param {object} app     Multi platform configuration options
 * @param {string} outDir  The directory to hold build artifacts
 */
const setWinConfig = async (app, outDir) => {
  let versionString = {
    Comments: app.comments,
    CompanyName: app.author,
    FileDescription: app.description,
    FileVersion: app.version,
    InternalName: app.name,
    LegalCopyright: app.copyright,
    LegalTrademarks: app.trademark,
    OriginalFilename: app.name,
    PrivateBuild: app.name,
    ProductName: app.name,
    ProductVersion: app.version,
    SpecialBuild: app.name,
  };

   Object.keys(versionString).forEach((option) => {
    if (option === undefined) {
      delete versionString[option];
    }
   });

   console.log(versionString);

  await rename(`${outDir}/nw.exe`, `${outDir}/${app.name}.exe`);
  await rcedit(`${outDir}/${app.name}.exe`, {
    "application-manifest": "asInvoker",
    "file-version": app.version,
    "icon": app.icon,
    "product-version": app.version,
    "version-string": versionString,
  });
};

export { setWinConfig };
