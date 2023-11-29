import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] =useState(false);
  const handlePassword = () => {
    setHidePassword(!hidePassword)
  };
  const handleSignUp = () => {
    // Xử lý logic đăng ký ở đây
  };
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
        <Image
        style={styles.logo}
        source={require('./shopdee_icon.png')}
      />

      <Text style={styles.title}>SHOPDEE</Text>


      <View style={{ flexDirection: "column", marginBottom: 6, alignSelf: 'center', display: 'flex', }}>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={24} color="black" style={styles.Icon} />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter Email Address"
          />
        </View>
      </View>
      
      <View style={{ flexDirection: "column", marginBottom: 6, alignSelf: 'center', display: 'flex', }}>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="black" style={styles.Icon} />
          <TextInput
            style={styles.input}
           onChangeText={setUsername}
           value={username}
           placeholder="Username"
           />
        </View>
      </View>  
          
      <View style={{ flexDirection: "column", marginBottom: 6, alignSelf: 'center', display: 'flex', }}>
        <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.Icon} onPress={handlePassword}>
        <Entypo name= {hidePassword ? "eye" : "eye-with-line"} size={24} color="black" style={styles.Icon}/>
      </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
           value={password}
            placeholder="Password"
            secureTextEntry = {hidePassword? false : true}
          />
        </View>
      </View> 


      <View style={{ flexDirection: "column", marginBottom: 6, alignSelf: 'center', display: 'flex', }}>
        <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.Icon} onPress={handlePassword}>
        <Entypo name= {hidePassword ? "eye" : "eye-with-line"} size={24} color="black" style={styles.Icon}/>
      </TouchableOpacity>
          <TextInput
           style={styles.input}
           onChangeText={setConfirmPassword}
           value={confirmPassword}
           placeholder="Confirm Password"
            secureTextEntry = {hidePassword? false : true}
         />
        </View>
      </View> 

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Register</Text>
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
    paddingLeft: 50,
    marginBottom: 10,
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
  backButton: {
    position: 'absolute',
    top: -70,
    left: 40, 
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
