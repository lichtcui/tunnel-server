const express = require("express");

const port = 3000;

const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));
app.listen(port, async () => {
  console.log("listening port:", port);

  try {
    const url = await create_tunnel();
    await try_open(url);
  } catch (error) {
    console.error(error);
  }
});

const create_tunnel = async () => {
  const localtunnel = require("localtunnel");
  const tunnel = await localtunnel({ port });
  tunnel.on("close", () => console.log("tunnel closed"));

  console.log("tunnel created");

  return tunnel.url;
};

const try_open = async (url) => {
  console.log("external url:", url);

  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
  });
  const page = await browser.newPage();
  await page.goto(url);
};
