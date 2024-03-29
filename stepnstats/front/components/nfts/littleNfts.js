import Icon from "react-native-elements/dist/icons/Icon";
import { Text, View, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

export default function LittleNfts({ data }) {
  const imagePath = {
    walker: [
      require("../../assets/shoes/walker/shoe1.png"),
      require("../../assets/shoes/walker/shoe2.png"),
      require("../../assets/shoes/walker/shoe3.png"),
      require("../../assets/shoes/walker/shoe4.png"),
      require("../../assets/shoes/walker/shoe5.png"),
      require("../../assets/shoes/walker/shoe6.png"),
      require("../../assets/shoes/walker/shoe7.png"),
      require("../../assets/shoes/walker/shoe8.png"),
      require("../../assets/shoes/walker/shoe9.png"),
      require("../../assets/shoes/walker/shoe1.png"),
      require("../../assets/shoes/walker/shoe10.png"),
    ],
    jogger: [
      require("../../assets/shoes/jogger/shoe1.png"),
      require("../../assets/shoes/jogger/shoe2.png"),
      require("../../assets/shoes/jogger/shoe3.png"),
      require("../../assets/shoes/jogger/shoe4.png"),
      require("../../assets/shoes/jogger/shoe5.png"),
      require("../../assets/shoes/jogger/shoe6.png"),
      require("../../assets/shoes/jogger/shoe7.png"),
      require("../../assets/shoes/jogger/shoe8.png"),
      require("../../assets/shoes/jogger/shoe9.png"),
      require("../../assets/shoes/jogger/shoe1.png"),
      require("../../assets/shoes/jogger/shoe10.png"),
    ],
    runner: [
      require("../../assets/shoes/runner/shoe1.png"),
      require("../../assets/shoes/runner/shoe2.png"),
      require("../../assets/shoes/runner/shoe3.png"),
      require("../../assets/shoes/runner/shoe4.png"),
      require("../../assets/shoes/runner/shoe5.png"),
      require("../../assets/shoes/runner/shoe6.png"),
      require("../../assets/shoes/runner/shoe7.png"),
      require("../../assets/shoes/runner/shoe8.png"),
      require("../../assets/shoes/runner/shoe9.png"),
      require("../../assets/shoes/runner/shoe1.png"),
      require("../../assets/shoes/runner/shoe10.png"),
    ],
    trainer: [
      require("../../assets/shoes/trainer/shoe1.png"),
      require("../../assets/shoes/trainer/shoe2.png"),
      require("../../assets/shoes/trainer/shoe3.png"),
      require("../../assets/shoes/trainer/shoe4.png"),
      require("../../assets/shoes/trainer/shoe5.png"),
      require("../../assets/shoes/trainer/shoe6.png"),
      require("../../assets/shoes/trainer/shoe7.png"),
      require("../../assets/shoes/trainer/shoe8.png"),
      require("../../assets/shoes/trainer/shoe9.png"),
      require("../../assets/shoes/trainer/shoe1.png"),
      require("../../assets/shoes/trainer/shoe10.png"),
    ],
  };
  var color;
  const qualityColor = {
    Common: "#BABCBE",
    Uncommon: "#AED144",
    Rare: "#47ACED",
    Epic: "#A398EB",
    Legendary: "#F5A836",
  };
  {
    data !== 0 ? (color = qualityColor[data.quality]) : (color = "#BABCBE");
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
          source={require("../../assets/sol_realm.png")}
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
          source={require("../../assets/bsc_realm.png")}
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
          source={require("../../assets/eth_realm.png")}
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
        <Text style={{ fontSize: RFValue(10, 800) }}>
          {data != 0 ? data.type : "-"}
        </Text>
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
              source={
                imagePath[data.type.toLowerCase()][
                  Number(String(data.nftId).slice(-1))
                ]
              }
              style={{ width: "70%", resizeMode: "contain" }}
            ></Image>
          ) : (
            <Icon
              style={{ width: "100%" }}
              size={RFValue(70, 800)}
              type="antdesign"
              name="plus"
              color="black"
            ></Icon>
          )}
        </View>

        <View
          style={{
            height: "15%",
            width: "60%",
            borderRadius: 20,
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              fontSize: RFValue(10, 800),
              fontWeight: "700",
              width: "10%",
              height: "80%",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            #
          </Text>
          <Text style={{ fontSize: RFValue(10, 800), fontWeight: "700" }}>
            {data ? data.nftId : ""}
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
          {/* TODO: Price of the sneakers */}
          {/* <Text style={{ fontSize: RFValue(10, 800) }}>{data != 0 ? "?" : "-"}</Text> */}
          <Text style={{ fontSize: RFValue(10, 800) }}>
            Lv {data != 0 ? data.lvl : "-"}
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
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: "20%",
            justifyContent: "space-evenly",
          }}
        >
          <Image
            source={require("../../assets/stats/Efficiency.png")}
            style={{ resizeMode: "contain", height: "30%", width: "50%" }}
          ></Image>
          <Text style={{ fontSize: RFValue(10, 800) }}>
            {data.fileNameIncreased
              ? data.efficiencyIncreased.toFixed(0)
              : data.fileNameBase
              ? data.efficiencyBase.toFixed(0)
              : "-"}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: "20%",
            justifyContent: "space-evenly",
          }}
        >
          <Image
            source={require("../../assets/stats/Luck.png")}
            style={{ resizeMode: "contain", height: "30%", width: "50%" }}
          ></Image>
          <Text style={{ fontSize: RFValue(10, 800) }}>
            {data.fileNameIncreased
              ? data.luckIncreased.toFixed(0)
              : data.fileNameBase
              ? data.luckBase.toFixed(0)
              : "-"}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: "20%",
            justifyContent: "space-evenly",
          }}
        >
          <Image
            source={require("../../assets/stats/Comfort.png")}
            style={{ resizeMode: "contain", height: "30%", width: "50%" }}
          ></Image>
          <Text style={{ fontSize: RFValue(10, 800) }}>
            {data.fileNameIncreased
              ? data.comfortIncreased.toFixed(0)
              : data.fileNameBase
              ? data.comfortBase.toFixed(0)
              : "-"}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: "20%",
            justifyContent: "space-evenly",
          }}
        >
          <Image
            source={require("../../assets/stats/Resilience.png")}
            style={{ resizeMode: "contain", height: "30%", width: "50%" }}
          ></Image>
          <Text style={{ fontSize: RFValue(10, 800) }}>
            {data.fileNameIncreased
              ? data.resilienceIncreased.toFixed(0)
              : data.fileNameBase
              ? data.resilienceBase.toFixed(0)
              : "-"}
          </Text>
        </View>
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
    fontSize: RFValue(14, 800),
    fontWeight: "500",
  },
  supportText: {
    fontSize: RFValue(12, 800),
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
    fontSize: RFValue(36, 800),
  },
  selectorTextSecondary: {
    color: "white",
    fontSize: RFValue(36, 800),
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
    fontSize: RFValue(20, 800),
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
    fontSize: RFValue(36, 800),
    fontWeight: "700",
  },
});
