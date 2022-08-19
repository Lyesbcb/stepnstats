require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("_middleware/error-handler");
const getMp = require("./getMp");
const buyAndSell = require("./buyAndSell");
const { WebClient } = require("@slack/web-api");
const config = require("./config.json");

const web = new WebClient(config.slack_token);
const conversationId = "C03SNDBD7E0";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use("/users", require("./users/users.controller"));
app.use("/runs", require("./runs/runs.controller"));
app.use("/mbs", require("./mbs/mbs.controller"));
app.use("/nfts", require("./nfts/nfts.controller"));
app.use("/mps/solana", require("./mps/solana/solanaMps.controller"));
app.use("/mps/bnb", require("./mps/bnb/bnbMps.controller"));
app.use("/mps/ethereum", require("./mps/ethereum/ethereumMps.controller"));
try {
  getMp.getMp();
} catch {
  console.log("Error to get marketplace");
}
setInterval(async function () {
  try {
    getMp.getMp();
  } catch (error) {
    const result = await web.chat.postMessage({
      text: `Une erreur lors de la récupération de la marketplace: ${error}`,
      channel: conversationId,
    });
    console.log(
      `Successfully send message ${result.ts} in conversation ${conversationId}`
    );
  }
}, 600000);

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => console.log("Server listening on port " + port));
