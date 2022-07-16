import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormData from "form-data";
import Icon from "react-native-elements/dist/icons/Icon";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import * as Clipboard from "expo-clipboard";
import axios from "axios";
import uuid from "react-native-uuid";
import Footer from "./footer";

export default function HomeScreen({ styles, setScreen }) {
  function support() {
    Clipboard.setString("FYN3cUXxReNqVuuEUEiRMDk9SHSXWax21RrgKb7mxrSv");
    Alert.alert("Wallet adress copied!");
  }
  return (
    <ImageBackground
      style={styles.image}
      resizeMode="cover"
      source={require("../plan.png")}
    >
      <View style={styles.container}></View>
      <View style={styles.container2}>
        <View style={styles.selector}>
          <Icon
            type="antdesign"
            name="left"
            size={50}
            color="white"
            style={{ paddingHorizontal: 10 }}
          ></Icon>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.selectorTextPrimary}>ici</Text>
            <Text style={styles.selectorTextSecondary}>ici</Text>
          </View>
          <Icon
            type="antdesign"
            name="right"
            size={50}
            color="white"
            style={{ paddingHorizontal: 10 }}
          ></Icon>
        </View>
        <View style={styles.selectTemporality}>
          <Pressable>
            <View style={styles.weekTemporality}>
              <Text style={{ color: "white", fontSize: 20 }}>W</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.monthTemporality}>
              <Text style={{ color: "white", fontSize: 20 }}>M</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.yearTemporality}>
              <Text style={{ color: "white", fontSize: 20 }}>Y</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.dateSelector}>
          <Icon
            type="antdesign"
            name="left"
            size={30}
            color="white"
            style={{ paddingHorizontal: 10 }}
          ></Icon>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.dateSelectorTextPrimary}>ici</Text>
          </View>
          <Icon
            type="antdesign"
            name="right"
            size={30}
            color="white"
            style={{ paddingHorizontal: 10 }}
            onPress={() => nextTemporality()}
          ></Icon>
        </View>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 50} // from react-native
          height={Dimensions.get("window").width - 150}
          yAxisInterval={1}
          chartConfig={{
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 0,
            color: (opacity = 1) => "#4DC6F4",
            labelColor: (opacity = 1) => `#4DC6F4`,
            propsForDots: {
              r: "3",
              strokeWidth: "1",
              stroke: "white",
            },
          }}
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "black",
            shadowColor: "black",
            shadowOpacity: 1,
            shadowRadius: 1,
            shadowOffset: {
              width: 4,
              height: 4,
            },
          }}
          bezier
        />
        <Pressable style={styles.roi} onPress={() => setScreen("misteryBox")}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "900",
            }}
          >
            Mistery Box
          </Text>
        </Pressable>
        <Pressable style={styles.inventory} onPress={() => setScreen("sneakers")}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "900",
            }}
          >
            Sneakers
          </Text>
        </Pressable>
        <Pressable style={styles.update} onPress={() => setScreen("run")}>
          <Text style={styles.text}>Runs</Text>
        </Pressable>
        <Footer styles={styles}></Footer>
      </View>
    </ImageBackground>
  );
}
