import axios from "axios";
import config from "../../config.json";
import {
  getSecuretValueFor,
  secureSave,
  deleteSecuretValueFor,
} from "../secureStorage/index";
import FormData from "form-data";

module.exports = {
  createNotification,
  deleteNotification,
  getAllMyNotification,
};
const baseURL = config.baseUrl + "/notifications";

async function createNotification(params) {
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
    .catch(function (error) {
      throw error.response.data.message;
    });
}

async function deleteNotification(id) {
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
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function getAllMyNotification(page) {
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