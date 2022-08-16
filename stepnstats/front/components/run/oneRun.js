import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import { LineChart } from "react-native-chart-kit";
import Footer from "../footer";
import { Dimensions } from "react-native";
import { getByNftId } from "../../services/nfts/index";
import { RFValue } from "react-native-responsive-fontsize";

export default function OneRun({ navigation, run, myFunction }) {
    const imagePath = {
    walker: [
      require("../../assets/shoes/walker/shoe1.png"),
      require("../../assets/shoes/walker/shoe2.png"),
      require("../../assets/shoes/walker/shoe3.png"),
      require("../../assets/shoes/walker/shoe4.png"),
      require("../../assets/shoes/walker/shoe5.png"),
      require("../../assets/shoes/walker/shoe6.png"),
      require("../../assets/shoes/walker/shoe7.png"),
      require("../../assets/shoes/walker/shoe8.png"),
      require("../../assets/shoes/walker/shoe9.png"),
      require("../../assets/shoes/walker/shoe1.png"),
      require("../../assets/shoes/walker/shoe10.png"),
    ],
    jogger: [
      require("../../assets/shoes/jogger/shoe1.png"),
      require("../../assets/shoes/jogger/shoe2.png"),
      require("../../assets/shoes/jogger/shoe3.png"),
      require("../../assets/shoes/jogger/shoe4.png"),
      require("../../assets/shoes/jogger/shoe5.png"),
      require("../../assets/shoes/jogger/shoe6.png"),
      require("../../assets/shoes/jogger/shoe7.png"),
      require("../../assets/shoes/jogger/shoe8.png"),
      require("../../assets/shoes/jogger/shoe9.png"),
      require("../../assets/shoes/jogger/shoe1.png"),
      require("../../assets/shoes/jogger/shoe10.png"),
    ],
    runner: [
      require("../../assets/shoes/runner/shoe1.png"),
      require("../../assets/shoes/runner/shoe2.png"),
      require("../../assets/shoes/runner/shoe3.png"),
      require("../../assets/shoes/runner/shoe4.png"),
      require("../../assets/shoes/runner/shoe5.png"),
      require("../../assets/shoes/runner/shoe6.png"),
      require("../../assets/shoes/runner/shoe7.png"),
      require("../../assets/shoes/runner/shoe8.png"),
      require("../../assets/shoes/runner/shoe9.png"),
      require("../../assets/shoes/runner/shoe1.png"),
      require("../../assets/shoes/runner/shoe10.png"),
    ],
    trainer: [
      require("../../assets/shoes/trainer/shoe1.png"),
      require("../../assets/shoes/trainer/shoe2.png"),
      require("../../assets/shoes/trainer/shoe3.png"),
      require("../../assets/shoes/trainer/shoe4.png"),
      require("../../assets/shoes/trainer/shoe5.png"),
      require("../../assets/shoes/trainer/shoe6.png"),
      require("../../assets/shoes/trainer/shoe7.png"),
      require("../../assets/shoes/trainer/shoe8.png"),
      require("../../assets/shoes/trainer/shoe9.png"),
      require("../../assets/shoes/trainer/shoe1.png"),
      require("../../assets/shoes/trainer/shoe10.png"),
    ],
  };
  function dateFormat(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var date = `${day}/${month}/${year} ${hour}:${minute}`;
    return date;
  }
  return (
    <Pressable
      style={{
        height: 150,
        width: "97%",
        borderWidth: 1,
        flexDirection: "row",
      }}
      key={run.id}
      onPress={() => navigation.navigate("OneRunScreen", {run, myFunction})}
    >
      <View
        style={{
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          width: "30%",
          height: "100%",
        }}
      >
        <Text
          style={{ fontSize: RFValue(12, 800), fontWeight: "600", left: "5%" }}
        >
          {dateFormat(new Date(run.date))}
        </Text>

        <View
          style={{
            backgroundColor: "#FEF9F1",
            width: "100%",
            height: "70%",
            left: "5%",
            borderRadius: 5,
            borderWidth: 1,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(10, 800),
              fontWeight: "500",
              left: "2%",
              top: "2%",
              position: "absolute",
            }}
          >
            {run.realm}
          </Text>
          <View
            style={{
              top: "1%",
              right: "1%",
              height: "15%",
              width: "15%",
              flexDirection: "row-reverse",
              position: "absolute",
            }}
          >
            {run.type == "Walker" ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={{
                    resizeMode: "contain",
                    width: "100%",
                    height: "90%",
                  }}
                  source={require("../../assets/icon_feet.png")}
                ></Image>
              </View>
            ) : run.type == "Jogger" ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={{
                    resizeMode: "contain",
                    width: "50%",
                    height: "90%",
                  }}
                  source={require("../../assets/icon_feet.png")}
                ></Image>
                <Image
                  style={{
                    resizeMode: "contain",
                    width: "50%",
                    height: "90%",
                  }}
                  source={require("../../assets/icon_feet.png")}
                ></Image>
              </View>
            ) : run.type == "Runner" ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={{
                    resizeMode: "contain",
                    width: "30%",
                    height: "90%",
                  }}
                  source={require("../../assets/icon_feet.png")}
                ></Image>
                <Image
                  style={{
                    resizeMode: "contain",
                    width: "30%",
                    height: "90%",
                  }}
                  source={require("../../assets/icon_feet.png")}
                ></Image>
                <Image
                  style={{
                    resizeMode: "contain",
                    width: "30%",
                    height: "90%",
                  }}
                  source={require("../../assets/icon_feet.png")}
                ></Image>
              </View>
            ) : (
              // TODO: find trainer logo
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  style={{
                    resizeMode: "contain",
                    width: "100%",
                    height: "90%",
                  }}
                  source={require("../../assets/icon_feet.png")}
                ></Image>
              </View>
            )}
          </View>
          <Image
            style={{
              resizeMode: "contain",
              width: "80%",
              height: "80%",
            }}
            source={imagePath[run.type.toLowerCase()][
              Number(String(run.nftId).slice(-1))
            ]}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          width: "70%",
          margin: "2%",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            width: "70%",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(24, 800),
              fontWeight: "600",
              top: "5%",
              left: "5%",
            }}
          >
            {run.km} Km
          </Text>
          <Text
            style={{
              fontSize: RFValue(16, 800),
              fontWeight: "400",
              top: "5%",
              left: "5%",
            }}
          >
            {run.duration}
          </Text>
        </View>
        <Icon type="antdesign" name="right" size={50} color="black"></Icon>
      </View>
    </Pressable>
  );
}
