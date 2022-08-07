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
  uploadFiles,
};

async function uploadFile(req, res) {
  try {
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
      console.log("data")
      data = data.replace(/'/g, '"');
      params = JSON.parse(data);
      params.userId = req.user.id;
      params.realm = JSON.parse(req.body.realm).realm;
      params.fileName = req.file.filename;
      try {
        res.send(await db.Mb.create(params));
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
    });
    get_content_from_screen.stderr.setEncoding("utf8");
    await get_content_from_screen.stderr.on("data", async function (data) {console.log(data)})
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
}

async function uploadFiles(path) {
  try {
    var params;
    var get_content_from_screen = await spawn("python", [
      "./python/get_content_from_screen.py",
      path,
    ]);

    get_content_from_screen.stdout.setEncoding("utf8");
    await get_content_from_screen.stdout.on("data", async function (data) {
      console.log(data);
      data = data.replace(/'/g, '"');
      params = JSON.parse(data);
      params.userId = "1";
      params.realm = "Solana";
      params.fileName = path;
      try {
        console.log(await db.Mb.create(params));
        await async function (data) {
          var prices;
          if (data.realm == "Solana") {
            prices = await db.SolanaMp.findAll({
              limit: 1,
              order: [["createdAt", "DESC"]],
              subQuery: false,
            });
          }
          if (data.realm == "Bnb") {
            prices = await db.BNBMp.findAll({
              limit: 1,
              order: [["createdAt", "DESC"]],
              subQuery: false,
            });
          }
          if (data.realm == "Ethereum") {
            prices = await db.EthereumMp.findAll({
              limit: 1,
              order: [["createdAt", "DESC"]],
              subQuery: false,
            });
          }
          data.prices = prices;
          console.log(data);
        };
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
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
