import {
  Text,
  View,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import Footer from "./footer";
import DetailMisteryBox from "./detailMisteryBox";

export default function AllMisteryBoxScreen({ styles, setScreen }) {
  const mbs = [
    {
      id: 1,
      userId: 2,
      lvl: 6,
      dropRate: 32.22,
      fileName: "myScreen.png",
      content1: "efficiencyLvl1",
      content1Quantity: 6,
      content2: "efficiencyLvl2",
      content2Quantity: 2,
      content3: "efficiencyLvl3",
      content3Quantity: 1,
      content4: "scrollCommon",
      content4Quantity: 2,
      content5: "",
      content5Quantity: "",
      content6: "",
      content6Quantity: "",
      createdAt: "2000-12-17T23:20:36.000Z",
      updatedAt: "2000-12-17T23:20:36.000Z",
    },
    {
      id: 2,
      userId: 2,
      lvl: 5,
      dropRate: 12.22,
      fileName: "myScreen.png",
      content1: "resilienceLvl1",
      content1Quantity: 3,
      content2: "comfortLvl2",
      content2Quantity: 1,
      content3: "",
      content3Quantity: "",
      content4: "",
      content4Quantity: "",
      content5: "",
      content5Quantity: "",
      content6: "",
      content6Quantity: "",
      createdAt: "2000-12-22T23:20:36.000Z",
      updatedAt: "2000-12-22T23:20:36.000Z",
    },
    {
      id: 3,
      userId: 2,
      lvl: 2,
      dropRate: 0.001,
      fileName: "myScreen.png",
      content1: "gst",
      content1Quantity: 3.67,
      content2: "efficiencyLvl1",
      content2Quantity: 1,
      content3: "scrollCommon",
      content3Quantity: 1,
      content4: "",
      content4Quantity: "",
      content5: "",
      content5Quantity: "",
      content6: "",
      content6Quantity: "",
      createdAt: "2000-11-12T23:20:36.000Z",
      updatedAt: "2000-11-12T23:20:36.000Z",
    },
  ];
  return (
    <ImageBackground
      style={styles.image}
      resizeMode="cover"
      source={require("../plan.png")}
    >
      <View style={styles.container}></View>
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.return}
          onPressIn={() => setScreen("home")}
        >
          <Icon type="antdesign" name="left" size={20} color="black"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            ...styles.text,
            color: "white",
            top: "8%",
            position: "absolute",
          }}
        >
          Mistery Box
        </Text>
        <Pressable
          onPress={() => setScreen("OneMisteryBoxScreen")}
          style={styles.all}
        >
          <Text
            style={{
              ...styles.text,
              color: "black",
              fontSize: 15,
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            ONE
          </Text>
        </Pressable>
        <View style={styles.shoes}></View>
        <Footer styles={styles}></Footer>
      </View>
    </ImageBackground>
  );
}
