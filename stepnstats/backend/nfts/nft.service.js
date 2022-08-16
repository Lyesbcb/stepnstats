const config = require("config.json");
const db = require("_helpers/db");
const Role = require("_helpers/role");
var spawn = require("child_process").spawn;

module.exports = {
  getAll,
  getAllMy,
  getByNftId,
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
    var nft = await spawn("python", ["./python/nft.py", req.file.path]);

    nft.stdout.setEncoding("utf8");
    await nft.stdout.on("data", async function (data) {
      data = data.replace(/'/g, '"');
      params = JSON.parse(data);
      params.userId = req.user.id;
      params.realm = JSON.parse(req.body.realm).realm;
      params.fileName = req.file.filename;
      try {
        var tempBool = Boolean(params.base === "true");
        if (!tempBool) {
          throw "Upload only base stats sneaker!";
        } else {
          try {
            res.send(await create(params));
          } catch (error) {
            res.status(400).json({ message: error });
          }
        }
      } catch (error) {
        res.status(400).json({ message: error });
      }
    });
    nft.stderr.setEncoding("utf8");
    await nft.stderr.on("data", async function (data) {
      stderr = "Error on recognizing image";
    });
    const exitCode = await new Promise((resolve, reject) => {
      nft.on("close", resolve);
    });
    if (exitCode) {
      throw stderr;
    }
  } catch (error) {
    return res.status(400).json({ message: error });
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

async function getByNftId(req) {
  const nft = await db.Nft.findOne({
    where: { nftId: req.query.nftId },
    limit: 1,
  });
  if (!nft) throw "nft not found.";
  const currentUser = req.user;
  const userId = nft.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }

  return nft;
}

async function create(params) {
  console.log(params);
  if (
    await db.Nft.findOne({
      where: { userId: params.userId, nftId: params.nftId },
    })
  ) {
    throw "This nft is already exist.";
  }
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
    where: { id: id },
  });
  if (!nft) throw "nft not found.";
  return nft;
}
