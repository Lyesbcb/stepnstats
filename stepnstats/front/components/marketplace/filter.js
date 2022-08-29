import { useState } from "react";
import { Text, View, Pressable, Image, Alert, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

export default function Filter({
  setSelectedRealm,
  selectedRealm,
  selectedContent,
  setSelectedContent,
  setModalVisible,
  myFunction,
}) {
  const [type, setType] = useState("");
  //Sneakers
  const [sneakersRarity, setSneakersRarity] = useState("");
  const [sneakerClass, setSneakersClass] = useState("");
  const [sneakersQuality, setSneakersQuality] = useState("");
  const [sneakersLvl, setSneakersLvl] = useState("");
  const [sneakersMint, setSneakersMint] = useState("");
  //Shoeboxes
  const [shoeboxesRarity, setShoeboxesRarity] = useState("");
  const [shoeboxesQuality, setShoeboxesQuality] = useState("");
  //Gems
  const [gemType, setGemType] = useState("");
  const [gemLvl, setGemLvl] = useState("");
  //Scroll
  const [scrollQuality, setScrollQuality] = useState("");

  function clearFilter() {
    setSneakersRarity("");
    setSneakersClass("");
    setSneakersQuality("");
    setSneakersLvl("");
    setSneakersMint("");
    setGemType("");
    setGemLvl("");
    setScrollQuality("");
  }


  function add() {
    var value = "";
    var error = false;
    var errorMessage = "Error";
    if (type === "Sneakers") {
      if (sneakersRarity !== "") {
        if (sneakersQuality != "") {
          value = sneakersRarity.toLocaleLowerCase() + sneakersQuality;
        } else {
          error = true;
          errorMessage = "You must choose sneaker quality!";
        }
      } else {
        if ((sneakerClass !== "") & (sneakersQuality !== "")) {
          value = sneakerClass.toLocaleLowerCase() + sneakersQuality;
        } else {
          error = true;
          errorMessage = "You must choose sneaker class and quality!";
        }
      }
    }
    if (type === "Shoeboxes") {
      if (shoeboxesRarity !== "") {
        error = true;
      } else {
        error = true;
        value = shoeboxesQuality.toLocaleLowerCase() + "Shoebox";
      }
    }
    if (type === "Scrolls") {
      if (scrollQuality !== "") {
        value = scrollQuality.toLocaleLowerCase() + "Scroll";
      } else {
        error = true;
        errorMessage = "You must choose scroll quality!";
      }
    }
    if (type === "Gems") {
      if ((gemType !== "") & (gemLvl !== "")) {
        value = gemType.toLocaleLowerCase() + "Lvl" + gemLvl;
      } else {
        error = true;
        errorMessage = "You must choose gem type and level!";
      }
    }
    for (var i = 0; i < selectedContent.length; i++) {
      if (selectedContent[i] === value) {
        error = true;
        errorMessage = "This filter already exists!";
      }
    }
    if (error) {
      Alert.alert(errorMessage);
    } else {
      var tempArray = selectedContent;
      tempArray.push(value);
      setSelectedContent(tempArray);
      setModalVisible(false);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        right: 0,
        height: "80%",
        width: "80%",
        backgroundColor: "white",
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: RFValue(20, 800),
          fontWeight: "800",
          marginVertical: "4%",
        }}
      >
        Chart Filter
      </Text>
      <Pressable
        style={{
          right: "4%",
          top: "4%",
          position: "absolute",
        }}
        onPress={() => clearFilter()}
      >
        <Text
          style={{
            fontSize: RFValue(14, 800),
            fontWeight: "800",
            color: "gold",
          }}
        >
          Clear Filter
        </Text>
      </Pressable>

      {/* Select Realm */}
      <View
        style={{
          width: "80%",
          height: "10%",
        }}
      >
        <Text style={{ left: "4%", top: "-4%", top: "-4%" }}>Realm</Text>

        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{ width: "15%", height: "100%" }}
            onPress={() => {
              setSelectedRealm("Solana");
              myFunction("Solana");
            }}
          >
            <Image
              source={require("../../assets/sol_realm.png")}
              style={
                selectedRealm == "Solana" ? styles.realmActive : styles.realm
              }
            ></Image>
          </Pressable>
          <Pressable
            style={{ width: "15%", height: "100%" }}
            onPress={() => {
              setSelectedRealm("Bnb");
              myFunction("Bnb");
            }}
          >
            <Image
              source={require("../../assets/bsc_realm.png")}
              style={selectedRealm == "Bnb" ? styles.realmActive : styles.realm}
            ></Image>
          </Pressable>
          <Pressable
            style={{ width: "15%", height: "100%" }}
            onPress={() => {
              setSelectedRealm("Ethereum");
              myFunction("Ethereum");
            }}
          >
            <Image
              source={require("../../assets/eth_realm.png")}
              style={
                selectedRealm == "Ethereum" ? styles.realmActive : styles.realm
              }
            ></Image>
          </Pressable>
        </View>
      </View>
      {/* Type */}
      <View
        style={{
          width: "80%",
          height: "15%",
          justifyContent: "space-evenly",
          marginTop: "5%",
        }}
      >
        <Text style={{ left: "4%", top: "-4%", top: "-4%" }}>Type</Text>
        <View
          style={{
            width: "100%",
            height: "40%",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={type === "Sneakers" ? styles.buttonActive : styles.button}
            onPress={() => setType("Sneakers")}
          >
            <Text
              style={{
                fontWeight: "700",
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              Sneakers
            </Text>
          </Pressable>
          <Pressable
            style={type === "Shoeboxes" ? styles.buttonActive : styles.button}
            onPress={() => setType("Shoeboxes")}
          >
            <Text
              style={{
                fontWeight: "700",
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              Shoeboxes
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            width: "100%",
            height: "40%",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={type === "Gems" ? styles.buttonActive : styles.button}
            onPress={() => setType("Gems")}
          >
            <Text
              style={{
                fontWeight: "700",
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              Gems
            </Text>
          </Pressable>
          <Pressable
            style={type === "Scrolls" ? styles.buttonActive : styles.button}
            onPress={() => setType("Scrolls")}
          >
            <Text
              style={{
                fontWeight: "700",
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              Scrolls
            </Text>
          </Pressable>
        </View>
      </View>
      {type === "Sneakers" ? (
        // Sneakers
        <View
          style={{
            height: "65%",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              height: "10%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ left: "4%", top: "-20%" }}>Rarity</Text>
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  sneakersRarity === "Genesis"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  sneakersRarity === "Genesis"
                    ? () => setSneakersRarity("")
                    : () => setSneakersRarity("Genesis")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Genesis
                </Text>
              </Pressable>
              <Pressable
                style={
                  sneakersRarity === "OG" ? styles.buttonActive : styles.button
                }
                onPress={
                  sneakersRarity === "OG"
                    ? () => setSneakersRarity("")
                    : () => setSneakersRarity("OG")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  OG
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              height: "20%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ left: "4%", top: "-4%" }}>Class</Text>
            <View
              style={{
                width: "100%",
                height: "40%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  sneakerClass === "Walker"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  sneakerClass === "Walker"
                    ? () => setSneakersClass("")
                    : () => setSneakersClass("Walker")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Walker
                </Text>
              </Pressable>
              <Pressable
                style={
                  sneakerClass === "Jogger"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  sneakerClass === "Jogger"
                    ? () => setSneakersClass("")
                    : () => setSneakersClass("Jogger")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Jogger
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "40%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  sneakerClass === "Runner"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  sneakerClass === "Runner"
                    ? () => setSneakersClass("")
                    : () => setSneakersClass("Runner")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Runner
                </Text>
              </Pressable>
              <Pressable
                style={
                  sneakerClass === "Trainer"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  sneakerClass === "Trainer"
                    ? () => setSneakersClass("")
                    : () => setSneakersClass("Trainer")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Trainer
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              height: "30%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ left: "4%", top: "-4%" }}>Quality</Text>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  sneakersQuality === "Common"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  sneakersQuality === "Common"
                    ? () => setSneakersQuality("")
                    : () => setSneakersQuality("Common")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Common
                </Text>
              </Pressable>
              <Pressable
                style={
                  sneakersQuality === "Uncommon"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  sneakersQuality === "Uncommon"
                    ? () => setSneakersQuality("")
                    : () => setSneakersQuality("Uncommon")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Uncommon
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  sneakersQuality === "Rare"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  sneakersQuality === "Rare"
                    ? () => setSneakersQuality("")
                    : () => setSneakersQuality("Rare")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Rare
                </Text>
              </Pressable>
              <Pressable
                style={
                  sneakersQuality === "Epic"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  sneakersQuality === "Epic"
                    ? () => setSneakersQuality("")
                    : () => setSneakersQuality("Epic")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Epic
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  sneakersQuality === "Legendary"
                    ? styles.buttonActive
                    : styles.button
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Legendary
                </Text>
              </Pressable>
            </View>
          </View>
          {/* <View
            style={{
              width: "80%",
              height: "15%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ left: "4%", top: "-4%",  }}>Level</Text>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  sneakersLvl === "0" ? styles.buttonActive : styles.button
                }
                onPress={() => setSneakersLvl("0")}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  0
                </Text>
              </Pressable>
              <Pressable
                style={
                  sneakersLvl === "5" ? styles.buttonActive : styles.button
                }
                onPress={() => setSneakersLvl("5")}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  5
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  sneakersLvl === "10" ? styles.buttonActive : styles.button
                }
                onPress={() => setSneakersLvl("10")}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  10
                </Text>
              </Pressable>
              <Pressable
                style={
                  sneakersLvl === "20" ? styles.buttonActive : styles.button
                }
                onPress={() => setSneakersLvl("20")}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  20
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  sneakersLvl === "28" ? styles.buttonActive : styles.button
                }
                onPress={() => setSneakersLvl("28")}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  28
                </Text>
              </Pressable>
              <Pressable
                style={
                  sneakersLvl === "30" ? styles.buttonActive : styles.button
                }
                onPress={() => setSneakersLvl("30")}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  30
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              height: "5%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ left: "4%", top: "-4%",  }}>Mint</Text>
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  sneakersMint === "0" ? styles.buttonActive : styles.button
                }
                onPress={() => setSneakersMint("0")}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  0
                </Text>
              </Pressable>
              <Pressable
                style={
                  sneakersMint === "2" ? styles.buttonActive : styles.button
                }
                onPress={() => setSneakersMint("2")}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  2
                </Text>
              </Pressable>
            </View>
          </View> */}
          <View
            style={{
              height: "10%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable style={styles.buttonActive} onPress={() => add()}>
              <Text
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: RFValue(20, 800),
                }}
              >
                ADD
              </Text>
            </Pressable>
          </View>
        </View>
      ) : type === "Shoeboxes" ? (
        // Shoebox
        <View
          style={{
            height: "65%",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              height: "10%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ left: "4%", top: "-20%" }}>Rarity</Text>
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  shoeboxesRarity === "Genesis"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  shoeboxesRarity === "Genesis"
                    ? () => setShoeboxesRarity("")
                    : () => setShoeboxesRarity("Genesis")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Genesis
                </Text>
              </Pressable>
              <Pressable
                style={
                  shoeboxesRarity === "OG" ? styles.buttonActive : styles.button
                }
                onPress={
                  shoeboxesRarity === "OG"
                    ? () => setShoeboxesRarity("")
                    : () => setShoeboxesRarity("OG")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  OG
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              height: "30%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ left: "4%", top: "-4%" }}>Quality</Text>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  shoeboxesQuality === "Common"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  shoeboxesQuality === "Common"
                    ? () => setShoeboxesQuality("")
                    : () => setShoeboxesQuality("Common")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Common
                </Text>
              </Pressable>
              <Pressable
                style={
                  shoeboxesQuality === "Uncommon"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  shoeboxesQuality === "Uncommon"
                    ? () => setShoeboxesQuality("")
                    : () => setShoeboxesQuality("Uncommon")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Uncommon
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  shoeboxesQuality === "Rare"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  shoeboxesQuality === "Rare"
                    ? () => setShoeboxesQuality("")
                    : () => setShoeboxesQuality("Rare")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Rare
                </Text>
              </Pressable>
              <Pressable
                style={
                  shoeboxesQuality === "Epic"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  shoeboxesQuality === "Epic"
                    ? () => setShoeboxesQuality("")
                    : () => setShoeboxesQuality("Epic")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Epic
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  shoeboxesQuality === "Legendary"
                    ? styles.buttonActive
                    : styles.button
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Legendary
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              height: "10%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable style={styles.buttonActive} onPress={() => add()}>
              <Text
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: RFValue(20, 800),
                }}
              >
                ADD
              </Text>
            </Pressable>
          </View>
        </View>
      ) : type === "Gems" ? (
        // Shoebox
        <View
          style={{
            height: "65%",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              height: "30%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ left: "4%", top: "-4%" }}>Type</Text>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  gemType === "Efficiency" ? styles.buttonActive : styles.button
                }
                onPress={
                  gemType === "Efficiency"
                    ? () => setGemType("")
                    : () => setGemType("Efficiency")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Efficiency
                </Text>
              </Pressable>
              <Pressable
                style={gemType === "Luck" ? styles.buttonActive : styles.button}
                onPress={
                  gemType === "Luck"
                    ? () => setGemType("")
                    : () => setGemType("Luck")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Luck
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  gemType === "Comfort" ? styles.buttonActive : styles.button
                }
                onPress={
                  gemType === "Comfort"
                    ? () => setGemType("")
                    : () => setGemType("Comfort")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Comfort
                </Text>
              </Pressable>
              <Pressable
                style={
                  gemType === "Resilience" ? styles.buttonActive : styles.button
                }
                onPress={
                  gemType === "Resilience"
                    ? () => setGemType("")
                    : () => setGemType("Resilience")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Resilience
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              width: "80%",
              height: "30%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ left: "4%", top: "-4%" }}>Level</Text>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={gemLvl === "1" ? styles.buttonActive : styles.button}
                onPress={
                  gemLvl === "1" ? () => setGemLvl("") : () => setGemLvl("1")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  1
                </Text>
              </Pressable>
              <Pressable
                style={gemLvl === "2" ? styles.buttonActive : styles.button}
                onPress={
                  gemLvl === "2" ? () => setGemLvl("") : () => setGemLvl("2")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  2
                </Text>
              </Pressable>
            </View>

            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={gemLvl === "3" ? styles.buttonActive : styles.button}
                onPress={
                  gemLvl === "3" ? () => setGemLvl("") : () => setGemLvl("3")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  3
                </Text>
              </Pressable>
              <Pressable
                style={gemLvl === "4" ? styles.buttonActive : styles.button}
                onPress={
                  gemLvl === "4" ? () => setGemLvl("") : () => setGemLvl("4")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  4
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={gemLvl === "5" ? styles.buttonActive : styles.button}
                onPress={
                  gemLvl === "5" ? () => setGemLvl("") : () => setGemLvl("5")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  5
                </Text>
              </Pressable>
              <Pressable
                style={gemLvl === "6" ? styles.buttonActive : styles.button}
                onPress={
                  gemLvl === "6" ? () => setGemLvl("") : () => setGemLvl("6")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  6
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              height: "10%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable style={styles.buttonActive} onPress={() => add()}>
              <Text
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: RFValue(20, 800),
                }}
              >
                ADD
              </Text>
            </Pressable>
          </View>
        </View>
      ) : type === "Scrolls" ? (
        // Shoebox
        <View
          style={{
            height: "65%",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              height: "30%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ left: "4%", top: "-4%" }}>Quality</Text>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  scrollQuality === "Common"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  scrollQuality === "Common"
                    ? () => setScrollQuality("")
                    : () => setScrollQuality("Common")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Common
                </Text>
              </Pressable>
              <Pressable
                style={
                  scrollQuality === "Uncommon"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  scrollQuality === "Uncommon"
                    ? () => setScrollQuality("")
                    : () => setScrollQuality("Uncommon")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Uncommon
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  scrollQuality === "Rare" ? styles.buttonActive : styles.button
                }
                onPress={
                  scrollQuality === "Rare"
                    ? () => setScrollQuality("")
                    : () => setScrollQuality("Rare")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Rare
                </Text>
              </Pressable>
              <Pressable
                style={
                  scrollQuality === "Epic" ? styles.buttonActive : styles.button
                }
                onPress={
                  scrollQuality === "Epic"
                    ? () => setScrollQuality("")
                    : () => setScrollQuality("Epic")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Epic
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "30%",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={
                  scrollQuality === "Legendary"
                    ? styles.buttonActive
                    : styles.button
                }
                onPress={
                  scrollQuality === "Legendary"
                    ? () => setScrollQuality("")
                    : () => setScrollQuality("Legendary")
                }
              >
                <Text
                  style={{
                    fontWeight: "700",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Legendary
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              height: "10%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable style={styles.buttonActive} onPress={() => add()}>
              <Text
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontSize: RFValue(20, 800),
                }}
              >
                ADD
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonActive: {
    backgroundColor: "#9DF8B6",
    justifyContent: "center",
    alignContent: "center",
    width: "40%",
    height: "90%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  button: {
    justifyContent: "center",
    alignContent: "center",
    width: "40%",
    height: "90%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
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
});
