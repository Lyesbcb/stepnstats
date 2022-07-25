const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const mbService = require("./mb.service");
const Role = require("_helpers/role");
const upload = require("_middleware/uploadMb");

// routes
router.post("/create", authorize(), createSchema, create);
router.post("/upload", authorize(), upload.single("file"), mbService.uploadFile);
router.get("/", authorize(Role.Admin), getAll);
router.get("/my", authorize(), getAllMy);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    lvl: Joi.string().required(),
    realm: Joi.string().required(),
    dropRate: Joi.string().required(),
    fileName: Joi.string().required(),
    content1: Joi.string().required(),
    content1Quantity: Joi.string().required(),
    content2: Joi.string().empty(""),
    content2Quantity: Joi.string().empty(""),
    content3: Joi.string().empty(""),
    content3Quantity: Joi.string().empty(""),
    content4: Joi.string().empty(""),
    content4Quantity: Joi.string().empty(""),
    content5: Joi.string().empty(""),
    content5Quantity: Joi.string().empty(""),
    content6: Joi.string().empty(""),
    content6Quantity: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  mbService
    .create(req.body, req.user.id)
    .then((mb) => res.json(mb))
    .catch(next);
}

function getAll(req, res, next) {
  mbService
    .getAll(req)
    .then((mbs) => res.json(mbs))
    .catch(next);
}

function getAllMy(req, res, next) {
  mbService
    .getAllMy(req)
    .then((mbs) => res.json(mbs))
    .catch(next);
}

function getById(req, res, next) {
  mbService
    .getById(req)
    .then((mb) => (mb ? res.json(mb) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    lvl: Joi.string().empty(""),
    fileName: Joi.string().empty(""),
    realm: Joi.string().empty(""),
    dropRate: Joi.string().empty(""),
    content1: Joi.string().empty(""),
    content1Quantity: Joi.string().empty(""),
    content2: Joi.string().empty(""),
    content2Quantity: Joi.string().empty(""),
    content3: Joi.string().empty(""),
    content3Quantity: Joi.string().empty(""),
    content4: Joi.string().empty(""),
    content4Quantity: Joi.string().empty(""),
    content5: Joi.string().empty(""),
    content5Quantity: Joi.string().empty(""),
    content6: Joi.string().empty(""),
    content6Quantity: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  mbService
    .update(req)
    .then((mb) => res.json(mb))
    .catch(next);
}

function _delete(req, res, next) {
  mbService
    .delete(req)
    .then(() => res.json({ message: "mb deleted successfully" }))
    .catch(next);
}
