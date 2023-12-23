import ProductItem from "./ProductItem";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Order({ buyer, buttonVisible, buttonText, itemList, totalPayment }) {
  const navigation = useNavigation();

  function handleOrder() {
    if (buttonText == "Confirm") navigation.navigate("To Deliver");
    else if (buttonText == "Complete") navigation.navigate("Completed");
    // update database
  }
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.buyer}>From {buyer}</Text>
      {itemList.map((item) => (
        <ProductItem key={item.id} productName={item.name} productPrice={item.price} productQuantity={item.quantity} imagePath={item.imageLink} />
      ))}
      {/* <ProductItem
        productName="Nike Club Max"
        productPrice="500,000"
        productQuantity={3}
        imagePath="https://cdn.discordapp.com/attachments/987699517497438218/1176175153361723422/OIP.png?ex=656de978&is=655b7478&hm=976b420d3042b910c5824c5a3af1a3da0bdc6e697469363dd359a3cce48c2aaf&"
      /> */}

      <View style={styles.bottomContainer}>
        <View style={styles.totalPaymentContainer}>
          <Text style={styles.totalPaymentText}>Total Price:</Text>
          <Text style={styles.totalPrice}>{totalPayment.toLocaleString()}đ</Text>
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
