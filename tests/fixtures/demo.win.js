import nwbuild from '../../src/index.js';

await nwbuild({
  mode: 'build',
  flavor: 'sdk',
  platform: 'win',
  srcDir: './tests/fixtures/app',
  cacheDir: './node_modules/nw',
  outDir: './tests/fixtures/out/win',
  glob: false,
  logLevel: 'debug',
  app: {
    name: 'Demo',
    /* Relative to where the manifest will be located */
    icon: './tests/fixtures/app/icon.ico',
    version: '0.0.0',
    comments: 'Diagnostic information',
    company: 'NW.js Utilities',
    fileDescription: 'This is a demo app to test nw-builder functionality',
    fileVersion: '0.0.0',
    internalName: 'Demo',
    legalCopyright: '2024 (c) NW.js Utilties. All Rights Reserved',
    originalFilename: 'Demo',
    productName: 'Demo',
    productVersion: '0.0.0',
  }
});