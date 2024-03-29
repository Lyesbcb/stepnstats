// TODO: Add help button
// TODO: Add filter (level filter, realm filter )
// TODO: Add sort (sort by price, sort by drop rate)
// TODO: Add update
// TODO: Switch to other currency
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
  RefreshControl,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import LittleMysteryBox from "./littleMysteryBox";
import {
  createMb,
  uploadMb,
  getAllMyMb,
  updateMb,
  deleteMb,
  navigation,
} from "../../services/mbs/index";
import * as ImagePicker from "expo-image-picker";
import BouncingPreloader from "react-native-bouncing-preloaders";
import DetailMysteryBox from "./detailMysteryBox";
import ProgressLoader from "rn-progress-loader";
import SelectRealmModal from "../modal/selectRealmModal";
import { RFValue } from "react-native-responsive-fontsize";
import HelpModal from "../modal/helpModal";
import ManualModal from "./manualModal";

export default function AllMysteryBoxScreen({ myFunction, mbs, navigation }) {
  const [mbSelected, setMbSelected] = useState(mbs.length != 0 ? 0 : null);
  const [realm, setRealm] = useState("Solana");
  const [manual, setManual] = useState("screenshots");
  const [loading, setLoading] = useState(false);
  const [modalRealmVisible, setmodalRealmVisible] = useState(false);
  const [modalOneMysteryBox, setmodalOneMysteryBox] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  const [modalManualVisible, setManualModalVisible] = useState(false);
  const [mysteryBoxLevel, setMysteryBoxLevel] = useState(0);
  const [contents, setContents] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [contentsQuantity, setContentsQuantity] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    console.log(editingId);
  }, [editingId]);
  function update(data) {
    setmodalOneMysteryBox(false);
    for (var i = 1; i < 7; i++) {
      if (data["content" + i] !== null) {
        contents[i - 1] = String(data["content" + i]);
        contentsQuantity[i - 1] = String(data["content" + i + "Quantity"]);
      }
    }
    setMysteryBoxLevel(data.lvl);
    setRealm(data.realm);
    setEditingId(data.id);
    setTimeout(function () {
      setManualModalVisible(true);
    }, 500);
  }

  function getTotal() {
    var total = 0;
    for (var i = 0; i < mbs.length; i++) {
      total += mbs[i].mbPrice;
    }
    return total.toFixed(2);
  }
  async function onRefresh() {
    await setRefreshing(true);
    await myFunction();
    await setRefreshing(false);
  }

  async function deleteOneMb(id) {
    try {
      await deleteMb(id);
      if ((mbSelected != 0) & (mbSelected != null)) {
        setMbSelected(mbSelected - 1);
      } else {
      }
      await myFunction();
      if ((mbSelected != 0) & (mbSelected != null)) {
      } else {
        setmodalOneMysteryBox(false);
      }
    } catch (error) {
      Alert.alert(error);
    }
  }

  function nextMb() {
    if (mbSelected != mbs.length - 1) {
      setMbSelected(mbSelected + 1);
    } else {
      setMbSelected(0);
    }
  }

  function previousMb() {
    if (mbSelected != 0) {
      setMbSelected(mbSelected - 1);
    } else {
      setMbSelected(mbs.length - 1);
    }
  }

  const pickImage = async () => {
    setmodalRealmVisible(false);
    if (manual === "screenshots") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.2,
        exif: true,
      });
      if (!result.cancelled) {
        setLoading(true);
        try {
          await uploadMb(result, realm);
        } catch (error) {
          Alert.alert(error);
        }
        setLoading(false);
        await myFunction();
      }
    } else {
      setManualModalVisible(true);
    }
  };

  return (
    <View
      style={{
        width: "90%",
        height: "67%",
      }}
    >
      <ProgressLoader
        visible={loading}
        isModal={true}
        isHUD={true}
        hudColor={"#000000"}
        color={"#FFFFFF"}
      />
      <ManualModal
        setModalVisible={setManualModalVisible}
        modalVisible={modalManualVisible}
        myFunction={myFunction}
        realm={realm}
        mysteryBoxLevel={mysteryBoxLevel}
        setMysteryBoxLevel={setMysteryBoxLevel}
        contents={contents}
        setContents={setContents}
        contentsQuantity={contentsQuantity}
        setContentsQuantity={setContentsQuantity}
        editingId={editingId}
        setEditing={setEditingId}
      ></ManualModal>
      <SelectRealmModal
        modalVisible={modalRealmVisible}
        setmodalVisible={setmodalRealmVisible}
        onValidate={pickImage}
        setValue={setRealm}
        value={realm}
        setValue2={setManual}
        value2={manual}
        textButton={"NEXT"}
      ></SelectRealmModal>
      <HelpModal
        modalHelpVisible={modalHelpVisible}
        setModalHelpVisible={setModalHelpVisible}
        screen={"mbs"}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOneMysteryBox}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPressOut={() => setmodalOneMysteryBox(false)}
        >
          <View
            style={{
              backgroundColor: "white",
              height: "60%",
              width: "90%",
              borderRadius: 30,
              borderWidth: 1,
              shadowColor: "#000",
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {mbs.length != 0 ? (
              <DetailMysteryBox
                data={mbs[mbSelected]}
                nextMb={nextMb}
                previousMb={previousMb}
                setmodalOneMysteryBox={setmodalOneMysteryBox}
                deleteOneMb={deleteOneMb}
                navigation={navigation}
                update={update}
              ></DetailMysteryBox>
            ) : (
              <View></View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
      <View
        style={{
          width: "100%",
          height: "5%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "70%",
            }}
          >
            {/* <Pressable
              style={{
                backgroundColor: "#9DF8B6",
                justifyContent: "center",
                alignContent: "center",
                width: "40%",
                height: "100%",
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
            >
              <Text
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Filter
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#9DF8B6",
                justifyContent: "center",
                alignContent: "center",
                width: "40%",
                height: "100%",
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
            >
              <Text
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                Sort by: {sortBy}
              </Text>
            </Pressable> */}
            <Text>Total value: {getTotal()}$</Text>
          </View>

          <View style={{ width: "20%", alignItems: "flex-end" }}>
            <Pressable
              style={{
                backgroundColor: "#9DF8B6",
                justifyContent: "center",
                alignContent: "center",
                width: "50%",
                height: "100%",
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
              onPress={() => setModalHelpVisible(true)}
            >
              <Text
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                ?
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={"black"}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        data={[0].concat(mbs)} //list of data array [{},{}]
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              if (!index) {
                setmodalRealmVisible(true);
              } else {
                setMbSelected(index - 1);
                setmodalOneMysteryBox(true);
              }
            }}
            style={{
              width: "45%",
              height: Dimensions.get("window").height * 0.22,
              margin: "2%",
            }}
            key={item.id}
          >
            {!index ? (
              <LittleMysteryBox data={0}></LittleMysteryBox>
            ) : (
              <LittleMysteryBox data={item}></LittleMysteryBox>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}

//you are using emulator?

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
