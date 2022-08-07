const webdriver = require("selenium-webdriver");
const config = require("./config.json");
const chrome = require("selenium-webdriver/chrome");
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const solanaMpService = require("./mps/solana/solanaMp.service");
const bnbMpService = require("./mps/bnb/bnbMp.service");
const ethereumMpService = require("./mps/ethereum/ethereumMp.service");
const CoinMarketCap = require("coinmarketcap-api");

const apiKey = config.coinMarketCap_token;
const client = new CoinMarketCap(apiKey);
var cryptoPrices = {};
client
  .getQuotes({ id: [1839, 1027, 18069, 5426, 16352, 20236, 21152] })
  .then((data) => {
    var result = data.data;
    cryptoPrices.Ethereum = result["1027"].quote.USD.price;
    cryptoPrices.Bnb = result["1839"].quote.USD.price;
    cryptoPrices.gmt = result["18069"].quote.USD.price;
    cryptoPrices.Solana = result["5426"].quote.USD.price;
    cryptoPrices.gstSolana = result["16352"].quote.USD.price;
    cryptoPrices.gstBnb = result["20236"].quote.USD.price;
    cryptoPrices.gstEthereum = result["21152"].quote.USD.price;
  })
  .catch(console.error);

const screen = {
  width: 1920,
  height: 1080,
};

module.exports = {
  getMp,
};

async function getMp() {
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        // .addArguments("--no-sandbox")
        // .addArguments("--disable-dev-shm-usage")
        // .headless()
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
      .sendKeys(config.marketplace.mail);
    await sleep(1000);
    // Enter password
    await driver
      .findElement(
        By.xpath(
          "/html/body/div[2]/div/div/div/div[2]/div/div/div/div/div[2]/input"
        )
      )
      .sendKeys(config.marketplace.password);
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
    // Click on sneakers
    await driver
      .findElement(
        By.xpath("/html/body/div/main/div/div[1]/div/div[3]/div/button[1]")
      )
      .click();
    await sleep(1000);
    await sleep(1000);
    var solanaMp = await getAllFloorPrice(driver);
    console.log(solanaMp);
    await sleep(1000);
    // Click on Sneakers tab
    await driver
      .findElement(
        By.xpath("/html/body/div/main/div/div[2]/div[1]/div[1]/button[1]")
      )
      .click();
    await sleep(1000);
    await sleep(1000);
    await selectRealm(driver, "BNB");
    await sleep(1000);
    var bnbMp = await getAllFloorPrice(driver);
    await sleep(1000);
    // Click on Sneakers tab
    await driver
      .findElement(
        By.xpath("/html/body/div/main/div/div[2]/div[1]/div[1]/button[1]")
      )
      .click();
    await sleep(1000);
    await selectRealm(driver, "Ethereum");
    await sleep(1000);
    var ethereummMp = await getAllFloorPrice(driver);
    // The crypto price
    solanaMp = Object.assign(solanaMp, cryptoPrices);
    bnbMp = Object.assign(bnbMp, cryptoPrices);
    ethereummMp = Object.assign(ethereummMp, cryptoPrices);
    solanaMpService.create(solanaMp).then((mp) => console.log(mp));
    bnbMpService.create(bnbMp).then((mp) => console.log(mp));
    ethereumMpService.create(ethereummMp).then((mp) => console.log(mp));
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Récupération des marketplace terminées !");
    driver.quit();
  }
}

async function getAllFloorPrice(driver) {
  // SNEAKERS
  await sleep(1000);
  // COMMON
  await selectQuality(driver, "Common");
  await sleep(1000);
  await selectType(driver, "Walker");
  await sleep(1000);
  var walkerCommon = await getFloorPrice(driver);
  console.log(walkerCommon);
  await sleep(1000);
  await selectType(driver, "Jogger");
  await sleep(1000);
  var joggerCommon = await getFloorPrice(driver);
  console.log(joggerCommon);
  await sleep(1000);
  await selectType(driver, "Runner");
  await sleep(1000);
  var runnerCommon = await getFloorPrice(driver);
  console.log(runnerCommon);
  await sleep(1000);
  await selectType(driver, "Trainer");
  await sleep(1000);
  var trainerCommon = await getFloorPrice(driver);
  console.log(trainerCommon);
  // UNCOMMON
  await selectQuality(driver, "Uncommon");
  await sleep(1000);
  await selectType(driver, "Walker");
  await sleep(1000);
  var walkerUncommon = await getFloorPrice(driver);
  console.log(walkerUncommon);
  await sleep(1000);
  await selectType(driver, "Jogger");
  await sleep(1000);
  var joggerUncommon = await getFloorPrice(driver);
  console.log(joggerUncommon);
  await sleep(1000);
  await selectType(driver, "Runner");
  await sleep(1000);
  var runnerUncommon = await getFloorPrice(driver);
  console.log(runnerUncommon);
  await sleep(1000);
  await selectType(driver, "Trainer");
  await sleep(1000);
  var trainerUncommon = await getFloorPrice(driver);
  console.log(trainerUncommon);
  // RARE
  await selectQuality(driver, "Rare");
  await sleep(1000);
  await selectType(driver, "Walker");
  await sleep(1000);
  var walkerRare = await getFloorPrice(driver);
  console.log(walkerRare);
  await sleep(1000);
  await selectType(driver, "Jogger");
  await sleep(1000);
  var joggerRare = await getFloorPrice(driver);
  console.log(joggerRare);
  await sleep(1000);
  await selectType(driver, "Runner");
  await sleep(1000);
  var runnerRare = await getFloorPrice(driver);
  console.log(runnerRare);
  await sleep(1000);
  await selectType(driver, "Trainer");
  await sleep(1000);
  var trainerRare = await getFloorPrice(driver);
  console.log(trainerRare);
  // EPIC
  await selectQuality(driver, "Epic");
  await sleep(1000);
  await selectType(driver, "Walker");
  await sleep(1000);
  var walkerEpic = await getFloorPrice(driver);
  console.log(walkerEpic);
  await sleep(1000);
  await selectType(driver, "Jogger");
  await sleep(1000);
  var joggerEpic = await getFloorPrice(driver);
  console.log(joggerEpic);
  await sleep(1000);
  await selectType(driver, "Runner");
  await sleep(1000);
  var runnerEpic = await getFloorPrice(driver);
  console.log(runnerEpic);
  await sleep(1000);
  await selectType(driver, "Trainer");
  await sleep(1000);
  var trainerEpic = await getFloorPrice(driver);
  console.log(trainerEpic);

  // GENESIS
  // Unselect trainer
  await selectType(driver, "Trainer");
  await sleep(1000);
  await selectRarity(driver, "Genesis");
  await sleep(1000);
  await selectQuality(driver, "Common");
  await sleep(1000);
  var genesisCommon = await getFloorPrice(driver);
  console.log(genesisCommon);
  await sleep(1000);
  await selectQuality(driver, "Uncommon");
  await sleep(1000);
  var genesisUncommon = await getFloorPrice(driver);
  console.log(genesisUncommon);
  await sleep(1000);
  await selectQuality(driver, "Rare");
  await sleep(1000);
  var genesisRare = await getFloorPrice(driver);
  console.log(genesisRare);
  await sleep(1000);
  await selectQuality(driver, "Epic");
  await sleep(1000);
  var genesisEpic = await getFloorPrice(driver);
  console.log(genesisEpic);

  // OG
  await selectRarity(driver, "OG");
  await sleep(1000);
  await selectQuality(driver, "Common");
  await sleep(1000);
  var ogCommon = await getFloorPrice(driver);
  console.log(ogCommon);
  await sleep(1000);
  await selectQuality(driver, "Uncommon");
  await sleep(1000);
  var ogUncommon = await getFloorPrice(driver);
  console.log(ogUncommon);
  await sleep(1000);
  await selectQuality(driver, "Rare");
  await sleep(1000);
  var ogRare = await getFloorPrice(driver);
  console.log(ogRare);
  await sleep(1000);
  await selectQuality(driver, "Epic");
  await sleep(1000);
  var ogEpic = await getFloorPrice(driver);
  console.log(ogEpic);

  // GEMS
  await sleep(1000);
  await driver
    .findElement(
      By.xpath("/html/body/div/main/div/div[2]/div[1]/div[1]/button[2]")
    )
    .click();
  await sleep(1000);
  // Efficiency
  await selectGemType(driver, "Efficiency");
  await sleep(1000);
  await selectGemLevel(driver, 1);
  await sleep(1000);
  var efficiencyLvl1 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 2);
  await sleep(1000);
  var efficiencyLvl2 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 3);
  await sleep(1000);
  var efficiencyLvl3 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 4);
  await sleep(1000);
  var efficiencyLvl4 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 5);
  await sleep(1000);
  var efficiencyLvl5 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 6);
  await sleep(1000);
  var efficiencyLvl6 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 7);
  await sleep(1000);
  var efficiencyLvl7 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 8);
  await sleep(1000);
  var efficiencyLvl8 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 9);
  await sleep(1000);
  var efficiencyLvl9 = await getGemFloorPrice(driver);
  await sleep(1000);
  // Luck
  await selectGemType(driver, "Luck");
  await sleep(1000);
  await selectGemLevel(driver, 1);
  await sleep(1000);
  var luckLvl1 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 2);
  await sleep(1000);
  var luckLvl2 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 3);
  await sleep(1000);
  var luckLvl3 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 4);
  await sleep(1000);
  var luckLvl4 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 5);
  await sleep(1000);
  var luckLvl5 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 6);
  await sleep(1000);
  var luckLvl6 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 7);
  await sleep(1000);
  var luckLvl7 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 8);
  await sleep(1000);
  var luckLvl8 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 9);
  await sleep(1000);
  var luckLvl9 = await getGemFloorPrice(driver);
  await sleep(1000);
  // Comfort
  await selectGemType(driver, "Comfort");
  await sleep(1000);
  await selectGemLevel(driver, 1);
  await sleep(1000);
  var comfortLvl1 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 2);
  await sleep(1000);
  var comfortLvl2 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 3);
  await sleep(1000);
  var comfortLvl3 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 4);
  await sleep(1000);
  var comfortLvl4 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 5);
  await sleep(1000);
  var comfortLvl5 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 6);
  await sleep(1000);
  var comfortLvl6 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 7);
  await sleep(1000);
  var comfortLvl7 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 8);
  await sleep(1000);
  var comfortLvl8 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 9);
  await sleep(1000);
  var comfortLvl9 = await getGemFloorPrice(driver);
  await sleep(1000);
  // Resilience
  await selectGemType(driver, "Resilience");
  await sleep(1000);
  await selectGemLevel(driver, 1);
  await sleep(1000);
  var resilienceLvl1 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 2);
  await sleep(1000);
  var resilienceLvl2 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 3);
  await sleep(1000);
  var resilienceLvl3 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 4);
  await sleep(1000);
  var resilienceLvl4 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 5);
  await sleep(1000);
  var resilienceLvl5 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 6);
  await sleep(1000);
  var resilienceLvl6 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 7);
  await sleep(1000);
  var resilienceLvl7 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 8);
  await sleep(1000);
  var resilienceLvl8 = await getGemFloorPrice(driver);
  await sleep(1000);
  await selectGemLevel(driver, 9);
  await sleep(1000);
  var resilienceLvl9 = await getGemFloorPrice(driver);
  await sleep(1000);
  // SCROLL
  await driver
    .findElement(
      By.xpath("/html/body/div/main/div/div[2]/div[1]/div[1]/button[3]")
    )
    .click();
  await sleep(1000);
  await selectScrollQuality(driver, "Common");
  await sleep(1000);
  var commonScroll = await getGemScrollPrice(driver);
  console.log(commonScroll);
  await sleep(1000);
  await selectScrollQuality(driver, "Uncommon");
  await sleep(1000);
  var uncommonScroll = await getGemScrollPrice(driver);
  console.log(uncommonScroll);
  await sleep(1000);
  await selectScrollQuality(driver, "Rare");
  await sleep(1000);
  var rareScroll = await getGemScrollPrice(driver);
  console.log(rareScroll);
  await sleep(1000);
  await selectScrollQuality(driver, "Epic");
  await sleep(1000);
  var epicScroll = await getGemScrollPrice(driver);
  console.log(epicScroll);
  await sleep(1000);
  await selectScrollQuality(driver, "Legendary");
  await sleep(1000);
  var legendaryScroll = await getGemScrollPrice(driver);
  console.log(legendaryScroll);
  var json = {
    walkerCommon,
    joggerCommon,
    runnerCommon,
    trainerCommon,
    walkerUncommon,
    joggerUncommon,
    runnerUncommon,
    trainerUncommon,
    walkerRare,
    joggerRare,
    runnerRare,
    trainerRare,
    walkerEpic,
    joggerEpic,
    runnerEpic,
    trainerEpic,
    genesisCommon,
    genesisUncommon,
    genesisRare,
    genesisEpic,
    ogCommon,
    ogUncommon,
    ogRare,
    ogEpic,
    efficiencyLvl1,
    efficiencyLvl2,
    efficiencyLvl3,
    efficiencyLvl4,
    efficiencyLvl5,
    efficiencyLvl6,
    efficiencyLvl7,
    efficiencyLvl8,
    efficiencyLvl9,
    luckLvl1,
    luckLvl2,
    luckLvl3,
    luckLvl4,
    luckLvl5,
    luckLvl6,
    luckLvl7,
    luckLvl8,
    luckLvl9,
    resilienceLvl1,
    resilienceLvl2,
    resilienceLvl3,
    resilienceLvl4,
    resilienceLvl5,
    resilienceLvl6,
    resilienceLvl7,
    resilienceLvl8,
    resilienceLvl9,
    comfortLvl1,
    comfortLvl2,
    comfortLvl3,
    comfortLvl4,
    comfortLvl5,
    comfortLvl6,
    comfortLvl7,
    comfortLvl8,
    comfortLvl9,
    commonScroll,
    uncommonScroll,
    rareScroll,
    epicScroll,
    legendaryScroll,
  };
  return json;
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

async function getGemScrollPrice(driver) {
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

async function selectRarity(driver, rarity) {
  console.log("Select sneakers rarity: " + rarity);
  switch (rarity) {
    case "Genesis":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[5]/div/button[1]")
        )
        .click();
      break;
    case "OG":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[5]/div/button[2]")
        )
        .click();
      break;
  }
}

async function selectGemType(driver, type) {
  console.log("Select gem type: " + type);
  await driver
    .actions({ bridge: true })
    .move({ x: 200, y: 370 })
    .click()
    .perform();
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

async function selectScrollQuality(driver, quality) {
  console.log("Select scroll quaity: " + quality);
  switch (quality) {
    case "Common":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[5]/div/button[1]")
        )
        .click();
      break;
    case "Uncommon":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[5]/div/button[2]")
        )
        .click();
      break;
    case "Rare":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[5]/div/button[3]")
        )
        .click();
      break;
    case "Epic":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[5]/div/button[4]")
        )
        .click();
      break;
    case "Legendary":
      await driver
        .findElement(
          By.xpath("/html/body/div/main/div/div[1]/div/div[5]/div/button[5]")
        )
        .click();
      break;
  }
}
