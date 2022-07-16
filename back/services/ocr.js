const mysql = require('mysql2/promise');
const config = require('../config');
const runs = require('./runs')
const nfts = require('./nfts')
const vision = require('@google-cloud/vision');

async function ocrRun(path, fileName, uniqueId) {
  if (await runs.imageExist(uniqueId + "_" + fileName)) {
    return { status: 409, message: `Image ${fileName} already exist` }
  } else {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Read a local image as a text document
    const [result] = await client.documentTextDetection(path);
    const fullTextAnnotation = result.fullTextAnnotation;
    var temp = fullTextAnnotation.text;
    var gstMin = temp.match(/[0-9]+[.][0-9]+/g)[0]
    var date = temp.match(/(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/)[0]
    date = date.split("/")
    date = date[1] + "/" + date[0] + "/" + date[2]
    var time = temp.match(/([01]?[0-9]|2[0-3]):[0-5][0-9]/)[0]
    var duration = temp.match(/([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/)[0]
    var gst = temp.match(/[0-9]+[.][0-9]+/g)[1]
    var energy = temp.match(/[0-9]+[.][0-9]+/g)[2]
    var type = ""
    if (temp.indexOf("Runner")) {
      type = "Runner"
    } else if (temp.indexOf("Jogger")) {
      type = "Jogger"
    } else if (temp.indexOf("Walker")) {
      type = "Walker"
    } else if (temp.indexOf("Trainer")) {
      type = "Trainer"
    }
    var lvl = ""
    if (temp.match(/Lv +[0-9]+/)) {
      lvl = temp.match(/Lv +[0-9]+/)[0].slice(3)
    } else {
      lvl = temp.match(/Lv+[0-9]+/)[0].slice(2)
    }
    var nftId = ""
    if (temp.match(/# +[0-9]+/)) {
      nftId = temp.match(/# +[0-9]+/)[0].slice(2)
    } else {
      nftId = temp.match(/#+[0-9]+/)[0].slice(1)
    }
    var km = temp.match(/[0-9]+[.][0-9]+/g)[3]
    var steps = temp.match(/[0-9]+[\n]Km/)[0].slice(0, -3)
    var dateTime = date.split("/")[2] + "-" + date.split("/")[0] + "-" + date.split("/")[1] + " " + time + ":00"
    var file = uniqueId + "_" + fileName
    var json = {
      gstMin,
      dateTime,
      duration,
      gst,
      energy,
      type,
      lvl,
      km,
      steps,
      file,
      nftId,
      uniqueId
    }
    return { status: 201, message: await runs.create(json) }
  }

}

async function ocrNFT(path, fileName, uniqueId) {
  if (await nfts.imageExist(uniqueId + "_" + fileName)) {
    return { status: 409, message: `Image ${fileName} already exist` }
  } else {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Read a local image as a text document
    const [result] = await client.documentTextDetection(path);
    const fullTextAnnotation = result.fullTextAnnotation;
    var temp = fullTextAnnotation.text;
    var lvl = "";
    if(temp.match(/Level O/g)){
      lvl = "0"
    }else if(temp.match(/Level o/g)){

    }else{
      lvl = temp.match(/Level [0-9]{1,}/g)[0].slice(6)
    }
    var type = ""
    if (temp.indexOf("Runner")) {
      type = "Runner"
    } else if (temp.indexOf("Jogger")) {
      type = "Jogger"
    } else if (temp.indexOf("Walker")) {
      type = "Walker"
    } else if (temp.indexOf("Trainer")) {
      type = "Trainer"
    }
    var quality = ""
    if (temp.indexOf("Common")) {
      quality = "Common"
    } else if (temp.indexOf("Uncommon")) {
      quality = "Uncommon"
    } else if (temp.indexOf("Rare")) {
      quality = "Rare"
    } else if (temp.indexOf("Epic")) {
      quality = "Epic"
    } else if (temp.indexOf("Legendary")) {
      quality = "Legendary"
    }
    var efficiency = (temp.match(/Efficiency\n[0-9]+[.][0-9]+/g)[0]).split("\n")[1]
    var luck = (temp.match(/Luck\n[0-9]+[.][0-9]+/g)[0]).split("\n")[1]
    var comfort = (temp.match(/Comfort\n[0-9]+[.][0-9]+/g)[0]).split("\n")[1]
    var resilience = (temp.match(/Resilience\n[0-9]+[.][0-9]+/g)[0]).split("\n")[1]
    var nftId = ""
    if (temp.match(/# +[0-9]+/)) {
      nftId = temp.match(/# +[0-9]+/)[0].slice(2)
    } else {
      nftId = temp.match(/#+[0-9]+/)[0].slice(1)
    }
    var mint = temp.match(/[0-9]+[/][7]+/g)[0]
    var file = uniqueId + "_" + fileName
    var json = {
      lvl,
      type,
      quality,
      efficiency,
      luck,
      comfort,
      resilience,
      nftId,
      mint,
      file,
      uniqueId
    }

    return { status: 201, message: await nfts.create(json) }
  }
}

module.exports = {
  ocrRun,
  ocrNFT
}
