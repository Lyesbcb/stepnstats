const config = require("config.json");
const db = require("_helpers/db");
const Role = require("_helpers/role");
var spawn = require("child_process").spawn;
var fs = require("fs");

module.exports = {
  getAll,
  getAllMy,
  getById,
  create,
  update,
  delete: _delete,
  uploadFile,
  getGstData,
  getGstEnergy,
  getDurabilityLost,
};

function NumToTime(num) {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  if (minutes + "".length < 2) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes + ":00";
}

async function uploadFile(req, res) {
  try {
    var params;
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    var run = await spawn("python3", ["./python/run.py", req.file.path]);

    run.stdout.setEncoding("utf8");
    await run.stdout.on("data", async function (data) {
      console.log(req.file.path);
      console.log(data);
      data = data.replace(/'/g, '"');
      params = JSON.parse(data);
      params.userId = req.user.id;
      params.realm = JSON.parse(req.body.realm).realm;
      if (JSON.parse(req.body.runType).runType) {
        params.runType = JSON.parse(req.body.runType).runType;
      }
      if (JSON.parse(req.body.utcOffset).utcOffset) {
        params.utcOffset = JSON.parse(req.body.utcOffset).utcOffset;
      }
      params.fileName = req.file.filename;
      try {
        return res.send(await create(params));
      } catch (error) {
        if (JSON.parse(req.body.runType).runType === "gmt") {
          fs.rename(
            req.file.path,
            "./upload/run/gmt/" + req.file.filename,
            function (err) {
              if (err) throw err;
            }
          );
        } else {
          fs.rename(
            req.file.path,
            "./upload/error/run/" + req.file.filename,
            function (err) {
              if (err) throw err;
            }
          );
        }

        if (error) {
          return res.status(400).json({ message: error });
        } else {
          return res
            .status(400)
            .json({ message: "Error on recognizing image" });
        }
      }
    });
    run.stderr.setEncoding("utf8");
    await run.stderr.on("data", async function (data) {
      console.log(data);

      stderr = "Error on recognizing image";
    });
    const exitCode = await new Promise((resolve, reject) => {
      run.on("close", resolve);
    });
    if (exitCode) {
      throw stderr;
    }
  } catch (error) {
    fs.rename(
      req.file.path,
      "./upload/error/run/" + req.file.filename,
      function (err) {
        if (err) throw err;
      }
    );
    console.log("ErrorGlobal");
    return res.status(400).json({ message: error });
  }
}

async function getAll(req) {
  return await db.Run.findAndCountAll({
    offset: (req.query.page - 1) * 1,
    order: [["date", "DESC"]],
    limit: 10,
    subQuery: false,
  });
}

async function getAllMy(req) {
  return await db.Run.findAndCountAll({
    where: { userId: req.user.id },
    offset: (req.query.page - 1) * 1,
    order: [["date", "DESC"]],
    limit: 1000,
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

async function create(params) {
  var res;
  try {
    res = await db.Run.findOne({
      where: {
        userId: params.userId,
        date: params.date,
        nftId: params.nftId,
        runType: params.runType,
      },
    });
  } catch {
    throw "Error on recognizing image";
  }
  if (res) {
    throw "This run is already exists.";
  }
  try {
    return await db.Run.create(params);
  } catch (err) {
    console.log(err);
    throw "Error on recognizing image";
  }
  // save run
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

async function getGstData(req) {
  const efficiency = req.query.efficiency;
  const type = req.query.type;
  const run = await db.sequelize.query(
    `SELECT ROUND((gst/(energy*5)), 1) value, count(*) as count FROM (SELECT * FROM runs where type= '${type}') u LEFT JOIN nfts p ON p.nftId = u.nftId WHERE p.nftId IS NOT NULL && efficiencyIncreased >= ${efficiency}* 0.95 && efficiencyIncreased <= ${efficiency}* 1.05 group by 1 ORDER BY ROUND((gst/(energy*5)), 1) ASC LIMIT 10 ;`
  );
  if (!run) throw "No data.";
  var countArray = [];
  var valueArray = [];
  for (var i = 0; i < run[0].length; i++) {
    countArray.push(run[0][i].count);
    valueArray.push(run[0][i].value);
  }
  return { count: countArray, value: valueArray };
}

async function getGstEnergy(req) {
  const focused = req.query.focused;
  var efficiency = 0;
  if (focused === "increased") {
    efficiency = req.query.efficiencyIncreased;
  }
  if (focused === "optimized") {
    efficiency = req.query.efficiencyOptimized;
  }
  if (focused === "base") {
    efficiency = req.query.efficiencyBase;
  }
  const type = req.query.type;
  const run = await db.sequelize.query(
    `SELECT AVG(gst/energy) gstEnergy FROM (SELECT * FROM runs where type='${type}') u LEFT JOIN nfts p ON p.nftId = u.nftId WHERE  p.nftId  IS NOT NULL && efficiencyIncreased >= ${efficiency} * 0.95 && efficiencyIncreased <= ${efficiency} * 1.05;`
  );
  if (!run) throw "No data.";
  return run[0][0].gstEnergy;
}

async function getDurabilityLost(req) {
  const focused = req.query.focused;
  var resilience = 0;
  if (focused === "increased") {
    resilience = req.query.resilienceIncreased;
  }
  if (focused === "optimized") {
    resilience = req.query.resilienceOptimized;
  }
  if (focused === "base") {
    resilience = req.query.resilienceBase;
  }
  const type = req.query.type;
  const run = await db.sequelize.query(
    `SELECT AVG(durabilityLost/energy) durabilityLost FROM (SELECT * FROM runs where type='${type}') u LEFT JOIN nfts p ON p.nftId = u.nftId WHERE  p.nftId  IS NOT NULL && resilienceIncreased >= ${resilience} * 0.95 && resilienceIncreased <= ${resilience} * 1.05;
    `
  );
  if (!run) throw "No data.";
  return run[0][0].durabilityLost;
}
