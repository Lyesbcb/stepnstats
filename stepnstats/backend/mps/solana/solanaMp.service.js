const config = require("config.json");
const db = require("_helpers/db");

module.exports = {
  getAll,
  create,
  getDate,
  getLastRecords,
  getTemporality,
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

async function getTemporality(req) {
  if (req.query.temporality === "Day") {
    var d = new Date();
    d.setDate(d.getDate()-1);
    return await db.SolanaMp.findAll({
      where: {
        createdAt: {
          [db.Op.between]: [d, new Date()],
        },
        id: {
          [db.Op.like]: '%5',
        }
      },
      limit: 144,
      order: [["createdAt", "ASC"]],
      subQuery: false,
    });
  }
  if (req.query.temporality === "Week") {
    var d = new Date();
    d.setDate(d.getDate()-7);
    return await db.SolanaMp.findAll({
      where: {
        createdAt: {
          [db.Op.between]: [d, new Date()],
        },
      },
      limit: 1008,
      order: [["createdAt", "ASC"]],
      subQuery: false,
    });
  }
  if (req.query.temporality === "Month") {
    var d = new Date();
    d.setDate(d.getDate()-30);
    return await db.SolanaMp.findAll({
      where: {
        createdAt: {
          [db.Op.between]: [d, new Date()],
        },
      },
      limit: 4320,
      order: [["createdAt", "ASC"]],
      subQuery: false,
    });
  }
}
