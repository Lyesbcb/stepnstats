import { StyleSheet, View, Image } from "react-native";
import HomeScreen from "./components/homeScreen";
import AllNftsScreen from "./components/nfts/allNftsScreen";
import AllMysteryBoxScreen from "./components/mysteryBox/allMysteryBoxScreen";
import AllRunsScreen from "./components/runsScreen";
import OneRunScreen from "./components/runScreen";
import React, { useState } from "react";
import * as Sentry from "@sentry/react-native";
import TestScreen from "./components/test";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-elements/dist/icons/Icon";
import Invenrtory from "./components/inventory"
import Marketplace from './components/marketplace/marketplaceScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

Sentry.init({
  dsn: "https://aba7681e4758413f9025831056b576e1@o1332793.ingest.sentry.io/6597674",
  tracesSampleRate: 2.0,
  enableNative: false,
  integrations: [
    new Sentry.ReactNativeTracing({
      tracingOrigins: ["localhost", /^\//],
    }),
  ],
});

function App() {
  const isTabBarVisible = (navState) => {
    if (!navState) {
      return true;
    }
    let tabBarVisible = navState.routes[navState.index].params
      ? navState.routes[navState.index].params.showTabBar
      : true;
    return tabBarVisible;
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#ff0071"
        inactiveColor="#000"
        barStyle={{ backgroundColor: "#fff" }}
        screenOptions={({ route, navigation }) => ({
          tabBarVisible: isTabBarVisible(navigation.state),
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: "10%",
            height: "8%",
            borderRadius: 50,
            left: "2%",
            right: "2%",
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home-variant" : "home-variant";
            } else if (route.name === "InvenrtoryStack") {
              iconName = focused ? "bag-personal-outline" : "bag-personal-outline";
            } else if (route.name === "runs") {
              iconName = focused ? "shoe-sneaker" : "shoe-sneaker";
            } else if (route.name === "mysteryBox") {
              iconName = focused ? "toolbox" : "toolbox";
            } else if (route.name === "MarketplaceStack") {
              iconName = focused ? "chart-box" : "chart-box";
            }
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: "30%",
                }}
              >
                <Icon
                  type="material-community"
                  name={iconName}
                  size={23}
                  color={color}
                />
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="InvenrtoryStack" component={InvenrtoryStack} />
        <Tab.Screen name="runs" component={Runs} />
        <Tab.Screen name="MarketplaceStack" component={MarketplaceStack} />
        <Tab.Screen name="test" component={TestScreen} />

        {/* <Tab.Screen name="marketplace" component={MarketplaceScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function InvenrtoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="Inventory"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: "10%",
          height: "8%",
          borderRadius: 50,
          left: "5%",
          right: "5%",
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
      })}
    >
      <Stack.Screen name="Inventory" component={Invenrtory} />
      <Stack.Screen name="AllNftsScreen" component={AllNftsScreen} />
      <Stack.Screen name="AllMysteryBoxScreen" component={AllMysteryBoxScreen} />
    </Stack.Navigator>
  );
}

function MarketplaceStack() {
  return (
    <Stack.Navigator
      initialRouteName="Marketplace"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: "10%",
          height: "8%",
          borderRadius: 50,
          left: "5%",
          right: "5%",
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
      })}
    >
      <Stack.Screen name="Marketplace" component={Marketplace} />
    </Stack.Navigator>
  );
}

function Runs() {
  return (
    <Stack.Navigator
      initialRouteName="AllRunsScreen"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: "10%",
          height: "8%",
          borderRadius: 50,
          left: "5%",
          right: "5%",
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
      })}
    >
      <Stack.Screen name="AllRunsScreen" component={AllRunsScreen} />
      <Stack.Screen name="OneRunScreen" component={OneRunScreen} />
    </Stack.Navigator>
  );
}


export default Sentry.wrap(App);
