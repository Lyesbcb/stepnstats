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
      await db.Nft.findOne({
        where: { userId: req.user.id, fileName: req.file.filename },
      })
    ) {
      throw "This nft is already exist.";
    }
    var nft = await spawn("python", [
      "./python/nft.py",
      req.file.path,
    ]);

    nft.stdout.setEncoding("utf8");
    await nft.stdout.on("data", async function (data) {
      console.log(data)
      data = data.replace(/'/g, '"');
      params = JSON.parse(data);
      params.userId = req.user.id;
      params.realm = JSON.parse(req.body.realm).realm;
      params.fileName = req.file.filename;
      try {
        res.send(await db.Nft.create(params));
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
    });
    nft.stderr.setEncoding("utf8");
    await nft.stderr.on("data", async function (data) {console.log(data)})
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
}

async function getAll(req) {
  return await db.Nft.findAndCountAll({
    offset: (req.query.page - 1) * 1,
    limit: 10,
    subQuery: false,
  });
}

async function getAllMy(req) {
  return await db.Nft.findAndCountAll({
    where: { userId: req.user.id },
    offset: (req.query.page - 1) * 1,
    order: [["createdAt", "DESC"]],
    limit: 10,
    subQuery: false,
  });
}

async function getById(req) {
  const nft = await getNft(req);
  const currentUser = req.user;
  const userId = nft.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }

  return nft;
}

async function create(params, userId) {
  if (
    await db.Nft.findOne({
      where: { userId: userId, fileName: params.fileName },
    })
  ) {
    throw "This nft is already exist.";
  }
  params.userId = userId;
  // save rnftun
  return await db.Nft.create(params);
}

async function update(req) {
  const nft = await getNft(req.params.id);
  const currentUser = req.user;
  const userId = nft.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }
  id = req.params.id;
  params = req.body;
  // copy params to nfts and save
  Object.assign(nft, params);
  await nft.save();

  return getNft(id);
}

async function _delete(req) {
  const nft = await getNft(req.params.id);
  const currentUser = req.user;
  const userId = nft.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }
  return await nft.destroy();
}

// helper functions
async function getNft(id) {
  const nft = await db.Nft.findOne({
    where: { id: id},
  });
  if (!nft) throw "nft not found.";
  return nft;
}
