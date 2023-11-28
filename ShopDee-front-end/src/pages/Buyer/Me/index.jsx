import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal, Alert} from "react-native";
import { useState } from "react";
import React from "react";
import {COLORS} from "./Themes.js";
import {MaterialIcons, AntDesign} from '@expo/vector-icons';

const Me = ({navigation}) => {
    const navigateToEditProfile = () => {
        navigation.navigate("EditProfile");
    }
    const navigateToShopOwner = () => {
        console.log("Security function");
    }
    const navigateToSettings = () => {
        navigation.navigate("Settings");
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
        { icon: "person", text: "Edit Profile", color: "#2b5087", action: navigateToEditProfile},
        { icon: "add-business", text: "For Shop Owner", color: "#1DA664", action: navigateToShopOwner},
        { icon: "settings", text: "Settings", color: "#D7882B", action: navigateToSettings},
        { icon: "map", text: "Address", color: "#1ab780", action: navigateToSetAddress}
    ];
    const supportItems = [
        {icon:"text-snippet", text:"User Privacy", color: "#4F12B3", action: navigateToTermsAndPolicies},
        {icon:"help-outline", text:"Help & Support", color: "#a4055b",action: navigateToSupport},
        {icon:"info-outline", text:"About ShopDee", color: "#fc3a3a",action: navigateToAboutShopDee},
    ];
    const renderSettingsItems = ({icon, text, color, action}) => (
        <TouchableOpacity
            onPress={action}
            style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                paddingVertical: 8,
                paddingLeft: 12,
                borderWidth: 1,
                borderColor: COLORS.gray,
            }}
        >
            <View style={{flexDirection: "row"}}>
                <MaterialIcons name={icon} size={24} color= {color} />
                <Text style={{marginLeft: 36, fontSize: 16, fontWeight: 600}}>{text}</Text>
            </View>
            <View>
                <AntDesign name="right" size={16} color="black"/>
            </View>
        </TouchableOpacity>
    )
    const handleOnPressLogout = () => {
        Alert.alert('Confirm message', 'Do you really want to log out?', [
            {
                text: 'Cancel', 
                onPress: () => console.log('Cancel request'),
            },
            {
                text: 'Ok',
                onPress: () => console.log('Exit the program')
            }
        ]);
    }
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
                    source = {require('../../../../assets/avatar.jpg')}
                    style ={{
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
                    }}>Golden Papaya</Text>
                </View>
            </View>
            <View style={{marginHorizontal: 12}}>
                {/*setting */}
                <View style={{marginBottom: 12}}>
                    <Text style={{fontSize:16, fontWeight:600, marginVertical: 10}}>Account</Text>
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
                <View style={{marginBottom: 12}}>
                    <Text style={{fontSize:16, fontWeight:600, marginVertical: 10}}>Support & About</Text>
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
                        <Text style={{fontSize:12, color: COLORS.black}}>Version 1.0</Text>
                        <Text style={{fontSize:12, color: COLORS.black}}>@ ShopDee 2023</Text>
                    </View>
                    <TouchableOpacity onPress={handleOnPressLogout}>
                        <View style={{marginBottom: 20}}>
                            <View style={{
                                    borderRadius: 12,
                                    backgroundColor: COLORS.blue,
                                    alignItems: "center",
                            }}>                        
                            <Text style={{fontSize:16, fontWeight:600, marginVertical: 10, color: COLORS.white}}>Logout</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Me;