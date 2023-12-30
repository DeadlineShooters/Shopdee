import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { COLORS_v2 } from "../../../constants/theme";

export default function SignIn() {
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkSigninStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.navigate("BuyerBottomNav", { screen: "Home" });
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkSigninStatus();
  }, []);
  const handleSignUpPress = () => {
    navigation.navigate("SignUp");
  };
  const handleForgetPasswordPress = () => {
    navigation.navigate("SendMail");
  };
  const [hidePassword, setHidePassword] = useState(false);
  const handlePassword = () => {
    setHidePassword(!hidePassword);
  };
  const handleSignIn = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://10.0.2.2:3000/user/signin", user)
      .then((res) => {
        const token = res.data.token;
        AsyncStorage.setItem("authToken", token);
        getEmail("");
        getPassword("");
        navigation.navigate("BuyerBottomNav", { screen: "Home" });
      })
      .catch((error) => {
        Alert.alert("Failed Sign In", "Invalid email or password. Please retry !");
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("./shopdee_icon.png")} />
      <Text style={styles.title}>SHOPDEE</Text>

      <View style={{ flexDirection: "column", marginBottom: 6, alignSelf: "center", display: "flex" }}>
        <View style={styles.emailContainer}>
          <FontAwesome name="envelope" size={24} color="black" style={styles.Icon} />
          <TextInput style={styles.input} onChangeText={getEmail} value={email} placeholder="Enter Email Address" />
        </View>
      </View>

      <View style={{ flexDirection: "column", marginBottom: 0, alignSelf: "center", display: "flex", justifyContent: "flex-end" }}>
        <View style={styles.passwordContainer}>
          <TouchableOpacity style={styles.Icon} onPress={handlePassword}>
            <Entypo name={hidePassword ? "eye" : "eye-with-line"} size={24} color="black" style={styles.Icon} />
          </TouchableOpacity>

          <TextInput style={styles.input} onChangeText={getPassword} value={password} placeholder="Password" secureTextEntry={hidePassword ? false : true} />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }} onPress={handleSignUpPress}>
        <Text
          style={{
            color: COLORS_v2.darkBlue,
            fontSize: 16,
          }}
        >
          Sign up
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }} onPress={handleForgetPasswordPress}>
        <Text
          style={{
            color: COLORS_v2.darkBlue,
            fontSize: 16,
          }}
        >
          Forgot password
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "70%",
    alignSelf: "center",
    borderColor: "transparent",
    backgroundColor: "rgba(51, 153, 255, 0.5)",
    borderWidth: 1,
    paddingLeft: 50,
    marginBottom: 10,
    borderRadius: 8,
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  button: {
    height: 50,
    width: "40%",
    backgroundColor: "rgba(51, 153, 255, 0.5)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 30,
    marginLeft: "30%",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  Icon: {
    position: "absolute",
    paddingLeft: 10,
    zIndex: 2,
  },

  emailContainer: {
    height: 40,
    width: "100%",
    alignSelf: "center",
    borderColor: "transparent",
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  passwordContainer: {
    height: 40,
    width: "100%",
    alignSelf: "center",
    borderColor: "transparent",
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
