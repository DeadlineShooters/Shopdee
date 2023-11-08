import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../../assets/Themes";
import {MaterialIcons, AntDesign} from '@expo/vector-icons';

const EditProfile = (navigation) => {
    const [selectedImage, setSelectedImage] = useState();
    const handleImageSelection = () => {
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white,
            paddingHorizontal: 22,
        }}>
                <View style={{
                marginHorizontal: 12,
                marginVertical: 36,
                flexDirection: "row",
                justifyContent: "center",
                }}>

                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    style={{
                        position: "absolute",
                        left: 0,
                    }}>

                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: 600}}>Edit Profile</Text>
            </View>
            <ScrollView>
                <View style={{
                    alignItems: "center",
                    marginVertical: 22,
                }}>
                    <TouchableOpacity onPress={handleImageSelection}>
                        <Image
                            source = {require('../../../../assets/avatar.jpg')}
                            style ={{
                                height: 170,
                                width: 170,
                                borderRadius: 85,
                                borderWidth: 2,
                                borderColor: COLORS.primary
                            }}
                        />
                        <View style={{
                            position: "absolute",
                            bottom: 0,
                            right: 10,
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfile;