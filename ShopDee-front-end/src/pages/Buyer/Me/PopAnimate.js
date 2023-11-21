import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Animated, Button, TouchableOpacity, Dimensions, } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

const PopAnimate = (props) => {
    const windowHeight = Dimensions.get("window").height;
    const [status, setStatus] = useState(null);
    const popAnim = useRef(new Animated.Value(windowHeight * -1)).current;

    const successColor = "#6dcf81";
    const successHeader = "Success!";
    const successMessage = "You pressed the success button";
    const failColor = "#bf6060";
    const failHeader = "Failed!";
    const failMessage = "You pressed the fail button";

    

    return (
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

            <TouchableOpacity 
                onPress={() => {
                    setStatus("success");
                    popIn();
                }}
            >
            </TouchableOpacity>
            {/* <Button
        title="Success Message"
        onPress={() => {
          setStatus("success");
          popIn();
        }}
        style={{ marginTop: 30 }}
      ></Button>
      <Button
        title="Fail Message"
        onPress={() => {
          setStatus("fail");
          popIn(); 
        }}
        style={{ marginTop: 30 }}
      ></Button> */}
        </View>
    );
};

export {PopAnimate};

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