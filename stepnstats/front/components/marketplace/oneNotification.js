import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {
  createNotification,
  deleteNotification,
  getAllMyNotification,
} from "../../services/notifications/index";
import { Icon } from "react-native-elements";

export default function OneNotification({
  data,
  lastPrice,
  removeNotification,
}) {
  const contents = {
    efficiencyLvl1: "Gem Efficiency Lvl 1",
    efficiencyLvl2: "Gem Efficiency Lvl 2",
    efficiencyLvl3: "Gem Efficiency Lvl 3",
    efficiencyLvl4: "Gem Efficiency Lvl 4",
    efficiencyLvl5: "Gem Efficiency Lvl 5",
    efficiencyLvl6: "Gem Efficiency Lvl 6",
    efficiencyLvl7: "Gem Efficiency Lvl 7",
    efficiencyLvl8: "Gem Efficiency Lvl 8",
    efficiencyLvl9: "Gem Efficiency Lvl 9",
    luckLvl1: "Gem Luck Lvl 1",
    luckLvl2: "Gem Luck Lvl 2",
    luckLvl3: "Gem Luck Lvl 3",
    luckLvl4: "Gem Luck Lvl 4",
    luckLvl5: "Gem Luck Lvl 5",
    luckLvl6: "Gem Luck Lvl 6",
    luckLvl7: "Gem Luck Lvl 7",
    luckLvl8: "Gem Luck Lvl 8",
    luckLvl9: "Gem Luck Lvl 9",
    comfortLvl1: "Gem Comfort Lvl 1",
    comfortLvl2: "Gem Comfort Lvl 2",
    comfortLvl3: "Gem Comfort Lvl 3",
    comfortLvl4: "Gem Comfort Lvl 4",
    comfortLvl5: "Gem Comfort Lvl 5",
    comfortLvl6: "Gem Comfort Lvl 6",
    comfortLvl7: "Gem Comfort Lvl 7",
    comfortLvl8: "Gem Comfort Lvl 8",
    comfortLvl9: "Gem Comfort Lvl 9",
    resilienceLvl1: "Gem Resilience Lvl 1",
    resilienceLvl2: "Gem Resilience Lvl 2",
    resilienceLvl3: "Gem Resilience Lvl 3",
    resilienceLvl4: "Gem Resilience Lvl 4",
    resilienceLvl5: "Gem Resilience Lvl 5",
    resilienceLvl6: "Gem Resilience Lvl 6",
    resilienceLvl7: "Gem Resilience Lvl 7",
    resilienceLvl8: "Gem Resilience Lvl 8",
    resilienceLvl9: "Gem Resilience Lvl 9",
    walkerCommon: "Walker Common",
    joggerCommon: "Jogger Common",
    runnerCommon: "Runner Common",
    trainerCommon: "Trainer Common",
    walkerUncommon: "Walker Uncommon",
    joggerUncommon: "Jogger Uncommon",
    runnerUncommon: "Runner Uncommon",
    trainerUncommon: "Trainer Uncommon",
    walkerRare: "Walker Rare",
    joggerRare: "Jogger Rare",
    runnerRare: "Runner Rare",
    trainerRare: "Trainer Rare",
    walkerEpic: "Walker Epic",
    joggerEpic: "Jogger Epic",
    runnerEpic: "Runner Epic",
    trainerEpic: "Trainer Epic",
    commonScroll: "Common Scroll",
    uncommonScroll: "Uncommon Scroll",
    rareScroll: "Rare Scroll",
    epicScroll: "Epic Scroll",
    legendaryScroll: "Legendary Scroll",
    genesisCommon: "Genesis Common",
    genesisUncommon: "Genesis Uncommon",
    genesisRare: "Genesis Rare",
    genesisEpic: "Genesis Epic",
    ogCommon: "OG Common",
    ogUncommon: "OG Uncommon",
    ogRare: "OG Rare",
    ogEpic: "OG Epic",
  };
  return (
    <View
      style={{
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: "2%",
      }}
    >
      <Text style={{ fontSize: RFValue(12, 800), fontWeight: "800" }}>{contents[data.content]}</Text>
      <Text style={{ fontSize: RFValue(12, 800), fontWeight: "800" }}>{data.type === "above" ? ">=" : "<="}</Text>
      <Text style={{ fontSize: RFValue(12, 800), fontWeight: "800" }}>
        {lastPrice != undefined
          ? data.currency === "Crypto"
            ? data.contentPrice
            : data.contentPrice.toFixed(2) + "$"
          : 0}
      </Text>
      <Text style={{ fontSize: RFValue(12, 800), fontWeight: "800" }}>{data.realm}</Text>
      <Pressable
        style={{
          justifyContent: "center",
          alignContent: "center",
          width: "10%",
          height: "100%",
        }}
        onPress={() => removeNotification(data.id)}
      >
        <Icon
          style={{ width: "100%" }}
          size={RFValue(20, 800)}
          type="material-community"
          name="trash-can-outline"
          color="black"
        ></Icon>
      </Pressable>
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
  dayTemporality: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#61F2FC",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  dayTemporalityActive: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#61F2FC",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  weekTemporality: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#EB78E7",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  weekTemporalityActive: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#EB78E7",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  monthTemporality: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#FFE922",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  monthTemporalityActive: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#FFE922",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  selectTemporality: {
    justifyContent: "flex-end",
    flexDirection: "row",
    position: "absolute",
    right: "5%",
    top: "3%",
  },
  selectorTextPrimary: {
    fontSize: RFValue(36, 800),
  },
  selectorTextSecondary: {
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
