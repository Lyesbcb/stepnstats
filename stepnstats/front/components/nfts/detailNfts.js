import {
  Text,
  View,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import OptimizeModal from "./optimizeModal";
import { RFValue } from "react-native-responsive-fontsize";
import { updateNft } from "../../services/nfts/index";

export default function DetailNfts({
  data,
  nextNft,
  previousNft,
  setmodalOneNfts,
  deleteOneNft,
  myFunction,
}) {
  const [maxStat, setMaxStat] = useState();
  const [widthEfficiency, setWidthEfficiency] = useState("0%");
  const [widthLuck, setWidthLuck] = useState("0%");
  const [widthComfort, setWidthComfort] = useState("0%");
  const [widthResilience, setwidthResilience] = useState("0%");
  const [stats, setStats] = useState(data.fileNameBase ? "base" : "increased");
  // Optimize Modal
  const [optimizeModalVisible, setOptimizeModalVisible] = useState(false);
  const [dailyIncomeModalVisible, setDailyIncomeModalVisible] = useState(false);
  const [optimized, setOptimized] = useState({});
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
  const contents = {
    efficiencyLvl1: require("../../assets/gem/efficiency/lvl1.png"),
    efficiencyLvl2: require("../../assets/gem/efficiency/lvl2.png"),
    efficiencyLvl3: require("../../assets/gem/efficiency/lvl3.png"),
    efficiencyLvl4: require("../../assets/gem/efficiency/lvl4.png"),
    efficiencyLvl5: require("../../assets/gem/efficiency/lvl5.png"),
    efficiencyLvl6: require("../../assets/gem/efficiency/lvl6.png"),
    efficiencyLvl7: require("../../assets/gem/efficiency/lvl7.png"),
    efficiencyLvl8: require("../../assets/gem/efficiency/lvl8.png"),
    efficiencyLvl9: require("../../assets/gem/efficiency/lvl9.png"),
    luckLvl1: require("../../assets/gem/luck/lvl1.png"),
    luckLvl2: require("../../assets/gem/luck/lvl2.png"),
    luckLvl3: require("../../assets/gem/luck/lvl3.png"),
    luckLvl4: require("../../assets/gem/luck/lvl4.png"),
    luckLvl5: require("../../assets/gem/luck/lvl5.png"),
    luckLvl6: require("../../assets/gem/luck/lvl6.png"),
    luckLvl7: require("../../assets/gem/luck/lvl7.png"),
    luckLvl8: require("../../assets/gem/luck/lvl8.png"),
    luckLvl9: require("../../assets/gem/luck/lvl9.png"),
    comfortLvl1: require("../../assets/gem/comfort/lvl1.png"),
    comfortLvl2: require("../../assets/gem/comfort/lvl2.png"),
    comfortLvl3: require("../../assets/gem/comfort/lvl3.png"),
    comfortLvl4: require("../../assets/gem/comfort/lvl4.png"),
    comfortLvl5: require("../../assets/gem/comfort/lvl5.png"),
    comfortLvl6: require("../../assets/gem/comfort/lvl6.png"),
    comfortLvl7: require("../../assets/gem/comfort/lvl7.png"),
    comfortLvl8: require("../../assets/gem/comfort/lvl8.png"),
    comfortLvl9: require("../../assets/gem/comfort/lvl9.png"),
    resilienceLvl1: require("../../assets/gem/resilience/lvl1.png"),
    resilienceLvl2: require("../../assets/gem/resilience/lvl2.png"),
    resilienceLvl3: require("../../assets/gem/resilience/lvl3.png"),
    resilienceLvl4: require("../../assets/gem/resilience/lvl4.png"),
    resilienceLvl5: require("../../assets/gem/resilience/lvl5.png"),
    resilienceLvl6: require("../../assets/gem/resilience/lvl6.png"),
    resilienceLvl7: require("../../assets/gem/resilience/lvl7.png"),
    resilienceLvl8: require("../../assets/gem/resilience/lvl8.png"),
    resilienceLvl9: require("../../assets/gem/resilience/lvl9.png"),
  };
  useEffect(() => {
    defineMaxStat();
  });
  var color;

  const qualityColor = {
    Common: "#BABCBE",
    Uncommon: "#AED144",
    Rare: "#47ACED",
    Epic: "#A398EB",
    Legendary: "#F5A836",
  };

  const sockets = {
    efficiency: require("../../assets/socket/efficiency/efficiency.png"),
    efficiencyLvl0: require("../../assets/socket/efficiency/efficiency_0.png"),
    efficiencyLvl1: require("../../assets/socket/efficiency/efficiency_1.png"),
    efficiencyLvl2: require("../../assets/socket/efficiency/efficiency_2.png"),
    efficiencyLvl3: require("../../assets/socket/efficiency/efficiency_3.png"),
    efficiencyLvl4: require("../../assets/socket/efficiency/efficiency_4.png"),
    efficiencyLvl5: require("../../assets/socket/efficiency/efficiency_5.png"),
    luck: require("../../assets/socket/luck/luck.png"),
    luckLvl0: require("../../assets/socket/luck/luck_0.png"),
    luckLvl1: require("../../assets/socket/luck/luck_1.png"),
    luckLvl2: require("../../assets/socket/luck/luck_2.png"),
    luckLvl3: require("../../assets/socket/luck/luck_3.png"),
    luckLvl4: require("../../assets/socket/luck/luck_4.png"),
    luckLvl5: require("../../assets/socket/luck/luck_5.png"),
    comfort: require("../../assets/socket/comfort/comfortability.png"),
    comfortLvl0: require("../../assets/socket/comfort/comfortability_0.png"),
    comfortLvl1: require("../../assets/socket/comfort/comfortability_1.png"),
    comfortLvl2: require("../../assets/socket/comfort/comfortability_2.png"),
    comfortLvl3: require("../../assets/socket/comfort/comfortability_3.png"),
    comfortLvl4: require("../../assets/socket/comfort/comfortability_4.png"),
    comfortLvl5: require("../../assets/socket/comfort/comfortability_5.png"),
    resilience: require("../../assets/socket/resilience/resilience.png"),
    resilienceLvl0: require("../../assets/socket/resilience/resilience_0.png"),
    resilienceLvl1: require("../../assets/socket/resilience/resilience_1.png"),
    resilienceLvl2: require("../../assets/socket/resilience/resilience_2.png"),
    resilienceLvl3: require("../../assets/socket/resilience/resilience_3.png"),
    resilienceLvl4: require("../../assets/socket/resilience/resilience_4.png"),
    resilienceLvl5: require("../../assets/socket/resilience/resilience_5.png"),
  };
  {
    data != 0 ? (color = qualityColor[data.quality]) : (color = "#BABCBE");
  }
  async function remake() {
    try {
      await updateNft(
        {
          lvlOptimized: null,
          efficiencyOptimized: null,
          luckOptimized: null,
          comfortOptimized: null,
          resilienceOptimized: null,
          gem1Optimized: null,
          gem2Optimized: null,
          gem3Optimized: null,
          gem4Optimized: null,
          id: data.id,
        },
        data.id
      );
      await defineMaxStat();
      setStats("base");
      setOptimizeModalVisible(true);
    } catch (error) {
      Alert.alert(error);
    }
  }
  function defineMaxStat() {
    if (stats === "base" && data.efficiencyBase === null) {
      setStats("increased");
    } else if (stats === "increased" && data.efficiencyIncreased === null) {
      setStats("base");
    }
    if (stats === "base") {
      setMaxStat(
        Math.max(
          data.efficiencyBase,
          data.luckBase,
          data.comfortBase,
          data.resilienceBase
        )
      );
      setWidthEfficiency(
        maxStat == data.efficiencyBase
          ? String(((data.efficiencyBase / maxStat) * 100).toFixed(0)) + "%"
          : String(((data.efficiencyBase / maxStat) * 100).toFixed(0)) + "%"
      );
      setWidthLuck(
        maxStat == data.luckBase
          ? String(((data.luckBase / maxStat) * 100).toFixed(0)) + "%"
          : String(((data.luckBase / maxStat) * 100).toFixed(0)) + "%"
      );
      setWidthComfort(
        maxStat == data.comfortBase
          ? String(((data.comfortBase / maxStat) * 100).toFixed(0)) + "%"
          : String(((data.comfortBase / maxStat) * 100).toFixed(0)) + "%"
      );
      setwidthResilience(
        maxStat == data.resilienceBase
          ? String(((data.resilienceBase / maxStat) * 100).toFixed(0)) + "%"
          : String(((data.resilienceBase / maxStat) * 100).toFixed(0)) + "%"
      );
    }
    if (stats === "increased") {
      setMaxStat(
        Math.max(
          data.efficiencyIncreased,
          data.luckIncreased,
          data.comfortIncreased,
          data.resilienceIncreased
        )
      );
      setWidthEfficiency(
        maxStat == data.efficiencyIncreased
          ? String(((data.efficiencyIncreased / maxStat) * 100).toFixed(0)) +
              "%"
          : String(((data.efficiencyIncreased / maxStat) * 100).toFixed(0)) +
              "%"
      );
      setWidthLuck(
        maxStat == data.luckIncreased
          ? String(((data.luckIncreased / maxStat) * 100).toFixed(0)) + "%"
          : String(((data.luckIncreased / maxStat) * 100).toFixed(0)) + "%"
      );
      // console.log(maxStat);
      // console.log(data.luckIncreased / maxStat);
      setWidthComfort(
        maxStat == data.comfortIncreased
          ? String(((data.comfortIncreased / maxStat) * 100).toFixed(0)) + "%"
          : String(((data.comfortIncreased / maxStat) * 100).toFixed(0)) + "%"
      );
      setwidthResilience(
        maxStat == data.resilienceIncreased
          ? String(((data.resilienceIncreased / maxStat) * 100).toFixed(0)) +
              "%"
          : String(((data.resilienceIncreased / maxStat) * 100).toFixed(0)) +
              "%"
      );
    }
    if (stats === "optimized") {
      setMaxStat(
        Math.max(
          data.efficiencyOptimized,
          data.luckOptimized,
          data.comfortOptimized,
          data.resilienceOptimized
        )
      );
      setWidthEfficiency(
        maxStat == data.efficiencyOptimized
          ? String(((data.efficiencyOptimized / maxStat) * 100).toFixed(0)) +
              "%"
          : String(((data.efficiencyOptimized / maxStat) * 100).toFixed(0)) +
              "%"
      );
      setWidthLuck(
        maxStat == data.luckOptimized
          ? String(((data.luckOptimized / maxStat) * 100).toFixed(0)) + "%"
          : String(((data.luckOptimized / maxStat) * 100).toFixed(0)) + "%"
      );
      // console.log(maxStat);
      // console.log(data.luckOptimized / maxStat);
      setWidthComfort(
        maxStat == data.comfortOptimized
          ? String(((data.comfortOptimized / maxStat) * 100).toFixed(0)) + "%"
          : String(((data.comfortOptimized / maxStat) * 100).toFixed(0)) + "%"
      );
      setwidthResilience(
        maxStat == data.resilienceOptimized
          ? String(((data.resilienceOptimized / maxStat) * 100).toFixed(0)) +
              "%"
          : String(((data.resilienceOptimized / maxStat) * 100).toFixed(0)) +
              "%"
      );
    }
  }

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <OptimizeModal
        optimized={optimized}
        setOptimized={setOptimized}
        setModalVisible={setOptimizeModalVisible}
        modalVisible={optimizeModalVisible}
        minLvl={data.lvl}
        data={data}
        myFunction={myFunction}
        setStats={setStats}
      ></OptimizeModal>
      <DailyIncomeModal
        setModalVisible={setDailyIncomeModalVisible}
        modalVisible={dailyIncomeModalVisible}
        data={data}
      ></DailyIncomeModal>
      <View
        style={{
          backgroundColor: color,
          width: "30%",
          height: "4%",
          borderRadius: 5,
          marginLeft: "4%",
          alignItems: "center",
          justifyContent: "center",
          top: "4%",
          borderWidth: 2,
        }}
      >
        <Text style={{ fontSize: RFValue(12, 800), fontWeight: "700" }}>
          {data.name ? data.name : "-"}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: "4%",
          right: "2%",
          justifyContent: "space-evenly",
          flexDirection: "row",
          width: "45%",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#9DF8B6",
            justifyContent: "center",
            alignContent: "center",
            width: 32,
            height: 32,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "black",
            shadowOpacity: 1,
            shadowRadius: 1,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          onPress={() => setDailyIncomeModalVisible(true)}
        >
          <Text style={{ textAlign: "center", textAlignVertical: "center", fontSize: RFValue(15,800), fontWeight: "700"}}>
            D
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#9DF8B6",
            justifyContent: "center",
            alignContent: "center",
            width: 32,
            height: 32,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "black",
            shadowOpacity: 1,
            shadowRadius: 1,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          onPress={() => Alert.alert("Soon available")}
        >
          <Icon
            style={{ width: "100%" }}
            size={RFValue(20, 800)}
            type="material-community"
            name="pencil-outline"
            color="black"
          ></Icon>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#9DF8B6",
            justifyContent: "center",
            alignContent: "center",
            width: 32,
            height: 32,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "black",
            shadowOpacity: 1,
            shadowRadius: 1,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          onPress={() => deleteOneNft(data.id)}
        >
          <Icon
            style={{ width: "100%" }}
            size={RFValue(20, 800)}
            type="material-community"
            name="trash-can-outline"
            color="black"
          ></Icon>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#9DF8B6",
            justifyContent: "center",
            alignContent: "center",
            width: 32,
            height: 32,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "black",
            shadowOpacity: 1,
            shadowRadius: 1,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }}
          onPress={() => setmodalOneNfts(false)}
        >
          <Icon
            style={{ width: "100%" }}
            size={RFValue(20, 800)}
            type="material-community"
            name="close"
            color="black"
          ></Icon>
        </Pressable>
      </View>
      <View
        style={{
          width: "100%",
          height: "90%",
          justifyContent: "space-evenly",
          alignItems: "center",
          top: "5%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: "10%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "20%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={
                data.socket1.includes(0) & (data.lvl >= 5)
                  ? sockets[data.socket1.slice(0, -1) + "1"]
                  : sockets[data.socket1]
              }
            ></Image>
            {stats === "optimized" && data.gem1Optimized ? (
              <Image
                style={{
                  width: "40%",
                  height: "100%",
                  resizeMode: "contain",
                  position: "absolute",
                }}
                source={contents[data.gem1Optimized]}
              ></Image>
            ) : stats === "increased" && data.gem1Inscreased ? (
              <Image
                style={{
                  width: "40%",
                  height: "100%",
                  resizeMode: "contain",
                  position: "absolute",
                }}
                source={contents[data.gem1Inscreased]}
              ></Image>
            ) : (
              <View></View>
            )}
          </View>
          <View
            style={{
              width: "20%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={
                data.socket2.includes(0) & (data.lvl >= 5)
                  ? sockets[data.socket2.slice(0, -1) + "1"]
                  : sockets[data.socket2]
              }
            ></Image>
            {stats === "optimized" && data.gem2Optimized ? (
              <Image
                style={{
                  width: "40%",
                  height: "100%",
                  resizeMode: "contain",
                  position: "absolute",
                }}
                source={contents[data.gem2Optimized]}
              ></Image>
            ) : stats === "increased" && data.gem2Inscreased ? (
              <Image
                style={{
                  width: "40%",
                  height: "100%",
                  resizeMode: "contain",
                  position: "absolute",
                }}
                source={contents[data.gem2Inscreased]}
              ></Image>
            ) : (
              <View></View>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: "20%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              previousNft();
              defineMaxStat();
            }}
          >
            <Icon
              type="antdesign"
              name="left"
              size={RFValue(60, 800)}
              color="black"
            ></Icon>
          </Pressable>

          <View
            style={{
              width: "30%",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {data != undefined ? (
              <Image
                source={
                  imagePath[data.type.toLowerCase()][
                    Number(String(data.nftId).slice(-1))
                  ]
                }
                style={{ height: "100%", width: "130%", resizeMode: "contain" }}
              ></Image>
            ) : (
              <Icon
                style={{ width: "100%" }}
                size={100}
                type="antdesign"
                name="plus"
                color="black"
              ></Icon>
            )}
          </View>
          <Pressable
            onPress={() => {
              nextNft();
              defineMaxStat();
            }}
          >
            <Icon
              type="antdesign"
              name="right"
              size={RFValue(60, 800)}
              color="black"
            ></Icon>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: "10%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "20%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={
                data.socket3.includes(0) & (data.lvl >= 5)
                  ? sockets[data.socket3.slice(0, -1) + "1"]
                  : sockets[data.socket3]
              }
            ></Image>
            {stats === "optimized" && data.gem3Optimized ? (
              <Image
                style={{
                  width: "40%",
                  height: "100%",
                  resizeMode: "contain",
                  position: "absolute",
                }}
                source={contents[data.gem3Optimized]}
              ></Image>
            ) : stats === "increased" && data.gem3Inscreased ? (
              <Image
                style={{
                  width: "40%",
                  height: "100%",
                  resizeMode: "contain",
                  position: "absolute",
                }}
                source={contents[data.gem3Inscreased]}
              ></Image>
            ) : (
              <View></View>
            )}
          </View>
          <View
            style={{
              width: "20%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={
                data.socket4.includes(0) & (data.lvl >= 5)
                  ? sockets[data.socket4.slice(0, -1) + "1"]
                  : sockets[data.socket4]
              }
            ></Image>
            {stats === "optimized" && data.gem3Optimized ? (
              <Image
                style={{
                  width: "40%",
                  height: "100%",
                  resizeMode: "contain",
                  position: "absolute",
                }}
                source={contents[data.gem3Optimized]}
              ></Image>
            ) : stats === "increased" && data.gem3Inscreased ? (
              <Image
                style={{
                  width: "40%",
                  height: "100%",
                  resizeMode: "contain",
                  position: "absolute",
                }}
                source={contents[data.gem3Inscreased]}
              ></Image>
            ) : (
              <View></View>
            )}
          </View>
        </View>
        <View
          style={{
            height: "5%",
            width: "30%",
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
              fontSize: RFValue(12, 800),
              fontWeight: "700",
            }}
          >
            #
          </Text>
          <Text style={{ fontSize: RFValue(12, 800), fontWeight: "700" }}>
            {data ? data.nftId : ""}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: "4%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: color,
              width: "25%",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
            }}
          >
            <Text style={{ fontSize: RFValue(12, 800), fontWeight: "700" }}>
              {data != undefined ? data.quality : "-"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: color,
              width: "40%",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
            }}
          >
            <Text style={{ fontSize: RFValue(12, 800), fontWeight: "700" }}>
              {data != undefined ? data.type : "-"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: color,
              width: "25%",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
            }}
          >
            <Text style={{ fontSize: RFValue(12, 800), fontWeight: "700" }}>
              {/* TODO get price */}$
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: color,
            width: "80%",
            borderRadius: 50,
            borderWidth: 2,
            height: "4%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              marginLeft: "4%",
              fontSize: RFValue(12, 800),
              fontWeight: "700",
            }}
          >
            Level {data ? data.lvl : ""}
          </Text>
        </View>
        <View
          style={{
            width: "80%",
            marginTop: "1%",
            height: "6%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {/* Base stats button */}
          <Pressable
            style={
              stats === "base"
                ? styles.baseStatsInactive
                : styles.baseStatsActive
            }
            onPress={() => {
              if (stats !== "base") {
                if (data.fileNameBase) {
                  setStats("base");
                } else {
                  Alert.alert(
                    "To show the base stats you need to add base stats screen."
                  );
                }
              }
              defineMaxStat();
            }}
          >
            <Text style={{ fontSize: RFValue(12, 800), fontWeight: "700" }}>
              Base
            </Text>
          </Pressable>
          {/* Increased stats button */}
          <Pressable
            style={
              stats === "increased"
                ? styles.baseStatsInactive
                : styles.baseStatsActive
            }
            onPress={() => {
              if (stats !== "increased") {
                if (data.fileNameIncreased) {
                  setStats("increased");
                } else {
                  Alert.alert(
                    "To show the increased stats you need to add increased stats screen."
                  );
                }
              }
              defineMaxStat();
            }}
          >
            <Text style={{ fontSize: RFValue(12, 800), fontWeight: "700" }}>
              Increased
            </Text>
          </Pressable>
          {/* Optimized stats button */}
          <View
            style={
              data.efficiencyOptimized
                ? stats === "optimized"
                  ? styles.optimizedActive
                  : styles.optimized
                : styles.toOptimized
            }
          >
            <Pressable
              onPress={() => {
                if (data.fileNameBase) {
                  if (data.efficiencyOptimized) {
                    if (stats !== "optimized") {
                      setStats("optimized");
                      defineMaxStat();
                    }
                  } else {
                    setOptimizeModalVisible(true);
                  }
                } else {
                  Alert.alert(
                    "To optimize a sneaker you need to upload the base stats."
                  );
                }
              }}
            >
              <Text style={{ fontSize: RFValue(12, 800), fontWeight: "700" }}>
                Optimize
              </Text>
            </Pressable>
            {data.efficiencyOptimized ? (
              <View
                style={{
                  height: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "25%",
                }}
              >
                <View
                  style={{ height: "80%", width: 1, backgroundColor: "black" }}
                >
                  <Text></Text>
                </View>
                <Pressable onPress={async () => await remake()}>
                  <Icon
                    style={{ width: "100%" }}
                    size={RFValue(20, 800)}
                    type="material-community"
                    name="reload"
                    color="black"
                  ></Icon>
                </Pressable>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
        <View
          style={{
            width: "80%",
            height: "6%",
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              position: "absolute",
              left: 0,
              fontSize: RFValue(16, 800),
              fontWeight: "700",
            }}
          >
            Attributes
          </Text>
        </View>
        <View
          style={{
            height: "30%",
            width: "80%",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              height: "20%",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "30%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={require("../../assets/stats/Efficiency.png")}
                style={{
                  resizeMode: "contain",
                  height: "60%",
                  width: "20%",
                }}
              ></Image>
              <Text
                style={{
                  marginLeft: "4%",
                  fontSize: RFValue(12, 800),
                  fontWeight: "700",
                }}
              >
                Efficiency
              </Text>
            </View>
            {/* TODO systeme de remplissage par rapport au max et au stats de bases */}
            <View
              style={{
                width: "60%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: widthEfficiency,
                  backgroundColor: "#9DF8B6",
                  height: "25%",
                  borderWidth: 1,
                  marginRight: "4%",
                }}
              ></View>
            </View>
            <Text style={{ width: "20%", marginLeft: "2%" }}>
              {stats === "base"
                ? data.efficiencyBase
                : stats === "increased"
                ? data.efficiencyIncreased
                : stats === "optimized"
                ? data.efficiencyOptimized + data.efficiencyBase
                : 0}
            </Text>
          </View>
          <View
            style={{
              height: "20%",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "30%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={require("../../assets/stats/Luck.png")}
                style={{
                  resizeMode: "contain",
                  height: "60%",
                  width: "20%",
                }}
              ></Image>
              <Text
                style={{
                  marginLeft: "4%",
                  fontSize: RFValue(12, 800),
                  fontWeight: "700",
                }}
              >
                Luck
              </Text>
            </View>
            {/* TODO systeme de remplissage par rapport au max et au stats de bases */}
            <View
              style={{
                width: "60%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: widthLuck,
                  backgroundColor: "#9DF8B6",
                  height: "25%",
                  borderWidth: 1,
                  marginRight: "4%",
                }}
              ></View>
            </View>
            <Text style={{ width: "20%", marginLeft: "2%" }}>
              {stats === "base"
                ? data.luckBase
                : stats === "increased"
                ? data.luckIncreased
                : stats === "optimized"
                ? data.luckOptimized + Number(data.luckBase.toFixed(0))
                : 0}
            </Text>
          </View>
          <View
            style={{
              height: "20%",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "30%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={require("../../assets/stats/Comfort.png")}
                style={{
                  resizeMode: "contain",
                  height: "60%",
                  width: "20%",
                }}
              ></Image>
              <Text
                style={{
                  marginLeft: "4%",
                  fontSize: RFValue(12, 800),
                  fontWeight: "700",
                }}
              >
                Comfort
              </Text>
            </View>
            {/* TODO systeme de remplissage par rapport au max et au stats de bases */}
            <View
              style={{
                width: "60%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: widthComfort,
                  backgroundColor: "#9DF8B6",
                  height: "25%",
                  borderWidth: 1,
                  marginRight: "4%",
                }}
              ></View>
            </View>
            <Text style={{ width: "20%", marginLeft: "2%" }}>
              {stats === "base"
                ? data.comfortBase
                : stats === "increased"
                ? data.comfortIncreased
                : stats === "optimized"
                ? data.comfortOptimized + data.comfortBase
                : 0}
            </Text>
          </View>

          <View
            style={{
              height: "20%",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "30%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={require("../../assets/stats/Resilience.png")}
                style={{
                  resizeMode: "contain",
                  height: "60%",
                  width: "20%",
                }}
              ></Image>
              <Text
                style={{
                  marginLeft: "4%",
                  fontSize: RFValue(12, 800),
                  fontWeight: "700",
                }}
              >
                Resilience
              </Text>
            </View>
            {/* TODO systeme de remplissage par rapport au max et au stats de bases */}
            <View
              style={{
                width: "60%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* TODO delimitation entre base et increased ou optimized */}
              <View
                style={{
                  width: widthResilience,
                  backgroundColor: "#9DF8B6",
                  height: "25%",
                  borderWidth: 1,
                  marginRight: "4%",
                }}
              ></View>
            </View>
            <Text style={{ width: "20%", marginLeft: "2%" }}>
              {stats === "base"
                ? data.resilienceBase
                : stats === "increased"
                ? data.resilienceIncreased
                : stats === "optimized"
                ? data.resilienceOptimized + data.resilienceBase
                : 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optimizedActive: {
    backgroundColor: "grey",
    borderWidth: 2,
    borderRadius: 20,
    width: "35%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  optimized: {
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    width: "35%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  toOptimized: {
    backgroundColor: "yellow",
    borderWidth: 2,
    borderRadius: 20,
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  baseStatsActive: {
    borderWidth: 2,
    borderRadius: 20,
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "1%",
  },
  baseStatsInactive: {
    borderWidth: 2,
    borderRadius: 20,
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "1%",
    backgroundColor: "grey",
  },
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
    // box-shadow: 0px 0px 0px 10px red, 0px 0px 0px 20px #9DF8B6, 0px 0px 0px 30px yellow, 0px 0px 0px 40px pink;
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
