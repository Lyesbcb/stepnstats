const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const ethereumMpService = require("./ethereumMp.service");
const Role = require("_helpers/role");

// routes
router.get("/", authorize(), getAll);
router.get("/date", authorize(), getDate);
router.get("/temporality", authorize(), getTemporality);

module.exports = router;

function getAll(req, res, next) {
  ethereumMpService
    .getAll(req)
    .then((mps) => res.json(mps))
    .catch(next);
}

function getDate(req, res, next) {
  ethereumMpService
    .getDate(req)
    .then((mps) => res.json(mps))
    .catch(next);
}

function getTemporality(req, res, next) {
  ethereumMpService
    .getTemporality(req)
    .then((mps) => res.json(mps))
    .catch(next);
}