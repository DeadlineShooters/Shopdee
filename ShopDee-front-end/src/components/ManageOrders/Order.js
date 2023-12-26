import ProductItem from "./ProductItem";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateOrderStatus } from "../../api/shopApi";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export default function Order({ order, buttonVisible, buttonText, item }) {
  const navigation = useNavigation();
  const { sellerData, defaultImage } = useContext(UserContext);

  function handleOrder() {
    if (buttonText == "Confirm") {
      // change order status to toDeliver
      order.status = "toDeliver";

      console.log("@@ seller data id: " + sellerData._id);
      updateOrderStatus(sellerData._id, order)
        .then(() => {
          navigation.navigate("To Deliver");
        })
        .catch((error) => {
          console.error("Error updating order status:", error);
        });
    } else if (buttonText == "Complete") {
      order.status = "completed";

      updateOrderStatus(sellerData._id, order)
        .then(() => {
          navigation.navigate("Completed");
        })
        .catch((error) => {
          console.error("Error updating order status:", error);
        });
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.buyer}>From {order.user.email}</Text>
      {/* {itemList.map((item) => ( */}
      <ProductItem
        key={order.product._id}
        productName={order.product.name}
        productPrice={order.product.price}
        productQuantity={order.product.quantity}
        imagePath={order.product.image.length > 0 ? order.product.image[0].url : defaultImage}
      />
      {/* ))} */}

      <View style={styles.bottomContainer}>
        <View style={styles.totalPaymentContainer}>
          <Text style={styles.totalPaymentText}>Total Price:</Text>
          <Text style={styles.totalPrice}>{order.totalPrice.toLocaleString()}đ</Text>
        </View>
        {buttonVisible && (
          // <TouchableOpacity style={styles.button} onPress={confirmOrder}>
          //   <Text style={styles.buttonText}>{buttonText}</Text>
          // </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleOrder}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#007EA7",
    padding: 5,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  mainContainer: {
    display: "flex",
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
  },
  buyer: {
    marginBottom: 10,
  },
  totalPaymentContainer: {
    display: "flex",
    flexDirection: "row",
  },
  totalPrice: {
    fontSize: 16,
    color: "#FC1E1E",
    fontWeight: "bold",
  },
  totalPaymentText: {
    fontSize: 16,
    marginRight: 3,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
