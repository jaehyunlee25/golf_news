const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://google.com");
  const content = await page.content();
  console.log(content);
}

main();
