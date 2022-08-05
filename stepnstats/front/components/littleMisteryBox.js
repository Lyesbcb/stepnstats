import Icon from "react-native-elements/dist/icons/Icon";
import { Text, View, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export default function LittleMisteryBox({ data }) {
  const [price, setPrice] = useState("--.--");
  const [date, setDate] = useState("--/--/----");
  var color;
  const mbsColor = [
    "#B2B2B2",
    "#B2B2B2",
    "#80FF1D",
    "#80FF1D",
    "#00A5F6",
    "#00A5F6",
    "#9F80FF",
    "#9F80FF",
    "#FA6C00",
    "#FA6C00",
  ];
  {
    data != 0 ? (color = mbsColor[data.lvl - 1]) : (color = "#B2B2B2");
  }

  const mbsImage = [
    require("../assets/mb/lvl1.png"),
    require("../assets/mb/lvl2.png"),
    require("../assets/mb/lvl3.png"),
    require("../assets/mb/lvl4.png"),
    require("../assets/mb/lvl5.png"),
    require("../assets/mb/lvl6.png"),
    require("../assets/mb/lvl7.png"),
    require("../assets/mb/lvl8.png"),
    require("../assets/mb/lvl9.png"),
    require("../assets/mb/lvl10.png"),
  ];

  const contents = [
    "efficiencyLvl1",
    "efficiencyLvl2",
    "efficiencyLvl3",
    "efficiencyLvl4",
    "efficiencyLvl5",
    "efficiencyLvl6",
    "efficiencyLvl7",
    "efficiencyLvl8",
    "efficiencyLvl9",
    "luckLvl1",
    "luckLvl2",
    "luckLvl3",
    "luckLvl4",
    "luckLvl5",
    "luckLvl6",
    "luckLvl7",
    "luckLvl8",
    "luckLvl9",
    "comfortLvl1",
    "comfortLvl2",
    "comfortLvl3",
    "comfortLvl4",
    "comfortLvl5",
    "comfortLvl6",
    "comfortLvl7",
    "comfortLvl8",
    "comfortLvl9",
    "resilienceLvl1",
    "resilienceLvl2",
    "resilienceLvl3",
    "resilienceLvl4",
    "resilienceLvl5",
    "resilienceLvl6",
    "resilienceLvl7",
    "resilienceLvl8",
    "resilienceLvl9",
    "commonScroll",
    "uncommonScroll",
    "rareScroll",
    "epicScroll",
    "legendaryScroll",
    "gst",
  ];
  const contentImage = [
    require("../assets/gem/efficiency/lvl1.png"),
    require("../assets/gem/efficiency/lvl2.png"),
    require("../assets/gem/efficiency/lvl3.png"),
    require("../assets/gem/efficiency/lvl4.png"),
    require("../assets/gem/efficiency/lvl5.png"),
    require("../assets/gem/efficiency/lvl6.png"),
    require("../assets/gem/efficiency/lvl7.png"),
    require("../assets/gem/efficiency/lvl8.png"),
    require("../assets/gem/efficiency/lvl9.png"),
    require("../assets/gem/luck/lvl1.png"),
    require("../assets/gem/luck/lvl2.png"),
    require("../assets/gem/luck/lvl3.png"),
    require("../assets/gem/luck/lvl4.png"),
    require("../assets/gem/luck/lvl5.png"),
    require("../assets/gem/luck/lvl6.png"),
    require("../assets/gem/luck/lvl7.png"),
    require("../assets/gem/luck/lvl8.png"),
    require("../assets/gem/luck/lvl9.png"),
    require("../assets/gem/comfort/lvl1.png"),
    require("../assets/gem/comfort/lvl2.png"),
    require("../assets/gem/comfort/lvl3.png"),
    require("../assets/gem/comfort/lvl4.png"),
    require("../assets/gem/comfort/lvl5.png"),
    require("../assets/gem/comfort/lvl6.png"),
    require("../assets/gem/comfort/lvl7.png"),
    require("../assets/gem/comfort/lvl8.png"),
    require("../assets/gem/comfort/lvl9.png"),
    require("../assets/gem/resilience/lvl1.png"),
    require("../assets/gem/resilience/lvl2.png"),
    require("../assets/gem/resilience/lvl3.png"),
    require("../assets/gem/resilience/lvl4.png"),
    require("../assets/gem/resilience/lvl5.png"),
    require("../assets/gem/resilience/lvl6.png"),
    require("../assets/gem/resilience/lvl7.png"),
    require("../assets/gem/resilience/lvl8.png"),
    require("../assets/gem/resilience/lvl9.png"),
    require("../assets/scroll/common.png"),
    require("../assets/scroll/uncommon.png"),
    require("../assets/scroll/rare.png"),
    require("../assets/scroll/epic.png"),
    require("../assets/scroll/legendary.png"),
    require("../assets/gst.png"),
  ];

  useEffect(() => {
    if (data != 0) {
      data.prices[0] = {
        id: 1409,
        walkerCommon: 1.19,
        joggerCommon: 1.19,
        runnerCommon: 1.15,
        trainerCommon: 2.7,
        walkerUncommon: 5,
        joggerUncommon: 4.75,
        runnerUncommon: 4.1,
        trainerUncommon: 12.8,
        walkerRare: 26.98,
        joggerRare: 24.8,
        runnerRare: 17.9,
        trainerRare: 54.9,
        walkerEpic: 153,
        joggerEpic: 149,
        runnerEpic: 98.5,
        trainerEpic: 777,
        genesisCommon: 100,
        genesisUncommon: 99.99,
        genesisRare: 135,
        genesisEpic: 200,
        ogCommon: 0,
        ogUncommon: 0,
        ogRare: 0,
        ogEpic: 0,
        efficiencyLvl1: 0.029999,
        efficiencyLvl2: 0.41,
        efficiencyLvl3: 2.59,
        efficiencyLvl4: 12,
        efficiencyLvl5: 70,
        efficiencyLvl6: 385,
        efficiencyLvl7: 385,
        efficiencyLvl8: 385,
        efficiencyLvl9: 385,
        luckLvl1: 0.0499,
        luckLvl2: 0.556,
        luckLvl3: 3.43,
        luckLvl4: 15.87,
        luckLvl5: 75,
        luckLvl6: 425,
        luckLvl7: 425,
        luckLvl8: 425,
        luckLvl9: 425,
        resilienceLvl1: 0.01,
        resilienceLvl2: 0.143,
        resilienceLvl3: 1,
        resilienceLvl4: 4.6,
        resilienceLvl5: 27,
        resilienceLvl6: 85,
        resilienceLvl7: 85,
        resilienceLvl8: 85,
        resilienceLvl9: 85,
        comfortLvl1: 0.0423,
        comfortLvl2: 0.45,
        comfortLvl3: 2.79,
        comfortLvl4: 13.9999,
        comfortLvl5: 72,
        comfortLvl6: 320,
        comfortLvl7: 320,
        comfortLvl8: 320,
        comfortLvl9: 320,
        commonScroll: 0.2,
        uncommonScroll: 0.37,
        rareScroll: 3.45,
        epicScroll: 57,
        legendaryScroll: 599,
        createdAt: "2022-08-04T22:15:04.000Z",
        updatedAt: "2022-08-04T22:15:04.000Z",
        gstSolana: 0.053,
        gstBnb: 0.053,
        gstEthereum: 0.053,
        gmt: 0.92,
        Solana: 39.34,
        Bnb: 240.34,
        Ethereum: 240.34,
      };
      getDate();
      getPrice();
    }
  });

  function getDate() {
    var date = new Date(data.createdAt);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    date = `${day}/${month}/${year}`;
    setDate(date);
  }

  function getPriceFromContent(content, contentQuantity) {
    var totalRealmCrypto = 0;
    var totalGst = 0;
    var totalGmt = 0;
    var total = 0;
    if (content) {
      if (!content.includes("Scroll") & !content.includes("gst")) {
        totalRealmCrypto += data.prices[0][content] * contentQuantity;
      } else if (content.includes("Scroll")) {
        totalGmt += data.prices[0][content] * contentQuantity;
      } else if (content.includes("gst")) {
        totalGst += data.prices[0][content] * contentQuantity;
      }
      total =
        totalRealmCrypto * data.prices[0][data.realm] +
        totalGmt * data.prices[0]["gmt"] +
        totalGst * data.prices[0]["gst" + data.realm];
      return total;
    }
    return 0;
  }
  
  function getPrice() {
    // Here request to have price of marketplace at specific date
    const content1Price = getPriceFromContent(
      data.content1,
      data.content1Quantity
    );
    const content2Price = getPriceFromContent(
      data.content2,
      data.content2Quantity
    );
    const content3Price = getPriceFromContent(
      data.content3,
      data.content3Quantity
    );
    const content4Price = getPriceFromContent(
      data.content4,
      data.content4Quantity
    );
    const content5Price = getPriceFromContent(
      data.content5,
      data.content5Quantity
    );
    const content6Price = getPriceFromContent(
      data.content6,
      data.content6Quantity
    );
    var total =
      content1Price +
      content2Price +
      content3Price +
      content4Price +
      content5Price +
      content6Price;
    setPrice(total.toFixed(2));
  }

  function showContent() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {data.content1 != "" ? (
          <Image
            source={contentImage[contents.indexOf(data.content1)]}
            style={{ width: "20%", height: "60%", resizeMode: "contain" }}
          ></Image>
        ) : (
          <View
            style={{
              width: "20%",
              height: "80%",
              borderRadius: 10,
            }}
          ></View>
        )}
        {data.content2 != "" ? (
          <Image
            source={contentImage[contents.indexOf(data.content2)]}
            style={{ width: "20%", height: "60%", resizeMode: "contain" }}
          ></Image>
        ) : (
          <View
            style={{
              width: "20%",
              height: "80%",
              borderRadius: 10,
            }}
          ></View>
        )}

        {data.content3 != "" ? (
          <Image
            source={contentImage[contents.indexOf(data.content3)]}
            style={{ width: "20%", height: "60%", resizeMode: "contain" }}
          ></Image>
        ) : (
          <View
            style={{
              width: "20%",
              height: "80%",
              borderRadius: 10,
            }}
          ></View>
        )}

        {data.content4 != "" ? (
          <Image
            source={contentImage[contents.indexOf(data.content4)]}
            style={{ width: "20%", height: "60%", resizeMode: "contain" }}
          ></Image>
        ) : (
          <View
            style={{
              width: "20%",
              height: "80%",
              borderRadius: 10,
            }}
          ></View>
        )}
      </View>
    );
  }
  return (
    <View
      style={{
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 20,
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {
          width: 6,
          height: 6,
        },
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      {data.realm == "Solana" ? (
        <Image
          source={require("../assets/sol_realm.png")}
          style={{
            position: "absolute",
            right: "5%",
            top: "5%",
            height: "20%",
            width: "15%",
            resizeMode: "contain",
          }}
        ></Image>
      ) : data.realm == "Bnb" ? (
        <Image
          source={require("../assets/bsc_realm.png")}
          style={{
            position: "absolute",
            right: "5%",
            top: "5%",
            height: "20%",
            width: "15%",
            resizeMode: "contain",
          }}
        ></Image>
      ) : data.realm == "Ethereum" ? (
        <Image
          source={require("../assets/eth_realm.png")}
          style={{
            position: "absolute",
            right: "5%",
            top: "5%",
            height: "20%",
            width: "15%",
            resizeMode: "contain",
          }}
        ></Image>
      ) : (
        <View></View>
      )}

      <View
        style={{
          position: "absolute",
          height: "10%",
          width: "60%",
          top: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: color,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 10 }}>Lvl {data != 0 ? data.lvl : "-"}</Text>
      </View>
      <View
        style={{
          justifyContent: "space-around",
          width: "100%",
          height: "60%",
          alignItems: "center",
          position: "absolute",
          top: "15%",
        }}
      >
        <View
          style={{
            width: "80%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            height: "50%",
          }}
        >
          {data != 0 ? (
            <Image
              source={mbsImage[data.lvl - 1]}
              style={{ width: "50%", height: "100%", resizeMode: "contain" }}
            ></Image>
          ) : (
            <Icon
              style={{ width: "100%" }}
              size={70}
              type="antdesign"
              name="plus"
              color="black"
            ></Icon>
          )}
        </View>

        <View
          style={{
            height: "10%",
            width: "60%",
            borderRadius: 20,
            backgroundColor: color,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 10 }}>
            {data != 0 ? date : "../../...."}
          </Text>
        </View>
        <View
          style={{
            height: "12%",
            width: "60%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 10 }}>{data != 0 ? price : "--.--"} $</Text>
          <Text style={{ fontSize: 10 }}>
            {data != 0 ? data.dropRate : "..-.."} %
          </Text>
        </View>
        <View
          style={{
            height: "2%",
            width: "60%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#9DF8B6",
          }}
        ></View>
      </View>

      <View
        style={{
          position: "absolute",
          height: "20%",
          width: "100%",
          bottom: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: color,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {data != 0 ? showContent() : <View></View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRuns: {
    top: 0,
    backgroundColor: "#E0FEF3",
    width: "100%",
    height: "37%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  unofficial: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  supportText: {
    fontSize: 12,
    fontWeight: "700",
  },
  supportButton: {
    width: 120,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    backgroundColor: "#F69FA5",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  imageSupport: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  support: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: "2%",
  },
  return: {
    backgroundColor: "#9DF8B6",
    justifyContent: "center",
    alignContent: "center",
    width: 32,
    height: 32,
    borderRadius: 20,
    position: "absolute",
    top: "7%",
    left: "7%",
    borderWidth: 1,
    borderColor: "black",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  all: {
    backgroundColor: "#FFE922",
    justifyContent: "center",
    alignContent: "center",
    width: "25%",
    height: "5%",
    borderRadius: 100,
    position: "absolute",
    top: "15%",
    right: "10%",
    borderWidth: 1,
    borderColor: "black",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 4,
      height: 4,
    },
  },
  shoes: {
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    width: "85%",
    height: "63%",
    position: "absolute",
    top: "22%",
    alignContent: "center",
  },
  halo: {
    // box-shadow: 0px 0px 0px 10px red, 0px 0px 0px 20px green, 0px 0px 0px 30px yellow, 0px 0px 0px 40px pink;
    borderRadius: 50,
    width: 100,
    height: 100,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  weekTemporality: {
    width: 30,
    height: 30,
    backgroundColor: "#61F2FC",
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginHorizontal: 5,
  },
  monthTemporality: {
    width: 30,
    height: 30,
    backgroundColor: "#EB78E7",
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginHorizontal: 5,
  },
  yearTemporality: {
    width: 30,
    height: 30,
    backgroundColor: "#FFE922",
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginHorizontal: 5,
  },
  selectTemporality: {
    justifyContent: "flex-end",
    flexDirection: "row",
    position: "absolute",
    right: "1%",
    top: "22%",
  },
  selectorTextPrimary: {
    color: "white",
    fontSize: 36,
  },
  selectorTextSecondary: {
    color: "white",
    fontSize: 36,
  },
  selector: {
    position: "absolute",
    top: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "75%",
  },
  dateSelectorTextPrimary: {
    color: "white",
    fontSize: 20,
  },
  dateSelector: {
    position: "absolute",
    top: "27%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "75%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 2800,
    borderRightColor: "transparent",
    borderTopWidth: 700,
    borderTopColor: "#FF95FB",
    position: "relative",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  update: {
    position: "absolute",
    bottom: "12%",
    width: "45%",
    height: "8%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#9DF8B6",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    alignItems: "center",
    justifyContent: "center",
  },
  inventory: {
    position: "absolute",
    right: "22%",
    bottom: "22%",
    width: "20%",
    height: "4%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#FFE922",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    alignItems: "center",
    justifyContent: "center",
  },
  roi: {
    position: "absolute",
    left: "22%",
    bottom: "22%",
    width: "20%",
    height: "4%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#EB78E7",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 36,
    fontWeight: "700",
  },
});
