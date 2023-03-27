const fs = require("fs");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromium = require("chromium");
require("chromedriver");
const log = console.log;

log("start");
async function start() {
  log("function", "start");
  let options = new chrome.Options();
  options.setChromeBinaryPath(chromium.path);
  options.addArguments("--headless");
  //    options.addArguments('--disable-gpu');
  options.addArguments("--no-sandbox");
  //    options.addArguments('--single-process');
  options.addArguments("--disable-dev-shm-usage");
  //    options.addArguments('--window-size=1280,960');

  log("driver");
  try {
    const driver = await new webdriver.Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    log("call web");
    await driver.get("http://google.com");
    console.log("Hello Google!");
    await takeScreenshot(driver, "google-start-page");

    await driver.quit();
  } catch (e) {
    log(e);
  }
}

async function takeScreenshot(driver, name) {
  await driver.takeScreenshot().then((data) => {
    fs.writeFileSync(name + ".png", data, "base64");
    console.log("Screenshot is saved");
  });
}

const t = setInterval(() => {
  start();
}, 1000);
