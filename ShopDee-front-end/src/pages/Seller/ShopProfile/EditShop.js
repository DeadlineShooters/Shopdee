import React, { useState, useRef, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, SafeAreaView, Animated, StyleSheet, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { UserContext } from "../../../../context/UserContext";
import { COLORS } from "../../../../assets/Themes";
import axios from "axios";

export default function CreateShop({ navigation, route }) {
  const shopProfile = route.params.shop;
  console.log(shopProfile);
  const [shopID, setShopID] = useState("");
  const [shopName, setShopName] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [maxCharactersName] = useState(30); // Số ký tự tối đa cho phép
  const [maxCharactersBio] = useState(200);
  const [publicId, setPublicId] = useState("");
  const [secureUrl, setSecureUrl] = useState("");

  const windowHeight = Dimensions.get("window").height;
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;
  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "Your information was saved";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "Your information was still unsaved";

  useEffect(() => {
    setShopID(shopProfile.shop._id);
    setShopName(shopProfile.shop.name);
    setBio(shopProfile.shop.description);
    setAddress(shopProfile.shop.address);
    setEmail(shopProfile.shop.email);
    setPhone(shopProfile.shop.phone);
    setSelectedImage(shopProfile.shop.image.url);
  }, []);
  // Check form changes
  const initialFormState = useRef({
    shopName,
    bio,
    address,
    email,
    phone,
    selectedImage,
  });
  const isFormEdited = useRef(false);
  useEffect(() => {
    // Compare the current form state with the initial state
    const isEdited =
      shopName !== initialFormState.current.shopName ||
      bio !== initialFormState.current.bio ||
      address !== initialFormState.current.address ||
      email !== initialFormState.current.email ||
      phone !== initialFormState.current.phone ||
      JSON.stringify(selectedImage) !== JSON.stringify(initialFormState.current.selectedImage);
    // Set the flag accordingly
    isFormEdited.current = isEdited;
    // Cleanup function to reset the flag when the component unmounts
    return () => {
      isFormEdited.current = false;
    };
  }, [shopName, bio, address, email, phone, selectedImage]);

  const handleGoBack = () => {
    if (isFormEdited.current) {
      // If there are unsaved changes, show a confirmation prompt
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Do you want to discard?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Discard",
            onPress: () => {
              // Reset the flag and navigate back
              isFormEdited.current = false;
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      // If no changes, simply navigate back
      navigation.goBack();
    }
  };

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * -0.7 * 0.95,
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
    ToastAndroid.show("Toast message displayed!", ToastAndroid.SHORT);
  };

  const handleShopNameChange = (text) => {
    if (text.length <= maxCharactersName) {
      setShopName(text);
    }
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
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      let image = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`,
      };
      handleUpload(image);
    }
  };

  const handleUpload = async (image) => {
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
        setPublicId(result.public_id);
        setSecureUrl(result.secure_url);
      } else {
        console.error("API request failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const save = async () => {
    isFormEdited.current = false;
    try {
      const profilePic = { publicId, secureUrl };
      console.log(profilePic);
      const shopProfile = {
        shopName,
        bio,
        address,
        email,
        phone,
        profilePic: profilePic,
      };
      await axios.put(`http://10.0.2.2:3000/shop/shopProfile/${shopID}/update`, shopProfile);
      setStatus("success");
      popIn();
    } catch (error) {
      console.error("Error: Updating shop profile", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        // width: '100%',
        // height: '100%',
        backgroundColor: "#E3E3E3",
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          marginTop: 22,
          position: "relative",
        }}
      >
        <TouchableOpacity onPress={handleGoBack} style={{ position: "absolute", left: 10 }}>
          <AntDesign name="arrowleft" style={{ fontSize: 24 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}> Edit Profile </Text>
      </View>

      <View style={{ padding: 20, alignItems: "center", backgroundColor: "#00a7e1" }}>
        <Image source={{ uri: selectedImage }} style={{ width: 80, height: 80, borderRadius: 100 }} />
        <View>
          <TouchableOpacity onPress={handleImageSelection}>
            <Text
              style={{
                color: "white",
              }}
            >
              Change profile photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          marginTop: 10,
          marginBottom: 2,
        }}
      >
        <Text style={{ fontSize: 16 }}>Shop name</Text>
        <TextInput
          placeholder="Shop name"
          style={{
            fontSize: 16,
            borderColor: "#CDCDCD",
            marginHorizontal: 10,
            flex: 1,
          }}
          value={shopName}
          onChangeText={handleShopNameChange}
          maxLength={maxCharactersName}
        />
        <Text style={{ color: COLORS.limitGray }}>
          {" "}
          {shopName.length}/{maxCharactersName}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16 }}>Bio</Text>

        <Text style={{ color: COLORS.limitGray }}>
          {bio.length}/{maxCharactersBio}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <TextInput
          multiline={true}
          placeholder="Shop description"
          style={{
            fontSize: 16,
            borderColor: "#CDCDCD",
            marginHorizontal: 10,
            flex: 1,
          }}
          value={bio}
          onChangeText={handleBioChange}
          maxLength={maxCharactersBio}
          numberOfLines={5} // Số dòng hiển thị
          textAlignVertical="top" // Căn văn bản từ phía trên xuống
        />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 2,
        }}
      >
        <Text style={{ fontSize: 16 }}>Pickup address</Text>
        <TextInput
          placeholder="setup"
          style={{
            fontSize: 16,
            borderColor: "#CDCDCD",
            marginHorizontal: 10,
            flex: 1,
          }}
          value={address}
          onChangeText={(value) => setAddress(value)}
        />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Text style={{ fontSize: 16 }}>Email</Text>
        <TextInput
          placeholder="setup"
          style={{
            fontSize: 16,
            borderColor: "#CDCDCD",
            marginHorizontal: 10,
            flex: 1,
          }}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16 }}>Phone number</Text>
        <TextInput
          placeholder="setup"
          keyboardType={"number-pad"}
          style={{
            fontSize: 16,
            borderColor: "#CDCDCD",
            marginHorizontal: 10,
            flex: 1,
          }}
          value={phone}
          onChangeText={(value) => setPhone(value)}
        />
      </View>
      <View>
        <Animated.View
          style={[
            styles.toastContainer,
            {
              transform: [{ translateY: popAnim }],
            },
          ]}
        >
          <View style={styles.toastRow}>
            <AntDesign name={status === "success" ? "checkcircleo" : "closecircleo"} size={24} color={status === "success" ? successColor : failColor} />
            <View style={styles.toastText}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>{status === "success" ? successHeader : failHeader}</Text>
              <Text style={{ fontSize: 12 }}>{status === "success" ? successMessage : failMessage}</Text>
            </View>
            <TouchableOpacity onPress={instantPopOut}>
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      {isFormEdited.current == true ? (
        <TouchableOpacity onPress={save}>
          <View
            style={{
              marginBottom: 20,
              padding: 10,
            }}
          >
            <View
              style={{
                borderRadius: 12,
                backgroundColor: COLORS.blue,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10, color: COLORS.white }}>Save</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            marginBottom: 20,
            padding: 10,
          }}
        >
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.secondaryGray,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10, color: COLORS.white }}>Save</Text>
          </View>
        </View>
      )}
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
});
