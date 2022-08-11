const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const solanaMpService = require("./solanaMp.service");
const Role = require("_helpers/role");

// routes
router.get("/", authorize(), getAll);
router.get("/date", authorize(), getDate);
router.get("/temporality", authorize(), getTemporality);

module.exports = router;

function getAll(req, res, next) {
  solanaMpService
    .getAll(req)
    .then((mps) => res.json(mps))
    .catch(next);
}

function getDate(req, res, next) {
  solanaMpService
    .getDate(req)
    .then((mps) => res.json(mps))
    .catch(next);
}

function getTemporality(req, res, next) {
  solanaMpService
    .getTemporality(req)
    .then((mps) => res.json(mps))
    .catch(next);
}