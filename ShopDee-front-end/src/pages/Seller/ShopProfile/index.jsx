import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, SafeAreaView, Animated, StyleSheet, Dimensions, useIsFocused,  useFocusEffect  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Entypo } from '@expo/vector-icons';
import axios from "axios";
import { UserType } from "../../../../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import { COLORS } from '../../../../assets/Themes';
const shop = {
  image: '',
  name: 'Loc Shop',
  email: 'loc123@gmail.com',
  phone: '0123456789',
  address: '227 Nguyen Van Cu',
  description: 'abc',
}


export default function EditShopProfile({navigation, route}) {
  const [shopName, setShopName] = useState('');
  const [setSelectedImage] = useState('');
  const [bio, setBio] = useState('');
  const [maxCharactersName] = useState(30); // Số ký tự tối đa cho phép
  const [maxCharactersBio] = useState(200);
  const windowHeight = Dimensions.get("window").height;
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(windowHeight *-1)).current;
  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "Your information was saved";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "Your information was still unsaved";
  const {userID, setUserID} = useContext (UserType)
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwtDecode(token);
            const userID = decodedToken.userID;
            setUserID(userID);
            const response = await axios.get(`http://10.0.2.2:3000/user/profile/${userID}`);
            const user = response.data;
            console.log(user);
            setUser(user);
            // setUserName(user?.User?.username);
        } catch (error) {
            console.log("error", error);
        }
    }
    fetchUserProfile();
}, []);
  const popIn = () => {
        Animated.timing(popAnim, {
            toValue: windowHeight * -0.35*0.95,
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
        ToastAndroid.show('Toast message displayed!', ToastAndroid.SHORT);
    };

  const handleShopNameChange = (text) => {
    if (text.length <= maxCharactersName) {
      setShopName(text);
    }
  };
  const save = () => {
    setStatus("success");
    popIn();
  };

  const handleBioChange = (text) => {
    if (text.length <= maxCharactersBio) {
      setBio(text);
    }
  };
  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].url);
    }
  }

  return (
    <SafeAreaView
      style={{
        // width: '100%',
        // height: '100%',
        backgroundColor: '#E3E3E3',
        flex: 1
      }}>
      <View
        style={{
          display: "flex",
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          marginTop: 22,
          position:'relative'
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" style={{ fontSize: 24 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', alignSelf: "center"}}> Shop Profile </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#00a7e1' }}>
        <Image
          source={require('./avatar.jpg')}
          style={{ width: 80, height: 80, borderRadius: 100 }}
        />
        <View>
          <TouchableOpacity onPress={handleImageSelection}>
            <Text
              style={{
                color: 'white',
              }}>
              Change profile photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 2
  
      }}>
        <Text style={{ fontSize: 16 }}>Shop name</Text>
        <TextInput
      
          style={{
            fontSize: 16,
            borderColor: '#CDCDCD',
            marginHorizontal: 10,
            flex: 1,
            color: COLORS.lightBlue
          }}
          value={shop.name}
          onChangeText={handleShopNameChange}
          maxLength={maxCharactersName}
          editable={false}
        />

      </View>
      <View style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: "space-between",
      }}>
        <Text style={{ fontSize: 16 }}>Bio</Text>

      </View>
      <View style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
      }}>
      <TextInput
          multiline={true}
          style={{
            fontSize: 16,
            borderColor: '#CDCDCD',
            marginHorizontal: 10,
            flex: 1,
            color: COLORS.lightBlue
          }}
          value={shop.description}
          onChangeText={handleBioChange}
          maxLength={maxCharactersBio}
          numberOfLines={5} // Số dòng hiển thị
          textAlignVertical="top" // Căn văn bản từ phía trên xuống
          editable={false}
        />
      </View>
      <View style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 2
      }}>
        <Text
          style={{ fontSize: 16 }}>
          Pickup address
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            borderColor: '#CDCDCD',
            marginHorizontal: 10,
            flex: 1,
            color: COLORS.lightBlue
          }} 
          value={shop.address}
          editable={false}/>
          
      </View>
      <View style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        marginBottom: 2
        
      }}>
        <Text
          style={{ fontSize: 16 }}>
          Email
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            borderColor: '#CDCDCD',
            marginHorizontal: 10,
            flex: 1,
            color: COLORS.lightBlue
          }} 
          value={shop.email}
          editable={false}
          />
      </View>
      <View style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        
      }}>
        <Text
          style={{ fontSize: 16 }}>
          Phone number
        </Text>
        <TextInput
          style={{
            fontSize: 16,
            borderColor: '#CDCDCD',
            marginHorizontal: 10,
            flex: 1,
            color: COLORS.lightBlue
          }}
          value={shop.phone}
          editable={false} />
      </View>
      <View>
        <Animated.View
          style={[
            styles.toastContainer,
            {
              transform: [{ translateY: popAnim }],
            },
          ]}>
          <View style={styles.toastRow}>
            <AntDesign
              name={status === "success" ? "checkcircleo" : "closecircleo"}
              size={24}
              color={status === "success" ? successColor : failColor}
            />
            <View style={styles.toastText}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {status === "success" ? successHeader : failHeader}
              </Text>
              <Text style={{ fontSize: 12 }}>
                {status === "success" ? successMessage : failMessage}
              </Text>
            </View>
            <TouchableOpacity onPress={instantPopOut}>
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      {/* <TouchableOpacity onPress={save}>
        <View style={{
          padding: 10,
          marginBottom: 20,
        }}>
          <View style={{
            borderRadius: 12,
            backgroundColor: "#007EA7",
            alignItems: "center",
          }}>
            <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10, color: '#FFFFFF' }}>Create</Text>
          </View>
        </View>
      </TouchableOpacity> */}
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
  
}
);
