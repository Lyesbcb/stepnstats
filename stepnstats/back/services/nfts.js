const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function imageExist(fileName) {
  const rows = await db.query(
    `SELECT * FROM nfts WHERE file = '${fileName}'`
  );
  return helper.emptyOrRows(rows)[0] != undefined
}

async function getMultiple(uniqueId) {
  const rows = await db.query(
    `SELECT * FROM nfts WHERE uniqueId = '${uniqueId}'`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}

async function create(nft) {
  const result = await db.query(
    "INSERT INTO `nfts` (`lvl`, `type`, `quality`, `efficiency`, `luck`, `comfort`, `resilience`, `nftId`, `mint`, `file` ,`uniqueId`) VALUES ('" + nft.lvl + "', '" + nft.type + "' , '" + nft.quality + "', '" + nft.efficiency + "', '" + nft.luck + "', '" + nft.comfort + "', '" + nft.resilience + "', '" + nft.nftId + "', '" + nft.mint + "', '" + nft.file + "', '" + nft.uniqueId + "')"
  );

  let message = 'Error in creating nft';

  if (result.affectedRows) {
    message = 'Nft created successfully';
  }

  return message;
}

module.exports = {
  getMultiple,
  create,
  imageExist,
}
