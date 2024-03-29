﻿const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const nftService = require("./nft.service");
const Role = require("_helpers/role");
const upload = require("_middleware/uploadNft");
// routes
router.post("/create", authorize(), createSchema, create);
router.post(
  "/upload",
  authorize(),
  upload.single("file"),
  nftService.uploadFile
);
router.get("/", authorize(Role.Admin), getAll);
router.get("/my", authorize(), getAllMy);
router.put("/:id", authorize(), update);
router.delete("/:id", authorize(), _delete);
router.get("/nftId", authorize(), getByNftId);

module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    lvl: Joi.string().required(),
    realm: Joi.string().required(),
    fileName: Joi.string().required(),
    type: Joi.string().required(),
    quality: Joi.string().required(),
    efficiency: Joi.string().required(),
    luck: Joi.string().required(),
    comfort: Joi.string().required(),
    resilience: Joi.string().required(),
    mint: Joi.string().required(),
    nftId: Joi.string().required(),
    socket1: Joi.string().required(),
    socket2: Joi.string().required(),
    socket3: Joi.string().required(),
    socket4: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  nftService
    .create(req.body, req.user.id)
    .then((nft) => res.json(nft))
    .catch(next);
}

function getAll(req, res, next) {
  nftService
    .getAll(req)
    .then((nfts) => res.json(nfts))
    .catch(next);
}

function getAllMy(req, res, next) {
  nftService
    .getAllMy(req)
    .then((nfts) => res.json(nfts))
    .catch(next);
}

function getByNftId(req, res, next) {
  nftService
    .getByNftId(req)
    .then((nft) => (nft ? res.json(nft) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    lvl: Joi.string().empty(""),
    realm: Joi.string().empty(""),
    fileName: Joi.string().empty(""),
    type: Joi.string().empty(""),
    quality: Joi.string().empty(""),
    efficiency: Joi.string().empty(""),
    luck: Joi.string().empty(""),
    comfort: Joi.string().empty(""),
    resilience: Joi.string().empty(""),
    mint: Joi.string().empty(""),
    nftId: Joi.string().empty(""),
    socket1: Joi.string().empty(""),
    socket2: Joi.string().empty(""),
    socket3: Joi.string().empty(""),
    socket4: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  nftService
    .update(req)
    .then((nft) => res.json(nft))
    .catch(next);
}

function _delete(req, res, next) {
  nftService
    .delete(req)
    .then(() => res.json({ message: "nft deleted successfully" }))
    .catch((next) => console.log(next));
}