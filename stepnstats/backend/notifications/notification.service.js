const config = require("config.json");
const db = require("_helpers/db");
const Role = require("_helpers/role");
const { Expo } = require("expo-server-sdk");

module.exports = {
  getAllMy,
  create,
  update,
  delete: _delete,
  getNotification,
  checkNotifications,
};

let expo = new Expo();

async function getAllMy(req) {
  return await db.Notification.findAndCountAll({
    where: { userId: req.user.id },
    order: [["createdAt", "DESC"]],
    limit: 1000,
    subQuery: false,
  });
}

async function create(req) {
  req.body.contentPrice = (req.body.contentPrice).replace(/,/g, '.')
  var params = req.body;
  params.userId = req.user.id;
  // save rmbun
  return await db.Notification.create(params);
}

async function update(req) {
  const notification = await getNotification(req.params.id);
  const currentUser = req.user;
  const userId = notification.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }
  id = req.params.id;
  params = req.body;
  // copy params to notifications and save
  Object.assign(notification, params);
  return await notification.save();
}

async function _delete(req) {
  const notification = await getNotification(req.params.id);
  const currentUser = req.user;
  const userId = notification.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }
  return await notification.destroy();
}

// helper functions
async function getNotification(id) {
  const notification = await db.Notification.findOne({
    where: { id: id },
  });
  if (!notification) throw "notification not found.";
  return notification;
}

async function checkNotifications(solanaMp, ethereumMp, bnbMp) {
  var idToNotify = [];
  const notifications = await db.Notification.findAll();
  for (var i = 0; i < notifications.length; i++) {
    if (notifications[i].type === "below") {
      if (notifications[i].realm === "Solana") {
        if (notifications[i].currency === "crypto") {
          if (
            solanaMp[notifications[i].content] > notifications[i].contentPrice
          ) {
            console.log(notifications[i].content);
            idToNotify.push(notifications[i].id);
          }
        } else {
          if (
            solanaMp[notifications[i].content] * solanaMp.Solana >
            notifications[i].contentPrice
          ) {
            idToNotify.push(notifications[i].id);
          }
        }
      } else if (notifications[i].realm === "Ethereum") {
        if (notifications[i].currency === "crypto") {
          if (
            ethereumMp[notifications[i].content] > notifications[i].contentPrice
          ) {
            idToNotify.push(notifications[i].id);
          }
        } else {
          if (
            ethereumMp[notifications[i].content] * ethereumMp.Ethereum >
            notifications[i].contentPrice
          ) {
            idToNotify.push(notifications[i].id);
          }
        }
      } else if (notifications[i].realm === "Bnb") {
        if (notifications[i].currency === "crypto") {
          if (bnbMp[notifications[i].content] > notifications[i].contentPrice) {
            idToNotify.push(notifications[i].id);
          }
        } else {
          if (
            bnbMp[notifications[i].content] * bnbMp.Bnb >
            notifications[i].contentPrice
          ) {
            idToNotify.push(notifications[i].id);
          }
        }
      }
    } else if (notifications[i].type === "above") {
      if (notifications[i].realm === "Solana") {
        if (notifications[i].currency === "crypto") {
          if (
            solanaMp[notifications[i].content] < notifications[i].contentPrice
          ) {
            idToNotify.push(notifications[i].id);
          }
        } else {
          if (
            solanaMp[notifications[i].content] * solanaMp.Solana <
            notifications[i].contentPrice
          ) {
            idToNotify.push(notifications[i].id);
          }
        }
      } else if (notifications[i].realm === "Ethereum") {
        if (notifications[i].currency === "crypto") {
          if (
            ethereumMp[notifications[i].content] < notifications[i].contentPrice
          ) {
            idToNotify.push(notifications[i].id);
          }
        } else {
          if (
            ethereumMp[notifications[i].content] * ethereumMp.Ethereum <
            notifications[i].contentPrice
          ) {
            idToNotify.push(notifications[i].id);
          }
        }
      } else if (notifications[i].realm === "Bnb") {
        if (notifications[i].currency === "crypto") {
          if (bnbMp[notifications[i].content] < notifications[i].contentPrice) {
            idToNotify.push(notifications[i].id);
          }
        } else {
          if (
            bnbMp[notifications[i].content] * bnbMp.Bnb <
            notifications[i].contentPrice
          ) {
            idToNotify.push(notifications[i].id);
          }
        }
      }
    }
  }

  for (var i = 0; i < idToNotify.length; i++) {
    await sendNotification(idToNotify[i]);
  }
}

async function sendNotification(id) {
  const response = await db.sequelize.query(
    `SELECT n.id, content, contentPrice, type, notificationToken, realm FROM (SELECT * FROM notifications where id = ${id}) n LEFT JOIN users u ON userId = u.id`
  );
  console.log(id)
  expo.sendPushNotificationsAsync([
    {
      to: response[0][0].notificationToken,
      sound: "default",
      body: `${contents[response[0][0].content]} ${response[0][0].type} ${
        response[0][0].contentPrice
      } ${response[0][0].currency === "crypto" ? response[0][0].realm : "$"}`,
      badge: 1,
      title: "Marketplace Alert",
    },
  ]);
  const notification = await getNotification(response[0][0].id);
  return await notification.destroy();
}

const contents = {
  efficiencyLvl1: "Gem Efficiency Lvl 1",
  efficiencyLvl2: "Gem Efficiency Lvl 2",
  efficiencyLvl3: "Gem Efficiency Lvl 3",
  efficiencyLvl4: "Gem Efficiency Lvl 4",
  efficiencyLvl5: "Gem Efficiency Lvl 5",
  efficiencyLvl6: "Gem Efficiency Lvl 6",
  efficiencyLvl7: "Gem Efficiency Lvl 7",
  efficiencyLvl8: "Gem Efficiency Lvl 8",
  efficiencyLvl9: "Gem Efficiency Lvl 9",
  luckLvl1: "Gem Luck Lvl 1",
  luckLvl2: "Gem Luck Lvl 2",
  luckLvl3: "Gem Luck Lvl 3",
  luckLvl4: "Gem Luck Lvl 4",
  luckLvl5: "Gem Luck Lvl 5",
  luckLvl6: "Gem Luck Lvl 6",
  luckLvl7: "Gem Luck Lvl 7",
  luckLvl8: "Gem Luck Lvl 8",
  luckLvl9: "Gem Luck Lvl 9",
  comfortLvl1: "Gem Comfort Lvl 1",
  comfortLvl2: "Gem Comfort Lvl 2",
  comfortLvl3: "Gem Comfort Lvl 3",
  comfortLvl4: "Gem Comfort Lvl 4",
  comfortLvl5: "Gem Comfort Lvl 5",
  comfortLvl6: "Gem Comfort Lvl 6",
  comfortLvl7: "Gem Comfort Lvl 7",
  comfortLvl8: "Gem Comfort Lvl 8",
  comfortLvl9: "Gem Comfort Lvl 9",
  resilienceLvl1: "Gem Resilience Lvl 1",
  resilienceLvl2: "Gem Resilience Lvl 2",
  resilienceLvl3: "Gem Resilience Lvl 3",
  resilienceLvl4: "Gem Resilience Lvl 4",
  resilienceLvl5: "Gem Resilience Lvl 5",
  resilienceLvl6: "Gem Resilience Lvl 6",
  resilienceLvl7: "Gem Resilience Lvl 7",
  resilienceLvl8: "Gem Resilience Lvl 8",
  resilienceLvl9: "Gem Resilience Lvl 9",
  walkerCommon: "Sneaker Walker Common",
  joggerCommon: "Sneaker Jogger Common",
  runnerCommon: "Sneaker Runner Common",
  trainerCommon: "Sneaker Trainer Common",
  walkerUncommon: "Sneaker Walker Uncommon",
  joggerUncommon: "Sneaker Jogger Uncommon",
  runnerUncommon: "Sneaker Runner Uncommon",
  trainerUncommon: "Sneaker Trainer Uncommon",
  walkerRare: "Sneaker Walker Rare",
  joggerRare: "Sneaker Jogger Rare",
  runnerRare: "Sneaker Runner Rare",
  trainerRare: "Sneaker Trainer Rare",
  walkerEpic: "Sneaker Walker Epic",
  joggerEpic: "Sneaker Jogger Epic",
  runnerEpic: "Sneaker Runner Epic",
  trainerEpic: "Sneaker Trainer Epic",
  commonScroll: "Common Scroll",
  uncommonScroll: "Uncommon Scroll",
  rareScroll: "Rare Scroll",
  epicScroll: "Epic Scroll",
  legendaryScroll: "Legendary Scroll",
  genesisCommon: "Sneaker Genesis Common",
  genesisUncommon: "Sneaker Genesis Uncommon",
  genesisRare: "Sneaker Genesis Rare",
  genesisEpic: "Sneaker Genesis Epic",
  ogCommon: "Sneaker OG Common",
  ogUncommon: "Sneaker OG Uncommon",
  ogRare: "Sneaker OG Rare",
  ogEpic: "Sneaker OG Epic",
};
