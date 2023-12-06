import { View, Text, StyleSheet, TextInput } from "react-native";

//  testing code please replace!!
export default function EditProduct() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainPanel}>
        <View>
          <Text>Product name:</Text>
          <Text>*</Text>
          <TextInput />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  mainPanel: {
    backgroundColor: "#fff",
  },
});
