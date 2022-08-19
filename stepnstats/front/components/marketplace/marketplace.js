import { Text, View, Pressable, Image, Alert, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import Legend from "./legend";
import { useEffect, useState, useCallback } from "react";
import Modal from "react-native-modal";
import Filter from "./filter";
import { RFValue } from "react-native-responsive-fontsize";

export default function Marketplace({
  selectedRealm,
  setSelectedRealm,
  mpsDay,
  mpsWeek,
  mpsMonth,
  myFunction,
  selectedContent,
  setSelectedContents,
}) {
  const color = ["#BABCBE", "#AED144", "#47ACED", "#A398EB", "#F5A836"];
  const [selectedTemporality, setSelectedTemporality] = useState("Day");
  const [isModalVisible, setModalVisible] = useState(false);

  function setLegends() {
    return selectedContent.map((content, i) => {
      return (
        <Legend
          setSelectedContents={setSelectedContents}
          selectedContent={selectedContent}
          key={i}
          id={i}
          name={content}
          myColor={color[i]}
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
            if (i === 0) {
              tempDatasets[y].data.push(0);
            }
            tempDatasets[y].data.push(mpsDay[i][selectedContent[y]]);
          }
        }
        for (var i = 0; i < mpsDay.length; i++) {
          if (i === 0) {
            tempLabels.push("");
          }
          tempLabels.push(
            new Date(mpsDay[i].createdAt).toLocaleTimeString().slice(0, -3)
          );
        }
        if (tempDatasets[0]) {
          tempDatasets[0].color = () => color[0];
        }
        if (tempDatasets[1]) {
          tempDatasets[1].color = () => color[1];
        }
        if (tempDatasets[2]) {
          tempDatasets[2].color = () => color[2];
        }
        if (tempDatasets[3]) {
          tempDatasets[3].color = () => color[3];
        }
        return (
          <LineChart
            verticalLabelRotation={90}
            data={{
              labels: tempLabels,
              datasets: tempDatasets,
            }}
            width={Dimensions.get("window").width - 50}
            height={Dimensions.get("window").width - 150}
            yAxisInterval={2}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            chartConfig={{
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
            }}
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
            if (i === 0) {
              tempDatasets[y].data.push(0);
            }
            tempDatasets[y].data.push(mpsWeek[i][selectedContent[y]]);
          }
        }
        for (var i = 0; i < mpsWeek.length; i += 91) {
          if (i === 0) {
            tempLabels.push("");
          }
          tempLabels.push(
            new Date(mpsWeek[i].createdAt).toLocaleDateString().slice(0, -5)
          );
        }
        if (tempDatasets[0]) {
          tempDatasets[0].color = () => color[0];
        }
        if (tempDatasets[1]) {
          tempDatasets[1].color = () => color[1];
        }
        if (tempDatasets[2]) {
          tempDatasets[2].color = () => color[2];
        }
        if (tempDatasets[3]) {
          tempDatasets[3].color = () => color[3];
        }
        return (
          <LineChart
            verticalLabelRotation={90}
            data={{
              labels: tempLabels,
              datasets: tempDatasets,
            }}
            width={Dimensions.get("window").width - 50}
            height={Dimensions.get("window").width - 150}
            yAxisInterval={2}
            chartConfig={{
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
            }}
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
            if (i === 0) {
              tempDatasets[y].data.push(0);
            }
            tempDatasets[y].data.push(mpsMonth[i][selectedContent[y]]);
          }
        }
        for (var i = 0; i < mpsMonth.length; i += 225) {
          if (i === 0) {
            tempLabels.push("");
          }
          tempLabels.push(
            new Date(mpsMonth[i].createdAt).toLocaleDateString().slice(0, -5)
          );
        }
        if (tempDatasets[0]) {
          tempDatasets[0].color = () => color[0];
        }
        if (tempDatasets[1]) {
          tempDatasets[1].color = () => color[1];
        }
        if (tempDatasets[2]) {
          tempDatasets[2].color = () => color[2];
        }
        if (tempDatasets[3]) {
          tempDatasets[3].color = () => color[3];
        }
        return (
          <LineChart
            verticalLabelRotation={90}
            data={{
              labels: tempLabels,
              datasets: tempDatasets,
            }}
            width={Dimensions.get("window").width - 50}
            height={Dimensions.get("window").width - 150}
            yAxisInterval={2}
            chartConfig={{
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
            }}
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
          height={Dimensions.get("window").width - 150}
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
              Click on filter
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
          setSelectedContents={setSelectedContents}
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
              Filter
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
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>D</Text>
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
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>W</Text>
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
              <Text style={{ fontSize: RFValue(20, 800), fontWeight: "700" }}>M</Text>
            </View>
          </Pressable>
        </View>
      </View>

      {setChart()}
      <View style={{ width: "80%", height: "30%" }}>
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
              setSelectedContents([]);
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
        <View style={{ flexDirection: "column", marginTop: "4%", flexGrow: 1 }}>
          {setLegends()}
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
    width: 30,
    height: 30,
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
    width: RFValue(30,800),
    height: RFValue(30,800),
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
    width: RFValue(30,800),
    height: RFValue(30,800),
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
    width: RFValue(30,800),
    height: RFValue(30,800),
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
    width: RFValue(30,800),
    height: RFValue(30,800),
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
    width: RFValue(30,800),
    height: RFValue(30,800),
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
