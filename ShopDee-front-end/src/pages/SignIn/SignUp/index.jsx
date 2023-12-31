import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { COLORS_v2 } from "../../../../constants/theme";
export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [badEmail, setBadEmail] = useState(false);
  const [badUserName, setBadUserName] = useState(false);
  const [badPassWord, setBadPassword] = useState(false);
  const [badConfirmPassWord, setBadConfirmPassword] = useState(false);
  const [correctPassword, setCorrectPassword] = useState(true);

  const [hidePassword, setHidePassword] = useState(false);
  const handlePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleCheckMail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmail(text);
    if (re.test(text) || reg.test(text)) {
      setBadEmail(false);
    } else {
      setBadEmail(true);
    }
    console.log(badEmail);
  };

  const handleCheckUsername = (text) => {
    setUsername(text);
    if (text.length === 0) {
      setBadUserName(true);
    } else {
      setBadUserName(false);
    }
  };

  const handleCheckPassword = (text) => {
    setPassword(text);
    if (text.length === 0) {
      setBadPassword(true);
    } else {
      setBadPassword(false);
    }
  };

  const handleCheckConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (text.length === 0) {
      setBadConfirmPassword(true);
    } else {
      setBadConfirmPassword(false);
    }
  };

  let isvalid = true;
  const validate = () => {
    if (email.length == 0) {
      Alert.alert("Error Sign Up", "Your email is invalid. Please retry");
      isvalid = false;
    }

    if (username.length == 0) {
      Alert.alert("Error Sign Up", "Your username is invalid. Please retry");
      isvalid = false;
    }

    if (password.length == 0) {
      Alert.alert("Error Sign Up", "Your password is invalid. Please retry");
      isvalid = false;
    }

    if (confirmPassword.length == 0) {
      Alert.alert("Error Sign Up", "Your confirm password is invalid. Please retry");
      isvalid = false;
    }

    if (password != confirmPassword) {
      Alert.alert("Error Sign Up", "Your password is not match. Please retry");
      isvalid = false;
    }

    if (isvalid == true) {
      handleSignUp();
    }
  };
  const handleSignUp = async () => {
    // Xử lý logic đăng ký ở đây
    const user = {
      username: username,
      email: email,
      password: password,
      name: "Default User",
      phone: "",
      birthDay: "2000/01/01",
      gender: "Not willing",
      address: "",
    };
    try {
      await axios.post("http://10.0.2.2:3000/user/register", user).then((response) => {
        if (response.data.success) {
          navigation.navigate("SignIn");
        } else {
          Alert.alert(
            "Registration Failed",
            response.data.messages // Display the error message from the server
          );
        }
      });
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.response.data.messages // Display the error message from the catch block
      );
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 100,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS_v2.white,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          style={{
            position: "absolute",
            left: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS_v2.lightBlue} />
          <Text style={{ color: COLORS_v2.lightBlue }}>Sign In</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Register Account</Text>
      </View>
      <Image style={styles.logo} source={require("./register.jpg")} />
      <KeyboardAvoidingView>
        <View style={{ flexDirection: "column", marginVertical: 6, alignSelf: "center", display: "flex" }}>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={24} color="black" style={styles.Icon} />
            <TextInput style={styles.input} value={email} onChangeText={(text) => handleCheckMail(text)} placeholder="Enter Email Address" />
          </View>
        </View>
        {badEmail === true && (
          <>
            <Text style={{ flexDirection: "column", alignSelf: "center", display: "flex", color: "red" }}>Please input the email</Text>
          </>
        )}
        <View style={{ flexDirection: "column", marginVertical: 6, alignSelf: "center", display: "flex" }}>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="black" style={styles.Icon} />
            <TextInput style={styles.input} onChangeText={(text) => handleCheckUsername(text)} value={username} placeholder="Username" />
          </View>
        </View>
        {badUserName === true && (
          <>
            <Text style={{ flexDirection: "column", alignSelf: "center", display: "flex", color: "red" }}>Please input the username</Text>
          </>
        )}
        <View style={{ flexDirection: "column", marginVertical: 6, alignSelf: "center", display: "flex" }}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.Icon} onPress={handlePassword}>
              <Entypo name={hidePassword ? "eye" : "eye-with-line"} size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleCheckPassword(text)}
              value={password}
              placeholder="Password"
              secureTextEntry={hidePassword ? false : true}
            />
          </View>
        </View>
        {badPassWord === true && (
          <>
            <Text style={{ flexDirection: "column", alignSelf: "center", display: "flex", color: "red" }}>Please input the password</Text>
          </>
        )}
        <View style={{ flexDirection: "column", marginVertical: 6, alignSelf: "center", display: "flex" }}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.Icon} onPress={handlePassword}>
              <Entypo name={hidePassword ? "eye" : "eye-with-line"} size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleCheckConfirmPassword(text)}
              value={confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={hidePassword ? false : true}
            />
          </View>
        </View>
        {badConfirmPassWord === true && (
          <>
            <Text style={{ flexDirection: "column", alignSelf: "center", display: "flex", color: "red" }}>Please input the confirm password</Text>
          </>
        )}
        {correctPassword === false && (
          <>
            <Text style={{ flexDirection: "column", alignSelf: "center", display: "flex", color: "red" }}>Password must match! Please retry</Text>
          </>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            validate();
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_v2.white,
  },
  logo: {
    width: 240,
    height: 240,
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 0,
  },
  input: {
    height: 40,
    width: "70%",
    alignSelf: "center",
    borderColor: "transparent",
    backgroundColor: "rgba(51, 153, 255, 0.5)",
    borderWidth: 1,
    paddingLeft: 50,
    borderRadius: 8,
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  Icon: {
    position: "absolute",
    paddingLeft: 10,
    zIndex: 2,
  },

  Icon: {
    position: "absolute",
    paddingLeft: 10,
    zIndex: 2,
  },

  button: {
    justifyContent: "center",
    alignSelf: "center",
    height: 50,
    width: "50%",
    backgroundColor: "rgba(51, 153, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 15,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  backButtonText: {
    fontSize: 40,
    color: "#007bff",
  },

  inputContainer: {
    height: 40,
    width: "100%",
    alignSelf: "center",
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
