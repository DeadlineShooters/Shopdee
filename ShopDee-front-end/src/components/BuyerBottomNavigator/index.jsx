import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

import Home from "../../pages/Buyer/Home";
import ManageOrders from "../../pages/Buyer/ManageOrders";
import Me from "../../pages/Buyer/Me";
import Likes from "../../pages/Buyer/Likes";
import Notifcations from "../../pages/Buyer/Notifications";
import SellerMyOrderTopTabs from "../SellerMyOrderTopTabs";

const Tab = createBottomTabNavigator();

export default function BuyerBottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007EA7",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: { fontSize: 13 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused) return <Ionicons name="ios-home-sharp" size={24} color={color} />;
            else return <Ionicons name="ios-home-outline" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My Orders"
        component={SellerMyOrderTopTabs}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome5 name="list-alt" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Likes"
        component={Likes}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused) return <Ionicons name="ios-heart-sharp" size={24} color={color} />;
            else return <Ionicons name="ios-heart-outline" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifcations}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused) return <Ionicons name="notifications-sharp" size={24} color={color} />;
            else return <Ionicons name="notifications-outline" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused) return <Ionicons name="ios-person" size={24} color={color} />;
            else return <Ionicons name="ios-person-outline" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
