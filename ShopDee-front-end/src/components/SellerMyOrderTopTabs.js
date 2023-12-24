import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ConfirmOrders, ToDeliverOrders, CompletedOrders } from "../pages/Seller/ManageOrders";

const Tab = createMaterialTopTabNavigator();

export default function SellerMyOrderTopTabs() {
  return (
    <Tab.Navigator
      lazy={true}
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "none",
        },
      }}
    >
      <Tab.Screen name="To Confirm" component={ConfirmOrders} />
      <Tab.Screen name="To Deliver" component={ToDeliverOrders} />
      <Tab.Screen name="Completed" component={CompletedOrders} />
    </Tab.Navigator>
  );
}
