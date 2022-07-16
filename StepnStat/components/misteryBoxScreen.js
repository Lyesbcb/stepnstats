import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormData from "form-data";
import Icon from "react-native-elements/dist/icons/Icon";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import * as Clipboard from "expo-clipboard";
import Footer from "./footer";

export default function MisteryBox({ styles, setScreen }) {
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
            top: "20%",
            position: "relative",
          }}
        >
          Mistery Box
        </Text>
        <Pressable onPress={() => setScreen("home")} style={styles.all}>
          <Text
            style={{
              ...styles.text,
              color: "black",
              fontSize: 15,
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            ALL
          </Text>
        </Pressable>
        <View style={styles.shoes}>
          <View style={styles.halo}></View>
        </View>
        <Footer styles={styles}></Footer>
      </View>
    </ImageBackground>
  );
}
