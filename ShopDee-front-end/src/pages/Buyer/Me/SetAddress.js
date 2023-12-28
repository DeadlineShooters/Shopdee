import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, Modal, Alert, Dimensions, Animated, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useRef } from "react";
import { COLORS_v2 } from "../../../../constants/theme.js";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";

const SetAddress = ({ navigation, route }) => {
  const user = route.params.props.User;
  console.log("@@ user map: ", user);
  const { selectedAddress } = route.params;

  console.log("@@ user map: ", user);
  const [name, setName] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [changeAddress, setChangeAddress] = useState(user.address);

  //Pop in animation
  const windowHeight = Dimensions.get("window").height;
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;
  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "Your information was saved";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "Your information was still unsaved";

  if (selectedAddress) {
    setAddress(selectedAddress);
  }
  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * -0.82 * 0.95,
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

  const handleOnPressGoBack = ({ navigation }) => {
    if (address != changeAddress) {
      Alert.alert("Confirm message", "Your address is not saved. Exit now?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel request"),
        },
        {
          text: "Ok",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      navigation.goBack();
    }
  };
  const save = async () => {
    setChangeAddress(address);
    try {
      const userID = user._id;
      const userAddress = {
        address: address,
      };
      await axios.put(`http://10.0.2.2:3000/user/profile/set-address/${userID}`, userAddress);
      setStatus("success");
      popIn();
    } catch (error) {
      console.log("error message", error);
    }
  };

  const setNewAddress = (addr) => {
    setNewAddress(addr);
  };

  const handlePickAddress = () => {
    navigation.navigate("AddressPicker", { previousScreen: "SetAddress" });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS_v2.white,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginVertical: 36,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleOnPressGoBack({ navigation })}
          style={{
            position: "absolute",
            left: -10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS_v2.lightBlue} />
          <Text style={{ color: COLORS_v2.lightBlue }}>Profile</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Delivery Address</Text>
      </View>
      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Name
            </Text>
            <View
              style={{
                height: 44,
                width: "100%",
                backgroundColor: COLORS_v2.secondaryGray,
                borderColor: COLORS_v2.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                editable={false}
                style={{
                  color: COLORS_v2.black,
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Phone
            </Text>
            <View
              style={{
                height: 44,
                width: "100%",
                backgroundColor: COLORS_v2.secondaryGray,
                borderColor: COLORS_v2.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={phone}
                onChangeText={(value) => setPhone(value)}
                editable={false}
                style={{
                  color: COLORS_v2.black,
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Address
            </Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS_v2.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
            <TextInput
                value={address}
                onChangeText={value => { SetAddress(value)}}
                editable={true}
              />
              <TouchableOpacity
                onPress={handlePickAddress}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  paddingLeft: 5,
                  borderWidth: 1,
                  borderColor: COLORS_v2.gray,
                  alignItems: "center",
                }}
              >
                <View style={{ width: "90%" }}>
                  <Text style={{ fontSize: 16, fontWeight: "600" }} numberOfLines={1} ellipsizeMode="tail">
                    {address}
                  </Text>
                </View>

                <View style={{ marginRight: 10 }}>
                  <AntDesign name="right" size={16} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
      {changeAddress == address ?
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS_v2.secondaryGray,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10, color: COLORS_v2.white }}>Save</Text>
          </View>
        </View> :
        <TouchableOpacity onPress={save}>
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: COLORS_v2.blue,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10, color: COLORS_v2.white }}>Save</Text>
            </View>
          </View>
        </TouchableOpacity>
      }
    </SafeAreaView>
  );
};
export default SetAddress;

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
