import Icon from "react-native-elements/dist/icons/Icon";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

export default function Step1({
  contentsQuantity,
  contents,
  setContentsQuantity,
  setContents,
  setStep,
  setContentNumber,
  previousStep,
  nextStep,
  setModalVisible,
  contentImage,
  resetAll
}) {
  function selectContent(number) {
    setStep(1);
    setContentNumber(number);
  }
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center"
      }}
    >
      <TouchableOpacity style={styles.return} onPressIn={() => previousStep()}>
        <Icon
          type="antdesign"
          name="left"
          size={RFValue(20, 800)}
          color="black"
        ></Icon>
      </TouchableOpacity>
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
        onPress={() => {
          resetAll();
          setModalVisible(false);
        }}
      >
        <Icon
          style={{ width: "100%" }}
          size={RFValue(20, 800)}
          type="antdesign"
          name="close"
          color="black"
        ></Icon>
      </Pressable>
      <Text
        style={{
          fontSize: RFValue(20, 800),
          fontWeight: "700",
          textAlign: "center",
          width: "60%",
          height: "15%",
        }}
      >
        Mystery box Content
      </Text>
      <View
        style={{
          height: "40%",
          width: "90%",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: "40%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              height: "100%",
              width: "30%",
              borderWidth: 1,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => selectContent(0)}
          >
            {contents[0] ? (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={contentImage[contents[0]]}
                  style={{
                    width: "60%",
                    height: "60%",
                    resizeMode: "contain",
                  }}
                ></Image>
                <Text
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "5%",
                    fontSize: RFValue(10, 800),
                  }}
                >
                  x{contentsQuantity[0]}
                </Text>
              </View>
            ) : (
              <Icon
                style={{ width: "100%" }}
                size={RFValue(40, 800)}
                type="antdesign"
                name="plus"
                color="black"
              ></Icon>
            )}
          </Pressable>

          <Pressable
            style={{
              height: "100%",
              width: "30%",
              borderWidth: 1,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => selectContent(1)}
          >
            {contents[1] ? (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={contentImage[contents[1]]}
                  style={{
                    width: "60%",
                    height: "60%",
                    resizeMode: "contain",
                  }}
                ></Image>
                <Text
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "5%",
                    fontSize: RFValue(10, 800),
                  }}
                >
                  x{contentsQuantity[1]}
                </Text>
              </View>
            ) : (
              <Icon
                style={{ width: "100%" }}
                size={RFValue(40, 800)}
                type="antdesign"
                name="plus"
                color="black"
              ></Icon>
            )}
          </Pressable>
          <Pressable
            style={{
              height: "100%",
              width: "30%",
              borderWidth: 1,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => selectContent(2)}
          >
            {contents[2] ? (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={contentImage[contents[2]]}
                  style={{
                    width: "60%",
                    height: "60%",
                    resizeMode: "contain",
                  }}
                ></Image>
                <Text
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "5%",
                    fontSize: RFValue(10, 800),
                  }}
                >
                  x{contentsQuantity[2]}
                </Text>
              </View>
            ) : (
              <Icon
                style={{ width: "100%" }}
                size={RFValue(40, 800)}
                type="antdesign"
                name="plus"
                color="black"
              ></Icon>
            )}
          </Pressable>
        </View>
        <View
          style={{
            height: "40%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              height: "100%",
              width: "30%",
              borderWidth: 1,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => selectContent(3)}
          >
            {contents[3] ? (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={contentImage[contents[3]]}
                  style={{
                    width: "60%",
                    height: "60%",
                    resizeMode: "contain",
                  }}
                ></Image>
                <Text
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "5%",
                    fontSize: RFValue(10, 800),
                  }}
                >
                  x{contentsQuantity[3]}
                </Text>
              </View>
            ) : (
              <Icon
                style={{ width: "100%" }}
                size={RFValue(40, 800)}
                type="antdesign"
                name="plus"
                color="black"
              ></Icon>
            )}
          </Pressable>
          <Pressable
            style={{
              height: "100%",
              width: "30%",
              borderWidth: 1,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => selectContent(4)}
          >
            {contents[4] ? (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={contentImage[contents[4]]}
                  style={{
                    width: "60%",
                    height: "60%",
                    resizeMode: "contain",
                  }}
                ></Image>
                <Text
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "5%",
                    fontSize: RFValue(10, 800),
                  }}
                >
                  x{contentsQuantity[4]}
                </Text>
              </View>
            ) : (
              <Icon
                style={{ width: "100%" }}
                size={RFValue(40, 800)}
                type="antdesign"
                name="plus"
                color="black"
              ></Icon>
            )}
          </Pressable>
          <Pressable
            style={{
              height: "100%",
              width: "30%",
              borderWidth: 1,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => selectContent(5)}
          >
            {contents[5] ? (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={contentImage[contents[5]]}
                  style={{
                    width: "60%",
                    height: "60%",
                    resizeMode: "contain",
                  }}
                ></Image>
                <Text
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "5%",
                    fontSize: RFValue(10, 800),
                  }}
                >
                  x{contentsQuantity[5]}
                </Text>
              </View>
            ) : (
              <Icon
                style={{ width: "100%" }}
                size={RFValue(40, 800)}
                type="antdesign"
                name="plus"
                color="black"
              ></Icon>
            )}
          </Pressable>
        </View>
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
          contents[0] != null
            ? nextStep()
            : Alert.alert("You must choose content!");
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: RFValue(24, 800) }}>
          ADD
        </Text>
      </Pressable>
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
