import { StyleSheet, View, Image } from "react-native";
import HomeScreen from "./components/homeScreen";
import SneakersScreen from "./components/sneakersScreen";
import OneMisteryBoxScreen from "./components/oneMisteryBoxScreen";
import AllMisteryBoxScreen from "./components/allMisteryBoxScreen";
import RunsScreen from "./components/runsScreen";
import RunScreen from "./components/runScreen";
import React, { useState } from "react";
import * as Sentry from "@sentry/react-native";
import TestScreen from "./components/test";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-elements/dist/icons/Icon";

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
  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        screenOptions={({ route }) => ({ headerShown: false })}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="sneakers" component={SneakersScreen} />
        <Stack.Screen
          name="OneMisteryBoxScreen"
          component={OneMisteryBoxScreen}
        />
        <Stack.Screen name="runs" component={RunsScreen} />
        <Stack.Screen name="run" component={RunScreen} />
        <Stack.Screen
          name="allMisteryBoxScreen"
          component={AllMisteryBoxScreen}
        />
        <Stack.Screen name="test" component={TestScreen} />
      </Stack.Navigator> */}
      <Stack.Navigator
        screenOptions={({ route }) => ({ headerShown: false })}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="sneakers" component={SneakersScreen} />
        <Stack.Screen name="runs" component={RunsScreen} />
        <Stack.Screen
          name="allMisteryBoxScreen"
          component={AllMisteryBoxScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#ff0071"
      inactiveColor="#000"
      barStyle={{ backgroundColor: "#fff" }}
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarStyle: {position: "absolute", bottom: "8%", height: "10%", width: "80%", borderRadius: 50},
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home-variant" : "home-variant";
          } else if (route.name === "sneakers") {
            iconName = focused ? "cart" : "cart";
          } else if (route.name === "runs") {
            iconName = focused ? "shoe-sneaker" : "shoe-sneaker";
          } else if (route.name === "allMisteryBoxScreen") {
            iconName = focused ? "toolbox" : "toolbox";
          }
          return <Icon type='material-community' name={iconName} size={23} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="sneakers" component={SneakersScreen} />
      <Tab.Screen name="runs" component={RunsScreen} />
      <Tab.Screen name="allMisteryBoxScreen" component={AllMisteryBoxScreen} />

      {/* <Tab.Screen name="marketplace" component={MarketplaceScreen} /> */}
    </Tab.Navigator>
  );
}


export default Sentry.wrap(App);
