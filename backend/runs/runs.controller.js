const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const runService = require("./run.service");
const Role = require("_helpers/role");

// routes
router.post("/create", authorize(), createSchema, create);
router.get("/", authorize(Role.Admin), getAll);
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
