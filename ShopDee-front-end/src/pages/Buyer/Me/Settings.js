import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal, Alert} from "react-native";
import { COLORS_v2 } from "../../../../constants/theme.js";
import {MaterialIcons, AntDesign} from '@expo/vector-icons';

const Settings = ({navigation}) => {
    const port = 2; //used for entering the password reset using reset password
    const navigateToChangePassword = () => {
        navigation.navigate("SendMail");
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS_v2.gray,
        }}>
            <View style={{
                backgroundColor: COLORS_v2.white,
                alignItems: "center",
                height: 100,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "center",
            }}>
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    style={{
                        position: "absolute",
                        left: 10,
                        flexDirection: "row",
                        alignItems: "center"
                    }}>

                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS_v2.lightBlue}
                    />
                    <Text style={{color: COLORS_v2.lightBlue}}>Profile</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 600 }}>Settings</Text>
            </View>
            <View style={{marginHorizontal: 12}}>
                {/*setting */}
                <View style={{marginBottom: 12}}>
                    <Text style={{fontSize:16, fontWeight:600, marginVertical: 10}}>Account settings</Text>
                    <View style={{
                        borderRadius: 12,
                        backgroundColor: COLORS_v2.white
                    }}> 
                        <TouchableOpacity
                            onPress={navigateToChangePassword}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                borderWidth: 1,
                                borderColor: COLORS_v2.gray,
                            }}
                        >
                            <View style={{flexDirection: "row"}}>
                                <Text style={{fontSize: 16, fontWeight: 600}}>Password</Text>
                            </View>
                            <View>
                                <AntDesign name="right" size={16} color="black"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Settings;