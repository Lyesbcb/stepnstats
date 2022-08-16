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

export default function OptimizeModal({
  setModalVisible,
  modalVisible,
  minLvl,
  data,
  optimized,
  setOptimized,
  myFunction,
  setStats,
}) {
  const [step, setStep] = useState(0);
  // Step 0 (Energy)
  const [energy, setEnergy] = useState(2);
  // Step 1 (Lvl)
  const [lvl, setLvl] = useState(minLvl);
  // Step 2 (GemLevel)
  const [gem, setGem] = useState({});
  // Step 3 (Strategy)
  const [strategy, setStrategy] = useState("GST");
  // Step 4 (MysteryBox)
  const [mysteryBoxLevel, setMysteryBoxLevel] = useState(0);
  const [maxMb, setMaxMb] = useState(0);
  // Step 5 (name)
  const [name, setName] = useState("");
  async function nextStep() {
    if (step === 3) {
      const myNft = {
        energy: energy,
        efficiencyBase: data.efficiencyBase,
        luckBase: data.luckBase,
        comfortBase: data.comfortBase,
        resilienceBase: data.resilienceBase,
        quality: data.quality,
        actualLvl: data.lvl,
        lvl: lvl,
        gem1: gem.gem1,
        gem2: gem.gem2,
        gem3: gem.gem3,
        gem4: gem.gem4,
        socket1: data.socket1,
        socket2: data.socket2,
        socket3: data.socket3,
        socket4: data.socket4,
        strategy: strategy,
        id: data.id,
      };
      setMaxMb(getMaxMb(myNft));
      if ((strategy === "GST") & (step === 3)) {
        setStep(step + 2);
        const myNft = {
          energy: energy,
          efficiencyBase: data.efficiencyBase,
          luckBase: data.luckBase,
          comfortBase: data.comfortBase,
          resilienceBase: data.resilienceBase,
          quality: data.quality,
          actualLvl: data.lvl,
          lvl: lvl,
          gem1: gem.gem1,
          gem2: gem.gem2,
          gem3: gem.gem3,
          gem4: gem.gem4,
          socket1: data.socket1,
          socket2: data.socket2,
          socket3: data.socket3,
          socket4: data.socket4,
          strategy: strategy,
          id: data.id,
        };
        try {
          await optimize(myNft);
        } catch (error) {
          Alert.alert(error);
        }
        await myFunction();
        setStep(0);
        setStats("optimized");
        setModalVisible(false);
      } else {
        setStep(step + 1);
      }
    } else {
      if (step === 4) {
        const myNft = {
          energy: energy,
          efficiencyBase: data.efficiencyBase,
          luckBase: data.luckBase,
          comfortBase: data.comfortBase,
          resilienceBase: data.resilienceBase,
          quality: data.quality,
          actualLvl: data.lvl,
          lvl: lvl,
          gem1: gem.gem1,
          gem2: gem.gem2,
          gem3: gem.gem3,
          gem4: gem.gem4,
          socket1: data.socket1,
          socket2: data.socket2,
          socket3: data.socket3,
          socket4: data.socket4,
          strategy: strategy,
          id: data.id,
        };
        try {
          await optimize(myNft);
        } catch (error) {
          Alert.alert(error);
        }
        await myFunction();
        setStep(0);
        setStats("optimized");
        setModalVisible(false);
      } else {
        setStep(step + 1);
      }
    }
  }
  function previousStep() {
    setStep(step - 1);
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
        {step === 0 ? (
          <SelectEnergy
            energy={energy}
            setEnergy={setEnergy}
            setModalVisible={setModalVisible}
            nextStep={nextStep}
          />
        ) : step === 1 ? (
          <SelectLevel
            lvl={lvl}
            setLvl={setLvl}
            setModalVisible={setModalVisible}
            minLvl={minLvl}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        ) : step === 2 ? (
          <SelectGemLevel
            gem={gem}
            setGem={setGem}
            data={data}
            setModalVisible={setModalVisible}
            nextStep={nextStep}
            previousStep={previousStep}
            lvl={lvl}
          />
        ) : step === 3 ? (
          <SelectStrategy
            strategy={strategy}
            setStrategy={setStrategy}
            setModalVisible={setModalVisible}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        ) : step === 4 ? (
          <SelectMysteryBoxLevel
            maxMb={maxMb}
            mysteryBoxLevel={mysteryBoxLevel}
            setMysteryBoxLevel={setMysteryBoxLevel}
            setModalVisible={setModalVisible}
            nextStep={nextStep}
            previousStep={previousStep}
          />
        ) : (
          <View></View>
        )}
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
