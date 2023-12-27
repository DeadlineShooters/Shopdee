import React, { useState, useRef, useContext, useEffect } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, SafeAreaView, Animated, StyleSheet, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Entypo } from "@expo/vector-icons";
import axios from "axios";
import { UserContext } from "../../../../context/UserContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { COLORS } from "../../../../assets/Themes";
import { COLORS_v2 } from "../../../../constants/theme.js";

export default function EditShopProfile({ navigation, route }) {
  const [shopName, setShopName] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [maxCharactersName] = useState(30); // Số ký tự tối đa cho phép
  const [maxCharactersBio] = useState(200);
  const windowHeight = Dimensions.get("window").height;
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;
  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "Your information was saved";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "Your information was still unsaved";

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * -0.35 * 0.95,
      duration: 300,
      useNativeDriver: true,
    }).start(popOut());
  };

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: windowHeight * -1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 2000);
  };

  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * -1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const showToast = () => {
    ToastAndroid.show("Toast message displayed!", ToastAndroid.SHORT);
  };

  const handleShopNameChange = (text) => {
    if (text.length <= maxCharactersName) {
      setShopName(text);
    }
  };

  const handleBioChange = (text) => {
    if (text.length <= maxCharactersBio) {
      setBio(text);
    }
  };
  const { shop, setShop } = useContext(UserContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const shopID = shop.shop._id;
        console.log("Finding Shop ID: ", shopID);
        const response = await axios.get(`http://10.0.2.2:3000/shop/shopProfile/${shopID}`);
        const user = response.data;
        console.log("Hoa tim dc ttin shop: ", user);
        setShop(user);
        setShopName(user.shop.name);
        setBio(user.shop.description);
        setAddress(user.shop.address);
        setEmail(user.shop.email);
        setPhone(user.shop.phone);
        setSelectedImage(user.shop.image.url);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserProfile();
  }, [navigation, isFocused]);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#E3E3E3",
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          marginTop: 22,
          position: "relative",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" style={{ fontSize: 24 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", alignSelf: "center" }}> Shop Profile </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Edit Profile", { shop: shop })}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20, alignItems: "center", backgroundColor: "#00a7e1" }}>
        <Image source={{uri: selectedImage}} style={{ width: 80, height: 80, borderRadius: 100 }} />
      </View>

      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          marginTop: 10,
          marginBottom: 2,
        }}
      >
        <Text style={{ fontSize: 16 }}>Shop name</Text>
        <TextInput
          style={{
            fontSize: 16,
            borderColor: "#CDCDCD",
            marginHorizontal: 10,
            flex: 1,
            color: COLORS_v2.darkBlue,
          }}
          value={shopName}
          maxLength={maxCharactersName}
          editable={false}
        />
      </View>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16 }}>Bio</Text>
        <Text style={{ color: COLORS.limitGray }}>
          {bio.length}/{maxCharactersBio}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <TextInput
          multiline={true}
          style={{
            fontSize: 16,
            borderColor: "#CDCDCD",
            flex: 1,
            color: COLORS_v2.darkBlue,
          }}
          value={bio}
          onChangeText={handleBioChange}
          maxLength={maxCharactersBio}
          numberOfLines={5} // Số dòng hiển thị
          editable={false}
          textAlignVertical="top"
        />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 2,
        }}
      >
        <Text style={{ fontSize: 16 }}>Pickup address</Text>
        <TextInput
          style={{
            fontSize: 16,
            borderColor: "#CDCDCD",
            marginHorizontal: 10,
            flex: 1,
            color: COLORS_v2.darkBlue,
          }}
          editable={false}
          value={address}
          onChangeText={(value) => setAddress(value)}
        />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Text style={{ fontSize: 16 }}>Email</Text>
        <TextInput
          style={{
            fontSize: 16,
            borderColor: "#CDCDCD",
            marginHorizontal: 10,
            flex: 1,
            color: COLORS_v2.darkBlue,
          }}
          value={email}
          editable={false}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16 }}>Phone number</Text>
        <TextInput
          style={{
            fontSize: 16,
            borderColor: "#CDCDCD",
            marginHorizontal: 10,
            flex: 1,
            color: COLORS_v2.darkBlue,
          }}
          editable={false}
          value={phone}
          onChangeText={(value) => setPhone(value)}
        />
      </View>
      <View>
        <Animated.View
          style={[
            styles.toastContainer,
            {
              transform: [{ translateY: popAnim }],
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
  toastContainer: {
    height: 60,
    width: 350,
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
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  toastText: {
    width: "70%",
    padding: 2,
  },
});
