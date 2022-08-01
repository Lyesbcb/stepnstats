import axios from "axios";
import config from "../../config.json";
import {
  getSecuretValueFor,
  secureSave,
  deleteSecuretValueFor,
} from "../secureStorage/index";

module.exports = {
  createRun,
  deleteRun,
  uploadRun,
  updateRun,
  getAllMyRun,
};
const baseURL = config.baseUrl + "/runs";
async function createRun(params) {
  console.log(params);
  var token = await getSecuretValueFor("token");
  var config = {
    method: "post",
    url: baseURL + "/create",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(params),
  };

  await axios(config)
    .then(async function (response) {
      // Save to store
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function updateRun(id, params) {
  var config = {
    method: "put",
    url: baseURL + "/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

async function uploadRun(image) {
  var config = {
    method: "put",
    url: baseURL + "/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

async function deleteRun(id) {
  var config = {
    method: "put",
    url: baseURL + "/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(params),
  };

  await axios(config)
    .then(async function (response) {
      console.log(response.data);
      // re run getAllMyRun to actualize
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function getAllMyRun(page) {
  var token = await getSecuretValueFor("token");
  var config = {
    method: "get",
    url: baseURL + "/my",
    params: { "page": page },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  await axios(config)
    .then(async function (response) {
      console.log(response.data);
      // Set store with the data
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}
