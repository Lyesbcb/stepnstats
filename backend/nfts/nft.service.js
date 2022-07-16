﻿const config = require("config.json");
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
    limit: 10,
    subQuery: false,
  });
}

async function getById(req) {
  const nft = await getNft(req.params.id);
  const currentUser = req.user;
  const userId = nft.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }

  return nft;
}

async function create(params, userId) {
  if (
    await db.Nft.findOne({
      where: { userId: userId, fileName: params.fileName },
    })
  ) {
    throw "This nft is already exist.";
  }
  params.userId = userId;
  // save rnftun
  return await db.Nft.create(params);
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
  await nft.save();

  return getNft(id);
}

async function _delete(req) {
  const nft = await getNft(req.params.id);
  const currentUser = req.user;
  const userId = nft.userId;

  // only allow admins to access other user records
  if (userId !== currentUser.id && currentUser.role !== Role.Admin) {
    throw "Unauthorized";
  }
  await nft.destroy();
}

// helper functions

async function getNft(id) {
  const nft = await db.Nft.findByPk(id);
  if (!nft) throw "nft not found.";
  return nft;
}
