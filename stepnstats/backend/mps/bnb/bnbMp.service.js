const config = require("config.json");
const db = require("_helpers/db");

module.exports = {
  getAll,
  getDate,
  create,
  getLastRecords
};

async function getAll(req) {
  return await db.BNBMp.findAll({
    offset: (req.query.page - 1) * 1,
    limit: 10,
    subQuery: false,
  });
}

async function getDate(req) {
  return await db.BNBMp.findAll({
    where: {
      createdAt: {
        [db.Op.lte]: req.query.date,
      },
    },
    limit: 1,
    order: [["createdAt", "DESC"]],
    subQuery: false,
  });
}

async function getLastRecords(nbRecords) {
  return await db.BNBMp.findAll({
    limit: nbRecords,
    order: [["createdAt", "DESC"]],
    subQuery: false,
  });
}

async function create(params) {
  return await db.BNBMp.create(params);
}
