import {
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, componentDidMount } from "react";
import LittleNfts from "./littleNfts";
import {
  createNft,
  uploadNft,
  getAllMyNft,
  updateNft,
  deleteNft,
} from "../../services/nfts/index";
import * as ImagePicker from "expo-image-picker";
import DetailNfts from "./detailNfts";
import ProgressLoader from "rn-progress-loader";
import SelectRealmModal from "../modal/selectRealmModal";
import { TouchableWithoutFeedback } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function AllNftsScreen({ navigation, myFunction, nfts }) {
  const [realm, setRealm] = useState("Solana");
  const [loading, setLoading] = useState(false);
  const [modalRealmVisible, setmodalRealmVisible] = useState(false);
  const [modalOneNfts, setmodalOneNfts] = useState(false);
  const [nftsSelected, setNftsSelected] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);

  async function onRefresh() {
    await setRefreshing(true);
    await myFunction();
    await setRefreshing(false);
  }
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
        await uploadNft(result, realm);
        await myFunction();
      } catch (error) {
        Alert.alert(error);
      }
      setLoading(false);
    }
  };

  async function deleteOneNft(id) {
    try {
      await deleteNft(id);
      if ((nftsSelected != 0) & (nftsSelected != null)) {
        setNftsSelected(nftsSelected - 1);
      } else {
      }
      await myFunction();
      if ((nftsSelected != 0) & (nftsSelected != null)) {
      } else {
        setmodalOneNfts(false);
      }
    } catch (error) {
      Alert.alert(error);
    }
  }

  function nextNft() {
    if (nftsSelected != nfts.length - 1) {
      setNftsSelected(nftsSelected + 1);
    } else {
      setNftsSelected(0);
    }
  }

  function previousNft() {
    if (nftsSelected != 0) {
      setNftsSelected(nftsSelected - 1);
    } else {
      setNftsSelected(nfts.length - 1);
    }
  }

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
      <SelectRealmModal
        modalVisible={modalRealmVisible}
        setmodalVisible={setmodalRealmVisible}
        onValidate={pickImage}
        setValue={setRealm}
        value={realm}
        textButton={"NEXT"}
      ></SelectRealmModal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOneNfts}
        onRequestClose={() => setmodalOneNfts(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPressOut={() => setmodalOneNfts(false)}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: "white",
                marginTop: "8%",
                height: "67%",
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
              {nfts.length != 0 ? (
                <DetailNfts
                  data={nfts[nftsSelected]}
                  nextNft={nextNft}
                  previousNft={previousNft}
                  setmodalOneNfts={setmodalOneNfts}
                  deleteOneNft={deleteOneNft}
                  myFunction={myFunction}
                ></DetailNfts>
              ) : (
                <View></View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
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
        data={[0].concat(nfts)} //list of data array [{},{}]
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              if (!index) {
                setmodalRealmVisible(true);
              } else {
                setNftsSelected(index - 1);
                setmodalOneNfts(true);
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
              <LittleNfts data={0}></LittleNfts>
            ) : (
              <LittleNfts data={item}></LittleNfts>
            )}
          </Pressable>
        )}
      />
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
    top: "2%",
    right: "2%",
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
    height: "80%",
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
    height: "60%",
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
