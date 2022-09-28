import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
  Alert,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firstLaunch } from "../services/users/index";
import {
  getSecuretValueFor,
  secureSave,
  deleteSecuretValueFor,
} from "../services/secureStorage/index";
import { RFValue } from "react-native-responsive-fontsize";
import ConnectionModal from "./modal/connectionModal";
import NotOfficialModal from "./modal/notOfficialModal";
import * as Notifications from "expo-notifications";
import { updatePushToken } from "../services/users/index";
import config from "../config.json";
export default function HomeScreen({ props, navigation }) {
  const [modalConnectionVisible, setModalConnectionVisible] = useState(true);
  const [modalNotOfficialVisible, setModalNotOfficialVisible] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    firstLaunch();
    checkNotOfficialModal();
    getNotificationToken();
    getUsername();
  }, []);

  async function checkNotOfficialModal() {
    var temp = await getSecuretValueFor("notOfficialModal");
    await setTimeout(() => {
      if (temp !== "true") {
        setModalNotOfficialVisible(true);
      } else {
        setModalNotOfficialVisible(false);
      }
    }, 200);
  }

  async function getNotificationToken() {
    await Notifications.requestPermissionsAsync();
    const token = await Notifications.getExpoPushTokenAsync();
    await updatePushToken({ notificationToken: token.data });
  }

  async function getUsername() {
    setUsername(await getSecuretValueFor("username"));
  }
  return (
    // <TouchableOpacity
    //     style={{
    //       flex: 1,
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //     activeOpacity={1}
    //     onPressOut={() => setModalNotOfficialVisible(false)}
    //   ></TouchableOpacity>
    <View style={{ width: "100%", height: "100%" }}>
      {/* <ConnectionModal
        setModaConnectionVisible={setModalConnectionVisible}
        modalConnectionVisible={modalConnectionVisible}
      ></ConnectionModal> */}
      <NotOfficialModal
        setModalNotOfficialVisible={setModalNotOfficialVisible}
        modalNotOfficialVisible={modalNotOfficialVisible}
      />
      <View style={styles.container}></View>
      <View style={styles.container2}>
        <Text
          style={{
            fontSize: RFValue(30, 800),
            fontWeight: "700",
            textAlign: "center",
            width: "80%",
          }}
        >
          Welcome to Step'n Stats app Beta {config.version}
        </Text>
        <Text
          style={{
            fontSize: RFValue(20, 800),
            fontWeight: "600",
            textAlign: "center",
            width: "80%",
          }}
        >
          If you have an issue, bug, freeze, or recommendation, you can submit
          it with this button.
        </Text>
        <Text
          style={{
            fontSize: RFValue(18, 800),
            fontWeight: "500",
            textAlign: "center",
            width: "80%",
          }}
        >
          Take a screenshot, video, or just give us a summary of the issue.
        </Text>
        <Text
          style={{
            fontSize: RFValue(18, 800),
            fontWeight: "500",
            textAlign: "center",
            width: "80%",
          }}
        >
          Here you username: {username}
        </Text>
        <Text
          style={{
            fontSize: RFValue(18, 800),
            fontWeight: "500",
            textAlign: "center",
            width: "80%",
          }}
        >
          Thank you so much to help Step'n Community!
        </Text>
        <Pressable
          style={{
            backgroundColor: "#9DF8B6",
            justifyContent: "center",
            alignContent: "center",
            width: "80%",
            height: "10%",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "black",
            shadowOpacity: 1,
            shadowRadius: 1,
            shadowOffset: {
              width: 1,
              height: 1,
            },
            width: "80%",
          }}
          onPress={async () => {
            Linking.openURL(
              `discord://discordapp.com/channels/1013742854201413652/1013756166758744086`
            );
          }}
        >
          <Text
            style={{
              fontSize: RFValue(30, 800),
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            Send Feedback
          </Text>
        </Pressable>
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
    fontSize: RFValue(36, 800),
  },
  selectorTextSecondary: {
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
    flex: 1,
    alignItems: "center",
    height: "65%",
    width: "100%",
    position: "absolute",
    top: "15%",
    justifyContent: "space-between",
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
