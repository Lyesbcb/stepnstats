const config = require("config.json");
const db = require("_helpers/db");

module.exports = {
  getAll,
  create,
};

async function getAll(req) {
  return await db.BNBMp.findAll({offset: (req.query.page - 1) * 1,
    limit: 10,
    subQuery: false,});
}

async function create(params) {
  return await db.BNBMp.create(params);
}
