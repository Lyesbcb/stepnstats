import axios from "axios";
import config from "../../config.json";
import {
  getSecuretValueFor,
  secureSave,
  deleteSecuretValueFor,
} from "../secureStorage/index";
import FormData from "form-data";

module.exports = {
  getAllMp,
};
const baseURL = config.baseUrl + "/mps";

async function getAllMp(realm, date) {
  if (!date) {
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

  await axios(config)
    .then(async function (response) {
      console.log(response.data);
      // Actualize store Mps (realm variable)
    })
    .catch(function (error) {
      console.log(error.response);
    });
}