const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const ethereumMpService = require("./ethereumMp.service");
const Role = require("_helpers/role");

// routes
router.get("/", authorize(), getAll);

module.exports = router;

function getAll(req, res, next) {
  ethereumMpService
    .getAll(req)
    .then((mps) => res.json(mps))
    .catch(next);
}