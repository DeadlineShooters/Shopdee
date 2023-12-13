import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Order from "../../../components/ManageOrders/Order";
import { ORDER_LIST_TO_CONFIRM } from "../../../../data/order";
import { ORDER_LIST_TO_DELIVER } from "../../../../data/order";
import { ORDER_LIST_COMPLETED } from "../../../../data/order";

//  testing code please replace!!
export default function ManageOrders({ orders, buttonVisible }) {
  return (
    <SafeAreaView style={[styles.mainContainer]}>
      <FlatList
        data={orders}
        renderItem={(itemData) => {
          const order = itemData.item;
          return (
            <View key={order.id} style={styles.orderContainer}>
              <Order
                buyer={order.buyer}
                buttonVisible={buttonVisible}
                buttonText={buttonVisible && order.status === "To Confirm" ? "Confirm" : undefined}
                itemList={order.items}
                totalPayment={order.totalPayment}
              />
            </View>
          );
        }}
      />
      {/* {ORDER_LIST_TO_CONFIRM.map((order) => {
        if (order.status === "To Confirm") {
          return (
            <View key={order.id} style={styles.orderContainer}>
              <Order shopName={order.shopName} buttonVisible={true} buttonText="Cancel" itemList={order.items} totalPayment={order.totalPayment} />
            </View>
          );
        }
      })} */}
      {/* <Order shopName="BITIS'S OFFICIAL STORE" buttonVisible={true} buttonText="Cancel" itemList={ORDER_ITEMS} /> */}
    </SafeAreaView>
  );
}

// Inside ConfirmOrders component
export function ConfirmOrders() {
  return <ManageOrders orders={ORDER_LIST_TO_CONFIRM} buttonVisible={true} />;
}

// Inside ToDeliverOrders component
export function ToDeliverOrders() {
  return <ManageOrders orders={ORDER_LIST_TO_DELIVER} buttonVisible={false} />;
}

// Inside CompletedOrders component
export function CompletedOrders() {
  return <ManageOrders orders={ORDER_LIST_COMPLETED} buttonVisible={false} />;
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#e5e5e5",
    flex: 1,

    // justifyContent: "center",
    // alignItems: "center",
  },
  orderContainer: {
    marginBottom: 10,
  },
});
