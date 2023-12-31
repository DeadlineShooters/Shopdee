import { SafeAreaView, ScrollView, Text, View, Pressable, StyleSheet, Image, TouchableOpacity, Alert, Animated, Dimensions } from "react-native";
import { SIZES, COLORS, FONTS } from "../../../../assets/Themes";
import GoBack from "../../../components/goBackPanel";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import { UserContext } from "../../../../context/UserContext.js";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import { MaterialIcons, Ionicons, Feather, AntDesign, MaterialCommunityIcons, SimpleLineIcons, Entypo } from "@expo/vector-icons";

import axios from "axios";

// const user = {
//   name: "Nguyễn Tuấn Kiệt",
//   phone: "0902800628",
// };

export default function Checkout({ route }) {
  const windowHeight = Dimensions.get("window").height;
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;
  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "Placed order successfully";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "Something went wrong. Please try again.";

  const [selectedPayment, setSelectedPayment] = useState("Cash");
  const navigation = useNavigation();
  const { product, quantity } = route.params;
  // console.log(product)
  const price = product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  const deliveryFee = 15000;
  const total = (product.price * quantity + deliveryFee).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const { userID, setUserID, user } = useContext(UserContext);
  console.log("@@ user", user);

  const isFocused = useIsFocused();

  const placeOrder = async () => {
    if (!user.phone) {
      alert('Please provide your phone number before checking out!')
      return;
    }
    if (!user.address) {
      alert('Please provide your address before checking out!');
      return;
    }

    try {
      // const token = await AsyncStorage.getItem("authToken");
      // const userID = jwtDecode(token).userID;

      const order = {
        quantity,
        totalPrice: product.price * quantity + deliveryFee,
        orderDate: new Date(),
        deliveryDate: null, // Fix the typo here
        status: "toConfirm",
        paymentMethod: selectedPayment,
        product: product._id,
        user: userID,
      };

      const response = await axios.post(`http://10.0.2.2:3000/shop/${product.shop._id}/orders`, order);
      console.log(response.data);

      setStatus("success");
      popIn();
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * -0.9 * 0.95,
      duration: 300,
      useNativeDriver: true,
    }).start(() => popOut());
  };

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: windowHeight * -1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 5000);
  };

  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * -1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <GoBack currentTitle="Checkout" prevTitle="Details" func={() => navigation.goBack()}></GoBack>
      <ScrollView
        style={{
          backgroundColor: COLORS.gray,
        }}
      >
        <View style={styles.section}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SimpleLineIcons name="location-pin" size={24} color={COLORS.blue} />
            <Text style={{ marginLeft: 10 }}>Delivery Address</Text>
          </View>
          <Text style={{ paddingLeft: 10 }}>
            {user?.username} | {user?.phone}
            {"\n"}
            {user.address}
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("SetAddress", { user });
            }}
            style={{
              position: "absolute",
              top: 35,
              right: 20,
            }}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={{ marginBottom: 15 }}>{product.shop.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.image[0].url }} style={styles.image}></Image>
            </View>
            <View>
              <Text>{product.name}</Text>
              <Text style={{ marginTop: 10 }}>
                {price} x {quantity}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="receipt-outline" size={24} color={COLORS.blue} />
            <Text style={{ marginLeft: 10 }}>Payment Details</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <Text>Merchandise Subtotal</Text>
            <Text>
              {price} x {quantity}
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
            <Text>Delivery</Text>
            <Text>{deliveryFee.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
              fontSize: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Merchandise Subtotal</Text>
            <Text style={{ fontSize: 18, color: "red" }}>{total}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="payment" size={24} color={COLORS.blue} />
            <Text style={{ marginLeft: 10 }}>Payment Options</Text>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 18 }}>
            <Pressable style={[styles.paymentOption, selectedPayment === "Cash" && styles.selectedPayment]} onPress={() => setSelectedPayment("Cash")}>
              <Text style={[selectedPayment === "Cash" && styles.checkboxText]}>Cash</Text>
            </Pressable>

            <Pressable
              style={[styles.paymentOption, selectedPayment === "ShopdeePay" && styles.selectedPayment]}
              onPress={() => setSelectedPayment("ShopdeePay")}
            >
              <Text style={[selectedPayment === "ShopdeePay" && styles.checkboxText]}>ShopdeePay</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 1 }}>
            <AntDesign name="profile" size={24} color={COLORS.blue} />
            <Text style={{ marginHorizontal: 10 }}>By clicking “Place Order”, you are agreeing to ShopDee's General Transaction Terms</Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 999,
          flexDirection: "row",
          backgroundColor: COLORS.red,
          width: "100%",
        }}
      >
        <View
          style={{
            flex: 0.6,
            backgroundColor: "white",
            alignItems: "flex-end",
            justifyContent: "center",
            // padding: 10,
          }}
        >
          <View style={{ marginRight: 10, alignItems: "flex-end" }}>
            <Text>Total Payment</Text>
            <Text style={{ fontSize: 20, color: "red" }}>{total}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.blue,
            flex: 0.4,
            padding: 15,
            alignItems: "center",
          }}
          onPress={() => {
            // setOpenModel(true);
            placeOrder();
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Checkout</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Animated.View
          style={[
            styles.toastContainer,
            {
              transform: [{ translateY: popAnim }],
              zIndex: 99999999,
            },
          ]}
        >
          <View style={styles.toastRow}>
            <AntDesign name={status === "success" ? "checkcircleo" : "closecircleo"} size={24} color={status === "success" ? successColor : failColor} />
            <View style={styles.toastText}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>{status === "success" ? successHeader : failHeader}</Text>
              <Text style={{ fontSize: 12 }}>{status === "success" ? successMessage : failMessage}</Text>
            </View>
            <TouchableOpacity onPress={instantPopOut}>
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    marginBottom: 5,
    padding: 15,
  },
  image: {
    resizeMode: "contain",
    flex: 1,
    width: undefined,
    height: undefined,
  },
  imageContainer: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderStyle: "solid",
    width: 100,
    height: 100,
  },
  paymentOption: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
  selectedPayment: {
    borderColor: COLORS.blue,
  },
  checkboxText: {
    color: COLORS.blue,
  },
  toastContainer: {
    height: 60,
    // width: 350,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  toastRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  toastText: {
    width: "70%",
    padding: 2,
  },
});
