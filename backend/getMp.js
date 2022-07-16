const webdriver = require("selenium-webdriver");
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
  getMp,
};

async function getMp() {
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    .build();
  try {
    await driver.get("https://m.stepn.com/");
    await sleep(1000);
    await driver
      .findElement(By.xpath("//div[contains(text(),'Account')]"))
      .click();
    await sleep(1000);
    // Enter mail
    await driver
      .findElement(By.id("email-field"))
      .sendKeys("marketplace.stepn@gmail.com");
    await sleep(1000);
    // Enter password
    await driver
      .findElement(By.id("standard-adornment-password"))
      .sendKeys("Azerty123@");
    await sleep(1000);
    // Click on connection button
    await driver
      .findElement(
        By.xpath("//*[@id='headlessui-dialog-panel-:ri:']/div/div[6]/button")
      )
      .click();
    await sleep(1000);
    // Click on class
    await driver
      .findElement(By.xpath('/html/body/div/main/div[3]/div[1]/div/button[2]'))
      .click();
    await sleep(1000);
    // Click on quality
    await driver
      .findElement(By.xpath("/html/body/div/main/div[3]/div[1]/div/button[3]"))
      .click();
    await sleep(1000);
    // Click on type
    await driver
      .findElement(By.xpath('/html/body/div/main/div[3]/div[1]/div/button[1]'))
      .click();
    await sleep(1000);
    await selectRealm(driver, "Solana");
    await sleep(1000);
    var solanaMp = await getAllFloorPrice(driver);
    await sleep(1000);
    // Click on Sneakers tab
    await driver
      .findElement(By.xpath('//*[@id="headlessui-tabs-tab-:r0:"]'))
      .click();
    await sleep(1000);
    // Click on quality
    await driver
      .findElement(By.xpath("/html/body/div/main/div[3]/div[1]/div/button[3]"))
      .click();
    await sleep(1000);
    await selectRealm(driver, "BNB");
    await sleep(1000);
    var bnbMp = await getAllFloorPrice(driver);
    await sleep(1000);
    // Click on Sneakers tab
    await driver
      .findElement(By.xpath('//*[@id="headlessui-tabs-tab-:r0:"]'))
      .click();
    await sleep(1000);
    // Click on quality
    await driver
      .findElement(By.xpath("/html/body/div/main/div[3]/div[1]/div/button[3]"))
      .click();
    await sleep(1000);
    await selectRealm(driver, "Ethereum");
    await sleep(1000);
    var ethereummMp = await getAllFloorPrice(driver);
    solanaMpService.create(solanaMp).then((mp) => console.log(mp));
    bnbMpService.create(bnbMp).then((mp) => console.log(mp));
    ethereumMpService.create(ethereummMp).then((mp) => console.log(mp));
  } finally {
    await driver.quit();
  }
}
async function getAllFloorPrice(driver) {
  // // SNEAKERS
  await sleep(1000);
  // COMMON
  await selectQuality(driver, "Common");
  await sleep(1000);
  await selectType(driver, "Walker");
  await sleep(1000);
  var walkerCommon = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Jogger");
  await sleep(1000);
  var joggerCommon = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Runner");
  await sleep(1000);
  var runnerCommon = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Trainer");
  await sleep(1000);
  var trainerCommon = await getFloorPrice(driver);
  // UNCOMMON
  await selectQuality(driver, "Uncommon");
  await sleep(1000);
  await selectType(driver, "Walker");
  await sleep(1000);
  var walkerUncommon = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Jogger");
  await sleep(1000);
  var joggerUncommon = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Runner");
  await sleep(1000);
  var runnerUncommon = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Trainer");
  await sleep(1000);
  var trainerUncommon = await getFloorPrice(driver);
  // RARE
  await selectQuality(driver, "Rare");
  await sleep(1000);
  await selectType(driver, "Walker");
  await sleep(1000);
  var walkerRare = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Jogger");
  await sleep(1000);
  var joggerRare = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Runner");
  await sleep(1000);
  var runnerRare = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Trainer");
  await sleep(1000);
  var trainerRare = await getFloorPrice(driver);
  // EPIC
  await selectQuality(driver, "Epic");
  await sleep(1000);
  await selectType(driver, "Walker");
  await sleep(1000);
  var walkerEpic = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Jogger");
  await sleep(1000);
  var joggerEpic = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Runner");
  await sleep(1000);
  var runnerEpic = await getFloorPrice(driver);
  await sleep(1000);
  await selectType(driver, "Trainer");
  await sleep(1000);
  var trainerEpic = await getFloorPrice(driver);

  // GEMS
  await sleep(1000);
  await driver
    .findElement(By.xpath('//*[@id="headlessui-tabs-tab-:r1:"]'))
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
  await selectGemLevel(driver, 10);
  await sleep(1000);
  var efficiencyLvl10 = await getGemFloorPrice(driver);
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
  await selectGemLevel(driver, 10);
  await sleep(1000);
  var luckLvl10 = await getGemFloorPrice(driver);
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
  await selectGemLevel(driver, 10);
  await sleep(1000);
  var comfortLvl10 = await getGemFloorPrice(driver);
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
  await selectGemLevel(driver, 10);
  await sleep(1000);
  var resilienceLvl10 = await getGemFloorPrice(driver);
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
    efficiencyLvl1,
    efficiencyLvl2,
    efficiencyLvl3,
    efficiencyLvl4,
    efficiencyLvl5,
    efficiencyLvl6,
    efficiencyLvl7,
    efficiencyLvl8,
    efficiencyLvl9,
    efficiencyLvl10,
    luckLvl1,
    luckLvl2,
    luckLvl3,
    luckLvl4,
    luckLvl5,
    luckLvl6,
    luckLvl7,
    luckLvl8,
    luckLvl9,
    luckLvl10,
    resilienceLvl1,
    resilienceLvl2,
    resilienceLvl3,
    resilienceLvl4,
    resilienceLvl5,
    resilienceLvl6,
    resilienceLvl7,
    resilienceLvl8,
    resilienceLvl9,
    resilienceLvl10,
    comfortLvl1,
    comfortLvl2,
    comfortLvl3,
    comfortLvl4,
    comfortLvl5,
    comfortLvl6,
    comfortLvl7,
    comfortLvl8,
    comfortLvl9,
    comfortLvl10,
  };
  return json;
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function selectRealm(driver, type) {
  console.log("Select realm: " + type)
  await sleep(1000);
  await driver
    .findElement(By.xpath('//*[@id="__next"]/main/nav/div/div/div[2]'))
    .click();
  await sleep(1000);
  await driver
    .findElement(
      By.xpath(
        '//*[@id="__next"]/main/nav/div/div/div[2]/div[2]/div[1]/div/div[2]'
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
  console.log("Select sneakers type: " + type)
  switch (type) {
    case "Walker":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[3]/div/div/button[1]"
          )
        )
        .click();
      break;
    case "Jogger":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[3]/div/div/button[2]"
          )
        )
        .click();
      break;
    case "Runner":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[3]/div/div/button[3]"
          )
        )
        .click();
      break;
    case "Trainer":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[3]/div/div/button[4]"
          )
        )
        .click();
      break;
  }
}
async function getFloorPrice(driver) {
  try {
    var element = await driver.findElement(
      By.xpath(
        '//*[@id="__next"]/main/div[3]/div[2]/div/div[1]/div/div/div[1]/div/div[2]/div/div[3]/div[2]'
      )
    );
    return element.getText();
  } catch {
    return "0";
  }
}
async function getGemFloorPrice(driver) {
  return await driver
    .findElement(
      By.xpath(
        '//*[@id="__next"]/main/div[3]/div[2]/div[2]/div[1]/div/div/div[1]/div/div[2]/div/div[2]/div[2]'
      )
    )
    .then(
      async function (webElement) {
        return await webElement.getText();
      },
      function (err) {
        if (err.state && err.state === "no such element") {
          return "0";
        } else {
          return "0";
        }
      }
    );
}
async function selectQuality(driver, quality) {
  console.log("Select sneakers quaity: " + quality)
  switch (quality) {
    case "Common":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[4]/div/div/button[1]"
          )
        )
        .click();
      break;
    case "Uncommon":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[4]/div/div/button[2]"
          )
        )
        .click();
      break;
    case "Rare":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[4]/div/div/button[3]"
          )
        )
        .click();
      break;
    case "Epic":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[4]/div/div/button[4]"
          )
        )
        .click();
      break;
    case "Legendary":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[4]/div/div/button[5]"
          )
        )
        .click();
      break;
  }
}
async function selectGemType(driver, type) {
  console.log("Select gem type: " + type)
  switch (type) {
    case "Efficiency":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[2]/div/div/button[1]"
          )
        )
        .click();
      break;
    case "Luck":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[2]/div/div/button[2]"
          )
        )
        .click();
      break;
    case "Comfort":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[2]/div/div/button[3]"
          )
        )
        .click();
      break;
    case "Resilience":
      await driver
        .findElement(
          By.xpath(
            "/html/body/div/main/div[3]/div[1]/div/div[2]/div/div/button[4]"
          )
        )
        .click();
      break;
  }
}
// async function selectLevel(driver, level) {
//   await driver
//     .findElement(By.xpath('//*[@id="headlessui-disclosure-button-:r9:"]'))
//     .click();
//   await sleep(1000);

//   var minLevel = driver.findElement(
//     By.xpath('//*[@id="headlessui-disclosure-panel-:ra:"]/span/span[3]')
//   );

//   var maxLevel = driver.findElement(
//     By.xpath('//*[@id="headlessui-disclosure-panel-:ra:"]/span/span[4]')
//   );
//   const actions = driver.actions();
//   await sleep(1000);
//   // await actions.dragAndDrop(minLevel, { x: 100, y: 470 })
//   await actions
//     .mouseMove(minLevel)
//     .clickAndHold()
//     .perform()
//     .pause(100)
//     .moveByOffset(1, 0)
//     .pause(100)
//     .release()
//     .perform();
//   switch (level) {
//     case "0":
//       await driver
//         .findElement(
//           By.xpath('//*[@id="headlessui-disclosure-panel-:r8:"]/div/button[1]')
//         )
//         .click();
//       break;
//     case "5":
//       await driver
//         .findElement(
//           By.xpath('//*[@id="headlessui-disclosure-panel-:r8:"]/div/button[2]')
//         )
//         .click();
//       break;
//     case "10":
//       await driver
//         .findElement(
//           By.xpath('//*[@id="headlessui-disclosure-panel-:r8:"]/div/button[3]')
//         )
//         .click();
//       break;
//     case "20":
//       await driver
//         .findElement(
//           By.xpath('//*[@id="headlessui-disclosure-panel-:r8:"]/div/button[4]')
//         )
//         .click();
//       break;
//     case "30":
//       await driver
//         .findElement(
//           By.xpath('//*[@id="headlessui-disclosure-panel-:r8:"]/div/button[5]')
//         )
//         .click();
//       break;
//   }
// }

// async function selectMint(driver, mint) {}
async function selectGemLevel(driver, level) {
  console.log("Select gem level: " + level)
  switch (level) {
    case 1:
      await driver
        .actions({ bridge: true })
        .move({ x: 30, y: 470 })
        .click()
        .perform();
      break;
    case 2:
      await driver
        .actions({ bridge: true })
        .move({ x: 60, y: 470 })
        .click()
        .perform();
      break;
    case 3:
      await driver
        .actions({ bridge: true })
        .move({ x: 90, y: 470 })
        .click()
        .perform();
      break;
    case 4:
      await driver
        .actions({ bridge: true })
        .move({ x: 120, y: 470 })
        .click()
        .perform();
      break;
    case 5:
      await driver
        .actions({ bridge: true })
        .move({ x: 140, y: 470 })
        .click()
        .perform();
      break;
    case 6:
      await driver
        .actions({ bridge: true })
        .move({ x: 160, y: 470 })
        .click()
        .perform();
      break;
    case 7:
      await driver
        .actions({ bridge: true })
        .move({ x: 180, y: 470 })
        .click()
        .perform();
      break;
    // TODO: à revoir
    case 8:
      await driver
        .actions({ bridge: true })
        .move({ x: 200, y: 470 })
        .click()
        .perform();
      break;
    case 9:
      await driver
        .actions({ bridge: true })
        .move({ x: 200, y: 470 })
        .click()
        .perform();
      break;
    case 10:
      await driver
        .actions({ bridge: true })
        .move({ x: 200, y: 470 })
        .click()
        .perform();
      break;
  }
}
