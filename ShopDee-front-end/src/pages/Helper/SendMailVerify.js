import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from "axios"
import {COLORS_v2} from "../../../constants/theme.js"

export default function SendMailVerify() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [badEmail, setBadEmail] = useState(false);

  let isValid = true;
  const validate = () => {
    if (email == '') {
      setBadEmail(true);
      isValid = false;
    }
    else {
      setBadEmail(false);
    }
    handleResetPassword();
  }
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      const data = {
        email: email,
      };
      await axios.post('http://10.0.2.2:3000/user/reset-password', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.data.success) {
          setForgotEmail(email);
          navigation.navigate('ChangePassword');
        } else {
          setError('There was an issue resetting your password. Please try again.');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{
            height: 100,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS_v2.white,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          style={{
            position: "absolute",
            left: 10,
            flexDirection: "row",
            alignItems: "center"
          }}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS_v2.lightBlue}
          />
          <Text style={{color: COLORS_v2.lightBlue}}>Sign In</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Forgot password</Text>
      </View>
      <Image
        style={styles.logo}
        source={require('./reset_password.jpg')}
      />
      <KeyboardAvoidingView>
        <View style={{ flexDirection: "column", marginVertical: 6, alignSelf: 'center'}}>
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
        <TouchableOpacity style={styles.button} onPress={() => {validate()}}>
          <Text style={styles.buttonText}>Send email</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 240,
    height: 240,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
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