import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Icon from "react-native-elements/dist/icons/Icon";
import { RFValue } from "react-native-responsive-fontsize";
import { createNotification } from "../../services/notifications/index";
import * as Notifications from "expo-notifications";
import { updatePushToken } from "../../services/users/index";

export default function NotificationModal({
  setModalNotificationVisible,
  modalNotificationVisible,
  content,
  lastPrice,
  selectedRealm,
  setSelectedRealm,
  myFunction,
  currency,
  setCurrency,
  contentPrice,
  setContentPrice
}) {
  const [type, setType] = useState("above");
  const contents = {
    efficiencyLvl1: "Gem Efficiency Lvl 1",
    efficiencyLvl2: "Gem Efficiency Lvl 2",
    efficiencyLvl3: "Gem Efficiency Lvl 3",
    efficiencyLvl4: "Gem Efficiency Lvl 4",
    efficiencyLvl5: "Gem Efficiency Lvl 5",
    efficiencyLvl6: "Gem Efficiency Lvl 6",
    efficiencyLvl7: "Gem Efficiency Lvl 7",
    efficiencyLvl8: "Gem Efficiency Lvl 8",
    efficiencyLvl9: "Gem Efficiency Lvl 9",
    luckLvl1: "Gem Luck Lvl 1",
    luckLvl2: "Gem Luck Lvl 2",
    luckLvl3: "Gem Luck Lvl 3",
    luckLvl4: "Gem Luck Lvl 4",
    luckLvl5: "Gem Luck Lvl 5",
    luckLvl6: "Gem Luck Lvl 6",
    luckLvl7: "Gem Luck Lvl 7",
    luckLvl8: "Gem Luck Lvl 8",
    luckLvl9: "Gem Luck Lvl 9",
    comfortLvl1: "Gem Comfort Lvl 1",
    comfortLvl2: "Gem Comfort Lvl 2",
    comfortLvl3: "Gem Comfort Lvl 3",
    comfortLvl4: "Gem Comfort Lvl 4",
    comfortLvl5: "Gem Comfort Lvl 5",
    comfortLvl6: "Gem Comfort Lvl 6",
    comfortLvl7: "Gem Comfort Lvl 7",
    comfortLvl8: "Gem Comfort Lvl 8",
    comfortLvl9: "Gem Comfort Lvl 9",
    resilienceLvl1: "Gem Resilience Lvl 1",
    resilienceLvl2: "Gem Resilience Lvl 2",
    resilienceLvl3: "Gem Resilience Lvl 3",
    resilienceLvl4: "Gem Resilience Lvl 4",
    resilienceLvl5: "Gem Resilience Lvl 5",
    resilienceLvl6: "Gem Resilience Lvl 6",
    resilienceLvl7: "Gem Resilience Lvl 7",
    resilienceLvl8: "Gem Resilience Lvl 8",
    resilienceLvl9: "Gem Resilience Lvl 9",
    walkerCommon: "Sneaker Walker Common",
    joggerCommon: "Sneaker Jogger Common",
    runnerCommon: "Sneaker Runner Common",
    trainerCommon: "Sneaker Trainer Common",
    walkerUncommon: "Sneaker Walker Uncommon",
    joggerUncommon: "Sneaker Jogger Uncommon",
    runnerUncommon: "Sneaker Runner Uncommon",
    trainerUncommon: "Sneaker Trainer Uncommon",
    walkerRare: "Sneaker Walker Rare",
    joggerRare: "Sneaker Jogger Rare",
    runnerRare: "Sneaker Runner Rare",
    trainerRare: "Sneaker Trainer Rare",
    walkerEpic: "Sneaker Walker Epic",
    joggerEpic: "Sneaker Jogger Epic",
    runnerEpic: "Sneaker Runner Epic",
    trainerEpic: "Sneaker Trainer Epic",
    commonScroll: "Common Scroll",
    uncommonScroll: "Uncommon Scroll",
    rareScroll: "Rare Scroll",
    epicScroll: "Epic Scroll",
    legendaryScroll: "Legendary Scroll",
    genesisCommon: "Sneaker Genesis Common",
    genesisUncommon: "Sneaker Genesis Uncommon",
    genesisRare: "Sneaker Genesis Rare",
    genesisEpic: "Sneaker Genesis Epic",
    ogCommon: "Sneaker OG Common",
    ogUncommon: "Sneaker OG Uncommon",
    ogRare: "Sneaker OG Rare",
    ogEpic: "Sneaker OG Epic",
  };
  useEffect(() => {
    setSelectedRealm(selectedRealm);
    myFunction(selectedRealm);
  }, [selectedRealm]);

  async function addNotification() {
    var result = await Notifications.requestPermissionsAsync();
    console.log(result);
    if (result.status === "denied") {
      Alert.alert(
        "You need to accept notification in your settings to get notifications!"
      );
      return;
    } else {
      const token = await Notifications.getExpoPushTokenAsync();
      await updatePushToken({ notificationToken: token.data });
    }

    var params = {
      content,
      contentPrice,
      type,
      currency,
      realm: selectedRealm,
    };
    if (!contentPrice) {
      Alert.alert("You need to set content price!");
      return;
    }
    await createNotification(params)
      .then(() => {
        setModalNotificationVisible(false);
      })
      .catch((err) => {
        Alert.alert(err);
      });
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalNotificationVisible}
    >
      <KeyboardAvoidingView
        behavior={"position"}
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              backgroundColor: "white",
              height: "60%",
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
              onPress={() => setModalNotificationVisible(false)}
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
              {contents[content]}
            </Text>
            <View
              style={{
                justifyContent: "space-arround",
                alignItems: "center",
                alignContent: "center",
                height: "10%",
                width: "80%",
              }}
            >
              <Text style={{ fontSize: RFValue(12, 800), fontWeight: "600" }}>
                Floor price is:
              </Text>
              <View
                style={{
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  alignContent: "center",
                  height: "90%",
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <Pressable
                  style={type === "below" ? styles.typeActive : styles.type}
                  onPress={() => setType("below")}
                >
                  <Text
                    style={{ fontWeight: "800", fontSize: RFValue(16, 800) }}
                    adjustsFontSizeToFit
                  >
                    {"<="}
                  </Text>
                </Pressable>
                <Pressable
                  style={type === "above" ? styles.typeActive : styles.type}
                  onPress={() => setType("above")}
                >
                  <Text
                    style={{ fontWeight: "800", fontSize: RFValue(16, 800) }}
                    adjustsFontSizeToFit
                  >
                    {">="}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                height: "20%",
                width: "100%",
              }}
            >
              <Pressable
                style={{ width: "15%", height: "100%" }}
                onPress={() => setSelectedRealm("Solana")}
              >
                <Image
                  source={require("../../assets/sol_realm.png")}
                  style={
                    selectedRealm == "Solana"
                      ? styles.realmActive
                      : styles.realm
                  }
                ></Image>
              </Pressable>
              <Pressable
                style={{ width: "15%", height: "100%" }}
                onPress={() => setSelectedRealm("Bnb")}
              >
                <Image
                  source={require("../../assets/bsc_realm.png")}
                  style={
                    selectedRealm == "Bnb" ? styles.realmActive : styles.realm
                  }
                ></Image>
              </Pressable>
              <Pressable
                style={{ width: "15%", height: "100%" }}
                onPress={() => setSelectedRealm("Ethereum")}
              >
                <Image
                  source={require("../../assets/eth_realm.png")}
                  style={
                    selectedRealm == "Ethereum"
                      ? styles.realmActive
                      : styles.realm
                  }
                ></Image>
              </Pressable>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "20%",
                width: "70%",
              }}
            >
              <Text>
                Current price:{" "}
                {lastPrice != undefined
                  ? currency === "Crypto"
                    ? lastPrice[content]
                    : (lastPrice[content] * lastPrice[selectedRealm]).toFixed(
                        2
                      ) + "$"
                  : 0}
              </Text>
              <TextInput
                style={{
                  height: "50%",
                  borderWidth: 1,
                  paddingHorizontal: "20%",
                  borderRadius: 20,
                }}
                onChangeText={setContentPrice}
                placeholder={String(
                  lastPrice != undefined
                    ? currency === "Crypto"
                      ? lastPrice[content]
                      : (lastPrice[content] * lastPrice[selectedRealm]).toFixed(
                          2
                        )
                    : 0
                )}
                placeholderTextColor={"grey"}
                keyboardType="numeric"
                returnKeyType="done"
              />
            </View>
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-evenly",
                height: "10%",
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
                onPress={() => addNotification()}
              >
                <Text style={{ fontWeight: "700", fontSize: RFValue(24, 800) }}>
                  ADD
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={{
                width: RFValue(30, 800),
                height: RFValue(30, 800),
                backgroundColor: "white",
                borderRadius: 5,
                borderColor: "black",
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center",
                shadowOpacity: 1,
                shadowRadius: 1,
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                bottom: "5%",
                left: "5%",
                position: "absolute",
              }}
              onPress={() => {
                currency === "Crypto"
                  ? setCurrency("Dollars")
                  : setCurrency("Crypto");
              }}
            >
              {currency === "Crypto" ? (
                <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
                  $
                </Text>
              ) : selectedRealm === "Solana" ? (
                <Image
                  source={require("../../assets/solana.png")}
                  style={{
                    width: "60%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                ></Image>
              ) : selectedRealm === "Ethereum" ? (
                <Image
                  source={require("../../assets/ethereum.png")}
                  style={{
                    width: "60%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                ></Image>
              ) : selectedRealm === "Bnb" ? (
                <Image
                  source={require("../../assets/bnb.png")}
                  style={{
                    width: "60%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                ></Image>
              ) : (
                <View></View>
              )}
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  typeActive: {
    width: "30%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  type: {
    width: "30%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
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
