import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, SafeAreaView, Animated, StyleSheet, Dimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { COLORS } from '../../../../assets/Themes';

export default function CreateShop({navigation}) {
 
  const windowHeight = Dimensions.get("window").height;
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(windowHeight *-1)).current;
  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "Your information was saved";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "Your information was still unsaved";


  const [shopName, setShopName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState('./avatar.jpg');
  const [maxCharactersName] = useState(30); // Số ký tự tối đa cho phép
  const [maxCharactersBio] = useState(200);

  const [badShopName, setBadShopName] = useState(false);
  const [badBio, setBadBio] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [badAddress, setBadAddress] = useState(false);
  const [badPhone, setBadPhone] = useState(false);
  let isValid = true;
  const validate = () => {
    if (email == '') {
      setBadEmail(true);
      isValid = false;
    }
    else {
      setBadEmail(false);
    }
    if (shopName == '') {
      setBadShopName(true);
      isValid = false;
    }
    else {
      setBadShopName(false);
    }
    if (Bio == '') {
      setBadBio(true);
      isValid = false;
    }
    else {
      setBadBio(false);
    }
    if (address == '') {
      setBadAddress(true);
      isValid = false;
    }
    else {
      setBadAddress(false);
    }
    if (phone == '') {
      setBadPhone(true);
      isValid = false;
    }
    else {
      setBadPhone(false);
    }

    setTimeout(() => {
      if (isValid == true) {
        handleSignUp();
        navigation.goBack();
      }
      else
      {
        setShopName("");
        setBio("");   
        setAddress("");
        setEmail("");        
        setPhone("");
      }
    }, 1000);
  }
  const handleSignUp = async () => {
    // Xử lý logic đăng ký ở đây
    const shop = {
      image: imageShop,
      shopName: shopName,
      bio: bio,
      address: address,
      email: email,
      phone: phone,
      userId: '123'
    }
    try {
      await axios.post("http://10.0.2.2:3000/shop/createShop", shop)
    } catch (error) {
      Alert.alert(
        "Create shop error", 
        "An error occured during registration"
      );
      console.log("registration failed", error);
    }
  };
  const popIn = () => {
        Animated.timing(popAnim, {
            toValue: windowHeight * -0.8*0.95,
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
      setSelectedImage(result.assets[0].uri);
    }
  }
  
  return (
    <SafeAreaView
      style={{
        // width: '100%',
        // height: '100%',
        backgroundColor: '#E3E3E3',
        flex: 1,

      }}>
      <View
  style={{
    display: "flex",
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    marginVertical: 36,
    flexDirection: "row",
    justifyContent: "center"
  }}
>
  <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 4 }}>
    <AntDesign name="arrowleft" style={{ fontSize: 24 }} />
  </TouchableOpacity>
  <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Create Shop </Text>
</View>


      <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#00a7e1' }}>
        <Image
          source={{uri: selectedImage}}
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
          placeholder="Shop name"
          style={{
            fontSize: 16,
            borderColor: '#CDCDCD',
            marginHorizontal: 10,
            flex: 1
          }}
          value={shopName}
          onChangeText={handleShopNameChange}
          maxLength={maxCharactersName}
        />
        <Text style={{ color: COLORS.limitGray }}> {shopName.length}/{maxCharactersName}</Text>
      </View>
      <View style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: "space-between",
      }}>
        <Text style={{ fontSize: 16 }}>Bio</Text>

        <Text style={{ color: COLORS.limitGray }}>{bio.length}/{maxCharactersBio}</Text>

      </View>
      <View style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
      }}>
      <TextInput
          multiline={true}
          placeholder="Shop description"
          style={{
            fontSize: 16,
            borderColor: '#CDCDCD',
            marginHorizontal: 10,
            flex: 1
          }}
          value={bio}
          onChangeText={handleBioChange}
          maxLength={maxCharactersBio}
          numberOfLines={5} // Số dòng hiển thị
          textAlignVertical="top" // Căn văn bản từ phía trên xuống
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
          value ={address}
          onChangeText={value => setAddress(value)}
          placeholder="setup"
          style={{
            fontSize: 16,
            borderColor: '#CDCDCD',
            marginHorizontal: 10,
            flex: 1,
          }} />
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
           value ={email}
           onChangeText={value => setEmail(value)}
          placeholder="setup"
          style={{
            fontSize: 16,
            borderColor: '#CDCDCD',
            marginHorizontal: 10,
            flex: 1,
          }} />
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
           value ={phone}
           onChangeText={value => setPhone(value)}
          placeholder="setup"
          style={{
            fontSize: 16,
            borderColor: '#CDCDCD',
            marginHorizontal: 10,
            flex: 1,
          }} />
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
      <TouchableOpacity onPress={save}>
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
      </TouchableOpacity>
    </SafeAreaView>

  );

  
}

const styles = StyleSheet.create({
  toastContainer: {
      height: 60,
      // width: 350,
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
      width: "100%",
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
