import React, { useState, useRef, useContext, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, StyleSheet, Animated, Dimensions } from "react-native";
import { COLORS_v2 } from "../../../constants/theme.js";
import { MaterialIcons, Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import axios from "axios";
import "core-js/stable/atob";

const ResetPassword = ({ navigation, route }) => {
  const windowHeight = Dimensions.get("window").height;
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;

  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "Your new password was saved";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "Change password failed! Please retry";

  const email = route.params.email;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);

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

  const save = () => {
    handleChangePassword();
    setStatus("success");
    popIn();
  };

  const checkChangePassword = () => {
    if (!password.trim()) {
      alert("Please input your new password");
      return;
    }
    if (!confirmPassword.trim()) {
      alert("Please confirm your new password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Your password and confirm password must match!");
      return;
    }
    save();
  };  
  
  const handleChangePassword = async () => {
    const data = {
      password: password,
      email: email
    }
    try {
      await axios.post("http://10.0.2.2:3000/user/profile/update-password", data).then((response) => {
        if (response.data.success) {
          navigation.navigate('SignIn');
        } else {
          setError('There was an issue resetting your password. Please try again.');
        }
      });
      const user = response.data;
      console.log(user);
      navigation.navigate("SignIn");
    } catch (error) {
      console.log("error", error);
    }
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
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: -10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS_v2.lightBlue} />
          <Text style={{ color: COLORS_v2.lightBlue }}>Turn Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Change Password</Text>
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
              New password
            </Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS_v2.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "space-between",
                paddingLeft: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput value={password} onChangeText={(password) => setPassword(password)} editable={true} secureTextEntry={hidePassword ? false : true} />
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? "eye-outline" : "eye-off-outline"} size={24} color="black" />
              </TouchableOpacity>
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
              Confirm password
            </Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS_v2.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "space-between",
                paddingLeft: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                value={confirmPassword}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                editable={true}
                secureTextEntry={hideConfirmPassword ? false : true}
              />
              <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                <Ionicons name={hideConfirmPassword ? "eye-outline" : "eye-off-outline"} size={24} color="black" />
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
      <TouchableOpacity onPress={checkChangePassword}>
        <View
          style={{
            marginBottom: 20,
          }}
        >
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
    </SafeAreaView>
  );
};

export default ResetPassword;

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