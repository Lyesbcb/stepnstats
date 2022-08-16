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
    var nft = await spawn("python", ["./python/nft.py", req.file.path]);
    nft.stdout.setEncoding("utf8");
    await nft.stdout.on("data", async function (data) {
      data = data.replace(/'/g, '"');
      params = JSON.parse(data);
      params.userId = req.user.id;
      params.realm = JSON.parse(req.body.realm).realm;
      params.fileName = req.file.filename;
      try {
        res.send(await create(params));
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

function renameProperty(obj, oldName, newName) {
  obj[newName] = obj[oldName];
  delete obj[oldName];
  return obj;
}

function paramsToParamsBaseOrIncrease(params) {
  if (params.base === "true") {
    params = renameProperty(params, "efficiency", "efficiencyBase");
    params = renameProperty(params, "luck", "luckBase");
    params = renameProperty(params, "comfort", "comfortBase");
    params = renameProperty(params, "resilience", "resilienceBase");
    params = renameProperty(params, "fileName", "fileNameBase");
  } else {
    params = renameProperty(params, "efficiency", "efficiencyIncreased");
    params = renameProperty(params, "luck", "luckIncreased");
    params = renameProperty(params, "comfort", "comfortIncreased");
    params = renameProperty(params, "resilience", "resilienceIncreased");
    params = renameProperty(params, "fileName", "fileNameIncreased");
  }
  return params;
}

async function create(params) {
  // Check if base exist
  if (params.base === "true") {
    if (
      await db.Nft.findOne({
        where: {
          userId: params.userId,
          nftId: params.nftId,
          fileNameBase: {
            [db.Op.ne]: null,
          },
          lvl: {
            [db.Op.eq]: params.lvl,
          },
        },
      })
    ) {
      throw "This nft with base stats is already saved.";
    } else {
      var nft = await db.Nft.findOne({
        where: {
          userId: params.userId,
          nftId: params.nftId,
        },
      });
      if (nft) {
        Object.assign(nft, paramsToParamsBaseOrIncrease(params));
        await nft.save();
        return await getNft(id);
      } else {
        return await db.Nft.create(paramsToParamsBaseOrIncrease(params));
      }
    }
  } else {
    if (
      await db.Nft.findOne({
        where: {
          userId: params.userId,
          nftId: params.nftId,
          fileNameIncreased: {
            [db.Op.ne]: null,
          },
          lvl: {
            [db.Op.eq]: params.lvl,
          },
        },
      })
    ) {
      throw "This nft with increased stats is already saved.";
    } else {
      var nft = await db.Nft.findOne({
        where: {
          userId: params.userId,
          nftId: params.nftId,
        },
      });
      if (nft) {
        Object.assign(nft, paramsToParamsBaseOrIncrease(params));
        console.log(nft);
        return await nft.save();
      } else {
        return await db.Nft.create(paramsToParamsBaseOrIncrease(params));
      }
    }
  }

  // Check if Increased exist
  // save rnftun
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
  return await nft.save();
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
