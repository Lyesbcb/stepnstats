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

export default function SelectMysteryBoxLevel({
  setmodalVisible,
  setMysteryBoxLevel,
  mysteryBoxLevel,
  nextStep,
  previousStep,
  maxMb,
}) {
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
  function showMysteryBox() {
    return mbsImage.map((mb, i) => {
      if (i <= maxMb) {
        return (
          <Pressable
            style={{ width: "18%", height: "40%", marginBottom: "4%" }}
            onPress={() => {
              mysteryBoxLevel !== i + 1
                ? setMysteryBoxLevel(i + 1)
                : setMysteryBoxLevel(0);
            }}
            key={i}
          >
            <Image
              style={mysteryBoxLevel === i + 1 ? styles.activeMb : styles.mb}
              source={mb}
            ></Image>
          </Pressable>
        );
      } else {
        return (
          <Pressable
            style={{
              width: "18%",
              height: "40%",
              marginBottom: "4%",
            }}
            onPress={() => {
              Alert.alert(
                "With this energy and luck you can drop this mystery box."
              );
            }}
            key={i}
          >
            <Image
              style={{ ...styles.mb, tintColor: "grey" }}
              source={mb}
            ></Image>
          </Pressable>
        );
      }
    });
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
        <TouchableOpacity
          style={styles.return}
          onPressIn={() => previousStep()}
        >
          <Icon type="antdesign" name="left" size={RFValue(20, 800)} color="black"></Icon>
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
            size={RFValue(20, 800)}
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
          Mystery box Goal
        </Text>
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "40%",
            width: "80%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {showMysteryBox()}
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
            mysteryBoxLevel != ""
              ? nextStep()
              : Alert.alert("You must choose a mystery box!");
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: RFValue(24, 800) }}>NEXT</Text>
        </Pressable>
      </View>
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
