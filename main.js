const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  page.on("dialog", async (dialog) => {
    //get alert message
    console.log(dialog.message());
    //accept alert
    await dialog.accept(); //message(), type(),  dismiss(), type()
  });
  page.on("console", (msg) => {
    console.log(msg.text);
  });
  await page.goto("https://www.yna.co.kr/sports/golf");
  console.log(page);
  /* const content = await page.content();
  console.log(content); */
}

main();
