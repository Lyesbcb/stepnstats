import axios from "axios";
import config from "../../config.json";
import {
  getSecuretValueFor,
  secureSave,
  deleteSecuretValueFor,
} from "../secureStorage/index";
import FormData from "form-data";

module.exports = {
  createMb,
  deleteMb,
  uploadMb,
  updateMb,
  getAllMyMb,
};
const baseURL = config.baseUrl + "/mbs";
async function createMb(params) {
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

async function updateMb(id, params) {
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

async function uploadMb(image) {
  var token = await getSecuretValueFor("token");
  let data = new FormData();
  data.append("file", image);
  console.log(data)
  var config = {
    method: "post",
    url: baseURL + "/upload",
    headers: {
      "Content-Type": `multipart/form-data;`,
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  await axios(config)
    .then(async function (response) {
      console.log(response.data);
      // Reload get all my mb to actualize
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
}

async function deleteMb(id) {
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
      // re Mb getAllMyMb to actualize
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function getAllMyMb(page) {
  var token = await getSecuretValueFor("token");
  var config = {
    method: "get",
    url: baseURL + "/my",
    params: { page: page },
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
