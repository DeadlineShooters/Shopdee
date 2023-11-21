import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal, Alert} from "react-native";
import { COLORS } from "../../../../assets/Themes";
import {MaterialIcons, AntDesign} from '@expo/vector-icons';

const Settings = ({navigation}) => {
    const navigateToChangePassword = () => {
        console.log('change password')
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.gray,
        }}>
            <View style={{
                backgroundColor: COLORS.white,
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
                        left: 12,
                    }}>
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 600 }}>Settings</Text>
            </View>
            <View style={{marginHorizontal: 12}}>
                {/*setting */}
                <View style={{marginBottom: 12}}>
                    <Text style={{fontSize:16, fontWeight:600, marginVertical: 10}}>Account settings</Text>
                    <View style={{
                        borderRadius: 12,
                        backgroundColor: COLORS.white
                    }}> 
                        <TouchableOpacity
                            onPress={navigateToChangePassword}
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
                                <Text style={{fontSize: 16, fontWeight: 600}}>Password</Text>
                            </View>
                            <View>
                                <AntDesign name="right" size={16} color="black"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*2nd tab*/}
                <View style={{marginBottom: 12}}>
                    <Text style={{fontSize:16, fontWeight:600, marginVertical: 10}}>APP configuration</Text>
                    <View style={{
                        borderRadius: 12,
                        backgroundColor: COLORS.white
                    }}> 
                        <TouchableOpacity
                            // onPress={() => function}
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
                                <Text style={{fontSize: 16, fontWeight: 600}}>Language</Text>
                            </View>
                            <View>
                                <AntDesign name="right" size={16} color="black"/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => function}
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
                                <Text style={{fontSize: 16, fontWeight: 600}}>Notifications setting</Text>
                            </View>
                            <View>
                                <AntDesign name="right" size={16} color="black"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* 3rd tab */}
                <View style={{marginBottom: 12}}>
                    <Text style={{fontSize:16, fontWeight:600, marginVertical: 10}}>Support</Text>
                    <View style={{
                        borderRadius: 12,
                        backgroundColor: COLORS.white
                    }}> 
                        <TouchableOpacity
                            // onPress={() => function}
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
                                <Text style={{fontSize: 16, fontWeight: 600}}>Delete my account</Text>
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