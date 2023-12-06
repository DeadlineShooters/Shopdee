import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import axios from "axios"

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
    setHidePassword(!hidePassword)
  };
  let isValid = true;
  const validate = () => {
    if (email == '') {
      setBadEmail(true);
      isValid = false;
    }
    else {
      setBadEmail(false);
    }

    if (username == '') {
      setBadUserName(true);
      isValid = false;
    }
    else {
      setBadUserName(false);
    }

    if (password == '') {
      setBadPassword(true);
      isValid = false;
    }
    else {
      setBadPassword(false);
    }

    if (confirmPassword == '') {
      setBadConfirmPassword(true);
      isValid = false;
    }
    else {
      setBadConfirmPassword(false);
    }

    if (password != confirmPassword) {
      setCorrectPassword(false);
    }
    else
    {
      setCorrectPassword(true);
    }
    setTimeout(() => {
      if (isValid == true) {
        handleSignUp();
        navigation.goBack();
      }
      else
      {
        setEmail("");
        setUsername("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      }
    }, 1000);
  }
  const handleSignUp = async () => {
    // Xử lý logic đăng ký ở đây
    const user = {
      username: username,
      email: email,
      password: password
    }
    try {
      await axios.post("http://10.0.2.2:3000/user/register", user)
    } catch (error) {
      Alert.alert(
        "Registration error",
        "An error occured during registration"
      );
      console.log("registration failed", error);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./shopdee_icon.png')}
      />
      <Text style={styles.title}>SHOPDEE</Text>

      <KeyboardAvoidingView>
        <View style={{ flexDirection: "column", marginVertical: 6, alignSelf: 'center', display: 'flex', }}>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={24} color="black" style={styles.Icon}/>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Enter Email Address"
            />
          </View>
        </View>
        {badEmail === true && <>
          <Text style={{ flexDirection: "column", alignSelf: 'center', display: 'flex', color: 'red' }}>
            Please input the email
          </Text>
        </>}
        <View style={{ flexDirection: "column", marginVertical: 6, alignSelf: 'center', display: 'flex', }}>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="black" style={styles.Icon} />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
              value={username}
              placeholder="Username"
            />
          </View>
        </View>
        {badUserName === true && <>
          <Text style={{ flexDirection: "column", alignSelf: 'center', display: 'flex', color: 'red' }}>
            Please input the username
          </Text>
        </>}
        <View style={{ flexDirection: "column", marginVertical: 6, alignSelf: 'center', display: 'flex', }}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.Icon} onPress={handlePassword}>
              <Entypo name={hidePassword ? "eye" : "eye-with-line"} size={24} color="black"/>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="Password"
              secureTextEntry={hidePassword ? false : true}
            />
          </View>
        </View>
        {badPassWord === true && <>
          <Text style={{ flexDirection: "column", alignSelf: 'center', display: 'flex', color: 'red' }}>
            Please input the password
          </Text>
        </>}
        <View style={{ flexDirection: "column", marginVertical: 6, alignSelf: 'center', display: 'flex', }}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.Icon} onPress={handlePassword}>
              <Entypo name={hidePassword ? "eye" : "eye-with-line"} size={24} color="black"/>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={hidePassword ? false : true}
            />
          </View>
        </View>
        {badConfirmPassWord === true && <>
          <Text style={{ flexDirection: "column", alignSelf: 'center', display: 'flex', color: 'red' }}>
            Please input the confirm password
          </Text>
        </>}
        {correctPassword === false && <>
          <Text style={{ flexDirection: "column", alignSelf: 'center', display: 'flex', color: 'red' }}>
            Password must match! Please retry
          </Text>
        </>}
        <TouchableOpacity style={styles.button} onPress={() => {validate()}}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("SignIn")}>
          <Text>Already have an account? Back to login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center"
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '70%',
    alignSelf: 'center',
    borderColor: 'transparent',
    backgroundColor: 'rgba(51, 153, 255, 0.5)',
    borderWidth: 1,
    paddingLeft: 50,
    borderRadius: 8
  },

  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  Icon: {
    position: 'absolute',
    paddingLeft: 10,
    zIndex: 2,
  },

  button: {
    justifyContent: "center",
    alignSelf: "center",
    height: 50,
    width: '50%',
    backgroundColor: 'rgba(51, 153, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 15,
    justifyContent: "flex-start",
    alignItems: "center"
  },

  backButtonText: {
    fontSize: 40,
    color: '#007bff',
  },

  inputContainer: {
    height: 40,
    width: '100%',
    alignSelf: 'center',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
});