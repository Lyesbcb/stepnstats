import axios from "axios";
import config from "../../config.json";
import {
  getSecuretValueFor,
} from "../secureStorage/index";
import FormData from "form-data";

module.exports = {
  getAllMp,
  getAllTemporality,
};
const baseURL = config.baseUrl + "/mps";

async function getAllMp(realm, date) {
  if (date == "") {
    date = new Date();
  }
  var token = await getSecuretValueFor("token");
  var config = {
    method: "get",
    url: baseURL + "/" + realm + "/date" ,
    params: { date },
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
      console.log(error.response);
    });
}


async function getAllTemporality(realm, temporality) {
  var token = await getSecuretValueFor("token");
  var config = {
    method: "get",
    url: baseURL + "/" + realm + "/temporality" ,
    params: { temporality },
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
      console.log(error.response);
    });
}

