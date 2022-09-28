const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const runService = require("./run.service");
const Role = require("_helpers/role");
const upload = require("_middleware/uploadRun");
const solanaMps = require("../mps/solana/solanaMp.service");
const bnbMps = require("../mps/bnb/bnbMp.service");
const ethereumMps = require("../mps/ethereum/ethereumMp.service");
// routes
router.post("/create", authorize(), createSchema, create);
router.post(
  "/upload",
  authorize(),
  upload.single("file"),
  runService.uploadFile
);
router.get("/", authorize(Role.Admin), getAll);
router.get("/gstData", authorize(), getGstData);
router.get("/dailyIncome", authorize(), getDailyIncome);
router.get("/my", authorize(), getAllMy);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    date: Joi.string().required(),
    realm: Joi.string().required(),
    duration: Joi.string().required(),
    energy: Joi.string().required(),
    type: Joi.string().required(),
    lvl: Joi.string().required(),
    km: Joi.string().required(),
    steps: Joi.string().required(),
    fileName: Joi.string().required(),
    gst: Joi.string().required(),
    nftId: Joi.string().required(),
    quality: Joi.string().required(),
    durabilityLost: Joi.string().required(),
    runType: Joi.string().required(),
    utcOffset: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  runService
    .create(req.body, req.user.id)
    .then((run) => res.json(run))
    .catch(next);
}

function getAll(req, res, next) {
  runService
    .getAll(req)
    .then((runs) => res.json(runs))
    .catch(next);
}

function getAllMy(req, res, next) {
  runService
    .getAllMy(req)
    .then((runs) => res.json(runs))
    .catch(next);
}

function getById(req, res, next) {
  runService
    .getById(req)
    .then((run) => (run ? res.json(run) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    date: Joi.string().empty(""),
    realm: Joi.string().empty(""),
    duration: Joi.string().empty(""),
    energy: Joi.string().empty(""),
    type: Joi.string().empty(""),
    lvl: Joi.string().empty(""),
    km: Joi.string().empty(""),
    steps: Joi.string().empty(""),
    fileName: Joi.string().empty(""),
    gst: Joi.string().empty(""),
    nftId: Joi.string().empty(""),
    runType: Joi.string().required(),
    utcOffset: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  runService
    .update(req)
    .then((run) => res.json(run))
    .catch(next);
}

function _delete(req, res, next) {
  runService
    .delete(req)
    .then(() => res.json({ message: "Run deleted successfully" }))
    .catch(next);
}

function getGstData(req, res, next) {
  runService
    .getGstData(req)
    .then((data) => res.json(data))
    .catch(next);
}

async function getGstEnergy(req, res, next) {
  return await runService.getGstEnergy(req);
}

async function getDurabilityLost(req, res, next) {
  return await runService.getDurabilityLost(req);
}

var repairCost = {
  Common: [
    0.31, 0.32, 0.33, 0.35, 0.36, 0.37, 0.38, 0.4, 0.41, 0.42, 0.44, 0.46, 0.48,
    0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, 0.64, 0.67, 0.7, 0.72, 0.75, 0.78,
    0.81, 0.83, 0.87, 0.9,
  ],
  Uncommon: [
    0.41, 0.43, 0.45, 0.46, 0.48, 0.5, 0.51, 0.53, 0.55, 0.57, 0.6, 0.62, 0.64,
    0.66, 0.69, 0.71, 0.74, 0.77, 0.8, 0.83, 0.86, 0.89, 0.92, 0.95, 1, 1.03,
    1.06, 1.11, 1.15, 1.2,
  ],
  Rare: [
    0.51, 0.54, 0.57, 0.59, 0.61, 0.63, 0.65, 0.67, 0.69, 0.72, 0.75, 0.78,
    0.81, 0.84, 0.87, 0.9, 0.94, 0.97, 1, 1.04, 1.08, 1.12, 1.16, 1.2, 1.25,
    1.3, 1.34, 1.39, 1.45, 1.5,
  ],
  Epic: [
    0.61, 0.64, 0.67, 0.69, 0.71, 0.73, 0.76, 0.79, 0.82, 0.85, 0.89, 0.93,
    0.97, 1, 1.04, 1.08, 1.12, 1.16, 1.2, 1.24, 1.29, 1.34, 1.39, 1.45, 1.5,
    1.55, 1.61, 1.67, 1.73, 1.8,
  ],
};

const qualities = ["Common", "Uncommon", "Rare", "Epic"];
const hpBase = [0.374, 0.407, 0.47, 0.286];
const hpPow = [0.414, 0.432, 0.467, 0.395];
const gstLimit = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 120, 130,
  140, 150, 160, 170, 180, 195, 210, 225, 240, 255, 270, 285, 300,
];
const luckEnergy = [
  {
    energy: 3,
    luck: 8,
  },
  {
    energy: 5,
    luck: 20,
  },
  {
    energy: 8,
    luck: 28,
  },
  {
    energy: 12,
    luck: 56,
  },
  {
    energy: 16,
    luck: 148,
  },
  {
    energy: 20,
    luck: 286,
  },
  {
    energy: 21,
    luck: 805,
  },
  {
    energy: 23,
    luck: 1749,
  },
  {
    energy: 24,
    luck: 2074,
  },
  {
    energy: 25,
    luck: 3000,
  },
];

function getClosestMb(energy, luck) {
  var closestEnergy;
  var closestLuck;
  for (var i = 0; i < luckEnergy.length; i++) {
    if (luckEnergy[i].energy <= energy) {
      closestEnergy = i;
    }
  }
  for (var y = 0; y < luckEnergy.length; y++) {
    if (luckEnergy[y].luck <= luck) {
      closestLuck = y;
    }
  }
  return Math.min(closestEnergy, closestLuck) + 1;
}

function getRepairCost(quality, lvl, durabilityLost) {
  return (
    repairCost[quality][lvl - 1] * Number(Number(durabilityLost).toFixed(0))
  );
}

function getGstLimit(lvl) {
  return gstLimit[lvl];
}

function getHpLost(quality, energy, comfort) {
  const e = hpBase[qualities.indexOf(quality)];
  const s = hpPow[qualities.indexOf(quality)];
  return Math.round(e * Math.pow(Math.floor(comfort), -s) * 100 * energy) / 100;
}

async function getDailyIncome(req, res, next) {
  const focused = req.query.focused;
  var luck = 0;
  var comfort = 0;
  if (focused === "increased") {
    luck = req.query.luckIncreased;
    comfort = req.query.comfortIncreased;
  }
  if (focused === "optimized") {
    luck = req.query.luckOptimized;
    comfort = req.query.comfortOptimized;
  }
  if (focused === "base") {
    luck = req.query.luckBase;
    comfort = req.query.comfortBase;
  }

  const lvl = Number(req.query.lvl);
  const energy = req.query.energy;
  const quality = String(req.query.quality);
  const realm = String(req.query.realm);
  const gstTotal = Number(((await getGstEnergy(req)) * energy).toFixed(2));
  const durabilityLost = Number(
    ((await getDurabilityLost(req)) * energy).toFixed(0)
  );
  var mps;

  if (realm === "Solana") {
    mps = await solanaMps.getLastRecords(1);
  }

  if (realm === "Bnb") {
    mps = await ethereumMps.getLastRecords(1);
  }

  if (realm === "Ethereum") {
    mps = await bnbMps.getLastRecords(1)[0];
  }

  var json = {
    mb: await getClosestMb(energy, luck),
    gstTotal,
    durabilityLost,
    repairCost: Number(getRepairCost(quality, lvl, durabilityLost).toFixed(2)),
    gstLimit: getGstLimit(lvl),
    hpLost: getHpLost(quality, energy, comfort),
    mps,
  };
  res.json(json);
}
