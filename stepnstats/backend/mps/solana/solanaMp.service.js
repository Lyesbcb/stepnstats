﻿const config = require("config.json");
const db = require("_helpers/db");

module.exports = {
  getAll,
  create,
  getDate,
  getLastRecords
};

async function getAll(req) {
  return await db.SolanaMp.findAll({
    offset: (req.query.page - 1) * 1,
    limit: 10,
    subQuery: false,
  });
}

async function getDate(req) {
  return await db.SolanaMp.findAll({
    where: {
      createdAt: {
        [db.Op.lte]: req.query.date,
      },
    },
    limit: 100,
    order: [["createdAt", "DESC"]],
    subQuery: false,
  });
}

async function getLastRecords(nbRecords) {
  return await db.SolanaMp.findAll({
    limit: nbRecords,
    order: [["createdAt", "DESC"]],
    subQuery: false,
  });
}

async function create(params) {
  return await db.SolanaMp.create(params);
}
