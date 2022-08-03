import axios from "axios";
import config from "../../config.json";
import { getSecuretValueFor, secureSave, deleteSecuretValueFor } from "../secureStorage/index";

module.exports = {
  registerUser,
  authenticateUser,
  updateUser,
  logoutUser
};
const baseURL = config.baseUrl + "/users";

async function authenticateUser(params) {
  var getUsername = await getSecuretValueFor("username");
  if (getUsername) {
    params.username = getUsername;
    params.password = await getSecuretValueFor("password");
  }
  var config = {
    method: "post",
    url: baseURL + "/authenticate",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(params),
  };

  await axios(config)
    .then(async function (response) {
      console.log(response.data);
      // Save username and password
      await secureSave("token", response.data.token);
      await secureSave("id", String(response.data.id));
      // Login
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function registerUser(params) {
  if (params.anonymous) {
    // Generate password
    params.password = generatePassword(24);
  }

  var config = {
    method: "post",
    url: baseURL + "/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(params),
  };

  await axios(config)
    .then(async function (response) {
      console.log(response.data);
      // Save username and password
      await secureSave("username", response.data.username);
      await secureSave("password", params.password);
      await secureSave("anonymous", String(params.anonymous));
      // Login
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function updateUser(params) {
  var anonymous = await getSecuretValueFor("anonymous")
  if (anonymous) {
    params.anonymous = false;
  }
  var id = await getSecuretValueFor("id");
  var token = await getSecuretValueFor("token");

  var config = {
    method: "put",
    url: baseURL + "/" + id,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    data: JSON.stringify(params),
  };

  await axios(config)
    .then(async function (response) {
      console.log(response.data);
      // Save username and password
      await secureSave("username", response.data.username);
      await secureSave("password", params.password);
      await secureSave("anonymous", String(params.anonymous));
      // Login
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function logoutUser(){
  await deleteSecuretValueFor("token")
  await deleteSecuretValueFor("password")
  await deleteSecuretValueFor("username")
  await deleteSecuretValueFor("id")
  await deleteSecuretValueFor("anonymous") 
  var params = {
    "username": "anonymous",
    "password": generatePassword(24),
    "anonymous": true
  }
  await registerUser(params)
}

function generatePassword(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

