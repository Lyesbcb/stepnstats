const webdriver = require("selenium-webdriver");
const config = require("./config.json");
const chrome = require("selenium-webdriver/chrome");
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const solanaMpService = require("./mps/solana/solanaMp.service");
const bnbMpService = require("./mps/bnb/bnbMp.service");
const ethereumMpService = require("./mps/ethereum/ethereumMp.service");
const screen = {
  width: 1920,
  height: 1080,
};

module.exports = {
  buyAndSell,
};
async function buyAndSell() {
  const options = new chrome.Options();
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        .addArguments("--no-sandbox")
        .addArguments("--disable-dev-shm-usage")
        .headless()
        .windowSize(screen)
    )
    .build();
  try {
    await driver.get("https://m.stepn.com/");
    await sleep(1000);
    await driver
      .findElement(
        By.xpath("/html/body/div[2]/div/div/div/div[2]/div/div/div/div/div[4]")
      )
      .click();
    await sleep(1000);
    // Enter mail
    await driver
      .findElement(
        By.xpath("/html/body/div[2]/div/div/div/div[2]/div/div/div/div/input")
      )
      .sendKeys(config.buyAndSell.mail);
    await sleep(1000);
    // Enter password
    await driver
      .findElement(
        By.xpath(
          "/html/body/div[2]/div/div/div/div[2]/div/div/div/div/div[2]/input"
        )
      )
      .sendKeys(config.buyAndSell.password);
    // Click on login
    await driver
      .findElement(
        By.xpath(
          "/html/body/div[2]/div/div/div/div[2]/div/div/div/div/div[3]/button"
        )
      )
      .click();

    await sleep(1000);
    await selectRealm(driver, "Solana");
    await sleep(1000);
    await buyGem(driver, 1, "Luck", "Solana")
  } finally {
    await driver.quit();
  }
}
async function buyGem(driver, lvl, type, realm) {
  var lastRecords;
  var stopBuysRecords;
  // CHECK if the price is good for buying
  if (realm === "Solana") {
    lastRecords = await solanaMpService.getLastRecords(
      config.buyAndSell.buy.gem[1].lastRecords
    );
    stopBuysRecords = await solanaMpService.getLastRecords(
      config.buyAndSell.buy.gem[1].stopBuyRecords
    );
  } else if (realm === "BNB") {
    lastRecords = await bnbMpService.getLastRecords(
      config.buyAndSell.buy.gem[1].lastRecords
    );
    stopBuysRecords = await bnbMpService.getLastRecords(
      config.buyAndSell.buy.gem[1].stopBuyRecords
    );
  } else if (realm === "Ethereum") {
    lastRecords = await ethereumMpService.getLastRecords(
      config.buyAndSell.buy.gem[1].lastRecords
    );
    stopBuysRecords = await ethereumMpService.getLastRecords(
      config.buyAndSell.buy.gem[1].stopBuyRecords
    );
  }
  var averageArray = []
  for (let i = 0; i < lastRecords.length; i++) {
    averageArray.push(lastRecords[i].dataValues[type.toLowerCase() + "Lvl" + lvl])
  }
  const sum = averageArray.reduce((a, b) => a + b, 0);
  const avg = (sum / averageArray.length) || 0;
  console.log(avg.toFixed(6))
  // // GEMS
  // await sleep(1000);
  // await driver
  //   .findElement(
  //     By.xpath("/html/body/div/main/div/div[2]/div[1]/div[1]/button[2]")
  //   )
  //   .click();
  // await sleep(1000);
  // // SELECT TYPE
  // await selectGemType(driver, type);
  // await sleep(1000);
  // // SELECT LVL
  // await selectGemLevel(driver, lvl);
  // await sleep(1000);
  // // BUY
  // await driver
  //   .findElement(
  //     By.xpath(
  //       "/html/body/div/main/div/div[2]/div[2]/div[1]/div/div/div[1]/div/div/div[2]/div/button"
  //     )
  //   )
  //   .click();
  // await sleep(1000);
  // await driver
  //   .findElement(
  //     By.xpath(
  //       "/html/body/div[2]/div/div/div/div[2]/div/div/div/div/div[7]/button[2]"
  //     )
  //   )
  //   .click();
  // await sleep(1000);
  // await driver
  //   .findElement(
  //     By.xpath(
  //       "/html/body/div[2]/div/div/div/div[2]/div/div/div/div/div[3]/button[2]"
  //     )
  //   )
  //   .click();
  // await sleep(1000);
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function selectRealm(driver, type) {
  console.log("Select realm: " + type);
  await sleep(1000);
  await driver
    .findElement(By.xpath("/html/body/div/main/nav/div/div/div[2]/button/div"))
    .click();
  await sleep(1000);
  await driver
    .findElement(
      By.xpath(
        "/html/body/div/main/nav/div/div/div[2]/div/div/div/div[1]/div[2]"
      )
    )
    .click();
  await sleep(1000);
  switch (type) {
    case "Solana":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div[2]/div/div/div/div[2]/div/div/div/div[2]/div[1]"
          )
        )
        .click();
      break;
    case "BNB":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div[2]/div/div/div/div[2]/div/div/div/div[2]/div[2]/div[2]"
          )
        )
        .click();
      break;
    case "Ethereum":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div[2]/div/div/div/div[2]/div/div/div/div[2]/div[3]/div[2]"
          )
        )
        .click();
      break;
  }
}

async function selectType(driver, type) {
  console.log("Select sneakers type: " + type);
  switch (type) {
    case "Walker":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[7]/div/button[1]")
        )
        .click();
      break;
    case "Jogger":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[7]/div/button[2]")
        )
        .click();
      break;
    case "Runner":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[7]/div/button[3]")
        )
        .click();
      break;
    case "Trainer":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[7]/div/button[4]")
        )
        .click();
      break;
  }
}
async function getFloorPrice(driver) {
  try {
    var element = await driver.findElement(
      By.xpath(
        "/html/body/div/main/div/div[2]/div[2]/div[1]/div/div/div[1]/div/div/div[2]/div/div"
      )
    );
    var result = await element.getText();
    result = result.split(" ")[0];
    return result;
  } catch {
    return "0";
  }
}
async function getGemFloorPrice(driver) {
  try {
    var element = await driver.findElement(
      By.xpath(
        "/html/body/div/main/div/div[2]/div[2]/div[1]/div/div/div[1]/div/div/div[2]/div/div"
      )
    );
    var result = await element.getText();
    result = result.split(" ")[0];
    return result;
  } catch {
    return "0";
  }
}
async function selectQuality(driver, quality) {
  console.log("Select sneakers quaity: " + quality);
  switch (quality) {
    case "Common":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[9]/div/button[1]")
        )
        .click();
      break;
    case "Uncommon":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[9]/div/button[2]")
        )
        .click();
      break;
    case "Rare":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[9]/div/button[3]")
        )
        .click();
      break;
    case "Epic":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[9]/div/button[4]")
        )
        .click();
      break;
    case "Legendary":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[9]/div/button[5]")
        )
        .click();
      break;
  }
}
async function selectGemType(driver, type) {
  console.log("Select gem type: " + type);
  switch (type) {
    case "Efficiency":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[3]/div/button[1]")
        )
        .click();
      break;
    case "Luck":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[3]/div/button[2]")
        )
        .click();
      break;
    case "Comfort":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[3]/div/button[3]")
        )
        .click();
      break;
    case "Resilience":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[3]/div/button[4]")
        )
        .click();
      break;
  }
}
async function selectGemLevel(driver, level) {
  console.log("Select gem level: " + level);
  switch (level) {
    case 1:
      await driver
        .actions({ bridge: true })
        .move({ x: 40, y: 370 })
        .click()
        .perform();
      break;
    case 2:
      await driver
        .actions({ bridge: true })
        .move({ x: 60, y: 370 })
        .click()
        .perform();
      break;
    case 3:
      await driver
        .actions({ bridge: true })
        .move({ x: 90, y: 370 })
        .click()
        .perform();
      break;
    case 4:
      await driver
        .actions({ bridge: true })
        .move({ x: 120, y: 370 })
        .click()
        .perform();
      break;
    case 5:
      await driver
        .actions({ bridge: true })
        .move({ x: 140, y: 370 })
        .click()
        .perform();
      break;
    case 6:
      await driver
        .actions({ bridge: true })
        .move({ x: 160, y: 370 })
        .click()
        .perform();
      break;
    case 7:
      await driver
        .actions({ bridge: true })
        .move({ x: 180, y: 370 })
        .click()
        .perform();
      break;
    // TODO: à revoir
    case 8:
      await driver
        .actions({ bridge: true })
        .move({ x: 200, y: 370 })
        .click()
        .perform();
      break;
    case 9:
      await driver
        .actions({ bridge: true })
        .move({ x: 200, y: 370 })
        .click()
        .perform();
      break;
  }
}
