import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, SafeAreaView, Animated, StyleSheet, Dimensions, Alert  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { COLORS } from '../../../../assets/Themes';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios"
import { useNavigation } from "@react-navigation/native";
const shopDefault = {
  url: "https://res.cloudinary.com/dqxtf297o/image/upload/v1703319888/rgbptr0a7ebx5njabzkl.png",
  public_id: 'rgbptr0a7ebx5njabzkl',
}

export default function CreateShop() {
  const navigation = useNavigation();
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
  const [selectedImage, setSelectedImage] = useState(null);
  // const [publicId, setPublicId] = useState("");
  // const [secureUrl, setSecureUrl] = useState("");
  const maxCharactersName = 30; // Số ký tự tối đa cho phép
  const maxCharactersBio = 200;

  // const image = null;

  const handleOnPressGoBack = () => {
    if (shopName != '' || email != '' || phone != '' || bio != '' || address != '') {
      Alert.alert('Confirm message', 'Your shop information is not saved. Exit now?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel request'),
        },
        {
          text: 'Ok',
          onPress: () => navigation.goBack(),
        }
      ]);
    }
    else {
      navigation.goBack()
    }
  }

  const handleCreate = async () => {
    // Xử lý logic đăng ký ở đây
    const token = await AsyncStorage.getItem("authToken");
    const userID = jwtDecode(token).userID;
    const shop = {
      image: null,
      shopName: shopName,
      bio: bio,
      address: address,
      email: email,
      phone: phone,
      userId: userID
    }
    try {
      if (selectedImage) {
        const { url, public_id } = handleImageUpload(selectedImage);
        shop.image = { url, public_id };
      } else {
        shop.image = shopDefault;
      }
      await axios.post("http://10.0.2.2:3000/shop/createShop", shop)
      console.log(shopName);
      await handleImageUpload(shopDefault);
      setStatus("success");
      popIn();
      navigation.navigate('SellerBottomNav', { screen: 'My Products' });
    } catch (error) {
      Alert.alert(
        "Create shop error", 
        "An error occured during registration"
      );
      console.log("registration failed", error);
    }
  };

  const handleImageUpload = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ShopDeeImageStock");
    data.append("cloud_name", "dqxtf297o");

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dqxtf297o/image/upload", {
          method: "post",
          body: data,
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          return result;
        } else {
            console.error("API request failed:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error during API request:", error);
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
      let image = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`,
      }
      setSelectedImage(image);
    }
  }
  const popIn = () => {
    Animated.timing(popAnim, {
        toValue: windowHeight * -0.7*0.95,
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
    }, 5000);
  };

  const instantPopOut = () => {
    Animated.timing(popAnim, {
        toValue: windowHeight * -1,
        duration: 150,
        useNativeDriver: true,
    }).start();
  };
  // const showToast = () => {
  //     ToastAndroid.show('Toast message displayed!', ToastAndroid.SHORT);
  // };

  
  
  return (
    <SafeAreaView
      style={{backgroundColor: '#E3E3E3',flex: 1,}}>
      <View
        style={{
          display: "flex",
          backgroundColor: 'white',
          alignItems: 'center',
          padding: 10,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity onPress={handleOnPressGoBack} style={{ position: "absolute", left: 4 }}>
          <AntDesign name="arrowleft" style={{ fontSize: 24 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Create Shop </Text>
      </View>


      <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#00a7e1' }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'white', overflow: 'hidden' }}>
          <Image
            style={{
              resizeMode: "contain",
              flex: 1,
              width: undefined,
              height: undefined,
            }}
            source={{uri: selectedImage? selectedImage.uri:shopDefaut.url}}
            // source={shopDefaut}
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleImageSelection}>
            <Text style={{color: 'white',}}>
              Choose profile photo
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
          onChangeText={text => setShopName(text)}
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
          onChangeText={text => setBio(text)}
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
        <Text style={{ fontSize: 16 }}>Pickup address</Text>
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
        <Text style={{ fontSize: 16 }}>Email</Text>
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
          keyboardType = {'number-pad'}
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
  
      {shopName != '' && email != '' && phone != '' && bio != '' && address != '' ?
        <TouchableOpacity onPress={handleCreate}>
            <View style={{margin: 20, padding: 10,}}>                        
                <View style={{borderRadius: 12, backgroundColor: COLORS.blue, alignItems: "center", }}>                        
                    <Text style={{fontSize:16, fontWeight:600, marginVertical: 10, color: COLORS.white}}>Create</Text>
                </View>
            </View>
        </TouchableOpacity> :
        <View style={{margin: 20, padding:10}}>                        
            <View style={{borderRadius: 12, backgroundColor: COLORS.secondaryGray, alignItems: "center", }}>                        
                <Text style={{fontSize:16, fontWeight:600, marginVertical: 10, color: COLORS.white}}>Create</Text>
            </View>
        </View>
      }
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