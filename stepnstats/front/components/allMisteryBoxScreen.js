import {
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import Footer from "./footer";
import LittleMisteryBox from "./littleMisteryBox";
import {
  createMb,
  uploadMb,
  getAllMyMb,
  updateMb,
  deleteMb,
} from "../services/mbs/index";
import * as ImagePicker from "expo-image-picker";
import BouncingPreloader from "react-native-bouncing-preloaders";
import DetailMisteryBox from "./detailMisteryBox";

export default function AllMisteryBoxScreen({ navigation }) {
  const [modalRealmVisible, setmodalRealmVisible] = useState(false);
  const [modalOneMisteryBox, setmodalOneMisteryBox] = useState(false);
  const [mbSelected, setMbSelected] = useState(0);
  const [mbs, setMbs] = useState([]);
  const [realm, setRealm] = useState("");
  useEffect(() => {
    myFunction();
  }, []);

  const myFunction = async () => {
    setMbs(await getAllMyMb(1));
  };

  function nextMb() {
    if (mbSelected != mbs.length) {
      setMbSelected(mbSelected + 1);
    } else {
      setMbSelected(0);
    }
  }

  function previousMb() {
    if (mbSelected != 0) {
      setMbSelected(mbSelected - 1);
    } else {
      setMbSelected(mbs.length);
    }
  }

  const pickImage = async () => {
    setmodalRealmVisible(false);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      // Start wait animation
      await uploadMb(result, realm);
      // Stop wait animation
      await myFunction();
    }
  };

  function showMisteryBox() {
    return mbs.map((mb, i) => {
      return (
        <Pressable
          onPress={() => {
            setMbSelected(i);
            setmodalOneMisteryBox(true);
          }}
          style={{ width: "45%", height: "35%", margin: "2%" }}
          key={mb.id}
        >
          <LittleMisteryBox data={mb}></LittleMisteryBox>
        </Pressable>
      );
    });
  }
  return (
    <View
      style={{
        width: "90%",
        height: "65%",
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalRealmVisible}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: "40%",
              width: "80%",
              borderRadius: 30,
              justifyContent: "space-evenly",
              borderWidth: 1,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
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
                position: "absolute",
                top: "7%",
                right: "7%",
                borderWidth: 1,
                borderColor: "black",
                shadowOpacity: 1,
                shadowRadius: 1,
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
              }}
              onPress={() => setmodalRealmVisible(false)}
            >
              <Icon
                style={{ width: "100%" }}
                size={20}
                type="antdesign"
                name="close"
                color="black"
              ></Icon>
            </Pressable>
            <Text style={{ fontSize: 24, fontWeight: "700" }}>
              Select realm
            </Text>
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                height: "40%",
                width: "100%",
              }}
            >
              <Pressable
                style={{ width: "15%", height: "100%" }}
                onPress={() => setRealm("Solana")}
              >
                <Image
                  source={require("../assets/sol_realm.png")}
                  style={realm == "Solana" ? styles.realmActive : styles.realm}
                ></Image>
              </Pressable>
              <Pressable
                style={{ width: "15%", height: "100%" }}
                onPress={() => setRealm("Bnb")}
              >
                <Image
                  source={require("../assets/bsc_realm.png")}
                  style={realm == "Bnb" ? styles.realmActive : styles.realm}
                ></Image>
              </Pressable>
              <Pressable
                style={{ width: "15%", height: "100%" }}
                onPress={() => setRealm("Ethereum")}
              >
                <Image
                  source={require("../assets/eth_realm.png")}
                  style={
                    realm == "Ethereum" ? styles.realmActive : styles.realm
                  }
                ></Image>
              </Pressable>
            </View>
            <Pressable
              style={{
                width: "45%",
                height: "15%",
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "#9DF8B6",
                shadowColor: "black",
                shadowOpacity: 1,
                shadowRadius: 1,
                shadowOffset: {
                  width: 4,
                  height: 4,
                },
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                realm != ""
                  ? pickImage()
                  : Alert.alert("You must choose a realm!");
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 24 }}>NEXT</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOneMisteryBox.visible}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: "40%",
              width: "80%",
              borderRadius: 30,
              justifyContent: "space-evenly",
              borderWidth: 1,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
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
                position: "absolute",
                top: "7%",
                right: "7%",
                borderWidth: 1,
                borderColor: "black",
                shadowOpacity: 1,
                shadowRadius: 1,
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
              }}
              onPress={() => setmodalOneMisteryBox(false)}
            >
              <Icon
                style={{ width: "100%" }}
                size={20}
                type="antdesign"
                name="close"
                color="black"
              ></Icon>
            </Pressable>
            <DetailMisteryBox
              data={mbs[mbSelected]}
              nextMb={nextMb}
              previousMb={previousMb}
            ></DetailMisteryBox>
          </View>
        </View>
      </Modal>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          flexGrow: 1,
          width: "100%",
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => setmodalRealmVisible(true)}
          style={{ width: "45%", height: "35%", margin: "2%" }}
        >
          <LittleMisteryBox data={0}></LittleMisteryBox>
        </Pressable>
        {showMisteryBox()}
      </ScrollView>
      {/* <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BouncingPreloader
          icons={[
            require("../assets/gem/efficiency/lvl1.png"),
            require("../assets/gem/comfort/lvl1.png"),
            require("../assets/gem/resilience/lvl1.png"),
            require("../assets/gem/luck/lvl7.png"),
            require("../assets/gem/resilience/lvl9.png"),
            require("../assets/gem/luck/lvl3.png"),
          ]}
          leftRotation="-680deg"
          rightRotation="360deg"
          leftDistance={-180}
          rightDistance={-250}
          speed={1200}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  realm: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    opacity: 0.3,
  },
  realmActive: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    opacity: 1,
  },
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
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 2800,
    borderRightColor: "transparent",
    borderTopWidth: 700,
    borderTopColor: "#FF95FB",
    position: "relative",
  },
  container2: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "100%",
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
