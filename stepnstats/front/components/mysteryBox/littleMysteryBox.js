import Icon from "react-native-elements/dist/icons/Icon";
import { Text, View, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

export default function LittleMysteryBox({ data }) {
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
    require("../../assets/mb/lvl1.png"),
    require("../../assets/mb/lvl2.png"),
    require("../../assets/mb/lvl3.png"),
    require("../../assets/mb/lvl4.png"),
    require("../../assets/mb/lvl5.png"),
    require("../../assets/mb/lvl6.png"),
    require("../../assets/mb/lvl7.png"),
    require("../../assets/mb/lvl8.png"),
    require("../../assets/mb/lvl9.png"),
    require("../../assets/mb/lvl10.png"),
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
    require("../../assets/gem/efficiency/lvl1.png"),
    require("../../assets/gem/efficiency/lvl2.png"),
    require("../../assets/gem/efficiency/lvl3.png"),
    require("../../assets/gem/efficiency/lvl4.png"),
    require("../../assets/gem/efficiency/lvl5.png"),
    require("../../assets/gem/efficiency/lvl6.png"),
    require("../../assets/gem/efficiency/lvl7.png"),
    require("../../assets/gem/efficiency/lvl8.png"),
    require("../../assets/gem/efficiency/lvl9.png"),
    require("../../assets/gem/luck/lvl1.png"),
    require("../../assets/gem/luck/lvl2.png"),
    require("../../assets/gem/luck/lvl3.png"),
    require("../../assets/gem/luck/lvl4.png"),
    require("../../assets/gem/luck/lvl5.png"),
    require("../../assets/gem/luck/lvl6.png"),
    require("../../assets/gem/luck/lvl7.png"),
    require("../../assets/gem/luck/lvl8.png"),
    require("../../assets/gem/luck/lvl9.png"),
    require("../../assets/gem/comfort/lvl1.png"),
    require("../../assets/gem/comfort/lvl2.png"),
    require("../../assets/gem/comfort/lvl3.png"),
    require("../../assets/gem/comfort/lvl4.png"),
    require("../../assets/gem/comfort/lvl5.png"),
    require("../../assets/gem/comfort/lvl6.png"),
    require("../../assets/gem/comfort/lvl7.png"),
    require("../../assets/gem/comfort/lvl8.png"),
    require("../../assets/gem/comfort/lvl9.png"),
    require("../../assets/gem/resilience/lvl1.png"),
    require("../../assets/gem/resilience/lvl2.png"),
    require("../../assets/gem/resilience/lvl3.png"),
    require("../../assets/gem/resilience/lvl4.png"),
    require("../../assets/gem/resilience/lvl5.png"),
    require("../../assets/gem/resilience/lvl6.png"),
    require("../../assets/gem/resilience/lvl7.png"),
    require("../../assets/gem/resilience/lvl8.png"),
    require("../../assets/gem/resilience/lvl9.png"),
    require("../../assets/scroll/common.png"),
    require("../../assets/scroll/uncommon.png"),
    require("../../assets/scroll/rare.png"),
    require("../../assets/scroll/epic.png"),
    require("../../assets/scroll/legendary.png"),
    require("../../assets/gst.png"),
  ];

  useEffect(() => {
    if (data != 0) {
      getDate();
    }
  });

  function getDate() {
    var date = new Date(data.createdAt);
    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();
    console.log(month)
    if (month < 10) {
      month = "0" + Number(month);
    }
    if (day < 10) {
      day = "0" + Number(day);
    }
    var date = `${day}/${month}/${year}`;
    setDate(date);
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
        <Text style={{ fontSize: RFValue(10, 800) }}>Lvl {data != 0 ? data.lvl : "-"}</Text>
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
              size={RFValue(70, 800)}
              type="antdesign"
              name="plus"
              color="black"
            ></Icon>
          )}
        </View>

        <View
          style={{
            height: "13%",
            width: "60%",
            borderRadius: 20,
            backgroundColor: color,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: RFValue(10, 800) }}>
            {data != 0 ? date : "../../../...."}
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
          <Text style={{ fontSize: RFValue(10, 800) }}>{data != 0 ? data.mbPrice : "--.--"} $</Text>
          <Text style={{ fontSize: RFValue(10, 800) }}>
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
