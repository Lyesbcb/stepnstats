const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function imageExist(fileName) {
  const rows = await db.query(
    `SELECT * FROM run WHERE fileName = '${fileName}'`
  );
  console.log(rows)
  return helper.emptyOrRows(rows)[0] != undefined
}

async function getMultiple(start, end, uniqueId) {
  const rows = await db.query(
    `SELECT * FROM run WHERE date between '${start}' and '${end}' AND uniqueId = '${uniqueId}'`
  );
  const data = helper.emptyOrRows(rows);
  console.log(rows)
  return {
    data
  }
}

async function create(run) {
  const result = await db.query(
    "INSERT INTO `run` (`gstMin`, `date`, `duration`, `energy`, `type`, `lvl`, `km`, `steps`, `fileName`, `gst`, `uniqueId`, `nftId`) VALUES ('" + run.gstMin + "', '" + run.dateTime + "' , '" + run.duration + "', '" + run.energy + "', '" + run.type + "', '" + run.lvl + "', '" + run.km + "', '" + run.steps + "', '" + run.file + "', '" + run.gst + "', '" + run.uniqueId + "', '" + run.nftId + "')"
  );

  let message = 'Error in creating run';

  if (result.affectedRows) {
    message = 'Run created successfully';
  }

  return message;
}

module.exports = {
  getMultiple,
  create,
  imageExist,
}
