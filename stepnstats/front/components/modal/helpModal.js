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
import { RFValue } from "react-native-responsive-fontsize";

export default function HelpModal({
  setModalHelpVisible,
  modalHelpVisible,
  screen,
}) {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageId, setCurrentImageId] = useState(0);
  const [good, setGood] = useState(true);
  const images = [
    [
      { good: true, image: require("../../assets/help/do/nft/base.png") },
      { good: true, image: require("../../assets/help/do/nft/increased.png") },
      {
        good: false,
        image: require("../../assets/help/dont/nft/cutSockets.png"),
      },
      {
        good: false,
        image: require("../../assets/help/dont/nft/cutStats.png"),
      },
    ],
    [
      {
        good: true,
        image: require("../../assets/help/do/run/durabilityLost.png"),
      },
      { good: true, image: require("../../assets/help/do/run/share.jpeg") },
      {
        good: false,
        image: require("../../assets/help/dont/run/durabilityLostCut.png"),
      },
      { good: false, image: require("../../assets/help/dont/run/share.png") },
    ],
    [
      { good: true, image: require("../../assets/help/do/mb/openMb1.png") },
      { good: true, image: require("../../assets/help/do/mb/openMb2.png") },
      { good: true, image: require("../../assets/help/do/mb/openMb3.png") },
      { good: false, image: require("../../assets/help/dont/mb/closeMb.png") },
      { good: false, image: require("../../assets/help/dont/mb/notMyMb.png") },
    ],
  ];

  useEffect(() => {
    var screenId = 0;
    if (screen === "runs") {
      screenId = 1;
    } else if (screen === "mbs") {
      screenId = 2;
    }
    setCurrentImage(images[screenId][currentImageId].image);
    setGood(images[screenId][currentImageId].good);
    const intervalId = setInterval(() => {
      setCurrentImage(images[screenId][currentImageId].image);
      setGood(images[screenId][currentImageId].good);
      if (currentImageId + 1 === images[screenId].length) {
        setCurrentImageId(0);
      } else {
        setCurrentImageId(currentImageId + 1);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentImageId]);

  const text = [[], [], []];
  return (
    <Modal animationType="slide" transparent={true} visible={modalHelpVisible}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={1}
        onPressOut={() => setModalHelpVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            height: "80%",
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
              top: "3%",
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
            onPress={() => setModalHelpVisible(false)}
          >
            <Icon
              style={{ width: "100%" }}
              size={RFValue(20, 800)}
              type="antdesign"
              name="close"
              color="black"
            ></Icon>
          </Pressable>
          <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
            Wich screen upload
          </Text>
          <View
            style={
              good
                ? {
                    width: "70%",
                    height: "70%",
                    borderWidth: 5,
                    padding: 5,
                    borderColor: "green",
                    alignItems: "center",
                  }
                : {
                    width: "70%",
                    height: "70%",
                    borderWidth: 5,
                    padding: 5,
                    borderColor: "red",
                    alignItems: "center",
                  }
            }
          >
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={currentImage}
            ></Image>
            <Text
              style={
                good
                  ? {
                      position: "absolute",
                      top: "10%",
                      color: "green",
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "700",
                    }
                  : {
                      position: "absolute",
                      top: "10%",
                      color: "red",
                      fontSize: 20,
                      fontWeight: "700",
                    }
              }
            >
              {good ? "Good" : "Bad "}
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              height: "5%",
            }}
          >
            <Pressable
              style={{
                width: "30%",
                height: "100%",
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
              onPress={() => setModalHelpVisible(false)}
            >
              <Text style={{ fontWeight: "700", fontSize: RFValue(24, 800) }}>
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
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
    borderRightColor: "transparent",
    borderTopWidth: 500,
    borderTopColor: "#E0FEF3",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    fontSize: RFValue(36, 800),
    fontWeight: "700",
  },
});
