import Icon from "react-native-elements/dist/icons/Icon";
import { Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";

export default function LittleMisteryBox({ data }) {
  const [price, setPrice] = useState("--.--");
  const [date, setDate] = useState("--/--/----");
  var mbPrices = {
    gst: "0.08",
    solana: "42.23",
    gmt: "1.12",
    walkerCommon: "0.66",
    joggerCommon: "0.699",
    runnerCommon: "0.669",
    trainerCommon: "1.5",
    walkerUncommon: "3.149",
    joggerUncommon: "3.24",
    runnerUncommon: "2.31",
    trainerUncommon: "7.48",
    walkerRare: "17.5",
    joggerRare: "13.82",
    runnerRare: "11.99",
    trainerRare: "35",
    walkerEpic: "80",
    joggerEpic: "80",
    runnerEpic: "79.9",
    trainerEpic: "750",
    efficiencyLvl1: "0.0208",
    efficiencyLvl2: "0.32",
    efficiencyLvl3: "2.55",
    efficiencyLvl4: "11.99999",
    efficiencyLvl5: "69",
    efficiencyLvl6: "485",
    efficiencyLvl7: "485",
    efficiencyLvl8: "485",
    efficiencyLvl9: "485",
    luckLvl1: "0.023499",
    luckLvl2: "0.4",
    luckLvl3: "2.897",
    luckLvl4: "12.98",
    luckLvl5: "57.8",
    luckLvl6: "220",
    luckLvl7: "220",
    luckLvl8: "220",
    luckLvl9: "220",
    resilienceLvl1: "0.01",
    resilienceLvl2: "0.101",
    resilienceLvl3: "0.9399",
    resilienceLvl4: "4.5",
    resilienceLvl5: "27.89",
    resilienceLvl6: "599",
    resilienceLvl7: "599",
    resilienceLvl8: "599",
    resilienceLvl9: "599",
    comfortLvl1: "0.0338",
    comfortLvl2: "0.339999",
    comfortLvl3: "2.398",
    comfortLvl4: "10.91",
    comfortLvl5: "79",
    comfortLvl6: "0",
    comfortLvl7: "0",
    comfortLvl8: "0",
    comfortLvl9: "0",
    id: 3,
    createdAt: "2022-07-23T19:49:55.599Z",
    updatedAt: "2022-07-23T19:49:55.599Z",
  };
  var color
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
  {data != 0 ? color = mbsColor[data.lvl -1]: color = "#B2B2B2"}

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
    "scrollCommon",
    "scrollUncommon",
    "scrollRare",
    "scrollEpic",
    "scrollLegendary",
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

  function getPrice() {
    // Here request to have price of marketplace at specific date
    var total = 0;
    const content1 = data.content1;
    const content1Quantity = data.content1Quantity;
    const content2 = data.content2;
    const content2Quantity = data.content2Quantity;
    const content3 = data.content3;
    const content3Quantity = data.content3Quantity;
    const content4 = data.content4;
    const content4Quantity = data.content4Quantity;
    const content5 = data.content5;
    const content5Quantity = data.content5Quantity;
    const content6 = data.content6;
    const content6Quantity = data.content6Quantity;
    if (mbPrices[content1]) {
      total += mbPrices[content1] * content1Quantity;
    }
    if (mbPrices[content2]) {
      total += mbPrices[content2] * content2Quantity;
    }
    if (mbPrices[content3]) {
      total += mbPrices[content3] * content3Quantity;
    }
    if (mbPrices[content4]) {
      total += mbPrices[content4] * content4Quantity;
    }
    if (mbPrices[content5]) {
      total += mbPrices[content5] * content5Quantity;
    }
    if (mbPrices[content6]) {
      total += mbPrices[content6] * content6Quantity;
    }
    setPrice((total * mbPrices.solana).toFixed(2));
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
      <View
        style={{
          position: "absolute",
          height: "10%",
          width: "60%",
          top: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor:  color,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 10 }}>Lvl {data != 0 ? data.lvl: "-"}</Text>
      </View>
      <View style={{ justifyContent: "space-around", width: "100%", height: "60%", alignItems: "center", position:"absolute", top: "15%"}}>
      <View style={{ width: "80%", alignContent: "center", alignItems: "center", justifyContent: "center", height: "50%" }}>
      {data != 0 ? (
            <Image
              source={mbsImage[data.lvl - 1]}
              style={{ width: "50%", resizeMode: "contain" }}
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
          backgroundColor:  color,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 10 }}>{data != 0 ? date : "../../...."}</Text>
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
          backgroundColor:  color,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {data != 0 ? showContent() : <View></View>}
      </View>
    </View>
  );
}