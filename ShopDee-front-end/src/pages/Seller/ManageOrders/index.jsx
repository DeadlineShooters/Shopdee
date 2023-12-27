import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Order from "../../../components/ManageOrders/Order";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { fetchOrders } from "../../../api/shopApi.js";
import { UserContext } from "../../../../context/UserContext.js";
import { useFocusEffect } from "@react-navigation/native";

export default function ManageOrders({ orders, buttonVisible }) {
  return (
    <SafeAreaView style={[styles.mainContainer]}>
      <FlatList
        data={orders}
        renderItem={(itemData) => {
          const order = itemData.item;
          let buttonText;

          if (order.status === "toDeliver") {
            buttonText = "Complete";
          } else if (order.status === "toConfirm") {
            buttonText = "Confirm";
          }

          return (
            <View key={order._id} style={styles.orderContainer}>
              <Order order={order} buttonVisible={buttonVisible} buttonText={buttonText} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

export function useShopOrders(orderStatus, buttonVisible) {
  // const [shopInfoData, setShopInfoData] = useState(null);
  const [shopOrders, setShopOrders] = useState(null);
  const { sellerData } = useContext(UserContext);

  console.log("@@@ order status: " + orderStatus);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("@@@ seller data: ", sellerData);
        const orders = await fetchOrders(orderStatus, sellerData?._id);

        console.log("@@@ Orders after fetchOrders:", orders);
        setShopOrders(orders);
      } catch (error) {
        console.error("Error fetching shop info:", error);
      }
    };

    fetchData();
  }, [orderStatus]);

  return <ManageOrders orders={shopOrders} buttonVisible={buttonVisible} />;
}

export function ConfirmOrders() {
  const [shopOrders, setShopOrders] = useState(null);
  const { sellerData } = useContext(UserContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          console.log("@@ seller data id:  ", sellerData._id);
          const orders = await fetchOrders("toConfirm", sellerData._id);

          console.log("@@@ Orders after fetchOrders:", orders);
          setShopOrders(orders);
        } catch (error) {
          console.error("Error fetching shop info:", error);
        }
      };

      fetchData();
    }, [])
  );

  return <ManageOrders orders={shopOrders} buttonVisible={true} />;
}

// ToDeliverOrders component
export function ToDeliverOrders() {
  const [shopOrders, setShopOrders] = useState(null);
  const { sellerData } = useContext(UserContext);

  console.log("@@@ order status: toDeliver");

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const orders = await fetchOrders("toDeliver", sellerData._id);

          console.log("@@@ Orders after fetchOrders:", orders);
          setShopOrders(orders);
        } catch (error) {
          console.error("Error fetching shop info:", error);
        }
      };

      fetchData();
    }, [])
  );

  return <ManageOrders orders={shopOrders} buttonVisible={true} />;
}

// CompletedOrders component
export function CompletedOrders() {
  const [shopOrders, setShopOrders] = useState(null);
  const { sellerData } = useContext(UserContext);

  console.log("@@@ order status: completed");

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const orders = await fetchOrders("completed", sellerData._id);

          console.log("@@@ Orders after fetchOrders:", orders);
          setShopOrders(orders);
        } catch (error) {
          console.error("Error fetching shop info:", error);
        }
      };

      fetchData();
    }, [])
  );

  return <ManageOrders orders={shopOrders} buttonVisible={false} />;
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
