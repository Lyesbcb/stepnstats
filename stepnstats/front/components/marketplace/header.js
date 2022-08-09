import { useState } from "react";
import { Text, View, Pressable, Image, Alert, StyleSheet } from "react-native";
export default function Header({ selectedTab, SetSelectedTab }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        top: "10%",
        height: "8%",
        width: "90%",
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Pressable
          style={selectedTab === 0 ? styles.activeTab1 : styles.tab}
          onPress={() => SetSelectedTab(0)}
        >
          <Text style={{ fontWeight: "800", fontSize: 11 }}>Nfts</Text>
        </Pressable>
        <Pressable
          style={selectedTab === 1 ? styles.activeTab2 : styles.tab}
          onPress={() => SetSelectedTab(1)}
        >
          <Text style={{ fontWeight: "800", fontSize: 11 }}>Gems</Text>
        </Pressable>
        <Pressable
          style={selectedTab === 2 ? styles.activeTab2 : styles.tab}
          onPress={() => SetSelectedTab(2)}
        >
          <Text style={{ fontWeight: "800", fontSize: 11 }}>Scrolls</Text>
        </Pressable>
        <Pressable
          style={selectedTab === 3 ? styles.activeTab3 : styles.tab}
          onPress={() => Alert.alert("Comming soon!")}
        >
          <Text style={{ fontWeight: "800", fontSize: 11 }}>Notifications</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeTab1: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "22%",
    borderWidth: 2,
    borderRightWidth: 4,
    borderRadius: 50,
  },
  activeTab2: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "22%",
    borderWidth: 2,
    borderRadius: 50,
  },
  activeTab3: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "22%",
    borderWidth: 2,
    borderLeftWidth: 4,
    borderRadius: 50,
  },
  tab: {
    width: "22%",
    height: "100%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
