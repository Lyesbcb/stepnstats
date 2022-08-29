import { useState } from "react";
import { Text, View, Pressable, Image, Alert, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

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
          style={selectedTab === 0 ? styles.activeTab : styles.tab}
          onPress={() => SetSelectedTab(0)}
        >
          <Text style={{ fontWeight: "800", fontSize: RFValue(20, 800) }}>Marketplace</Text>
        </Pressable>
        <Pressable
          style={selectedTab === 1 ? styles.activeTab : styles.tab}
          onPress={() => Alert.alert("Coming soon!")}
        >
          <Text style={{ fontWeight: "800", fontSize: RFValue(20, 800) }}>Notifications</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "50%",
    borderWidth: 2,
    borderRightWidth: 4,
    borderRadius: 50,
  },
  tab: {
    width: "50%",
    height: "100%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
