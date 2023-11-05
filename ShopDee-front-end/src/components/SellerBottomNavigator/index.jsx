import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import MyProduct from "../../pages/Seller/MyProduct";
import ManageOrders from "../../pages/Seller/ManageOrders";
import EditProfile from "../../pages/Seller/EditProfile";

const Tab = createBottomTabNavigator();

export default function SellerBottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007EA7",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="My Product"
        component={MyProduct}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <Feather name="box" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={ManageOrders}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome5 name="list-alt" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Edit Profile"
        component={EditProfile}
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
