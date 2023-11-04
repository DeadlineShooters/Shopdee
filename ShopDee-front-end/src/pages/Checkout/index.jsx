import { SafeAreaView, ScrollView, Text, View, Image } from "react-native";

export default function productDetails() {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Image>
                    source={require('assets/react-native-logo.png')}
                    </Image>
                    <Text>Back</Text>
                    <Text>View Cart</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });