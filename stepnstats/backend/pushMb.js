var axios = require("axios");
var FormData = require("form-data");
var fs = require("fs");
const testFolder = "./misteryBox/";
const util = require("util");
const path = require("path");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Make an async function that gets executed immediately
(async () => {
  const baseURL = "http://192.168.3.2:4000/mbs";
  let fetch = await import("node-fetch");
  // Our starting point
  try {
    // Get the files ²as an array
    const files = await fs.promises.readdir(testFolder);

    // Loop them all with the new for...of
    for (var i = 200; i <267; i++) {
      const fromPath = path.join(testFolder, files[i]);
      let uriParts = fromPath.split(".");
      let fileType = uriParts[uriParts.length - 1];
      let formData = new FormData();
      data = {
        uri: fromPath,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      }
      formData.append("file", fs.createReadStream(fromPath));
      formData.append("realm", JSON.stringify({ realm: "Solana" }));
      var config = {
        method: "post",
        url: "http://192.168.3.2:4000/mbs/upload/",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQwLCJyb2xlIjoiVXNlciIsImlhdCI6MTY1OTk1MzYwMywiZXhwIjoxNjYwNTU4NDAzfQ.u4TMKc4Inwl3qTyojZ1SfQlc7yQAhVUTlkW0w8MqZYU",
          ...formData.getHeaders(),
        },
        data: formData,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        sleep(30000)
    } // End for...of
    const start = console.log(Date.now())

  } catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
})(); // Wrap in parenthesis and call now
