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
import { BarChart } from "react-native-chart-kit";
import Footer from "../footer";
import { Dimensions } from "react-native";
import { getByNftId } from "../../services/nfts/index";
import { RFValue } from "react-native-responsive-fontsize";
import LittleNfts from "../nfts/littleNfts";
import { deleteRun, getGstData } from "../../services/runs/index";

export default function RunScreen({ navigation, route }) {
  const [run, setRun] = useState(JSON.parse(route.params).run);
  const [nft, setNft] = useState(0);
  const [gstData, setGstData] = useState({});
  useEffect(() => {
    myFunction();
  }, []);

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
  // function chartColors() {
  //   var tempArray = [];
  //   for (var i = 0; i < gstData.value.length; i++) {
  //     // if (
  //     //   gstData.value[i] ===
  //     //   Number((run.gst / minuteConverter(run.duration) / 60).toFixed(1))
  //     // ) {
  //     //   tempArray.push((opacity = 1) => `red`);
  //     // } else if (
  //     //   (gstData.value[i + 1] ===
  //     //     Number((run.gst / minuteConverter(run.duration) / 60).toFixed(1))) |
  //     //   (gstData.value[i - 1] ===
  //     //     Number((run.gst / minuteConverter(run.duration) / 60).toFixed(1)))
  //     // ) {
  //     //   tempArray.push((opacity = 1) => `yellow`);
  //     // } else {
  //     //   tempArray.push((opacity = 1) => `black`);
  //     // }
  //     tempArray.push((opacity = 1) => `black`);
  //   }
  //   return tempArray;
  // }
  async function myFunction() {
    try {
      var tempNft = await getByNftId(run.nftId);
      if (tempNft) {
        setNft(tempNft);
      }
      try {
        var tempGstData = await getGstData(
          tempNft.efficiencyIncreased,
          tempNft.type
        );
        if (tempGstData) {
          setGstData(tempGstData);
        }
      } catch (error) {
        console.log(error);
        setGstData({});
      }
    } catch (error) {
      Alert.alert(error);
      setNft(0);
    }
  }
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
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (month < 10) {
      month = "0" + Number(month + 1);
    }
    if (day < 10) {
      day = "0" + day;
    }
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
          onPressIn={() => navigation.navigate("AllRunsScreen")}
        >
          <Icon
            type="antdesign"
            name="left"
            size={RFValue(20, 800)}
            color="black"
          ></Icon>
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
          <Text style={{ fontSize: RFValue(16, 800), fontWeight: "600" }}>
            {dateFormat(new Date(run.date))}
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "70%",
              alignItems: "flex-end",
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: RFValue(48, 800), fontWeight: "700" }}>
              {(run.gst / minuteConverter(run.duration) / 60).toFixed(1)}
            </Text>
            <Text style={{}}>
              {run.runType === "gst" ? "GST/Min" : "GMT/Min"}
            </Text>
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
          {/* Nfts */}
          <Pressable
            style={{
              width: "53%",
              height: "100%",
              backgroundColor: "white",
              borderRadius: 20,
              alignItems: "center",
            }}
            onPress={() => {
              nft === 0
                ? Alert.alert("Please add your nft on the nft screen!")
                : "";
            }}
          >
            <LittleNfts data={nft}></LittleNfts>
            {nft.fileNameIncreased === null ? (
              <Text
                style={{
                  fontSize: RFValue(10, 800),
                  marginTop: "2%",
                  textAlign: "center",
                  color: "red",
                }}
              >
                Please add your sneaker with increased stats!
              </Text>
            ) : (
              <View></View>
            )}
          </Pressable>

          <View
            style={{
              flexDirection: "column",
              width: "38%",
              justifyContent: "space-evenly",
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
                source={
                  run.runType === "gst"
                    ? require("../../assets/gst.png")
                    : require("../../assets/gmt.png")
                }
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              ></Image>
              <Text style={{ fontSize: RFValue(24, 800), fontWeight: "700" }}>
                + {run.gst}
              </Text>
            </View>
            {run.mbLvl ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={mbsImage[run.mbLvl - 1]}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                ></Image>
                <Text style={{ fontSize: RFValue(24, 800), fontWeight: "700" }}>
                  + 1
                </Text>
              </View>
            ) : (
              <View></View>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={require("../../assets/energy.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              ></Image>
              <Text style={{ fontSize: RFValue(24, 800), fontWeight: "700" }}>
                - {run.energy}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          height: "2%",
        }}
      >
        <View
          style={{
            width: "75%",
          }}
        ></View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "20%",
            marginRight: "5%",
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#9DF8B6",
              justifyContent: "center",
              alignContent: "center",
              width: 32,
              height: 32,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "black",
              shadowOpacity: 1,
              shadowRadius: 1,
              shadowOffset: {
                width: 1,
                height: 1,
              },
            }}
            onPress={() => Alert.alert("Soon available")}
          >
            <Icon
              style={{ width: "100%" }}
              size={RFValue(20, 800)}
              type="material-community"
              name="pencil-outline"
              color="black"
            ></Icon>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#9DF8B6",
              justifyContent: "center",
              alignContent: "center",
              width: 32,
              height: 32,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "black",
              shadowOpacity: 1,
              shadowRadius: 1,
              shadowOffset: {
                width: 1,
                height: 1,
              },
            }}
            onPress={async () => {
              await deleteRun(run.id);
              navigation.navigate("AllRunsScreen");
            }}
          >
            <Icon
              style={{ width: "100%" }}
              size={RFValue(20, 800)}
              type="material-community"
              name="trash-can-outline"
              color="black"
            ></Icon>
          </Pressable>
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
          <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
            {run.km}
          </Text>
          <Text style={{ fontSize: RFValue(12, 800), fontWeight: "500" }}>
            Km
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            height: "50%",
          }}
        >
          <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
            {run.duration}
          </Text>
          <Text style={{ fontSize: RFValue(12, 800), fontWeight: "500" }}>
            Time
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            height: "50%",
          }}
        >
          <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
            {run.steps}
          </Text>
          <Text style={{ fontSize: RFValue(12, 800), fontWeight: "500" }}>
            Steps
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: RFValue(12, 800), fontWeight: "700" }}>
        {run.runType === "gst"
          ? "Count of run with average GST/min with the same efficiency"
          : ""}
      </Text>
      {gstData.count && run.runType === "gst" ? (
        <BarChart
          data={{
            labels: gstData.value,
            datasets: [
              {
                data: gstData.count,
                colors: [
                  (opacity = 1) => "#CD6155",
                  (opacity = 1) => "#AF7AC5",
                  (opacity = 1) => "#5499C7",
                  (opacity = 1) => "#48C9B0",
                  (opacity = 1) => "#52BE80",
                  (opacity = 1) => "#F4D03F",
                  (opacity = 1) => "#EB984E",
                  (opacity = 1) => "#DC7633",
                  (opacity = 1) => "#DC7633",
                  (opacity = 1) => "red",
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width * 0.9}
          height={Dimensions.get("window").height * 0.25}
          withCustomBarColorFromData={true}
          flatColor={true}
          showBarTops={false}
          chartConfig={{
            barPercentage: 0.4,
            backgroundColor: "white",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          fromZero={true}
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
            backgroundColor: "white",
          }}
        >
          <Text></Text>
        </BarChart>
      ) : run.runType === "gst" ? (
        <View
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "black",
            shadowColor: "black",
            alignItems: "center",
            justifyContent: "center",
            width: Dimensions.get("window").width - 50,
            height: Dimensions.get("window").width - 150,
          }}
        >
          <Text style={{ fontSize: RFValue(12, 800) }}>
            Add your sneaker with inscred stats to see data
          </Text>
        </View>
      ) : (
        <View></View>
      )}

      {/* <LineChart
        data={{
          labels: ["10", "20", "30", "40", "50", "60"],
          datasets: [
            {
              data: [Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100],
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
            },
            
          ],
        }}
        width={Dimensions.get("window").width - 50}
        height={Dimensions.get("window").width - 200}
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        renderDotContent={({ x, y, index }) => {
          return (
            <View
              style={{
                height: 24,
                width: 24,
                position: "absolute",
                top: y + 30, // <--- relevant to height / width (
                left: x - 5, // <--- width / 2
              }}
            >
              <Image
              source={mbsImage[run.mbLvl - 1]}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            ></Image>
            </View>
          );
        }}
        fromZero={true}
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
      /> */}
      {/* <Footer styles={styles}></Footer> */}
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
    fontSize: RFValue(36, 800),
    fontWeight: "700",
  },
});
