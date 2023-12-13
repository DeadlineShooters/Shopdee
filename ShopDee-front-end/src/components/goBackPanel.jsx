import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SIZES, COLORS, FONTS } from "../../assets/Themes";

import {
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function GoBack({ prevTitle, currentTitle, func }) {
    
    return (
        <View style={{
            // marginVertical: 36,
            // height: 60,
            flexDirection: "row",
            justifyContent: "center",
            // alignItems: "center",
            backgroundColor: COLORS.white,
            padding: 10,
            paddingTop: 30,
            paddingBottom: 20,
            // marginBottom: 5,
            zIndex: 99,
            elevation: 10,
        }}>

            <TouchableOpacity
                onPress={func}
                style={{
                    position: "absolute",
                    left: 20,
                    top: 30,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                {func && (
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.lightBlue}
                    />
                )}
                <Text style={{color: COLORS.lightBlue}}>{prevTitle}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>{currentTitle}</Text>
        </View>
    );
}
