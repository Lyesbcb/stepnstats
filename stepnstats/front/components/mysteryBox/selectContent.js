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
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import { RFValue } from "react-native-responsive-fontsize";
import Step1 from "./components/step1";
import Step2 from "./components/step2";

export default function SelectContent({
  setContents,
  contents,
  nextStep,
  previousStep,
  setModalVisible,
  contentsQuantity,
  setContentsQuantity,
  resetAll,
}) {
  const [step, setStep] = useState(0);
  const [contentNumber, setContentNumber] = useState(0);
  const contentImage = {
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
    commonScroll: require("../../assets/scroll/common.png"),
    uncommonScroll: require("../../assets/scroll/uncommon.png"),
    rareScroll: require("../../assets/scroll/rare.png"),
    epicScroll: require("../../assets/scroll/epic.png"),
    legendaryScroll: require("../../assets/scroll/legendary.png"),
    gst: require("../../assets/gst.png"),
  };
  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
        {step === 0 ? (
          <Step1
            contents={contents}
            setContents={setContents}
            contentsQuantity={contentsQuantity}
            setContentsQuantity={setContentsQuantity}
            setStep={setStep}
            setContentNumber={setContentNumber}
            previousStep={previousStep}
            nextStep={nextStep}
            setModalVisible={setModalVisible}
            contentImage={contentImage}
            resetAll={resetAll}
          ></Step1>
        ) : (
          <Step2
            contents={contents}
            setContents={setContents}
            contentsQuantity={contentsQuantity}
            setContentsQuantity={setContentsQuantity}
            setStep={setStep}
            setContentNumber={setContentNumber}
            contentNumber={contentNumber}
            setModalVisible={setModalVisible}
            contentImage={contentImage}
            resetAll={resetAll}
          ></Step2>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
