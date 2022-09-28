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
const https = require("https");
const fs = require("fs");
const notificationService = require("./notifications/notification.service");

const web = new WebClient(config.slack_token);
const conversationId = "C03SNDBD7E0";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.get("/", (req, res) => {
  res.json({ ok: true });
});
app.use("/users", require("./users/users.controller"));
app.use("/notifications", require("./notifications/notification.controller"));
app.use("/runs", require("./runs/runs.controller"));
app.use("/mbs", require("./mbs/mbs.controller"));
app.use("/nfts", require("./nfts/nfts.controller"));
app.use("/mps/solana", require("./mps/solana/solanaMps.controller"));
app.use("/mps/bnb", require("./mps/bnb/bnbMps.controller"));
app.use("/mps/ethereum", require("./mps/ethereum/ethereumMps.controller"));
const test = {
  id: 7990,
  walkerCommon: 1.2,
  joggerCommon: 1.2,
  runnerCommon: 1.19,
  trainerCommon: 2.2,
  walkerUncommon: 4.79,
  joggerUncommon: 4.5,
  runnerUncommon: 4.39,
  trainerUncommon: 9.65,
  walkerRare: 19,
  joggerRare: 23,
  runnerRare: 16.99,
  trainerRare: 44,
  walkerEpic: 108,
  joggerEpic: 149.8,
  runnerEpic: 86.8,
  trainerEpic: 666,
  efficiencyLvl1: 0.0101,
  efficiencyLvl2: 0.168999,
  efficiencyLvl3: 1.14,
  efficiencyLvl4: 5.89999,
  efficiencyLvl5: 28.9,
  efficiencyLvl6: 136,
  efficiencyLvl7: 0,
  efficiencyLvl8: 0,
  efficiencyLvl9: 0,
  luckLvl1: 0.0125,
  luckLvl2: 0.219999,
  luckLvl3: 1.46,
  luckLvl4: 6.79,
  luckLvl5: 34.99,
  luckLvl6: 137,
  luckLvl7: 137,
  luckLvl8: 137,
  luckLvl9: 137,
  resilienceLvl1: 0.01,
  resilienceLvl2: 0.084997,
  resilienceLvl3: 0.684,
  resilienceLvl4: 3.44,
  resilienceLvl5: 18,
  resilienceLvl6: 200,
  resilienceLvl7: 200,
  resilienceLvl8: 200,
  resilienceLvl9: 200,
  comfortLvl1: 0.0685,
  comfortLvl2: 0.73,
  comfortLvl3: 2,
  comfortLvl4: 18.99,
  comfortLvl5: 72.9,
  comfortLvl6: 289,
  comfortLvl7: 289,
  comfortLvl8: 289,
  comfortLvl9: 289,
  commonScroll: 0.036998,
  uncommonScroll: 0.018888,
  rareScroll: 0.058,
  epicScroll: 0.499,
  legendaryScroll: 6.4,
  genesisCommon: 61,
  genesisUncommon: 72,
  genesisRare: 67,
  genesisEpic: 186,
  ogCommon: 0,
  ogUncommon: 0,
  ogRare: 0,
  ogEpic: 0,
  Ethereum: 1334.52,
  Bnb: 279.303,
  gmt: 0.679315,
  Solana: 33.1334,
  gstSolana: 0.0324574,
  gstBnb: 0.0348491,
  gstEthereum: 0.142996,
  createdAt: "2022-09-28 16:28:18",
  updatedAt: "2022-09-28 16:28:18",
};
notificationService.checkNotifications(test, test, test);
// try {
//   getMp.getMp();
// } catch {
//   console.log("Error to get marketplace");
// }
// setInterval(async function () {
//   try {
//     getMp.getMp();
//   } catch (error) {
//     const result = await web.chat.postMessage({
//       text: `Une erreur lors de la récupération de la marketplace: ${error}`,
//       channel: conversationId,
//     });
//     console.log(
//       `Successfully send message ${result.ts} in conversation ${conversationId}`
//     );
//   }
// }, 600000);

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 443 : 4000;

var options = {
  key: fs.readFileSync("./cert/privkey.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
};

var server = https.createServer(options, app).listen(443, function () {
  console.log("Express server listening on port " + 443);
});

app.listen(port, () => console.log("Server listening on port " + port));
