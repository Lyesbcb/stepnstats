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

function NumToTime(num) {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  if (minutes + "".length < 2) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes + ":00";
}

async function uploadFile(req, res) {
  try {
    var params;
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    if (
      await db.Run.findOne({
        where: { userId: req.user.id, fileName: req.file.filename },
      })
    ) {
      throw "This run is already exist.";
    }
    var run = await spawn("python", ["./python/run.py", req.file.path]);

    run.stdout.setEncoding("utf8");
    await run.stdout.on("data", async function (data) {
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
    run.stderr.setEncoding("utf8");
    await run.stderr.on("data", async function (data) {
      stderr = "Error on recognizing image";
    });
    const exitCode = await new Promise((resolve, reject) => {
      run.on("close", resolve);
    });
    if (exitCode) {
      throw stderr;
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

async function getAll(req) {
  return await db.Run.findAndCountAll({
    offset: (req.query.page - 1) * 1,
    limit: 10,
    subQuery: false,
  });
}

async function getAllMy(req) {
  return await db.Run.findAndCountAll({
    where: { userId: req.user.id },
    offset: (req.query.page - 1) * 1,
    order: [["createdAt", "DESC"]],
    limit: 10,
    subQuery: false,
  });
}

async function getById(req) {
  const run = await getRun(req.params.id);
  const currentUser = req.user;
  const userId = run.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }

  return run;
}

async function create(params) {
  if (
    await db.Run.findOne({
      where: { userId: params.userId, date: params.date, nftId: params.nftId },
    })
  ) {
    throw "This run is already exist.";
  }
  // save run
  return await db.Run.create(params);
}

async function update(req) {
  const run = await getRun(req.params.id);
  const currentUser = req.user;
  const userId = run.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }
  id = req.params.id;
  params = req.body;
  // copy params to runs and save
  Object.assign(run, params);
  await run.save();

  return getRun(id);
}

async function _delete(req) {
  const run = await getRun(req.params.id);
  const currentUser = req.user;
  const userId = run.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }
  await run.destroy();
}

// helper functions

async function getRun(id) {
  const run = await db.Run.findByPk(id);
  if (!run) throw "Run not found.";
  return run;
}
