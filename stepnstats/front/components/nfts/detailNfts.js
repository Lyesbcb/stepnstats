import {
  Text,
  View,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import Footer from "../footer";

export default function DetailNfts({
  data,
  nextNft,
  previousNft,
  setmodalOneNfts,
  deleteOneNft,
}) {
  var color;
  const qualityColor = {
    Common: "#BABCBE",
    Uncommon: "#AED144",
    Rare: "#47ACED",
    Epic: "#A398EB",
    Legendary: "#F5A836",
  };
  {
    data != 0 ? (color = qualityColor[data.quality]) : (color = "#E2E2E2");
  }
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          backgroundColor: color,
          width: "30%",
          height: "4%",
          borderRadius: 5,
          marginLeft: "4%",
          alignItems: "center",
          justifyContent: "center",
          top: "4%",
          borderWidth: 2,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "700" }}>GST KILLER</Text>
      </View>
      {/* // TODO: Show Realm */}
      {/* {data.realm == "Solana" ? (
        <Image
          source={require("../../assets/sol_realm.png")}
          style={{
            position: "absolute",
            right: "5%",
            top: "5%",
            height: "20%",
            width: "15%",
            resizeMode: "contain",
          }}
        ></Image>
      ) : data.realm == "Bnb" ? (
        <Image
          source={require("../../assets/bsc_realm.png")}
          style={{
            position: "absolute",
            right: "5%",
            top: "5%",
            height: "20%",
            width: "15%",
            resizeMode: "contain",
          }}
        ></Image>
      ) : data.realm == "Ethereum" ? (
        <Image
          source={require("../../assets/eth_realm.png")}
          style={{
            position: "absolute",
            right: "5%",
            top: "5%",
            height: "20%",
            width: "15%",
            resizeMode: "contain",
          }}
        ></Image>
      ) : (
        <View></View>
      )} */}
      <View
        style={{
          position: "absolute",
          top: "4%",
          right: "2%",
          justifyContent: "space-evenly",
          flexDirection: "row",
          width: "35%",
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
            size={20}
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
          onPress={() => deleteOneNft(data.id)}
        >
          <Icon
            style={{ width: "100%" }}
            size={20}
            type="material-community"
            name="trash-can-outline"
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
          onPress={() => setmodalOneNfts(false)}
        >
          <Icon
            style={{ width: "100%" }}
            size={20}
            type="material-community"
            name="close"
            color="black"
          ></Icon>
        </Pressable>
      </View>
      <View
        style={{
          width: "100%",
          height: "90%",
          justifyContent: "space-evenly",
          alignItems: "center",
          top: "5%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: "10%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: "15%", resizeMode: "contain" }}
            source={require("../../assets/socket/locked.png")}
          ></Image>
          <Image
            style={{ width: "15%", resizeMode: "contain" }}
            source={require("../../assets/socket/locked.png")}
          ></Image>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: "20%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Icon
            type="antdesign"
            name="left"
            size={60}
            color="black"
            onPress={() => {
              previousNft();
            }}
          ></Icon>
          <View
            style={{
              width: "30%",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {data != undefined ? (
              <Image
                source={require("../../assets/shoes/Runner.png")}
                style={{ height: "100%", width: "130%", resizeMode: "contain" }}
              ></Image>
            ) : (
              <Icon
                style={{ width: "100%" }}
                size={100}
                type="antdesign"
                name="plus"
                color="black"
              ></Icon>
            )}
          </View>
          <Icon
            type="antdesign"
            name="right"
            size={60}
            color="black"
            onPress={() => {
              nextNft();
            }}
          ></Icon>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: "10%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: "15%", resizeMode: "contain" }}
            source={require("../../assets/socket/locked.png")}
          ></Image>
          <Image
            style={{ width: "15%", resizeMode: "contain" }}
            source={require("../../assets/socket/locked.png")}
          ></Image>
        </View>
        <View
          style={{
            height: "5%",
            width: "30%",
            borderRadius: 20,
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            #
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "700" }}>
            {data ? data.nftId : ""}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: "4%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: color,
              width: "25%",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "700" }}>
              {data != undefined ? data.quality : "-"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: color,
              width: "40%",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "700" }}>
              {data != undefined ? data.type : "-"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: color,
              width: "25%",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "700" }}>
              {/* TODO get price */}
              47$
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: color,
            width: "80%",
            borderRadius: 50,
            borderWidth: 2,
            height: "4%",
            justifyContent: "center",
          }}
        >
          <Text style={{ marginLeft: "4%", fontSize: 12, fontWeight: "700" }}>
            Level {data ? data.lvl : ""}
          </Text>
        </View>
        <View
          style={{
            width: "80%",
            height: "6%",
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              position: "absolute",
              left: 0,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Attributes
          </Text>
          <Pressable
            style={{
              borderWidth: "2",
              borderRadius: 20,
              width: "20%",
              height: "80%",
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: "1%",
            }}
            // TODO: request the user to add the base stats shoes to optimize
            onPress={() => console.log("base stats")}
          >
            <Text style={{ fontSize: 12, fontWeight: "700" }}>Base</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "yellow",
              borderWidth: "2",
              borderRadius: 20,
              width: "25%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: "1%",
            }}
            onPress={() => console.log("optimize")}
          >
            <Text style={{ fontSize: 12, fontWeight: "700" }}>Optimize</Text>
          </Pressable>
        </View>
        <View
          style={{
            height: "30%",
            width: "80%",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              height: "20%",
              width: "100%%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={require("../../assets/stats/Efficiency.png")}
                style={{
                  resizeMode: "contain",
                  height: "60%",
                  width: "20%",
                }}
              ></Image>
              <Text
                style={{ marginLeft: "4%", fontSize: 12, fontWeight: "700" }}
              >
                Efficiency
              </Text>
            </View>
            {/* TODO systeme de remplissage par rapport au max et au stats de bases */}
            <View
              style={{
                width: "50%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: "green",
                  height: "30%",
                  marginRight: "4%",
                }}
              ></View>
              <Text style={{width:"20%"}}>{data ? data.efficiency : 0}</Text>
            </View>
          </View>
          <View
            style={{
              height: "20%",
              width: "100%%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={require("../../assets/stats/Luck.png")}
                style={{
                  resizeMode: "contain",
                  height: "60%",
                  width: "20%",
                }}
              ></Image>
              <Text
                style={{ marginLeft: "4%", fontSize: 12, fontWeight: "700" }}
              >
                Luck
              </Text>
            </View>
            {/* TODO systeme de remplissage par rapport au max et au stats de bases */}
            <View
              style={{
                width: "50%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: "green",
                  height: "30%",
                  marginRight: "4%",
                }}
              ></View>
              <Text style={{width:"20%"}}>{data ? data.luck : 0}</Text>
            </View>
          </View>
          <View
            style={{
              height: "20%",
              width: "100%%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={require("../../assets/stats/Comfort.png")}
                style={{
                  resizeMode: "contain",
                  height: "60%",
                  width: "20%",
                }}
              ></Image>
              <Text
                style={{ marginLeft: "4%", fontSize: 12, fontWeight: "700" }}
              >
                Comfort
              </Text>
            </View>
            {/* TODO systeme de remplissage par rapport au max et au stats de bases */}
            <View
              style={{
                width: "50%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: "green",
                  height: "30%",
                  marginRight: "4%",
                }}
              ></View>
              <Text style={{width:"20%"}}>{data ? data.comfort : 0}</Text>
            </View>
          </View>

          <View
            style={{
              height: "20%",
              width: "100%%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={require("../../assets/stats/Resilience.png")}
                style={{
                  resizeMode: "contain",
                  height: "60%",
                  width: "20%",
                }}
              ></Image>
              <Text
                style={{ marginLeft: "4%", fontSize: 12, fontWeight: "700" }}
              >
                Resilience
              </Text>
            </View>
            {/* TODO systeme de remplissage par rapport au max et au stats de bases */}
            <View
              style={{
                width: "50%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: "green",
                  height: "30%",
                  marginRight: "4%",
                }}
              ></View>
              <Text style={{width:"20%"}}>{data ? data.resilience : 0}</Text>
            </View>
          </View>
        </View>
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
