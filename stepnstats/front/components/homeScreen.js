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

export default function HomeScreen({ props, navigation }) {
  function support() {
    Clipboard.setStringAsync("FYN3cUXxReNqVuuEUEiRMDk9SHSXWax21RrgKb7mxrSv");
    Alert.alert("Wallet adress copied!");
  }
  return (
    <View style={{width: "100%", height: "100%"}}>
      <View style={styles.container}></View>
      <View style={styles.container2}>
        <View style={styles.selector}>
          <Icon
            type="antdesign"
            name="left"
            size={50}
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
        <Pressable
          style={styles.roi}
          onPress={() => navigation.navigate("allMisteryBoxScreen")}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "900",
            }}
          >
            Mistery Box
          </Text>
        </Pressable>
        <Pressable
          style={styles.inventory}
          onPress={() => navigation.navigate("sneakers")}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "900",
            }}
          >
            Sneakers
          </Text>
        </Pressable>
        <Pressable
          style={styles.update}
          onPress={() => navigation.navigate("runs")}
        >
          <Text style={styles.text}>Runs</Text>
        </Pressable>
        <Footer styles={styles}></Footer>
      </View>
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
    fontSize: 14,
    fontWeight: "500",
  },
  supportText: {
    fontSize: 12,
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
    fontSize: 36,
  },
  selectorTextSecondary: {
    fontSize: 36,
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
    fontSize: 20,
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
    borderBottomRightRadius: 30
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
    fontSize: 36,
    fontWeight: "700",
  },
});
