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

async function create(params, userId) {
  if (
    await db.Run.findOne({
      where: { userId: userId, date: params.date, nftId: params.nftId },
    })
  ) {
    throw "This run is already exist.";
  }
  params.userId = userId;
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
