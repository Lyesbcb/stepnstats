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

async function uploadMb(image, realm) {
  if (!image.cancelled) {
    var token = await getSecuretValueFor("token");
    let uriParts = image.uri.split(".");
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append("file", {
      uri: image.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append("realm", JSON.stringify({ realm }));
    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    // Start waiting screen
    return await fetch(baseURL + "/upload", options)
      .then(async (response) => {
        if (response.ok) {
          return await response.json();
        }
        throw await response.json();
      })
      .then(async (response) => {
        return await response;
      })
      .catch(async function (error) {
        throw await error.message;
      });
    // Stop wainting screen
  }
}

async function deleteMb(id) {
  var token = await getSecuretValueFor("token");
  var config = {
    method: "delete",
    url: baseURL + "/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
    params: { page: 1 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios(config)
    .then(async function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}
