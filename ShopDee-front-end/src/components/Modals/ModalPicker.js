import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, Modal } from "react-native";
import { COLORS } from "../../../assets/Themes";
//Gender picker modal
const OPTION_GENDER = ["Male", "Female", "Undefined"];

const GenderPicker = (props) => {
    const onSetGender = (changeGender) => {
        props.handleOnPressChangeGender();
        props.setData(changeGender);
    }
    const changeGender = OPTION_GENDER.map((item, index) => {
        return (
            <TouchableOpacity
                style={{
                    alignItems: "flex-start",
                }}
                key={index}
                onPress={() => onSetGender(item)}
            >
                <Text style={{
                    margin: 20,
                    fontSize: 18,
                    color: "white"
                }}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })    
    return (
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
                <Text style={{fontSize: 18, color: COLORS.white}}>Change Gender</Text>
                {changeGender}
                <TouchableOpacity onPress={() => props.handleOnPressChangeGender()}>
                    <Text style={{ fontSize: 16, color: COLORS.white }}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export {GenderPicker}