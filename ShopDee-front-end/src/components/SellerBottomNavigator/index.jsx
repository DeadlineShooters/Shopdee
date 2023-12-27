import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import MyProduct from "../../pages/Seller/MyProducts";
import EditProfile from "../../pages/Seller/ShopProfile";
import SellerMyOrderTopTabs from "../SellerMyOrderTopTabs";
import { COLORS } from "../../../assets/Themes";
import GoBack from "../goBackPanel";

const Tab = createBottomTabNavigator();

export default function SellerBottomNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007EA7",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: { fontSize: 13 },
      }}
    >
      <Tab.Screen
        name="My Product"
        component={MyProduct}
        lazy={true}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <Feather name="box" size={24} color={color} />;
          },
          header: () => (
            <GoBack
              currentTitle=""
              prevTitle="Me"
              func={() => {
                navigation.goBack();
              }}
              containerStyle={{
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: COLORS.white,
                height: 30,
                // marginBottom: 5,
                elevation: 10,
              }}
              backStyle={{ flexDirection: "row", alignItems: "center" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={SellerMyOrderTopTabs}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome5 name="list-alt" size={24} color={color} />;
          },
          header: () => (
            <GoBack
              currentTitle=""
              prevTitle="Me"
              func={() => {
                navigation.goBack();
              }}
              containerStyle={{
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: COLORS.white,
                height: 30,
                // marginBottom: 5,
                elevation: 10,
              }}
              backStyle={{ flexDirection: "row", alignItems: "center" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shop Profile"
        component={EditProfile}
        options={{
          tabBarIcon: ({ focused, color }) => {
            if (focused) return <Ionicons name="ios-person" size={24} color={color} />;
            else return <Ionicons name="ios-person-outline" size={24} color={color} />;
          },
          header: () => (
            <GoBack
              currentTitle=""
              prevTitle="Me"
              func={() => {
                navigation.goBack();
              }}
              containerStyle={{
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: COLORS.white,
                height: 30,
                // marginBottom: 5,
                elevation: 10,
              }}
              backStyle={{ flexDirection: "row", alignItems: "center" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
