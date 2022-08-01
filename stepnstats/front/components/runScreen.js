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
import { LineChart } from "react-native-chart-kit";
import Footer from "./footer";
import { Dimensions } from "react-native";

export default function RunScreen({ styles, setScreen }) {
  const run = [
    {
      id: 7,
      userId: 3,
      realm: "Solana",
      date: "2000-12-09T23:20:35.000Z",
      duration: "00:25:32",
      energy: 4.6,
      type: "Jogger",
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
  const sneakers = [
    {
      id: 3,
      userId: 2,
      lvl: 18,
      fileName: "",
      type: "Runner",
      quality: "Common",
      efficiency: 23,
      luck: 73,
      comfort: 9,
      resilience: 27,
      mint: 3,
      nftId: 3182821,
      socket1: "efficiency",
      socket2: "efficiency",
      socket3: "efficiency",
      socket4: "efficiency",
    },
  ];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  function minuteConverter(time) {
    const [h, m, s] = time.split(":");
    const value = +h + +m / 60 + s / 3600;
    return value.toFixed(6);
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

  return (
    <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
      {/* Header */}
      <View
        style={{
          top: 0,
          backgroundColor: "#E0FEF3",
          width: "100%",
          height: "42%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ ...styles.return, top: "18%" }}
          onPressIn={() => setScreen("runs")}
        >
          <Icon type="antdesign" name="left" size={20} color="black"></Icon>
        </TouchableOpacity>
        {/* Top part */}
        <View
          style={{
            top: "18%",
            width: "60%",
            height: "15%",
            flexDirection: "row",
            position: "absolute",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {dateFormat(new Date(run[0].date))}
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "30%",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 48, fontWeight: "700" }}>
              {(run[0].gst / minuteConverter(run[0].duration) / 60).toFixed(1)}
            </Text>
            <Text style={{}}>GST/Min</Text>
          </View>
        </View>
        <View
          style={{
            top: "30%",
            width: "80%",
            height: "60%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Sneakers */}
          <View
            style={{
              width: "53%",
              height: "100%",
              backgroundColor: "white",
              borderWidth: 2,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "60%",
                height: "12%",
                backgroundColor: "#BABCBE",
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              {run[0].type == "Walker" ? (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: 10,
                      height: 15,
                    }}
                    source={require("../assets/icon_feet.png")}
                  ></Image>
                </View>
              ) : run[0].type == "Jogger" ? (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: 10,
                      height: 15,
                    }}
                    source={require("../assets/icon_feet.png")}
                  ></Image>
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: 10,
                      height: 15,
                    }}
                    source={require("../assets/icon_feet.png")}
                  ></Image>
                </View>
              ) : run[0].type == "Runner" ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: 10,
                      height: 15,
                    }}
                    source={require("../assets/icon_feet.png")}
                  ></Image>
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: 10,
                      height: 15,
                    }}
                    source={require("../assets/icon_feet.png")}
                  ></Image>
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: 10,
                      height: 15,
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
                      width: 10,
                      height: 15,
                    }}
                    source={require("../assets/icon_feet.png")}
                  ></Image>
                </View>
              )}
              <Text style={{ fontSize: 10, fontWeight: "700" }}>
                {run[0].type}
              </Text>
            </View>
            <Image
              style={{ width: "60%", resizeMode: "contain", marginTop: "4%" }}
              source={require("../assets/shoes/Runner.png")}
            ></Image>
            <View
              style={{
                width: "60%",
                height: "10%",
                borderWidth: 2,
                borderRadius: 20,
                alignItems: "center",
                alignContent: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                marginTop: "8%",
              }}
            >
              <View
                style={{
                  width: "15%",
                  height: "85%",
                  borderWidth: 2,
                  borderRadius: 50,
                  alignItems: "center",
                  backgroundColor: "black",
                }}
              >
                <Text style={{ color: "white", fontSize: 10 }}>#</Text>
              </View>
              <Text style={{ fontSize: 11, fontWeight: "700" }}>
                {run[0].nftId}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "60%",
                marginTop: "3%",
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "700" }}>
                Mint: {sneakers[0].mint}
              </Text>
              <Text style={{ fontSize: 11, fontWeight: "700" }}>
                Lv: {sneakers[0].lvl}
              </Text>
            </View>
            <View
              style={{
                width: "60%",
                marginTop: "5%",
                height: "2%",
                backgroundColor: "#9DF8B6",
              }}
            ></View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "15%",
                backgroundColor: "#F5F5F5",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 12, height: 12, resizeMode: "contain" }}
                  source={require("../assets/stats/Efficiency.png")}
                ></Image>
                <Text style={{ fontSize: 12, fontWeight: "700" }}>
                  {sneakers[0].efficiency}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 12, height: 12, resizeMode: "contain" }}
                  source={require("../assets/stats/Luck.png")}
                ></Image>
                <Text style={{ fontSize: 12, fontWeight: "700" }}>
                  {sneakers[0].luck}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 12, height: 12, resizeMode: "contain" }}
                  source={require("../assets/stats/Comfort.png")}
                ></Image>
                <Text style={{ fontSize: 12, fontWeight: "700" }}>
                  {sneakers[0].comfort}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 12, height: 12, resizeMode: "contain" }}
                  source={require("../assets/stats/Resilience.png")}
                ></Image>
                <Text style={{ fontSize: 12, fontWeight: "700" }}>
                  {sneakers[0].resilience}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "38%",
              justifyContent: "space-between",
              height: "70%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={require("../assets/gst.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              ></Image>
              <Text style={{ fontSize: 24, fontWeight: "700" }}>
                + {run[0].gst}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={require("../assets/mb/lvl5.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              ></Image>
              <Text style={{ fontSize: 24, fontWeight: "700" }}>+ 1</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={require("../assets/energy.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              ></Image>
              <Text style={{ fontSize: 24, fontWeight: "700" }}>
                - {run[0].energy}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "80%",
          height: "10%",
          paddingBottom: "5%",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            height: "50%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>{run[0].km}</Text>
          <Text style={{ fontSize: 12, fontWeight: "500" }}>Km</Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            height: "50%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            {run[0].duration}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "500" }}>Time</Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            height: "50%",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            {run[0].steps}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "500" }}>Steps</Text>
        </View>
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
        width={Dimensions.get("window").width - 50}
        height={Dimensions.get("window").height * 0.3}
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
        getDotColor={(dataPoint, dataPointIndex) => {
          //based on condition we return the color as string
          if (dataPointIndex === 2) return "red";
        }}
        getDotProps={(dataPoint, dataPointIndex) => {
          //based on condition we return the color as string
          if (dataPointIndex === 2) return {
            r: "10",
            strokeWidth: "1",
            stroke: "white",
          };
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
      <Footer styles={styles}></Footer>
    </View>
  );
}
