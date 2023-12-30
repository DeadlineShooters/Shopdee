import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import axios from "axios"
import {COLORS_v2} from "../../../constants/theme.js"

export default function VerifyToken({route}) {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [badToken, setBadToken] = useState(false);

  let isValid = true;
  const validate = () => {
    if (token == '') {
      setBadToken(true);
      isValid = false;
    }
    else {
      setBadToken(false);
    }
    handleVerifyToken();
  }
  const [error, setError] = useState('');
  const email = route.params.email;
  const handleVerifyToken = async () => {
    try {
      const data = {
        email: email,
        token: token,
      };
      await axios.post('http://10.0.2.2:3000/user/reset-password/verify-token', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.data.success) {
          navigation.navigate('ResetPassword', {email});
        } else {
          setError('There was an issue resetting your password. Please try again.');
        }
      });
    } catch (error) {
      Alert.alert("Token Verification Failed", "Your token is incorrect. Please retry !");
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
          onPress={() => navigation.navigate("SendMail")}
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
          <Text style={{color: COLORS_v2.lightBlue}}>Turn Back</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Verify Token</Text>
      </View>
      <Image
        style={styles.logo}
        source={require('./reset_password.jpg')}
      />
      <KeyboardAvoidingView>
        <View style={{ flexDirection: "column", marginVertical: 6, alignSelf: 'center'}}>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="coins" size={24} color="black" style={styles.Icon}/>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setToken(text)}
              value={token}
              placeholder="Enter Token Sent To Your Mail"
            />
          </View>
        </View>
        {badToken === true && <>
          <Text style={{ flexDirection: "column", alignSelf: 'center', display: 'flex', color: 'red' }}>
            Please input the token
          </Text>
        </>}
        <TouchableOpacity style={styles.button} onPress={() => {validate()}}>
          <Text style={styles.buttonText}>Verify Token</Text>
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