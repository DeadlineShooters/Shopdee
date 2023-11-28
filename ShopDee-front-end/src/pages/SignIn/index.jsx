import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import SignUp from "./SignUp";
export default function SignIn() {
  const handleRegisterPress = () => {
    navigation.navigate('SignUp');
  };
  const [email, getEmail] = useState('');
  const [password, getPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./shopdee_icon.png')}
      />

      <Text style={styles.title}>SHOPDEE</Text>

      <TextInput
        style={styles.input}
        onChangeText={getEmail}
        value={email}
        placeholder="Enter Email Address"
      />

      <TextInput
        style={styles.input}
        onChangeText={getPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerLink} onPress={handleRegisterPress}>
        <Text>Do not have an account? <Text style={styles.register}>Register</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 100,
      justifyContent: 'top',
      paddingHorizontal: 10,
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
      paddingLeft: 10,
      marginBottom: 10,
    },

    title: {
      textAlign: 'center',
      marginBottom: 20,
      fontSize: 24,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    
    button: {
      height: 50,
      width: '40%',
      backgroundColor:'rgba(51, 153, 255, 0.5)',
      paddingHorizontal: 20,
      paddingVertical: 10,
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: 30,
      borderRadius: 30,
      marginLeft: '30%',
    },

    buttonText: {
      color: 'black',
      fontSize: 18,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },

    register: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    fontSize: 16,
    marginBottom: 20,
    },

    registerLink: {
      color: 'blue',
    },
  }); 