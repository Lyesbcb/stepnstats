const config = require("config.json");
const db = require("_helpers/db");
const Role = require("_helpers/role");
var spawn = require("child_process").spawn;

module.exports = {
  getAll,
  getAllMy,
  getById,
  create,
  update,
  delete: _delete,
  uploadFile,
  getAllByLvl,
};

async function getAllByLvl(lvl) {
  return await db.Mb.findAll({
    where: {
      lvl: lvl,
    },
    subQuery: false,
  });
}

async function uploadFile(req, res) {
  try {
    var stderr = "";
    var params;
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    if (
      await db.Mb.findOne({
        where: { userId: req.user.id, fileName: req.file.filename },
      })
    ) {
      throw "This mb is already exist.";
    }
    var get_content_from_screen = await spawn("python", [
      "./python/get_content_from_screen.py",
      req.file.path,
    ]);

    get_content_from_screen.stdout.setEncoding("utf8");
    await get_content_from_screen.stdout.on("data", async function (data) {
      data = data.replace(/'/g, '"');
      params = JSON.parse(data);
      params.userId = req.user.id;
      params.realm = JSON.parse(req.body.realm).realm;
      params.fileName = req.file.filename;
      var prices;
      if (params.realm == "Solana") {
        prices = await db.SolanaMp.findAll({
          limit: 1,
          order: [["createdAt", "DESC"]],
          subQuery: false,
        });
      }
      if (params.realm == "Bnb") {
        prices = await db.BNBMp.findAll({
          limit: 1,
          order: [["createdAt", "DESC"]],
          subQuery: false,
        });
      }
      if (params.realm == "Ethereum") {
        prices = await db.EthereumMp.findAll({
          limit: 1,
          order: [["createdAt", "DESC"]],
          subQuery: false,
        });
      }
      params.prices = prices[0];
      params.mbPrice = await getMbPrice(params);
      try {
        res.send(await db.Mb.create(params));
      } catch (error) {
        res.status(400).send({ message: "Error on recognizing image" });
      }
    });
    get_content_from_screen.stderr.setEncoding("utf8");
    await get_content_from_screen.stderr.on("data", async function (data) {
      stderr = "Error on recognizing image";
    });
    const exitCode = await new Promise((resolve, reject) => {
      get_content_from_screen.on("close", resolve);
    });
    if (exitCode) {
      throw stderr;
    }
  } catch (error) {
    if (error == "") {
      return res.status(400).json({ message: "Error on recognizing image" });
    }
    return res.status(400).json({ message: error });
  }
}

async function getAll(req) {
  return await db.Mb.findAll({
    offset: (req.query.page - 1) * 1,
    limit: 10,
    subQuery: false,
  });
}

async function getAllMy(req) {
  const mbs = await db.Mb.findAll({
    where: { userId: req.user.id },
    offset: (req.query.page - 1) * 1,
    order: [["createdAt", "DESC"]],
    limit: 10,
    subQuery: false,
  });
  for (var i = 0; i < mbs.length; i++) {
    var prices;
    if (mbs[i].realm == "Solana") {
      prices = await db.SolanaMp.findAll({
        limit: 1,
        order: [["createdAt", "DESC"]],
        subQuery: false,
      });
    }
    if (mbs[i].realm == "Bnb") {
      prices = await db.BNBMp.findAll({
        limit: 1,
        order: [["createdAt", "DESC"]],
        subQuery: false,
      });
    }
    if (mbs[i].realm == "Ethereum") {
      prices = await db.EthereumMp.findAll({
        limit: 1,
        order: [["createdAt", "DESC"]],
        subQuery: false,
      });
    }
    mbs[i].setDataValue("prices", prices);
  }
  return mbs;
}

async function getById(req) {
  const mb = await getMb(req.params.id);
  const currentUser = req.user;
  const userId = mb.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }

  return mb;
}

async function create(params, userId) {
  if (
    await db.Mb.findOne({
      where: { userId: userId, fileName: params.fileName },
    })
  ) {
    throw "This mb is already exist.";
  }
  params.userId = userId;
  // save rmbun
  return await db.Mb.create(params);
}

async function update(req) {
  const mb = await getMb(req.params.id);
  const currentUser = req.user;
  const userId = mb.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }
  id = req.params.id;
  params = req.body;
  // copy params to mbs and save
  Object.assign(mb, params);
  await mb.save();

  return getMb(id);
}

async function _delete(req) {
  const mb = await getMb(req.params.id);
  const currentUser = req.user;
  const userId = mb.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }
  await mb.destroy();
}

// helper functions

async function getMb(id) {
  const mb = await db.Mb.findByPk(id);
  if (!mb) throw "Mb not found.";
  return mb;
}

function getPriceFromContent(content, contentQuantity, prices, realm) {
  var totalRealmCrypto = 0;
  var totalGst = 0;
  var totalGmt = 0;
  var total = 0;
  if (content) {
    if (!content.includes("gst")) {
      totalRealmCrypto += prices[content] * contentQuantity;
    } else if (content.includes("gst")) {
      totalGst += prices[content + realm] * contentQuantity;
    }
    total = totalRealmCrypto * prices[realm] + totalGst * prices["gst" + realm];
    //Remove the marketplace fees
    return total * 0.94;
  }
  return 0;
}

function getMbPrice(data) {
  const content1Price = getPriceFromContent(
    data.content1,
    data.content1Quantity,
    data.prices,
    data.realm
  );
  const content2Price = getPriceFromContent(
    data.content2,
    data.content2Quantity,
    data.prices,
    data.realm
  );
  const content3Price = getPriceFromContent(
    data.content3,
    data.content3Quantity,
    data.prices,
    data.realm
  );
  const content4Price = getPriceFromContent(
    data.content4,
    data.content4Quantity,
    data.prices,
    data.realm
  );
  const content5Price = getPriceFromContent(
    data.content5,
    data.content5Quantity,
    data.prices,
    data.realm
  );
  const content6Price = getPriceFromContent(
    data.content6,
    data.content6Quantity,
    data.prices,
    data.realm
  );
  var total =
    content1Price +
    content2Price +
    content3Price +
    content4Price +
    content5Price +
    content6Price;
  return total.toFixed(2);
}
