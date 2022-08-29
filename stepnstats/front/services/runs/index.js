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
  getGstData,
};
const baseURL = config.baseUrl + "/runs";

async function createRun(params) {
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
  var token = await getSecuretValueFor("token");

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
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function uploadRun(image, realm) {
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
    await fetch(baseURL + "/upload", options)
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
  }
}

async function deleteRun(id) {
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
    params: { page: page },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios(config)
    .then(async (response) => {
      if (response.data) {
        return await response.data.rows;
      }
      throw await response;
    })
    .catch(async function (error) {
      throw await error.message;
    });
}

async function getGstData(efficiency, type) { 
  var token = await getSecuretValueFor("token");
  var config = {
    method: "get",
    url: baseURL + "/gstdata",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      efficiency,
      type,
    }
  };
  return await axios(config)
    .then(async (response) => {
      if (response.data) {
        return await response.data
      }
      throw await response;
    })
    .catch(async function (error) {
      console.log(error);
      throw await error.message;
    });
}
