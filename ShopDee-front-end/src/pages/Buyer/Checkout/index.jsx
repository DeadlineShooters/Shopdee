import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from "react-native"
import { SIZES, COLORS, FONTS } from "../../../../constants/theme";

import {
    MaterialIcons,
    Ionicons,
    Feather,
    AntDesign,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function Checkout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView
                style={{
                    // flex: 1,
                    backgroundColor: COLORS.gray,
                    // paddingBottom: 100,
                    // marginBottom: 56
                }}
            >
                <View
                    style={{
                        marginHorizontal: 22,
                        // flexDirection: "row",
                        // justifyContent: "space-between",
                        // alignItems: "center",
                        // position: "absolute",
                        // width: SIZES.width - 44,
                        // top: 22,
                        // zIndex: 999,
                        height: 100,
                        backgroundColor: COLORS.blue,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}