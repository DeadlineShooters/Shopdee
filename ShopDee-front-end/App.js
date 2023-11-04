import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

import Home from "./src/pages/Home";
import MyOrders from "./src/pages/MyOrders";
import Me from "./src/pages/Me";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007EA7",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused)
              return <Ionicons name="ios-home-sharp" size={24} color={color} />;
            else
              return (
                <Ionicons name="ios-home-outline" size={24} color={color} />
              );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My Orders"
        component={MyOrders}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome5 name="list-alt" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused)
              return <Ionicons name="ios-person" size={24} color={color} />;
            else
              return (
                <Ionicons name="ios-person-outline" size={24} color={color} />
              );
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  let loggedIn = false;

  if (loggedIn) return <HomeScreen />;
  else
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
}
