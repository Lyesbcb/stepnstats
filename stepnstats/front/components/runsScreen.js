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
import Footer from "./footer";
import {
  createRun,
  uploadRun,
  getAllMyRun,
  updateRun,
  deleteRun,
} from "../services/runs/index";

export default function RunsScreen({ navigation }) {
  const [runs, setRuns] = useState([]);
  useEffect(() => {
    myFunction();
  }, []);

  const myFunction = async () => {
    setRuns(await getAllMyRun(1));
  };

  const gstPrice = 0.08;

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
            height: "30%",
            width: "100%",
            borderWidth: 1,
            flexDirection: "row",
          }}
          key={run.id}
          onPress={() => navigation.navigate("run")}
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
    <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
      <View style={styles.headerRuns}>
        <TouchableOpacity
          style={{ ...styles.return, top: "18%" }}
          onPressIn={() => navigation.goBack()}
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
                {runs.length ? totalKm() : "0"} Km
              </Text>
              <Text style={{ fontSize: 12 }}>Total Km</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {runs.length ? averageKmh() : "0"} Km/h
              </Text>
              <Text style={{ fontSize: 12 }}>Average speed</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {runs.length ? totalGst() : "0"} Gst
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
                {String(runs.length)} runs
              </Text>
              <Text style={{ fontSize: 12 }}>Total Runs</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {runs.length ? totalTime() : "0"} Hours
              </Text>
              <Text style={{ fontSize: 12 }}>Total Time</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {runs.length ? totalGenerate() : "0"} $
              </Text>
              <Text style={{ fontSize: 12 }}>Total Generate</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        style={{ height: "100%", width: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Pressable
          style={{
            height: "30%",
            width: "100%",
            borderWidth: 1,
            flexDirection: "row",
          }}
          onPress={() => console.log("add Run")}
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
              <Icon
                type="antdesign"
                name="plus"
                size={100}
                color="black"
              ></Icon>
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
              ></Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  top: "5%",
                  left: "5%",
                }}
              ></Text>
            </View>
            <Icon type="antdesign" name="right" size={50} color="black"></Icon>
          </View>
        </Pressable>
        {runs.length ? displayRuns() : <View></View>}
      </ScrollView>

      <Footer styles={styles}></Footer>
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
    color: "white",
    fontSize: 36,
  },
  selectorTextSecondary: {
    color: "white",
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
    color: "white",
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 2800,
    borderRightColor: "transparent",
    borderTopWidth: 700,
    borderTopColor: "#FF95FB",
    position: "relative",
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
