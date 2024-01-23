import assert from "node:assert";
import path from "node:path";
import process from "node:process";

import { By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { beforeAll, describe, it } from "vitest";

import build from "../../src/bld.js";
import get from   "../../src/get.js";
import util from "../../src/util.js";

const { Driver, ServiceBuilder, Options } = chrome;

describe("build", async () => {
  let driver = undefined;

  const nwOptions = {
    srcDir: "test/fixture/app",
    mode: "build",
    version: "0.83.0",
    flavor: "sdk",
    platform: util.PLATFORM_KV[process.platform],
    arch: util.ARCH_KV[process.arch],
    outDir: "test/fixture/out/app",
    cacheDir: "test/fixture/cache",
    glob: false,
    nativeAddon: false,
  };

  beforeAll(async () => {
    await get(nwOptions);
    await build(nwOptions);
  }, Infinity);

  it("should run after build", async () => {
    const options = new Options();
    const args = [
      `--nwapp=${path.resolve("test", "fixture", "out", "app", "package.nw")}`,
      "--headless=new",
    ];
    options.addArguments(args);

    const chromedriverPath = util.getPath("chromedriver", nwOptions);

    const service = new ServiceBuilder(chromedriverPath).build();

    driver = Driver.createSession(options, service);
    const text = await driver.findElement(By.id("test")).getText();
    assert.strictEqual(text, "Hello, World!");
  });
});
