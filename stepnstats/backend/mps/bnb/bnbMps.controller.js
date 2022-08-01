const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const bnbMpService = require("./bnbMp.service");
const Role = require("_helpers/role");

// routes
router.get("/", authorize(), getAll);
router.get("/date", authorize(), getDate);

module.exports = router;

function getAll(req, res, next) {
  bnbMpService
    .getAll(req)
    .then((mps) => res.json(mps))
    .catch(next);
}

function getDate(req, res, next) {
  bnbMpService
    .getDate(req)
    .then((mps) => res.json(mps))
    .catch(next);
}