const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const Role = require("_helpers/role");
const notificationService = require("./notification.service");

// routes
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);
router.get("/my", authorize(), getAllMy);
router.post("/create", authorize(), createSchema, create);

module.exports = router;

function createSchema(req, res, next) {
  const schema = Joi.object({
    content: Joi.string().required(),
    contentPrice: Joi.string().required(),
    type: Joi.string().required(),
    currency: Joi.string().required(),
    realm: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  notificationService
    .create(req)
    .then((user) => res.json(user))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    content: Joi.string().required(),
    contentPrice: Joi.string().required(),
    type: Joi.string().required(),
    currency: Joi.string().required(),
    realm: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  const currentUser = req.user;
  const id = parseInt(req.params.id);
  // only allow admins to access other user records
  if (id !== currentUser.id && currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  notificationService
    .update(req.params.id, req.body)
    .then((notifications) => res.json(notifications))
    .catch(next);
}

function _delete(req, res, next) {
  notificationService
    .delete(req)
    .then(() => res.json({ message: "Notification deleted successfully" }))
    .catch(next);
}

function getAllMy(req, res, next) {
  notificationService
    .getAllMy(req)
    .then((notifications) => {
      res.json(notifications);
    })
    .catch((next) => {console.log(next)});
}
