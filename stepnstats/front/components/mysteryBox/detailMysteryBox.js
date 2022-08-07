import Icon from "react-native-elements/dist/icons/Icon";
import { Text, View, Image, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";

export default function DetailMysteryBox({
  data,
  nextMb,
  previousMb,
  setmodalOneMysteryBox,
  deleteOneMb
}) {
  const [price, setPrice] = useState("--.--");
  const [date, setDate] = useState("--/--/----");
  var color;
  const mbsColor = [
    "#B2B2B2",
    "#B2B2B2",
    "#80FF1D",
    "#80FF1D",
    "#00A5F6",
    "#00A5F6",
    "#9F80FF",
    "#9F80FF",
    "#FA6C00",
    "#FA6C00",
  ];

  {
    data.lvl == undefined ? (data.lvl = 1) : "";
  }

  const mbsImage = [
    require("../../assets/mb/lvl1.png"),
    require("../../assets/mb/lvl2.png"),
    require("../../assets/mb/lvl3.png"),
    require("../../assets/mb/lvl4.png"),
    require("../../assets/mb/lvl5.png"),
    require("../../assets/mb/lvl6.png"),
    require("../../assets/mb/lvl7.png"),
    require("../../assets/mb/lvl8.png"),
    require("../../assets/mb/lvl9.png"),
    require("../../assets/mb/lvl10.png"),
  ];

  const contents = [
    "efficiencyLvl1",
    "efficiencyLvl2",
    "efficiencyLvl3",
    "efficiencyLvl4",
    "efficiencyLvl5",
    "efficiencyLvl6",
    "efficiencyLvl7",
    "efficiencyLvl8",
    "efficiencyLvl9",
    "luckLvl1",
    "luckLvl2",
    "luckLvl3",
    "luckLvl4",
    "luckLvl5",
    "luckLvl6",
    "luckLvl7",
    "luckLvl8",
    "luckLvl9",
    "comfortLvl1",
    "comfortLvl2",
    "comfortLvl3",
    "comfortLvl4",
    "comfortLvl5",
    "comfortLvl6",
    "comfortLvl7",
    "comfortLvl8",
    "comfortLvl9",
    "resilienceLvl1",
    "resilienceLvl2",
    "resilienceLvl3",
    "resilienceLvl4",
    "resilienceLvl5",
    "resilienceLvl6",
    "resilienceLvl7",
    "resilienceLvl8",
    "resilienceLvl9",
    "commonScroll",
    "uncommonScroll",
    "rareScroll",
    "epicScroll",
    "legendaryScroll",
    "gst",
  ];

  const contentImage = [
    require("../../assets/gem/efficiency/lvl1.png"),
    require("../../assets/gem/efficiency/lvl2.png"),
    require("../../assets/gem/efficiency/lvl3.png"),
    require("../../assets/gem/efficiency/lvl4.png"),
    require("../../assets/gem/efficiency/lvl5.png"),
    require("../../assets/gem/efficiency/lvl6.png"),
    require("../../assets/gem/efficiency/lvl7.png"),
    require("../../assets/gem/efficiency/lvl8.png"),
    require("../../assets/gem/efficiency/lvl9.png"),
    require("../../assets/gem/luck/lvl1.png"),
    require("../../assets/gem/luck/lvl2.png"),
    require("../../assets/gem/luck/lvl3.png"),
    require("../../assets/gem/luck/lvl4.png"),
    require("../../assets/gem/luck/lvl5.png"),
    require("../../assets/gem/luck/lvl6.png"),
    require("../../assets/gem/luck/lvl7.png"),
    require("../../assets/gem/luck/lvl8.png"),
    require("../../assets/gem/luck/lvl9.png"),
    require("../../assets/gem/comfort/lvl1.png"),
    require("../../assets/gem/comfort/lvl2.png"),
    require("../../assets/gem/comfort/lvl3.png"),
    require("../../assets/gem/comfort/lvl4.png"),
    require("../../assets/gem/comfort/lvl5.png"),
    require("../../assets/gem/comfort/lvl6.png"),
    require("../../assets/gem/comfort/lvl7.png"),
    require("../../assets/gem/comfort/lvl8.png"),
    require("../../assets/gem/comfort/lvl9.png"),
    require("../../assets/gem/resilience/lvl1.png"),
    require("../../assets/gem/resilience/lvl2.png"),
    require("../../assets/gem/resilience/lvl3.png"),
    require("../../assets/gem/resilience/lvl4.png"),
    require("../../assets/gem/resilience/lvl5.png"),
    require("../../assets/gem/resilience/lvl6.png"),
    require("../../assets/gem/resilience/lvl7.png"),
    require("../../assets/gem/resilience/lvl8.png"),
    require("../../assets/gem/resilience/lvl9.png"),
    require("../../assets/scroll/common.png"),
    require("../../assets/scroll/uncommon.png"),
    require("../../assets/scroll/rare.png"),
    require("../../assets/scroll/epic.png"),
    require("../../assets/scroll/legendary.png"),
    require("../../assets/gst.png"),
  ];

  useEffect(() => {
    if (data != undefined) {
      getDate();
      getPrice();
    }
  });

  function getDate() {
    var date = new Date(data.createdAt);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    date = `${day}/${month}/${year}`;
    setDate(date);
  }

  function getPriceFromContent(content, contentQuantity) {
    var totalRealmCrypto = 0;
    var totalGst = 0;
    var totalGmt = 0;
    var total = 0;
    if (content) {
      if (!content.includes("Scroll") & !content.includes("gst")) {
        totalRealmCrypto += data.prices[0][content] * contentQuantity;
      } else if (content.includes("Scroll")) {
        totalGmt += data.prices[0][content] * contentQuantity;
      } else if (content.includes("gst")) {
        totalGst += data.prices[0][content + data.realm] * contentQuantity;
      }
      total =
        totalRealmCrypto * data.prices[0][data.realm] +
        totalGmt * data.prices[0]["gmt"] +
        totalGst * data.prices[0]["gst" + data.realm];
      return (total*0.94);
    }
    return 0;
  }
  
  function getPrice() {
    // Here request to have price of marketplace at specific date
    const content1Price = getPriceFromContent(
      data.content1,
      data.content1Quantity
    );
    const content2Price = getPriceFromContent(
      data.content2,
      data.content2Quantity
    );
    const content3Price = getPriceFromContent(
      data.content3,
      data.content3Quantity
    );
    const content4Price = getPriceFromContent(
      data.content4,
      data.content4Quantity
    );
    const content5Price = getPriceFromContent(
      data.content5,
      data.content5Quantity
    );
    const content6Price = getPriceFromContent(
      data.content6,
      data.content6Quantity
    );
    var total =
      content1Price +
      content2Price +
      content3Price +
      content4Price +
      content5Price +
      content6Price;
    setPrice(total.toFixed(2));
  }

  function showContent() {
    return (
      <View
        style={{
          width: "100%",
          height: "40%",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "50%",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          {data.content1 != null ? (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={contentImage[contents.indexOf(data.content1)]}
                style={{ width: "60%", height: "80%", resizeMode: "contain" }}
              ></Image>
              <Text
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: "1%",
                }}
              >
                x{data.content1Quantity}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
              }}
            ></View>
          )}
          {data.content2 != null ? (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={contentImage[contents.indexOf(data.content2)]}
                style={{ width: "60%", height: "80%", resizeMode: "contain" }}
              ></Image>
              <Text
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: "1%",
                }}
              >
                x{data.content2Quantity}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
              }}
            ></View>
          )}
          {data.content3 != null ? (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={contentImage[contents.indexOf(data.content3)]}
                style={{ width: "60%", height: "80%", resizeMode: "contain" }}
              ></Image>
              <Text
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: "1%",
                }}
              >
                x{data.content3Quantity}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
              }}
            ></View>
          )}
        </View>
        <View
          style={{
            width: "100%",
            height: "50%",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          {data.content4 != null ? (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={contentImage[contents.indexOf(data.content4)]}
                style={{ width: "60%", height: "80%", resizeMode: "contain" }}
              ></Image>
              <Text
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: "1%",
                }}
              >
                x{data.content4Quantity}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
              }}
            ></View>
          )}
          {data.content5 != null ? (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={contentImage[contents.indexOf(data.content5)]}
                style={{ width: "60%", height: "80%", resizeMode: "contain" }}
              ></Image>
              <Text
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: "1%",
                }}
              >
                x{data.content5Quantity}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
              }}
            ></View>
          )}
          {data.content6 != null ? (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={contentImage[contents.indexOf(data.content6)]}
                style={{ width: "60%", height: "80%", resizeMode: "contain" }}
              ></Image>
              <Text
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  margin: "1%",
                }}
              >
                x{data.content6Quantity}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: "28%",
                height: "90%",
                borderRadius: 10,
              }}
            ></View>
          )}
        </View>
      </View>
    );
  }
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          backgroundColor: mbsColor[data.lvl - 1],
          width: "15%",
          height: "4%",
          borderRadius: 5,
          marginLeft: "4%",
          alignItems: "center",
          justifyContent: "center",
          top: "4%",
        }}
      >
        <Text style={{ color: "white", fontSize: 12 }}>
          Lvl {data != undefined ? data.lvl : "-"}
        </Text>
      </View>
      {data.realm == "Solana" ? (
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
      )}
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: "22%",
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
              previousMb();
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
                source={mbsImage[data.lvl - 1]}
                style={{ width: "100%", resizeMode: "contain" }}
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
              nextMb();
            }}
          ></Icon>
        </View>
        <View
          style={{
            position: "absolute",
            top: "0%",
            right: "2%",
            justifyContent: "space-evenly",
            flexDirection: "row",
            width: "35%"
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
            onPress={() => deleteOneMb(data.id)}
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
            onPress={() => setmodalOneMysteryBox(false)}
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
            flexDirection: "row",
            width: "100%",
            height: "4%",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: mbsColor[data.lvl - 1],
              width: "20%",
              borderRadius: 50,
              marginLeft: "4%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              {data != undefined ? price : "--.--"} $
            </Text>
          </View>
          <View
            style={{
              backgroundColor: mbsColor[data.lvl - 1],
              width: "40%",
              borderRadius: 50,
              marginLeft: "4%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              {data != undefined ? date : "../../../../...."}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: mbsColor[data.lvl - 1],
              width: "20%",
              borderRadius: 50,
              marginLeft: "4%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              {data != undefined ? data.dropRate : "..-.."} %
            </Text>
          </View>
        </View>
        {data != undefined ? showContent() : <View></View>}
      </View>
    </View>
  );
}
