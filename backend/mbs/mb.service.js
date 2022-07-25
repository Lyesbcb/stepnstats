const config = require("config.json");
const db = require("_helpers/db");
const Role = require("_helpers/role");
const spawn = require("child_process").spawn;

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
    // TODO traitement avec python puis push en BDD

    // const pythonProcess = spawn('python',["./getMbFromScreen.py", req.file.filename]);
    // pythonProcess.stdout.on('data', (data) => {
    //   params = data
    // });
    if (
      await db.Mb.findOne({
        where: { userId: req.user.id, fileName: req.file.filename },
      })
    ) {
      throw "This mb is already exist.";
    }
    params.userId = req.user.id;
    // save rmbun
    return await db.Mb.create(params);
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
  return await db.Mb.findAll({
    where: { userId: req.user.id },
    offset: (req.query.page - 1) * 1,
    limit: 10,
    subQuery: false,
  });
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
