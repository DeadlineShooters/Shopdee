import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

//  testing code please replace!!
export default function Home() {
  const navigation = useNavigation();

  function onPressFunction() {
    navigation.navigate("Product Details");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={onPressFunction}>
        <Text>Home! I'm pressable!</Text>
      </Pressable>
    </View>
  );
}
