import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SIZES, COLORS, FONTS } from "../../../../assets/Themes";
import GoBack from "../../../components/goBackPanel";
import { products } from "../../../../data/product";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MaterialIcons } from "@expo/vector-icons";

//  testing code please replace!!
export default function MyProducts() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          position: "absolute",
          top: 25,
          right: 20,
          zIndex: 9999,
        }}
      >
        <MaterialIcons name="add-box" size={35} color={COLORS.blue} />
      </View>
      <GoBack currentTitle="My Products"></GoBack>
      <ScrollView style={{ backgroundColor: COLORS.gray }}>
        {products.map((product, index) => (
          <View style={styles.section} key={index}>
            <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: "bold" }}>{product.name}</Text>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: COLORS.darkGray,
                paddingBottom: 15,
              }}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: product.imgUrl }} style={styles.image}></Image>
              </View>
              <View>
                {/* <Text>{product.name}</Text> */}
                <Text>Category: {product.category}</Text>
                <Text style={{ marginTop: 5 }}>{product.price} x 1</Text>
                <Text style={{ marginTop: 5 }}>Stock: {product.quantity}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <TouchableOpacity style={styles.button}>
                <Text style={{ color: COLORS.white }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={{ color: COLORS.white }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    marginBottom: 5,
    padding: 15,
  },
  image: {
    resizeMode: "contain",
    flex: 1,
    width: undefined,
    height: undefined,
  },
  imageContainer: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderStyle: "solid",
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: COLORS.blue,
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginStart: 20,
  },
});
