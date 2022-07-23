import Icon from "react-native-elements/dist/icons/Icon";
import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function DetailMisteryBox({ styles, data }) {
  const [price, setPrice] = useState("--.--");
  const [date, setDate] = useState("--/--/----");
  const [purcentage, setPurcentage] = useState("--.--");
  var mbPrices = {
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
  useEffect(() => {
    // Update the document title using the browser API
    getDate();
    getPrice();
  });

  function getDate() {
    var date = new Date(data.createdAt);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    date = `${day}/${month}/${year}`;
    setDate(date);
  }
  // id: 1,
  // userId: 2,
  // lvl: 6,
  // fileName: "myScreen.png",
  // content1: "efficiencyLvl1",
  // content1Quantity: 6,
  // content2: "efficiencyLvl2",
  // content2Quantity: 2,
  // content3: "efficiencyLvl3",
  // content3Quantity: 1,
  // content4: "scrollLvl1",
  // content4Quantity: 2,
  // content5: "",
  // content5Quantity: "",
  // content6: "",
  // content6Quantity: "",
  // createdAt: "2000-12-17T23:20:36.000Z",
  // updatedAt: "2000-12-17T23:20:36.000Z",
  function getPrice() {
    // Here request to have price of marketplace at specific date
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

    console.log(content1)
  }

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          backgroundColor: "#BABCBE",
          width: "15%",
          height: "4%",
          borderRadius: 5,
          marginLeft: "4%",
          alignItems: "center",
          justifyContent: "center",
          top: "4%",
        }}
      >
        <Text style={{ color: "white", fontSize: 12 }}>
          Lvl {data !== "" ? data.lvl : "-"}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: "30%",
          justifyContent: "space-around",
          top: "20%",
          alignItems: "center",
        }}
      >
        <Icon type="antdesign" name="left" size={50} color="black"></Icon>
        <Icon type="antdesign" name="plus" size={50} color="black"></Icon>
        <Icon type="antdesign" name="right" size={50} color="black"></Icon>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          top: "30%",
        }}
      >
        <View
          style={{
            backgroundColor: "#BABCBE",
            width: "15%",
            borderRadius: 50,
            marginLeft: "4%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>
            {data !== "" ? price : "..-.."} $
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#BABCBE",
            width: "40%",
            borderRadius: 50,
            marginLeft: "4%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>
            {data !== "" ? date : "../../...."}{" "}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#BABCBE",
            width: "15%",
            borderRadius: 50,
            marginLeft: "4%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>
            {data !== "" ? purcentage : "..-.."} %
          </Text>
        </View>
      </View>
    </View>
  );
}
