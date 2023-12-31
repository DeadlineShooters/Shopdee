import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, Modal, StyleSheet, Animated, Alert, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useRef, useEffect, useContext } from "react";
import { COLORS_v2 } from "../../../../constants/theme.js";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import "core-js/stable/atob";
import { UserContext } from "../../../../context/UserContext.js";
import { fetchUserInfo } from "../../../api/userApi.js";

const EditProfile = ({ navigation, route }) => {
  //Pop in animation
  const windowHeight = Dimensions.get("window").height;
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;
  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "Your information was saved";
  const failColor = "#bf6060";
  const failHeader = "Failed!";
  const failMessage = "Your information was still unsaved";

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: windowHeight * -0.82 * 0.95,
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

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
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

  //Gender picker modal
  const [gender, setGender] = useState("Not willing");
  const [isFocus, setIsFocus] = useState(false);
  const genderData = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Not willing", value: "notwilling" },
  ];

  //Date picker modal
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const endDate = getFormatedDate(today.setDate(today.getDate()), "YYYY/MM/DD");
  const [selectedStartDate, setSelectedStartDate] = useState("2000/01/01");
  const [startedDate, setStartedDate] = useState("2000/01/01");
  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  //USER INFORMATION SETTING
  const user = route.params.user;
  const [public_id, setPublicId] = useState();
  const [url, setSecureUrl] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [username, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [checkValidMail, setCheckValidMail] = useState(false);
  const [phone, setPhone] = useState("");
  const [checkValidPhone, setCheckValidPhone] = useState(false);

  //Change information
  const [changeSelectedImage, setChangeSelectedImage] = useState();
  const [changeName, setChangeName] = useState("");
  const [changeMail, setChangeMail] = useState("");
  const [changePhone, setChangePhone] = useState("");
  const [changeGender, setChangeGender] = useState("");
  const [changeSelectedStartDate, setChangeSelectedStartDate] = useState("");
  const [changeStartedDate, setChangeStartedDate] = useState("");

  useEffect(() => {
    setUserName(user.username);
    setMail(user.email);
    setPhone(user.phone);
    setGender(user.gender);
    setSelectedStartDate(user.birthDay);
    setSelectedImage(user?.profilePic?.url);
    setPublicId(user?.profilePic?.public_id)
    setSecureUrl(user?.profilePic?.url);

    setChangeName(user.username);
    setChangeMail(user.email);
    setChangePhone(user.phone);
    setChangeGender(user.gender);
    setChangeSelectedStartDate(user.birthDay);
    setChangeSelectedImage(user?.profilePic?.url);
  }, []);

  const handleOnPressGoBack = ({ navigation }) => {
    if (
      changeName != username ||
      changeMail != mail ||
      changePhone != phone ||
      changeGender != gender ||
      changeSelectedStartDate != selectedStartDate ||
      changeSelectedImage != selectedImage
    ) {
      Alert.alert("Confirm message", "Your profile is not saved. Exit now?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel request"),
        },
        {
          text: "Ok",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      navigation.goBack();
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

  const handleCheckMail = text => {
    let re = /\S+@\S+\.\S+/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setMail(text);
    if (re.test(text) || reg.test(text)) {
      setCheckValidMail(false);
    } else {
      setCheckValidMail(true);
    }
  };

  const handleCheckPhone = text => {
    setPhone(text);
    if (text.length === 10 && text.charAt(0) === '0')
    {
      setCheckValidPhone(false);
    } else {
      setCheckValidPhone(true);
    }
    console.log(checkValidPhone);
  }

  const { setUser } = useContext(UserContext);
  const updateData = async () => {
    setChangeName(username);
    setChangeMail(mail);
    setChangePhone(phone);
    setChangeGender(gender);
    setChangeSelectedStartDate(startedDate);
    setChangeSelectedImage(selectedImage);
    try {
      const userID = user._id;
      const profilePic = { public_id, url };
      const userInfo = {
        username: username,
        email: mail,
        phone: phone,
        gender: gender,
        birthDay: selectedStartDate,
        profilePic: profilePic,
      };
      setUser(userInfo);
      await axios.put(`http://10.0.2.2:3000/user/profile/update/${userID}`, userInfo);
      setStatus("success");
      popIn();
      try {
        const data = await fetchUserInfo(userID);
        setUser(data);
        console.log("@@ User: ", data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
      navigation.goBack();
    } catch (error) {
      console.log("error message", error);
    }
  }
  const save = async () => {
    if (checkValidMail == false && checkValidPhone == false) {
      updateData();
    } else if (checkValidMail == true) {
      Alert.alert("Updating user profile failed", "Your mail is invalid. Please input again");
    } else if (checkValidPhone == true) {
      Alert.alert("Updating user profile failed", "Your phone is invalid. Please input again");
    }
  }

  function renderDatePicker() {
    return (
      <Modal animationType="slide" transparent={true} visible={openStartDatePicker}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              margin: 0,
              backgroundColor: COLORS_v2.primary,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              padding: 35,
              width: "90%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DatePicker
              mode="calendar"
              maximumDate={endDate}
              selected={startedDate}
              current={startedDate}
              onDateChange={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: COLORS_v2.primary,
                textHeaderColor: "#469ab6",
                textDefaultColor: COLORS_v2.white,
                selectedTextColor: COLORS_v2.white,
                textHeaderFontSize: 18,
                textFontSize: 14,
                mainColor: "#469ab6",
                textSecondaryColor: COLORS_v2.white,
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
            />
            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ fontSize: 16, color: COLORS_v2.white }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS_v2.white,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginVertical: 36,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleOnPressGoBack({ navigation })}
          style={{
            position: "absolute",
            left: -10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS_v2.lightBlue} />
          <Text style={{ color: COLORS_v2.lightBlue }}>Profile</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>User information</Text>
      </View>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS_v2.primary,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                zIndex: 9999,
              }}
            >
              <MaterialIcons name="photo-camera" size={32} color={COLORS_v2.primary} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Name
            </Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS_v2.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput value={username} onChangeText={(value) => setUserName(value)} editable={true} />
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Email
            </Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS_v2.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput 
                value={mail}
                onChangeText={(value) => {handleCheckMail(value);}} 
                editable={true} 
              />
            </View>
          </View>
        </View>
        {checkValidMail ? 
        (
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{color: COLORS_v2.red}}>Warn: Wrong format mail</Text>
          </View>
        ) : 
        (
          <Text style={{color: COLORS_v2.lightBlue}}></Text>
        )}
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Phone
            </Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS_v2.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={phone} 
                onChangeText={(value) => handleCheckPhone(value)} 
                editable={true} 
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>
        {checkValidPhone ? 
        (
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{color: COLORS_v2.red}}>Warn: Wrong format phone</Text>
          </View>
        ) : 
        (
          <Text style={{color: COLORS_v2.lightBlue}}></Text>
        )}
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 16 }}>Gender</Text>
            <Dropdown
              style={[
                { height: 50, borderColor: COLORS_v2.secondaryGray, borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, marginVertical: 6 },
                isFocus && { borderColor: "blue" },
              ]}
              containerStyle={{
                backgroundColor: COLORS_v2.primary,
                borderWidth: 0.5,
                borderRadius: 8,
              }}
              itemTextStyle={{ color: COLORS_v2.lightBlue }}
              placeholderStyle={{ fontSize: 16 }}
              selectedTextStyle={{ fontSize: 16 }}
              data={genderData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? gender : gender}
              value={gender}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setGender(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 16 }}>Date of birth</Text>
            <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS_v2.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <Text>{selectedStartDate}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {renderDatePicker()}
      </ScrollView>
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
      {changeName != username ||
      changeMail != mail ||
      changePhone != phone ||
      changeGender != gender ||
      changeSelectedStartDate != selectedStartDate ||
      selectedImage != changeSelectedImage ? (
        <TouchableOpacity onPress={save}>
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <View
              style={{
                borderRadius: 12,
                backgroundColor: COLORS_v2.blue,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10, color: COLORS_v2.white }}>Save</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS_v2.secondaryGray,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10, color: COLORS_v2.white }}>Save</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default EditProfile;

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
});
