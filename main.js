const puppeteer = require("puppeteer");
const request = require("request");

request.post(
  "https://dev.mnemosyne.co.kr/api/crawler/getGolfLinkScript",
  {
    json: {
      links: [
        "yonhapnews",
        /* "golfhankook",
        "golfforwomen",
        "golfdigest",
        "wolgangolf",
        "golfeconomy",
        "hankookleisure",
        "golfsanup",
        "golfjournal", */
      ],
    },
  },
  (err, resp, body) => {
    console.log("result/searchResult.js", body.scripts[0], "utf-8");
  }
);

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
    console.log(msg.text());
  });
  await page.goto("https://www.yna.co.kr/sports/golf");
  await page.evaluate(() => {
    console.log("evaluate: 11");
  });
  /* const content = await page.content();
  console.log(content); */
  await browser.close();
}

//main();
