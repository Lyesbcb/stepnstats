const config = require("config.json");
const db = require("_helpers/db");

module.exports = {
  getAll,
  create,
};

async function getAll(req) {
  return await db.SolanaMp.findAll({
    offset: (req.query.page - 1) * 1,
    limit: 10,
    subQuery: false,
  });
}

async function create(params) {
  return await db.SolanaMp.create(params);
}
