import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import Legend from "./legend";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import Filter from "./filter";
import { RFValue } from "react-native-responsive-fontsize";
import { Svg, Text as TextSVG, Rect } from "react-native-svg";

export default function Marketplace({
  selectedRealm,
  setSelectedRealm,
  mpsDay,
  mpsWeek,
  mpsMonth,
  myFunction,
  selectedContent,
  setSelectedContent,
}) {
  const color = ["#BABCBE", "#AED144", "#47ACED", "#A398EB", "#F5A836"];
  const [selectedTemporality, setSelectedTemporality] = useState("Day");
  const [isModalVisible, setModalVisible] = useState(false);
  const [currency, setCurrency] = useState("Dollars");
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  useEffect(() => {
    setTooltipPos({ x: 0, y: 0, visible: false, value: 0 });
  }, [currency, selectedTemporality]);
  const colors = {
    efficiencyLvl1: "#A4976B",
    efficiencyLvl2: "#B6A361",
    efficiencyLvl3: "#C9AF56",
    efficiencyLvl4: "#DBBB4C",
    efficiencyLvl5: "#EDC641",
    efficiencyLvl6: "#FFD237",
    luckLvl1: "#739AA4",
    luckLvl2: "#6CA7B6",
    luckLvl3: "#66B4C9",
    luckLvl4: "#5FC1DB",
    luckLvl5: "#59CEED",
    luckLvl6: "#52DBFF",
    comfortLvl1: "#A45B5B",
    comfortLvl2: "#B64949",
    comfortLvl3: "#C83737",
    comfortLvl4: "#DA2525",
    comfortLvl5: "#EC1212",
    comfortLvl6: "#FE0000",
    resilienceLvl1: "#857D9D",
    resilienceLvl2: "#877CAB",
    resilienceLvl3: "#8A7BBA",
    resilienceLvl4: "#8C7AC8",
    resilienceLvl5: "#8F78D7",
    resilienceLvl6: "#9177E5",
    runnerCommon: "#A1A2A3",
    joggerCommon: "#A9ABAC",
    walkerCommon: "#B2B3B5",
    trainerCommon: "#BABCBE",
    runnerUncommon: "#9AAE5E",
    joggerUncommon: "#A1BA55",
    walkerUncommon: "#A7C54D",
    trainerUncommon: "#AED144",
    runnerRare: "#5F99BE",
    joggerRare: "#579FCE",
    walkerRare: "#4FA6DD",
    trainerRare: "#47ACED",
    runnerEpic: "#948EBD",
    joggerEpic: "#9991CC",
    walkerEpic: "#9E95DC",
    trainerEpic: "#A398EB",
    commonScroll: "#BABCBE",
    uncommonScroll: "#AED144",
    rareScroll: "#47ACED",
    epicScroll: "#A398EB",
    legendaryScroll: "#F5A836",
    genesisCommon: "#BABCBE",
    genesisUncommon: "#AED144",
    genesisRare: "#47ACED",
    genesisEpic: "#A398EB",
    ogCommon: "#BABCBE",
    ogUncommon: "#AED144",
    ogRare: "#47ACED",
    ogEpic: "#A398EB",
  };

  const chartConfigCrypto = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 3,
    color: (opacity = 1) => "black",
    labelColor: (opacity = 1) => `black`,
    propsForDots: {
      r: "3",
      strokeWidth: "1",
      stroke: "white",
    },
    propsForVerticalLabels: {
      fontSize: RFValue(10, 800),
    },
    useShadowColorFromDataset: true,
  };

  const chartConfigDollars = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 0,
    color: (opacity = 1) => "black",
    labelColor: (opacity = 1) => `black`,
    propsForDots: {
      r: "3",
      strokeWidth: "1",
      stroke: "white",
    },
    propsForVerticalLabels: {
      fontSize: RFValue(10, 800),
    },
    useShadowColorFromDataset: true,
  };

  function setLegends() {
    return selectedContent.map((content, i) => {
      return (
        <Legend
          setSelectedContent={setSelectedContent}
          selectedContent={selectedContent}
          key={i}
          id={i}
          name={content}
          myColor={colors[selectedContent[i]]}
        ></Legend>
      );
    });
  }

  function setChart() {
    if (selectedContent.length) {
      var tempLabels = [];
      var tempDatasets = [];
      if (selectedTemporality === "Day") {
        for (var y = 0; y < selectedContent.length; y++) {
          tempDatasets[y] = { data: [] };
          tempDatasets[y].strokeWidth = 2;
          for (var i = 0; i < mpsDay.length; i++) {
            if (currency === "Crypto") {
              tempDatasets[y].data.push(mpsDay[i][selectedContent[y]]);
            } else {
              tempDatasets[y].data.push(
                Number(mpsDay[i][selectedContent[y]]) * mpsDay[i][selectedRealm]
              );
            }
          }
        }
        for (var i = 0; i < mpsDay.length; i++) {
          tempLabels.push(
            new Date(mpsDay[i].createdAt).toLocaleTimeString().slice(0, -3)
          );
        }
        if (tempDatasets[0]) {
          tempDatasets[0].color = () => colors[selectedContent[0]];
        }
        if (tempDatasets[1]) {
          tempDatasets[1].color = () => colors[selectedContent[1]];
        }
        if (tempDatasets[2]) {
          tempDatasets[2].color = () => colors[selectedContent[2]];
        }
        if (tempDatasets[3]) {
          tempDatasets[3].color = () => colors[selectedContent[3]];
        }
        return (
          <LineChart
            decorator={() => {
              return tooltipPos.visible ? (
                <View>
                  <Svg>
                    <Rect
                      rx={10}
                      x={tooltipPos.x - 30}
                      y={tooltipPos.y + 10}
                      width="60"
                      height="30"
                      fill="black"
                    />
                    <TextSVG
                      x={tooltipPos.x}
                      y={tooltipPos.y + 30}
                      fill="white"
                      fontSize={RFValue(12, 800)}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {tooltipPos.value.toFixed(2)}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
                tooltipPos.x === data.x && tooltipPos.y === data.y;

              isSamePoint
                ? setTooltipPos((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setTooltipPos({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
            fromZero={true}
            verticalLabelRotation={80}
            data={{
              labels: tempLabels,
              datasets: tempDatasets,
            }}
            width={Dimensions.get("window").width - 50}
            height={Dimensions.get("window").height * 0.4}
            yAxisInterval={2}
            // yAxisLabel="$"
            // yAxisSuffix="k"

            yAxisLabel={currency === "Crypto" ? "" : "$"}
            chartConfig={
              currency === "Crypto" ? chartConfigCrypto : chartConfigDollars
            }
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
            bezier
          />
        );
      }
      if (selectedTemporality === "Week") {
        for (var y = 0; y < selectedContent.length; y++) {
          tempDatasets[y] = { data: [] };
          tempDatasets[y].strokeWidth = 2;
          for (var i = 0; i < mpsWeek.length; i += 91) {
            if (currency === "Crypto") {
              tempDatasets[y].data.push(mpsWeek[i][selectedContent[y]]);
            } else {
              tempDatasets[y].data.push(
                Number(mpsWeek[i][selectedContent[y]]) *
                  mpsWeek[i][selectedRealm]
              );
            }
          }
        }
        for (var i = 0; i < mpsWeek.length; i += 91) {
          tempLabels.push(
            new Date(mpsWeek[i].createdAt).toLocaleDateString().slice(0, -5)
          );
        }
        if (tempDatasets[0]) {
          tempDatasets[0].color = () => colors[selectedContent[0]];
        }
        if (tempDatasets[1]) {
          tempDatasets[1].color = () => colors[selectedContent[1]];
        }
        if (tempDatasets[2]) {
          tempDatasets[2].color = () => colors[selectedContent[2]];
        }
        if (tempDatasets[3]) {
          tempDatasets[3].color = () => colors[selectedContent[3]];
        }
        return (
          <LineChart
            decorator={() => {
              return tooltipPos.visible ? (
                <View>
                  <Svg>
                    <Rect
                      rx={10}
                      x={tooltipPos.x - 30}
                      y={tooltipPos.y + 10}
                      width="60"
                      height="30"
                      fill="black"
                    />
                    <TextSVG
                      x={tooltipPos.x}
                      y={tooltipPos.y + 30}
                      fill="white"
                      fontSize={RFValue(12, 800)}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {tooltipPos.value.toFixed(2)}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
                tooltipPos.x === data.x && tooltipPos.y === data.y;

              isSamePoint
                ? setTooltipPos((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setTooltipPos({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
            fromZero={true}
            verticalLabelRotation={80}
            data={{
              labels: tempLabels,
              datasets: tempDatasets,
            }}
            width={Dimensions.get("window").width - 50}
            height={Dimensions.get("window").height * 0.4}
            yAxisInterval={2}
            yAxisLabel={currency === "Crypto" ? "" : "$"}
            chartConfig={
              currency === "Crypto" ? chartConfigCrypto : chartConfigDollars
            }
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
            bezier
          />
        );
      }
      if (selectedTemporality === "Month") {
        for (var y = 0; y < selectedContent.length; y++) {
          tempDatasets[y] = { data: [] };
          tempDatasets[y].strokeWidth = 2;
          for (var i = 0; i < mpsMonth.length; i += 225) {
            if (currency === "Crypto") {
              tempDatasets[y].data.push(mpsMonth[i][selectedContent[y]]);
            } else {
              tempDatasets[y].data.push(
                Number(mpsMonth[i][selectedContent[y]]) *
                  mpsMonth[i][selectedRealm]
              );
            }
          }
        }
        for (var i = 0; i < mpsMonth.length; i += 225) {
          tempLabels.push(
            new Date(mpsMonth[i].createdAt).toLocaleDateString().slice(0, -5)
          );
        }
        if (tempDatasets[0]) {
          tempDatasets[0].color = () => colors[selectedContent[0]];
        }
        if (tempDatasets[1]) {
          tempDatasets[1].color = () => colors[selectedContent[1]];
        }
        if (tempDatasets[2]) {
          tempDatasets[2].color = () => colors[selectedContent[2]];
        }
        if (tempDatasets[3]) {
          tempDatasets[3].color = () => colors[selectedContent[3]];
        }
        return (
          <LineChart
            decorator={() => {
              return tooltipPos.visible ? (
                <View>
                  <Svg>
                    <Rect
                      rx={10}
                      x={tooltipPos.x - 30}
                      y={tooltipPos.y + 10}
                      width="60"
                      height="30"
                      fill="black"
                    />
                    <TextSVG
                      x={tooltipPos.x}
                      y={tooltipPos.y + 30}
                      fill="white"
                      fontSize={RFValue(12, 800)}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {tooltipPos.value.toFixed(2)}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
                tooltipPos.x === data.x && tooltipPos.y === data.y;

              isSamePoint
                ? setTooltipPos((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setTooltipPos({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
            fromZero={true}
            verticalLabelRotation={80}
            data={{
              labels: tempLabels,
              datasets: tempDatasets,
            }}
            width={Dimensions.get("window").width - 50}
            height={Dimensions.get("window").height * 0.4}
            yAxisInterval={2}
            yAxisLabel={currency === "Crypto" ? "" : "$"}
            chartConfig={
              currency === "Crypto" ? chartConfigCrypto : chartConfigDollars
            }
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
            bezier
          />
        );
      }
    } else {
      return (
        <View
          width={Dimensions.get("window").width - 50} // from react-native
          height={Dimensions.get("window").height * 0.4}
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "black",
            shadowColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Icon></Icon>
            <Text style={{ fontSize: RFValue(30, 800), fontWeight: "800" }}>
              Click on add
            </Text>
          </View>
        </View>
      );
    }
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "70%",
      }}
    >
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={() => setModalVisible(false)}
        style={{ margin: 0 }}
      >
        <Filter
          setSelectedRealm={setSelectedRealm}
          myFunction={myFunction}
          selectedRealm={selectedRealm}
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
          setModalVisible={setModalVisible}
        ></Filter>
      </Modal>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          width: "90%",
          height: "5%",
          alignItems: "center",
          marginBottom: "4%",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "30%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#9DF8B6",
              justifyContent: "center",
              alignContent: "center",
              width: "60%",
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
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                fontWeight: "800",
                fontSize: RFValue(20, 800),
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              ADD
            </Text>
          </Pressable>
          {selectedRealm == "Solana" ? (
            <Image
              source={require("../../assets/sol_realm.png")}
              style={{
                width: "30%",
                height: "100%",
                resizeMode: "contain",
              }}
            ></Image>
          ) : selectedRealm == "Bnb" ? (
            <Image
              source={require("../../assets/bsc_realm.png")}
              style={{
                width: "30%",
                height: "100%",
                resizeMode: "contain",
              }}
            ></Image>
          ) : selectedRealm == "Ethereum" ? (
            <Image
              source={require("../../assets/eth_realm.png")}
              style={{
                width: "30%",
                height: "100%",
                resizeMode: "contain",
              }}
            ></Image>
          ) : (
            <View></View>
          )}
        </View>

        <View
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            width: "30%",
          }}
        >
          <Pressable
            onPress={() => {
              setSelectedTemporality("Day");
            }}
          >
            <View
              style={
                selectedTemporality === "Day"
                  ? styles.dayTemporalityActive
                  : styles.dayTemporality
              }
            >
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
                D
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedTemporality("Week");
            }}
          >
            <View
              style={
                selectedTemporality === "Week"
                  ? styles.weekTemporalityActive
                  : styles.weekTemporality
              }
            >
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
                W
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelectedTemporality("Month");
            }}
          >
            <View
              style={
                selectedTemporality === "Month"
                  ? styles.monthTemporalityActive
                  : styles.monthTemporality
              }
            >
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>
                M
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View>
        {setChart()}
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

      <View style={{ width: "80%", height: "20%" }}>
        <View
          style={{
            width: "100%",
            height: "20%",
            alignContent: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "4%",
          }}
        >
          <Text
            style={{
              fontWeight: "800",
              fontSize: RFValue(18, 800),
            }}
          >
            Legend
          </Text>
          <Pressable
            onPress={() => {
              setSelectedContent([]);
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: RFValue(16, 800),
                color: "gold",
              }}
            >
              Delete all
            </Text>
          </Pressable>
        </View>
        <View style={{ marginTop: "4%", height: "100%" }}>
          <ScrollView
            style={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {setLegends()}
          </ScrollView>
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
  dayTemporality: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#61F2FC",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  dayTemporalityActive: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#61F2FC",
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
  },
  weekTemporality: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#EB78E7",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  weekTemporalityActive: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#EB78E7",
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
  },
  monthTemporality: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#FFE922",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  monthTemporalityActive: {
    width: RFValue(30, 800),
    height: RFValue(30, 800),
    backgroundColor: "#FFE922",
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
  },
  selectTemporality: {
    justifyContent: "flex-end",
    flexDirection: "row",
    position: "absolute",
    right: "5%",
    top: "3%",
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
