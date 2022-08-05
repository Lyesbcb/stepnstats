import axios from "axios";
import config from "../../config.json";
import {
  getSecuretValueFor,
} from "../secureStorage/index";

module.exports = {
  createNft,
  deleteNft,
  uploadNft,
  updateNft,
  getAllMyNft,
};
const baseURL = config.baseUrl + "/nfts";
async function createNft(params) {
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

async function updateNft(id, params) {
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

async function uploadNft(image, realm) {
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
        console.log(await response.json());
        // Actualize list of MB and redirect to OneMisteryBox
      })
      .catch(async function (error) {
        console.log(await error.json());
      });
    // Stop wainting screen
  }
}

async function deleteNft(id) {
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
      // re Nft getAllMyNft to actualize
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function getAllMyNft(page) {
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
    .then(async function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}
