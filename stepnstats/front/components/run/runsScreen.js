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
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import Footer from "../footer";
import * as ImagePicker from "expo-image-picker";
import { RFValue } from "react-native-responsive-fontsize";

import {
  createRun,
  uploadRun,
  getAllMyRun,
  updateRun,
  deleteRun,
} from "../../services/runs/index";
import ProgressLoader from "rn-progress-loader";
import SelectRealmModal from "../modal/selectRealmModal";
import OneRun from "./oneRun";

export default function RunsScreen({ navigation }) {
  const [runs, setRuns] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [realm, setRealm] = useState("Solana");
  const [loading, setLoading] = useState(false);
  const [modalRealmVisible, setmodalRealmVisible] = useState(false);

  async function onRefresh() {
    await setRefreshing(true);
    await myFunction();
    await setRefreshing(false);
  }
  useEffect(() => {
    myFunction();
  }, []);

  const myFunction = async () => {
    console.log("myfunction");
    try {
      setRuns(await getAllMyRun(1));
    } catch (error) {
      Alert.alert(error);
    }
  };

  const pickImage = async () => {
    setmodalRealmVisible(false);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.2,
      exif: true,
    });
    if (!result.cancelled) {
      setLoading(true);
      try {
        await uploadRun(result, realm);
      } catch (error) {
        Alert.alert(error);
      }
      setLoading(false);
      await myFunction();
    }
  };

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

  return (
    <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
      <View style={styles.headerRuns}>
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
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "600" }}>
                {runs.length ? totalKm() : "0"} Km
              </Text>
              <Text style={{ fontSize: RFValue(12, 800) }}>Total Km</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "600" }}>
                {runs.length ? averageKmh() : "0"} Km/h
              </Text>
              <Text style={{ fontSize: RFValue(12, 800) }}>Average speed</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "600" }}>
                {runs.length ? totalGst() : "0"} Gst
              </Text>
              <Text style={{ fontSize: RFValue(12, 800) }}>Total Gst</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "90%",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "600" }}>
                {String(runs.length)} runs
              </Text>
              <Text style={{ fontSize: RFValue(12, 800) }}>Total Runs</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "600" }}>
                {runs.length ? totalTime() : "0"} Hours
              </Text>
              <Text style={{ fontSize: RFValue(12, 800) }}>Total Time</Text>
            </View>
          </View>
        </View>
      </View>
      <ProgressLoader
        visible={loading}
        isModal={true}
        isHUD={true}
        hudColor={"#000000"}
        color={"#FFFFFF"}
      />
      <SelectRealmModal
        modalVisible={modalRealmVisible}
        setmodalVisible={setmodalRealmVisible}
        onValidate={pickImage}
        setValue={setRealm}
        value={realm}
        textButton={"NEXT"}
      ></SelectRealmModal>
      <Pressable
        style={{
          height: 150,
          width: "100%",
          borderWidth: 1,
          flexDirection: "row",
        }}
        onPress={() => setmodalRealmVisible(true)}
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
            <Icon type="antdesign" name="plus" size={100} color="black"></Icon>
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
            ></Text>
            <Text
              style={{
                fontSize: RFValue(16, 800),
                fontWeight: "400",
                top: "5%",
                left: "5%",
              }}
            ></Text>
          </View>
          <Icon type="antdesign" name="right" size={50} color="black"></Icon>
        </View>
      </Pressable>
      <View style={{ height: "42%" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: "100%", alignItems: "center" }}
          refreshControl={
            <RefreshControl
              tintColor={"black"}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          keyExtractor={(item) => item.id}
          data={runs}
          renderItem={({ item }) => (
            <OneRun run={item} navigation={navigation} myFunction={myFunction}></OneRun>
          )}
        />
      </View>

      {/* <Footer styles={styles}></Footer> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRuns: {
    top: 0,
    backgroundColor: "#E0FEF3",
    width: "100%",
    height: "30%",
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
