const config = require("config.json");
const db = require("_helpers/db");
const Role = require("_helpers/role");

module.exports = {
  getAll,
  getAllMy,
  getById,
  create,
  update,
  delete: _delete,
};

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
