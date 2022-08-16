const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const Role = require("_helpers/role");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ username, password }) {
  const user = await db.User.scope("withHash").findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw "Username or password is incorrect";

  // authentication successful
  const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, {
    expiresIn: "7d",
  });
  return { ...omitHash(user.get()), token };
}

async function getAll(req) {
  return await db.User.findAndCountAll({
    offset: (req.query.page - 1) * 1,
    limit: 10,
    subQuery: false,
  });
}

async function getById(id) {
  const user = await getUser(id);
  if (!user) return;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function create(params) {
  params.role = "User";
  // If its an anonymous register generate username and check if username exist in database (if it exist repeat)
  if (params.anonymous) {
    do {
      params.username = generateUsername(8);
    } while (await db.User.findOne({ where: { username: params.username } }));
  } else {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
      throw 'Username "' + params.username + '" is already taken';
    }
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // save user
  return omitHash((await db.User.create(params)).get());
}

async function update(id, params) {
  const user = await getUser(id);
  // validate
  const usernameChanged = params.username && user.username !== params.username;
  if (
    usernameChanged &&
    (await db.User.findOne({ where: { username: params.username } }))
  ) {
    throw 'Username "' + params.username + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  user.set(params);
  console.log(user);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}

function generateUsername(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
