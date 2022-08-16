import {
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import { RFValue } from "react-native-responsive-fontsize";

export default function SelectGemLevel({
  setModalVisible,
  setGem,
  gem,
  nextStep,
  previousStep,
  data,
  lvl,
}) {
  const [gemSocket1Lvl, setGemSocket1Lvl] = useState(0);
  const [gemSocket2Lvl, setGemSocket2Lvl] = useState(0);
  const [gemSocket3Lvl, setGemSocket3Lvl] = useState(0);
  const [gemSocket4Lvl, setGemSocket4Lvl] = useState(0);
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
  function setSocket(socketNumber) {
    if (socketNumber === 1) {
      if (gemSocket1Lvl < 6) {
        setGemSocket1Lvl(gemSocket1Lvl + 1);
      } else {
        setGemSocket1Lvl(0);
      }
    } else if (socketNumber === 2) {
      if (gemSocket2Lvl < 6) {
        setGemSocket2Lvl(gemSocket2Lvl + 1);
      } else {
        setGemSocket2Lvl(0);
      }
    } else if (socketNumber === 3) {
      if (gemSocket3Lvl < 6) {
        setGemSocket3Lvl(gemSocket3Lvl + 1);
      } else {
        setGemSocket3Lvl(0);
      }
    } else if (socketNumber === 4) {
      if (gemSocket4Lvl < 6) {
        setGemSocket4Lvl(gemSocket4Lvl + 1);
      } else {
        setGemSocket4Lvl(0);
      }
    }
  }

  function reset() {
    setGemSocket1Lvl(0);
    setGemSocket2Lvl(0);
    setGemSocket3Lvl(0);
    setGemSocket4Lvl(0);
  }
  return (
    <TouchableWithoutFeedback>
    <View
      style={{
        backgroundColor: "white",
        height: "40%",
        width: "80%",
        borderRadius: 30,
        justifyContent: "space-evenly",
        borderWidth: 1,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <TouchableOpacity style={styles.return} onPressIn={() => previousStep()}>
        <Icon type="antdesign" name="left" size={20} color="black"></Icon>
      </TouchableOpacity>
      <Pressable
        style={{
          backgroundColor: "#9DF8B6",
          justifyContent: "center",
          alignContent: "center",
          width: 32,
          height: 32,
          borderRadius: 20,
          position: "absolute",
          top: "7%",
          right: "7%",
          borderWidth: 1,
          borderColor: "black",
          shadowOpacity: 1,
          shadowRadius: 1,
          shadowOffset: {
            width: 1,
            height: 1,
          },
        }}
        onPress={() => setModalVisible(false)}
      >
        <Icon
          style={{ width: "100%" }}
          size={20}
          type="antdesign"
          name="close"
          color="black"
        ></Icon>
      </Pressable>
      <Text
        style={{
          fontSize: RFValue(20, 800),
          fontWeight: "700",
          textAlign: "center",
          width: "60%",
          height: "15%",
        }}
      >
        Gem level Goal
      </Text>
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "40%",
          width: "80%",
        }}
      >
        <Pressable
          style={{ position: "absolute", right: "0%", top: "-15%" }}
          onPress={() => reset()}
        >
          <Text style={{ fontSize: RFValue(20, 800), color: "gold", fontWeight: "700" }}>
            Reset
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: "50%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{ width: "30%", height: "100%" }}
            onPress={() => {
              lvl >= 5
                ? setSocket(1)
                : Alert.alert("Socket are locked at this level");
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={styles.socketActive}
                source={
                  data.socket1.includes(0) & (lvl >= 5)
                    ? sockets[data.socket1.slice(0, -1) + "1"]
                    : sockets[data.socket1]
                }
              ></Image>
              {gemSocket1Lvl ? (
                <Image
                  style={{
                    width: "40%",
                    height: "100%",
                    resizeMode: "contain",
                    position: "absolute",
                  }}
                  source={contents[data.socket1.slice(0, -1) + gemSocket1Lvl]}
                ></Image>
              ) : (
                <View></View>
              )}
            </View>
          </Pressable>
          <Pressable
            style={{ width: "30%", height: "100%" }}
            onPress={() => {
              lvl >= 10
                ? setSocket(2)
                : Alert.alert("Socket are locked at this level");
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={styles.socketActive}
                source={
                  data.socket2.includes(0) & (lvl >= 10)
                    ? sockets[data.socket2.slice(0, -1) + "1"]
                    : sockets[data.socket2]
                }
              ></Image>
              {gemSocket2Lvl ? (
                <Image
                  style={{
                    width: "40%",
                    height: "100%",
                    resizeMode: "contain",
                    position: "absolute",
                  }}
                  source={contents[data.socket2.slice(0, -1) + gemSocket2Lvl]}
                ></Image>
              ) : (
                <View></View>
              )}
            </View>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: "50%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{ width: "30%", height: "100%" }}
            onPress={() => {
              lvl >= 15
                ? setSocket(3)
                : Alert.alert("Socket are locked at this level");
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={styles.socketActive}
                source={
                  data.socket3.includes(0) & (lvl >= 15)
                    ? sockets[data.socket3.slice(0, -1) + "1"]
                    : sockets[data.socket3]
                }
              ></Image>
              {gemSocket3Lvl ? (
                <Image
                  style={{
                    width: "40%",
                    height: "100%",
                    resizeMode: "contain",
                    position: "absolute",
                  }}
                  source={contents[data.socket3.slice(0, -1) + gemSocket3Lvl]}
                ></Image>
              ) : (
                <View></View>
              )}
            </View>
          </Pressable>
          <Pressable
            style={{ width: "30%", height: "100%" }}
            onPress={() => {
              lvl >= 20
                ? setSocket(4)
                : Alert.alert("Socket are locked at this level");
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={styles.socketActive}
                source={
                  data.socket4.includes(0) & (lvl >= 20)
                    ? sockets[data.socket4.slice(0, -1) + "1"]
                    : sockets[data.socket4]
                }
              ></Image>
              {gemSocket4Lvl ? (
                <Image
                  style={{
                    width: "40%",
                    height: "100%",
                    resizeMode: "contain",
                    position: "absolute",
                  }}
                  source={contents[data.socket4.slice(0, -1) + gemSocket4Lvl]}
                ></Image>
              ) : (
                <View></View>
              )}
            </View>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={{
          width: "45%",
          height: "15%",
          borderRadius: 100,
          borderWidth: 1,
          borderColor: "black",
          backgroundColor: "#9DF8B6",
          shadowColor: "black",
          shadowOpacity: 1,
          shadowRadius: 1,
          shadowOffset: {
            width: 4,
            height: 4,
          },
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          setGem({
            gem1: data.socket1.slice(0, -1) + gemSocket1Lvl,
            gem2: data.socket2.slice(0, -1) + gemSocket2Lvl,
            gem3: data.socket3.slice(0, -1) + gemSocket3Lvl,
            gem4: data.socket4.slice(0, -1) + gemSocket4Lvl,
          });
          nextStep();
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: RFValue(24, 800) }}>NEXT</Text>
      </Pressable>
    </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  socketActive: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  socket: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    tintColor: "grey",
  },
  mb: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
  activeMb: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  realm: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    opacity: 0.3,
  },
  realmActive: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    opacity: 1,
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
    borderRightColor: "transparent",
    borderTopWidth: 500,
    borderTopColor: "#E0FEF3",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  container2: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "100%",
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
