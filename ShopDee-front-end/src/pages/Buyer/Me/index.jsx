import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert } from "react-native";
import { useState, useContext, useEffect } from "react";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React from "react";
import { COLORS } from "./Themes.js";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { UserType } from "../../../../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const Me = ({ navigation }) => {
    const navigateToEditProfile = () => {
        navigation.navigate("EditProfile", { props: user });
    }
    const navigateToShopOwner = async () => {
        const findUser = {userID};
        try {
            await axios.post('http://10.0.2.2:3000/user/profile/checkShopOwner', findUser);
            navigation.navigate('SellerBottomNav', { screen: 'My Products' });
        } catch (error) {
            Alert.alert(
                "Shop registration needed",
                "Do you want to create shop?",
                [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel request'),
                },
                {
                    text: 'Ok',
                    onPress: () => navigation.navigate("CreateShop"),
                }
                ]
            );
            console.log("error retrieving user data", error);
        }
    }
    const navigateToSettings = () => {
        navigation.navigate("Settings", { props: user });
    }
    const navigateToSetAddress = () => {
        navigation.navigate("SetAddress");
    }
    const navigateToTermsAndPolicies = () => {
        navigation.navigate("UserPrivacy");
    }
    const navigateToAboutShopDee = () => {
        navigation.navigate("AboutShopDee");
    }
    const navigateToSupport = () => {
        navigation.navigate("HelpSupport");
    }
    const accountItems = [
        { icon: "person", text: "Edit Profile", color: "#2b5087", action: navigateToEditProfile },
        { icon: "add-business", text: "For Shop Owner", color: "#1DA664", action: navigateToShopOwner },
        { icon: "settings", text: "Settings", color: "#D7882B", action: navigateToSettings },
        { icon: "map", text: "Address", color: "#1ab780", action: navigateToSetAddress }
    ];
    const supportItems = [
        { icon: "text-snippet", text: "User Privacy", color: "#4F12B3", action: navigateToTermsAndPolicies },
        { icon: "help-outline", text: "Help & Support", color: "#a4055b", action: navigateToSupport },
        { icon: "info-outline", text: "About ShopDee", color: "#fc3a3a", action: navigateToAboutShopDee },
    ];
    const renderSettingsItems = ({ icon, text, color, action }) => (
        <TouchableOpacity
            onPress={action}
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
                paddingLeft: 12,
                borderWidth: 1,
                borderColor: COLORS.gray,
                alignItems: "center"
            }}
        >
            <View style={{ flexDirection: "row" }}>
                <MaterialIcons name={icon} size={24} color={color} />
                <Text style={{ marginLeft: 36, fontSize: 16, fontWeight: 600 }}>{text}</Text>
            </View>
            <View style={{ marginRight: 10 }}>
                <AntDesign name="right" size={16} color="black" />
            </View>
        </TouchableOpacity>
    )
    const clearTokenAndLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            navigation.navigate('SignIn');
        } catch (e) {
            console.log(e);
        }
    };
    const handleOnPressLogout = () => {
        Alert.alert('Confirm message', 'Do you really want to log out?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel request'),
            },
            {
                text: 'Ok',
                onPress: () => clearTokenAndLogout(),
            }
        ]);
    }
    const { userID, setUserID } = useContext(UserType);
    const [user, setUser] = useState("");
    const [username, setUserName] = useState("");
    const isFocused = useIsFocused();
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
                setUserName(user?.User?.username);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchUserProfile();
    }, [navigation, isFocused]);
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.gray,
        }}>
            <View>
                <View style={{
                    backgroundColor: COLORS.lightBlue,
                    alignItems: "center",
                    height: 150,
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Image
                        source={{uri: user?.User?.profilePic.url}}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 85,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            alignSelf: 'flex-start',
                            marginLeft: 16,
                            marginTop: 32,
                        }}
                    />
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 800,
                        marginVertical: 10,
                        color: COLORS.white,
                        marginLeft: 10,
                    }}>{username}</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 12 }}>
                {/*setting */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10 }}>Account</Text>
                    <View style={{
                        borderRadius: 12,
                        backgroundColor: COLORS.white
                    }}>
                        {
                            accountItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    {renderSettingsItems(item)}
                                </React.Fragment>
                            ))
                        }
                    </View>
                </View>
                {/*2nd tab*/}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10 }}>Support & About</Text>
                    <View style={{
                        borderRadius: 12,
                        backgroundColor: COLORS.white
                    }}>
                        {
                            supportItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    {renderSettingsItems(item)}
                                </React.Fragment>
                            ))
                        }
                    </View>
                </View>
                {/*Logout button */}
                <View style={{
                    marginTop: 100
                }}>
                    <View style={{
                        alignItems: "center",
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Text style={{ fontSize: 12, color: COLORS.black }}>Version 1.0</Text>
                        <Text style={{ fontSize: 12, color: COLORS.black }}>@ ShopDee 2023</Text>
                    </View>
                    <TouchableOpacity onPress={handleOnPressLogout}>
                        <View style={{ marginBottom: 20 }}>
                            <View style={{
                                borderRadius: 12,
                                backgroundColor: COLORS.blue,
                                alignItems: "center",
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10, color: COLORS.white }}>Logout</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Me;