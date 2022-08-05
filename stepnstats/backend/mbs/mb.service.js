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
      data = data.replace(/'/g, '"');
      params = JSON.parse(data);
      params.userId = req.user.id;
      params.realm = req.body.realm
      params.fileName = req.file.filename;
      var get_mb_lvl_from_image = await spawn("python", [
        "./python/get_mb_lvl_from_image.py",
        req.file.path,
        "open_mb",
      ]);
      get_mb_lvl_from_image.stdout.setEncoding("utf8");
      await get_mb_lvl_from_image.stdout.on("data", async function (data) {
        params.lvl = Number(data);
        // save rmbun
        try {
          res.send(await db.Mb.create(params));
        } catch (error) {
          console.log(error);
          res.status(400).send(error);
        }
      });
      get_mb_lvl_from_image.stderr.setEncoding("utf8");
      await get_mb_lvl_from_image.stderr.on(
        "data",
        await function (data) {
          return res.send("here");
        }
      );
    });
    get_content_from_screen.stderr.setEncoding("utf8");
    await get_content_from_screen.stderr.on(
      "data",
      await async function (data) {
        var prices;
        if (data.realm == "Solana") {
          prices = await db.SolanaMp.findAll({
            where: {
              createdAt: {
                [db.Op.lte]: data.createdAt,
              },
            },
            limit: 1,
            order: [["createdAt", "DESC"]],
            subQuery: false,
          });
        }
        if (data.realm == "Bnb") {
          prices = await db.BNBMp.findAll({
            where: {
              createdAt: {
                [db.Op.lte]: data.createdAt,
              },
            },
            limit: 1,
            order: [["createdAt", "DESC"]],
            subQuery: false,
          });
        }
        if (data.realm == "Ethereum") {
          prices = await db.EthereumMp.findAll({
            where: {
              createdAt: {
                [db.Op.lte]: data.createdAt,
              },
            },
            limit: 1,
            order: [["createdAt", "DESC"]],
            subQuery: false,
          });
        }
        data.setDataValue("prices", prices);
        return res.send(data);
      }
    );
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
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
        where: {
          createdAt: {
            [db.Op.lte]: mbs[i].createdAt,
          },
        },
        limit: 1,
        order: [["createdAt", "DESC"]],
        subQuery: false,
      });
    }
    if (mbs[i].realm == "Bnb") {
      prices = await db.BNBMp.findAll({
        where: {
          createdAt: {
            [db.Op.lte]: mbs[i].createdAt,
          },
        },
        limit: 1,
        order: [["createdAt", "DESC"]],
        subQuery: false,
      });
    }
    if (mbs[i].realm == "Ethereum") {
      console.log("ici");
      prices = await db.EthereumMp.findAll({
        where: {
          createdAt: {
            [db.Op.lte]: mbs[i].createdAt,
          },
        },
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
