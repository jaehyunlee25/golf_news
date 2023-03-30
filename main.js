const puppeteer = require("puppeteer");
const request = require("request");

String.prototype.dp = function (param) {
  let self = this;
  const keys = Object.keys(param);
  keys.forEach((key) => {
    const regex = new RegExp("\\$\\{".add(key).add("\\}"), "g");
    const val = param[key];
    self = self.replace(regex, val);
  });
  return self;
};

call();
setInterval(call, 1000 * 60);

function call() {
  request.post(
    "https://dev.mnemosyne.co.kr/api/crawler/getGolfLinkScript",
    {
      json: {
        links: [
          "yonhapnews",
          "golfhankook",
          /* "golfforwomen",
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
      const { links, scripts } = body;
      const round = new Date().getTime();

      main(links, scripts, round);
    }
  );
}
async function main(links, scripts, round) {
  console.log("main");
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  exec();
  async function exec() {
    let link = links.shift();
    console.log(link);
    let script = scripts.shift();
    if (!link) {
      await browser.close();
      return;
    }
    script = script.dp({ round });
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
    await page.goto(link);
    await page.evaluate(script);
    /* const content = await page.content();
    console.log(content); */
    await page.waitForTimeout(3000);
    exec();
  }
}
