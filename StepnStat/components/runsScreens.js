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
import React from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import Footer from "./footer";

export default function RunsScreen({ styles, setScreen }) {
  const gstPrice = 0.08;
  const runs = [
    {
      id: 3,
      userId: 3,
      realm: "Solana",
      date: "2000-12-17T23:20:36.000Z",
      duration: "00:25:32",
      energy: 4.6,
      type: "Walker",
      lvl: 24,
      km: 3.43,
      steps: 4232,
      fileName: "18-12-2000_20:35_2182638.png",
      gst: 26.73,
      nftId: 2182638,
      createdAt: "2022-07-14T15:56:06.000Z",
      updatedAt: "2022-07-14T15:59:17.000Z",
    },
    {
      id: 4,
      userId: 3,
      realm: "Solana",
      date: "2000-12-09T23:20:35.000Z",
      duration: "00:25:32",
      energy: 4.6,
      type: "Jogger",
      lvl: 24,
      km: 3.43,
      steps: 4232,
      fileName: "18-12-2000_20:35_2182638.png",
      gst: 26.73,
      nftId: 2182638,
      createdAt: "2022-07-14T16:03:26.000Z",
      updatedAt: "2022-07-14T16:03:26.000Z",
    },
    {
      id: 5,
      userId: 3,
      realm: "Solana",
      date: "2000-12-09T23:20:35.000Z",
      duration: "00:25:32",
      energy: 4.6,
      type: "Runner",
      lvl: 24,
      km: 7.43,
      steps: 4232,
      fileName: "18-12-2000_20:35_2182638.png",
      gst: 93.73,
      nftId: 2182638,
      createdAt: "2022-07-14T16:03:26.000Z",
      updatedAt: "2022-07-14T16:03:26.000Z",
    },
    {
      id: 6,
      userId: 3,
      realm: "Solana",
      date: "2000-12-09T23:20:35.000Z",
      duration: "00:25:32",
      energy: 4.6,
      type: "Runner",
      lvl: 24,
      km: 7.43,
      steps: 4232,
      fileName: "18-12-2000_20:35_2182638.png",
      gst: 93.73,
      nftId: 2182638,
      createdAt: "2022-07-14T16:03:26.000Z",
      updatedAt: "2022-07-14T16:03:26.000Z",
    },
    {
      id: 7,
      userId: 3,
      realm: "Solana",
      date: "2000-12-09T23:20:35.000Z",
      duration: "00:25:32",
      energy: 4.6,
      type: "Runner",
      lvl: 24,
      km: 7.43,
      steps: 4232,
      fileName: "18-12-2000_20:35_2182638.png",
      gst: 93.73,
      nftId: 2182638,
      createdAt: "2022-07-14T16:03:26.000Z",
      updatedAt: "2022-07-14T16:03:26.000Z",
    },
  ];
  function minuteConverter(time) {
    const [h, m, s] = time.split(":");
    const value = +h + +m / 60 + s / 3600;
    return value.toFixed(6);
  }
  function totalKm() {
    var total = 0;
    for (let run = 0; run < runs.length; run++) {
      total += runs[run].km;
    }
    return total.toFixed(2);
  }

  function averageKmh() {
    var array = [];
    var average = 0;
    for (let run = 0; run < runs.length; run++) {
      array.push(runs[run].km / minuteConverter(runs[run].duration));
    }
    const sum = array.reduce((a, b) => a + b, 0);
    average = sum / array.length || 0;
    return average.toFixed(2);
  }

  function totalTime() {
    var duration = 0;
    for (let run = 0; run < runs.length; run++) {
      duration += Number(minuteConverter(runs[run].duration));
    }
    return duration.toFixed(2);
  }

  function totalGst() {
    var total = 0;
    for (let run = 0; run < runs.length; run++) {
      total += runs[run].gst;
    }
    return total.toFixed(2);
  }

  function totalGenerate() {
    var total = 0;
    for (let run = 0; run < runs.length; run++) {
      total = +runs[run].gst;
    }
    return (total * gstPrice).toFixed(2);
  }
  function dateFormat(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    var date = `${day}/${month}/${year} ${hour}:${minute}`;
    return date;
  }
  function displayRuns() {
    return runs.map((run) => {
      return (
        <Pressable
          style={{
            height: "45%",
            width: "100%",
            borderWidth: 1,
            flexDirection: "row",
          }}
          key={run.id}
          onPress={() => setScreen("home", runs.find(el => el.id === run.id))}
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
            <Text style={{ fontSize: 16, fontWeight: "600", left: "5%" }}>
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
              }}
            >
              <Text
                style={{
                  fontSize: 10,
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
                  top: "8%",
                  right: "5%",
                  height: "20%",
                  width: "25%",
                  flexDirection: "row-reverse",
                  position: "absolute",
                }}
              >
                {run.type == "Walker" ? (
                  <View style={{ width: "100%", height: "100%" }}>
                    <Image
                      style={{
                        resizeMode: "contain",
                        width: "100%",
                        height: "90%",
                      }}
                      source={require("../assets/icon_feet.png")}
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
                      source={require("../assets/icon_feet.png")}
                    ></Image>
                    <Image
                      style={{
                        resizeMode: "contain",
                        width: "50%",
                        height: "90%",
                      }}
                      source={require("../assets/icon_feet.png")}
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
                      source={require("../assets/icon_feet.png")}
                    ></Image>
                    <Image
                      style={{
                        resizeMode: "contain",
                        width: "30%",
                        height: "90%",
                      }}
                      source={require("../assets/icon_feet.png")}
                    ></Image>
                    <Image
                      style={{
                        resizeMode: "contain",
                        width: "30%",
                        height: "90%",
                      }}
                      source={require("../assets/icon_feet.png")}
                    ></Image>
                  </View>
                ) : (
                  // TODO: find trainer logo
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{
                        resizeMode: "contain",
                        width: "30%",
                        height: "90%",
                      }}
                      source={require("../assets/icon_feet.png")}
                    ></Image>
                  </View>
                )}
              </View>
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
                  fontSize: 24,
                  fontWeight: "600",
                  top: "5%",
                  left: "5%",
                }}
              >
                {run.km} Km
              </Text>
              <Text
                style={{
                  fontSize: 16,
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
    });
  }

  return (
    <View style={{ width: "100%", height: "100%", alignItems: "center"}}>
      <View style={styles.headerRuns}>
        <TouchableOpacity
          style={{ ...styles.return, top: "18%" }}
          onPressIn={() => setScreen("home")}
        >
          <Icon type="antdesign" name="left" size={20} color="black"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            ...styles.text,
            top: "18%",
            position: "absolute",
          }}
        >
          Runs
        </Text>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: "20%",
            height: "35%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {totalKm()} Km
              </Text>
              <Text style={{ fontSize: 12 }}>Total Km</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {averageKmh()} Km/h
              </Text>
              <Text style={{ fontSize: 12 }}>Average speed</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {totalGst()} Gst
              </Text>
              <Text style={{ fontSize: 12 }}>Total Gst</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {runs.length} runs
              </Text>
              <Text style={{ fontSize: 12 }}>Total Runs</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {totalTime()} Hours
              </Text>
              <Text style={{ fontSize: 12 }}>Total Time</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {totalGenerate()} $
              </Text>
              <Text style={{ fontSize: 12 }}>Total Generate</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={{ height: "100%", width: "100%"}}>
        {displayRuns()}
      </ScrollView>

      <Footer styles={styles}></Footer>
    </View>
  );
}
