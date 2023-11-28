import { View, 
    Text,
    SafeAreaView, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    TextInput, 
    Modal,
    StyleSheet,
    Animated,
    Dimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import React, { useState, useRef } from "react";
import {COLORS} from "./Themes";
import {MaterialIcons, AntDesign, Entypo} from '@expo/vector-icons';
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Dropdown } from "react-native-element-dropdown";

const EditProfile = ({navigation}) => {
//Pop in animation
const windowHeight = Dimensions.get("window").height;
const [status, setStatus] = useState(null);
const popAnim = useRef(new Animated.Value(windowHeight *-1)).current;

const successColor = "#6dcf81";
const successHeader = "Success!";
const successMessage = "Your information was saved";
const failColor = "#bf6060";
const failHeader = "Failed!";
const failMessage = "Your information was still unsaved";

const popIn = () => {
    Animated.timing(popAnim, {
        toValue: windowHeight * -0.82*0.95,
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
//USER INFORMATION SETTING
const [selectedImage, setSelectedImage] = useState();
const [name, setName] = useState("Golden Papaya");
const [mail, setMail] = useState("goldenpapaya@gmail.com");
const [phone, setPhone] = useState("0921773092");
const [password, setPassword] = useState("letmein");

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
const save = () => {
    setStatus("success");
    popIn();
}
//Gender picker modal
const [gender, setGender] = useState("Not willing");
const [isFocus, setIsFocus] = useState(false);
const genderData = [
    {label: "Male", value: "male"},
    {label: "Female", value: "female"},
    {label: "Not willing", value: "notwilling"}
]

//Date picker modal
const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
const today = new Date();
const endDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
)
const [selectedStartDate, setSelectedStartDate] = useState("2000/01/01");
const [startedDate, setStartedDate] = useState("2000/01/01");
const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
}
const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
}
function renderDatePicker() {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={openStartDatePicker}
        >
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <View style={{
                    margin: 0,
                    backgroundColor: COLORS.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    padding: 35,
                    width: "90%",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5
                }}>
                    <DatePicker
                        mode="calendar"
                        maximumDate={endDate}
                        selected={startedDate}
                        current={startedDate}
                        onDateChange={handleChangeStartDate}
                        onSelectedChange={(date) => setSelectedStartDate(date)}
                        options={{
                            backgroundColor: COLORS.primary,
                            textHeaderColor: '#469ab6',
                            textDefaultColor: COLORS.white,
                            selectedTextColor: COLORS.white,
                            textHeaderFontSize: 18,
                            textFontSize: 14,
                            mainColor: '#469ab6',
                            textSecondaryColor: COLORS.white,
                            borderColor: "rgba(122, 146, 165, 0.1)"
                        }}
                    />
                    <TouchableOpacity onPress={handleOnPressStartDate}>
                        <Text style={{ fontSize: 16, color: COLORS.white }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
    }}>
        <View style={{
            marginVertical: 36,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        }}>

            <TouchableOpacity
                onPress={()=> navigation.goBack()}
                style={{
                    position: "absolute",
                    left: -10,
                    flexDirection: "row",
                    alignItems: "center"
                }}>

                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={24}
                    color={COLORS.lightBlue}
                />
                <Text style={{color: COLORS.lightBlue}}>Profile</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>User information</Text>
        </View>
        <ScrollView>
            <View style={{
                alignItems: "center",
            }}>
                <TouchableOpacity onPress={handleImageSelection}>
                    <Image
                        source={require('../../../../assets/avatar.jpg')}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 85,
                            borderWidth: 2,
                            borderColor: COLORS.primary
                        }}
                    />
                    <View style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        zIndex: 9999,
                    }}>
                        <MaterialIcons
                            name="photo-camera"
                            size={32}
                            color={COLORS.primary}
                        />

                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <View style={{
                    flexDirection: "column",
                    marginBottom: 6,
                }}>
                    <Text style={{
                        fontSize: 16,
                    }}>Name</Text>
                    <View style={{
                        height: 44,
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: "center",
                        paddingLeft: 8
                    }}>
                        <TextInput
                            value={name}
                            onChangeText={value => setName(value)}
                            editable={true}
                        />
                    </View>
                </View>
            </View>
            <View>
                <View style={{
                    flexDirection: "column",
                    marginBottom: 6,
                }}>
                    <Text style={{
                        fontSize: 16,
                    }}>Email</Text>
                    <View style={{
                        height: 44,
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: "center",
                        paddingLeft: 8
                    }}>
                        <TextInput
                            value={mail}
                            onChangeText={value => setMail(value)}
                            editable={true}
                        />
                    </View>
                </View>
            </View>
            <View>
                <View style={{
                    flexDirection: "column",
                    marginBottom: 6,
                }}>
                    <Text style={{
                        fontSize: 16,
                    }}>Phone</Text>
                    <View style={{
                        height: 44,
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: "center",
                        paddingLeft: 8
                    }}>
                        <TextInput
                            value={phone}
                            onChangeText={value => setPhone(value)}
                            editable={true}
                            keyboardType='number-pad'
                        />
                    </View>
                </View>
            </View>
            <View>
                <View style={{
                    flexDirection: "column",
                    marginBottom: 6,
                }}>
                    <Text style={{ fontSize: 16 }}>Gender</Text>
                    <Dropdown
                        style={[ {height: 50,
                            borderColor: COLORS.secondaryGray,
                            borderWidth: 1,
                            borderRadius: 4,
                            paddingHorizontal: 8,
                            marginVertical: 6},
                            isFocus && {borderColor: 'blue'}]}
                        containerStyle={{
                            backgroundColor: COLORS.primary, 
                            borderWidth: 0.5,
                            borderRadius: 8,}}
                        itemTextStyle={{color: COLORS.lightBlue}}
                        placeholderStyle={{fontSize: 16}}
                        selectedTextStyle={{fontSize: 16}}
                        data={genderData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? gender : gender}
                        value={gender}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setGender(item.value);
                            setIsFocus(false);
                        }}
                        />
                </View>
            </View>
            <View>
                <View style={{
                    flexDirection: "column",
                    marginBottom: 6,
                }}>
                    <Text style={{ fontSize: 16 }}>Date of birth</Text>
                    <TouchableOpacity
                        onPress={handleOnPressStartDate}
                        style={{
                            height: 44,
                            width: "100%",
                            borderColor: COLORS.secondaryGray,
                            borderWidth: 1,
                            borderRadius: 4,
                            marginVertical: 6,
                            justifyContent: "center",
                            paddingLeft: 8
                        }}>
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
                marginBottom: 20,
            }}>                        
                <View style={{
                    borderRadius: 12,
                        backgroundColor: COLORS.blue,
                        alignItems: "center",
                    }}>                        
                    <Text style={{fontSize:16, fontWeight:600, marginVertical: 10, color: COLORS.white}}>Save</Text>
                </View>
            </View>
        </TouchableOpacity>
    </SafeAreaView>
)
}

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