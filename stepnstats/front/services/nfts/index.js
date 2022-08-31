import axios from "axios";
import config from "../../config.json";
import { getSecuretValueFor } from "../secureStorage/index";

module.exports = {
  createNft,
  deleteNft,
  uploadNft,
  updateNft,
  getAllMyNft,
  getByNftId,
  getMaxMb,
  optimize,
};
const baseURL = config.baseUrl + "/nfts";
async function createNft(params) {
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
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function updateNft(params, id) {
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
    .then(async (response) => {
      if (response.status === 200) {
        return await response;
      }
      throw await response;
    })
    .then(async (response) => {
      return await response;
    })
    .catch(async function (error) {
      throw await error.message;
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
    params: { page: 1 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios(config)
    .then(async function (response) {
      return response.data.rows;
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

async function getByNftId(nftId) {
  var token = await getSecuretValueFor("token");
  var config = {
    method: "get",
    url: baseURL + "/nftId",
    params: { nftId: nftId },
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
      throw error.response.data.message;
    });
}
const luckEnergy = [
  {
    energy: 3,
    luck: 8,
  },
  {
    energy: 5,
    luck: 20,
  },
  {
    energy: 8,
    luck: 28,
  },
  {
    energy: 12,
    luck: 56,
  },
  {
    energy: 16,
    luck: 148,
  },
  {
    energy: 20,
    luck: 286,
  },
  {
    energy: 21,
    luck: 805,
  },
  {
    energy: 23,
    luck: 1749,
  },
  {
    energy: 24,
    luck: 2074,
  },
  {
    energy: 25,
    luck: 3000,
  },
];

function getClosestEnergyLuck(energy, luck) {
  var closestEnergy;
  var closestLuck;
  for (var i = 0; i < luckEnergy.length; i++) {
    if (luckEnergy[i].energy <= energy) {
      closestEnergy = i;
    }
  }
  for (var y = 0; y < luckEnergy.length; y++) {
    if (luckEnergy[y].luck <= luck) {
      closestLuck = y;
    }
  }
  return Math.min(closestEnergy, closestLuck);
}

function socketValue(socket, value) {
  var finalValue = value;
  if (socket.includes("Lvl2")) {
    finalValue = value * 1.1;
  }
  if (socket.includes("Lvl3")) {
    finalValue = value * 1.2;
  }
  if (socket.includes("Lvl4")) {
    finalValue = value * 1.3;
  }
  if (socket.includes("Lvl5")) {
    finalValue = value * 1.5;
  }
  return finalValue;
}

function gemValue(gem, socket, value) {
  var finalValue = 0;
  if (gem.includes("Lvl1")) {
    finalValue += value * socketValue(socket, 1.05);
    finalValue += socketValue(socket, 2);
  }
  if (gem.includes("Lvl2")) {
    finalValue += value * socketValue(socket, 1.7);
    finalValue += socketValue(socket, 8);
  }
  if (gem.includes("Lvl3")) {
    finalValue += value * socketValue(socket, 2.2);
    finalValue += socketValue(socket, 25);
  }
  if (gem.includes("Lvl4")) {
    finalValue += value * socketValue(socket, 6);
    finalValue += socketValue(socket, 72);
  }
  if (gem.includes("Lvl5")) {
    finalValue += value * socketValue(socket, 14);
    finalValue += socketValue(socket, 200);
  }
  if (gem.includes("Lvl6")) {
    finalValue += value * socketValue(socket, 43);
    finalValue += socketValue(socket, 400);
  }
  if (gem.includes("Lvl7")) {
    finalValue += value * socketValue(socket, 1.7);
    finalValue += socketValue(socket, 8);
  }
  if (gem.includes("Lvl8")) {
    finalValue += value * socketValue(socket, 1.7);
    finalValue += socketValue(socket, 8);
  }
  if (gem.includes("Lvl9")) {
    finalValue += value * socketValue(socket, 1.7);
    finalValue += socketValue(socket, 8);
  }
  return Number(finalValue.toFixed(1));
}

async function optimize(myNft) {
  var points = 0;
  var efficiency = 0;
  var luck = 0;
  var comfort = 0;
  var resilience = 0;
  var gemEfficiency = 0;
  var gemLuck = 0;
  var gemComfort = 0;
  var gemResilience = 0;

  for (var i = 1; i < 5; i++) {
    if (myNft[`socket${i}`].includes("efficiency")) {
      gemEfficiency += gemValue(
        myNft[`gem${i}`],
        myNft[`socket${i}`],
        myNft.efficiencyBase
      );
    }
    if (myNft[`socket${i}`].includes("luck")) {
      gemLuck += gemValue(
        myNft[`gem${i}`],
        myNft[`socket${i}`],
        myNft.luckBase
      );
    }
    if (myNft[`socket${i}`].includes("comfort")) {
      gemComfort += gemValue(
        myNft[`gem${i}`],
        myNft[`socket${i}`],
        myNft.comfortBase
      );
    }
    if (myNft[`socket${i}`].includes("resilience")) {
      gemResilience += gemValue(
        myNft[`gem${i}`],
        myNft[`socket${i}`],
        myNft.resilienceBase
      );
    }
  }

  if (myNft.quality === "Common") {
    points = myNft.lvl * 4;
    comfort = Math.abs(Number(myNft.comfortBase.toFixed(0)) - 10);
    points += Number(myNft.comfortBase.toFixed(0)) - 10;
  }
  if (myNft.quality === "Uncommon") {
    points = myNft.lvl * 6;
    comfort = Math.abs(Number(myNft.comfortBase.toFixed(0)) - 20);
    points += Number(myNft.comfortBase.toFixed(0)) - 20;
  }
  if (myNft.quality === "Rare") {
    points = myNft.lvl * 8;
    comfort = Math.abs(Number(myNft.comfortBase.toFixed(0)) - 20);
    points += Number(myNft.comfortBase.toFixed(0)) - 20;
  }
  if (myNft.quality === "Epic") {
    points = myNft.lvl * 10;
    comfort = Math.abs(Number(myNft.comfortBase.toFixed(0)) - 20);
    points += Number(myNft.comfortBase.toFixed(0)) - 20;
  }
  if (myNft.strategy === "GST") {
    resilience += Number((points / 6).toFixed(0));
    points -= resilience;
    efficiency += points;
    points -= efficiency;
  }

  if (myNft.strategy === "MYSTERY BOX") {
    var maxLuck = gemLuck + myNft.luckBase + points;
    var average = luckEnergy[getClosestEnergyLuck(myNft.energy, maxLuck)].luck;
    if (average <= gemLuck + myNft.luckBase) {
      // Pas besoin d'attribuer des points en luck
    } else {
      var diff = average - (gemLuck + myNft.luckBase);
      // attribuer diff en points
      luck += diff;
      points -= luck;
    }
    resilience += Number((points / 6).toFixed(0));
    points -= resilience;
    efficiency += points;
    points -= efficiency;
  }

  if (myNft.strategy === "HYBRID") {
    resilience += Number((points / 2 / 6).toFixed(0));
    efficiency += Number((points / 2).toFixed(0));
    points -= resilience;
    points -= efficiency;
    var maxLuck = gemLuck + myNft.luckBase + points;
    var average = luckEnergy[getClosestEnergyLuck(myNft.energy, maxLuck)].luck;
    if (average <= gemLuck + myNft.luckBase) {
      // Pas besoin d'attribuer des points en luck
    } else {
      var diff = average - (gemLuck + myNft.luckBase);
      // attribuer diff en points
      luck += diff;
      points -= luck;
    }
    resilience += Number((points / 6).toFixed(0));
    points -= resilience;
    efficiency += points;
    points -= efficiency;
  }
  const params = {
    lvlOptimized: myNft.lvl,
    efficiencyOptimized: Number(efficiency.toFixed(0)) + gemEfficiency,
    luckOptimized: Number(luck.toFixed(0)) + gemLuck,
    comfortOptimized: Number(comfort.toFixed(0)) + gemComfort,
    resilienceOptimized: Number(resilience.toFixed(0)) + gemResilience,
    gem1Optimized: myNft.gem1,
    gem2Optimized: myNft.gem2,
    gem3Optimized: myNft.gem3,
    gem4Optimized: myNft.gem4,
    id: myNft.id,
  };
  return await updateNft(params, myNft.id);
}

function getMaxMb(myNft) {
  var points = 0;
  var efficiency = 0;
  var luck = 0;
  var comfort = 0;
  var resilience = 0;
  var gemEfficiency = 0;
  var gemLuck = 0;
  var gemComfort = 0;
  var gemResilience = 0;

  if (myNft.quality === "Common") {
    points = myNft.lvl * 4;
    comfort = 10;
    points += Number(myNft.comfortBase.toFixed(0)) - 10;
  }
  if (myNft.quality === "Uncommon") {
    points = myNft.lvl * 6;
    comfort = 20;
    points += myNft.comfortBase - 20;
  }
  if (myNft.quality === "Rare") {
    points = myNft.lvl * 8;
    comfort = 20;
    points += myNft.comfortBase - 20;
  }
  if (myNft.quality === "Epic") {
    points = myNft.lvl * 10;
    comfort = 20;
    points += myNft.comfortBase - 20;
  }
  for (var i = 1; i < 5; i++) {
    if (myNft[`socket${i}`].includes("efficiency")) {
      gemEfficiency += gemValue(
        myNft[`gem${i}`],
        myNft[`socket${i}`],
        myNft.efficiencyBase
      );
    }
    if (myNft[`socket${i}`].includes("luck")) {
      gemLuck += gemValue(
        myNft[`gem${i}`],
        myNft[`socket${i}`],
        myNft.luckBase
      );
    }
    if (myNft[`socket${i}`].includes("comfort")) {
      gemComfort += gemValue(
        myNft[`gem${i}`],
        myNft[`socket${i}`],
        myNft.comfortBase
      );
    }
    if (myNft[`socket${i}`].includes("resilience")) {
      gemResilience += gemValue(
        myNft[`gem${i}`],
        myNft[`socket${i}`],
        myNft.resilienceBase
      );
    }
  }
  if (myNft.strategy === "GST") {
    points = 0;
  }
  if (myNft.strategy === "HYBRID") {
    resilience += Number((points / 2 / 6).toFixed(0));
    efficiency += Number((points / 2).toFixed(0));
    points -= resilience + efficiency;
  }
  var maxLuck = gemLuck + myNft.luckBase + points;
  return getClosestEnergyLuck(myNft.energy, maxLuck) + 1;
}
