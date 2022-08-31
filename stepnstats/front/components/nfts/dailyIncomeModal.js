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
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import SelectEnergy from "./selectEnergy";
import SelectLevel from "./selectLevel";
import SelectStrategy from "./selectStrategy";
import SelectMysteryBoxLevel from "./selectMysteryBoxLevel";
import SelectGemLevel from "./selectGemLevel";
import SelectName from "./selectName";
import { getMaxMb, optimize } from "../../services/nfts/index";
import { RFValue } from "react-native-responsive-fontsize";
import { getDailyIncome } from "../../services/runs/index";

export default function DailyIncomeModal({
  setModalVisible,
  modalVisible,
  data,
  focused,
}) {
  const [energy, setEnergy] = useState(16);
  const [dailyIncome, setDailyIncome] = useState({});

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

  useEffect(() => {
    myFunction(); // This is be executed when the state changes
}, [energy]);

  async function myFunction() {
    data.energy = energy;
    data.focused = focused;
    setDailyIncome(await getDailyIncome(data));
  }

  function setLessEnergy() {
    if (energy > 2) {
      setEnergy(energy - 1);
    }
  }

  function setMoreEnergy() {
    if (energy < 25) {
      setEnergy(energy + 1);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        setStep(0);
      }}
      onShow={() => myFunction()}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={1}
        onPressOut={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            height: "60%",
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
          <Text style={{ fontSize: RFValue(24, 800), fontWeight: "800" }}>Daily Income</Text>
          <View
            style={{
              justifyContent: "space-between",
              height: "10%",
              width: "60%",
            }}
          >
            <Text style={{ fontSize: RFValue(14, 800), fontWeight: "700" }}>
              Energy
            </Text>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Pressable
                style={{ width: "25%", height: "100%" }}
                onPress={() => setLessEnergy()}
              >
                <Icon
                  size={RFValue(40, 800)}
                  type="antdesign"
                  name="minus"
                  color="black"
                ></Icon>
              </Pressable>
              <Text
                style={{
                  fontWeight: "800",
                  fontSize: RFValue(24, 800),
                  textAlign: "center",
                  width: "50%",
                }}
              >
                {String(energy) + ".0"}
              </Text>
              <Pressable
                style={{ width: "25%", height: "100%" }}
                onPress={() => setMoreEnergy()}
              >
                <Icon
                  size={RFValue(40, 800)}
                  type="antdesign"
                  name="plus"
                  color="black"
                ></Icon>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              flexDirection: "row",
              height: "10%",
              width: "90%",
            }}
          >
            <Image
              source={require("../../assets/gst.png")}
              style={{ width: "15%", height: "100%", resizeMode: "contain" }}
            ></Image>
            <Text style={{ fontSize: RFValue(20, 800), fontWeight: "600" }}>
              Daily GST
            </Text>
            <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
              {dailyIncome.gstTotal ? dailyIncome.gstTotal : "?"}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              flexDirection: "row",
              height: "10%",
              width: "90%",
            }}
          >
            <Image
              source={require("../../assets/gst.png")}
              style={{ width: "15%", height: "100%", resizeMode: "contain" }}
            ></Image>
            <Text style={{ fontSize: RFValue(20, 800), fontWeight: "600" }}>
              Durability lost
            </Text>
            <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
              {dailyIncome.gstTotal ? dailyIncome.durabilityLost : "?"}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              flexDirection: "row",
              height: "10%",
              width: "90%",
            }}
          >
            <Image
              source={require("../../assets/gst.png")}
              style={{ width: "15%", height: "100%", resizeMode: "contain" }}
            ></Image>
            <Text style={{ fontSize: RFValue(20, 800), fontWeight: "600" }}>
              Repair cost
            </Text>
            <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
              {dailyIncome.gstTotal ? dailyIncome.repairCost : "?"}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              flexDirection: "row",
              height: "10%",
              width: "90%",
            }}
          >
            <Image
              source={require("../../assets/gem/comfort/lvl1.png")}
              style={{ width: "15%", height: "100%", resizeMode: "contain" }}
            ></Image>
            <Text style={{ fontSize: RFValue(20, 800), fontWeight: "600" }}>
              Hp lost
            </Text>
            <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
              {dailyIncome.gstTotal ? dailyIncome.hpLost : "?"}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              flexDirection: "row",
              height: "10%",
              width: "90%",
            }}
          >
            <Text style={{ fontSize: RFValue(20, 800), fontWeight: "600" }}>
              Average mystery box
            </Text>
            <Image
              source={mbsImage[dailyIncome.mb - 1]}
              style={{ width: "15%", height: "100%", resizeMode: "contain" }}
            ></Image>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
