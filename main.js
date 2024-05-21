const express = require("express");

const port = 3000;

const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));
app.listen(port, async () => {
  console.log("listening port:", port);

  const url = await create_tunnel();
  await try_open_url(url);
});

const create_tunnel = async () => {
  const localtunnel = require("localtunnel");
  const tunnel = await localtunnel({ port });
  tunnel.on("close", () => console.log("tunnel closed"));

  console.log("tunnel created");

  return tunnel.url;
};

const try_open_url = async (url) => {
  console.log("external url:", url);

  if (process.platform != "darwin") {
    return;
  }

  const { exec } = require("child_process");
  exec(`open ${url}`, (error, stdout, stderr) => {
    error && console.error(`Command execution failed: ${error}`);
  });
};
