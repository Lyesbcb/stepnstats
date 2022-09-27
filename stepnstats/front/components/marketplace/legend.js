import { useState } from "react";
import { Text, View, Pressable, Image, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

export default function Legend({
  name,
  id,
  myColor,
  deleteContent,
  selectedContent,
  setSelectedContent,
  setNotificationContent,
  setModalNotificationVisible
}) {
  const contents = {
    efficiencyLvl1: "Efficiency Lvl 1",
    efficiencyLvl2: "Efficiency Lvl 2",
    efficiencyLvl3: "Efficiency Lvl 3",
    efficiencyLvl4: "Efficiency Lvl 4",
    efficiencyLvl5: "Efficiency Lvl 5",
    efficiencyLvl6: "Efficiency Lvl 6",
    efficiencyLvl7: "Efficiency Lvl 7",
    efficiencyLvl8: "Efficiency Lvl 8",
    efficiencyLvl9: "Efficiency Lvl 9",
    luckLvl1: "Luck Lvl 1",
    luckLvl2: "Luck Lvl 2",
    luckLvl3: "Luck Lvl 3",
    luckLvl4: "Luck Lvl 4",
    luckLvl5: "Luck Lvl 5",
    luckLvl6: "Luck Lvl 6",
    luckLvl7: "Luck Lvl 7",
    luckLvl8: "Luck Lvl 8",
    luckLvl9: "Luck Lvl 9",
    comfortLvl1: "Comfort Lvl 1",
    comfortLvl2: "Comfort Lvl 2",
    comfortLvl3: "Comfort Lvl 3",
    comfortLvl4: "Comfort Lvl 4",
    comfortLvl5: "Comfort Lvl 5",
    comfortLvl6: "Comfort Lvl 6",
    comfortLvl7: "Comfort Lvl 7",
    comfortLvl8: "Comfort Lvl 8",
    comfortLvl9: "Comfort Lvl 9",
    resilienceLvl1: "Resilience Lvl 1",
    resilienceLvl2: "Resilience Lvl 2",
    resilienceLvl3: "Resilience Lvl 3",
    resilienceLvl4: "Resilience Lvl 4",
    resilienceLvl5: "Resilience Lvl 5",
    resilienceLvl6: "Resilience Lvl 6",
    resilienceLvl7: "Resilience Lvl 7",
    resilienceLvl8: "Resilience Lvl 8",
    resilienceLvl9: "Resilience Lvl 9",
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
  function notification(){
    setNotificationContent(name)
    setModalNotificationVisible(true)
  }
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "2%",
        height: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={{ color: myColor, fontSize: RFValue(16, 800), fontWeight: "700" }}>
          {contents[name]}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "20%",
            alignItems:"center"
          }}
        >
          <Pressable onPress={() => notification()}>
            <Icon type="material-community" name="bell" size={20}></Icon>
          </Pressable>
          <Pressable
            onPress={() => {
              var tempArray = selectedContent.slice();
              tempArray.splice(id, 1);
              setSelectedContent(tempArray);
            }}
          >
            <Icon type="material-community" name="close" size={25}></Icon>
          </Pressable>
        </View>
      </View>

      <View
        style={{ width: "100%", height: 2, backgroundColor: myColor }}
      ></View>
    </View>
  );
}
