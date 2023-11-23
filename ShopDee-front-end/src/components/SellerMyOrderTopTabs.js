import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ManageOrders from "../pages/Buyer/ManageOrders";
import { ConfirmOrders, ToDeliverOrders, CompletedOrders } from "../pages/Buyer/ManageOrders";

const Tab = createMaterialTopTabNavigator();

export default function SellerMyOrderTopTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarLabelStyle: { fontSize: 14, fontWeight: "bold", textTransform: "none" } }}>
      <Tab.Screen name="To Confirm" component={ConfirmOrders} />
      <Tab.Screen name="To Deliver" component={ToDeliverOrders} />
      <Tab.Screen name="Completed" component={CompletedOrders} />
      {/* <Tab.Screen name="Cancelled" component={MyOrders} /> */}
    </Tab.Navigator>
  );
}
