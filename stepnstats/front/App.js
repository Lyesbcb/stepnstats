import { StyleSheet, View, Image, Alert, StatusBar } from "react-native";
import HomeScreen from "./components/homeScreen";
import AllNftsScreen from "./components/nfts/allNftsScreen";
import AllMysteryBoxScreen from "./components/mysteryBox/allMysteryBoxScreen";
import AllRunsScreen from "./components/run/runsScreen";
import OneRunScreen from "./components/run/runScreen";
import React, { useEffect, useState } from "react";
import * as Sentry from "@sentry/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-elements/dist/icons/Icon";
import Invenrtory from "./components/inventory";
import Marketplace from "./components/marketplace/marketplaceScreen";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import ProgressLoader from "rn-progress-loader";

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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    testServer();
  }, []);
  async function testServer() {
    setLoading(true);
    await axios
      .get("http://46.101.90.104:4000")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.includes("timeout")) {
          Alert.alert(
            "Error",
            "STEPNstats server are in maintenance. Please try later",
            [
              {
                text: "Reload",
                onPress: () => testServer(),
                style: "cancel",
              },
            ]
          );
        } else {
          Alert.alert(
            "Error",
            "STEPNstats need internet connection to run. Check your connection and retry.",
            [
              {
                text: "Reload",
                onPress: () => testServer(),
                style: "cancel",
              },
            ]
          );
        }
      });
    setLoading(false);
  }
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
      <ProgressLoader
        visible={loading}
        isModal={true}
        isHUD={true}
        hudColor={"#000000"}
        color={"#FFFFFF"}
      />
      <StatusBar barStyle={"dark-content"} />
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#ff0071"
        inactiveColor="#000"
        screenOptions={({ route, navigation }) => ({
          tabBarItemStyle: {
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          },
          headerShown: false,
          tabBarStyle: {
            paddingTop: 10,
            position: "absolute",
            bottom: "5%",
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
              iconName = focused
                ? "bag-personal-outline"
                : "bag-personal-outline";
            } else if (route.name === "runs") {
              iconName = focused ? "shoe-sneaker" : "shoe-sneaker";
            } else if (route.name === "mysteryBox") {
              iconName = focused ? "toolbox" : "toolbox";
            } else if (route.name === "MarketplaceStack") {
              iconName = focused ? "chart-box" : "chart-box";
            }
            return (
              <View>
                <Icon
                  type="material-community"
                  name={iconName}
                  size={RFValue(30, 800)}
                  color={color}
                  style={{
                    textAlignVertical: "center",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
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
        {/* <Tab.Screen name="test" component={TestScreen} /> */}
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
      <Stack.Screen
        name="AllMysteryBoxScreen"
        component={AllMysteryBoxScreen}
      />
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
