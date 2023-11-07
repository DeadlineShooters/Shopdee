
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
    StyleSheet,
  } from "react-native";
  
  export default function App() {
    return (
      // <SafeAreaView>
      //   <ScrollView>
      //     <View>
      //       <Image source={require('./assets/splash.png')}>
      //       </Image>
      //       <Text>Back</Text>
      //       <Text>View Cart</Text>
      //     </View>
      //   </ScrollView>
      // </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <View>
          <Image source={require("./assets/favicon.png")}></Image>
          <Text>Back</Text>
          <Text>View Cart</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "blue",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  