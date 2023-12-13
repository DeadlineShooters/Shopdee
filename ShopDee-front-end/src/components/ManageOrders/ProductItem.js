import { View, Image, Text, StyleSheet } from "react-native";
export default function ProductItem({ imagePath, productName, productPrice, productQuantity }) {
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imagePath }} style={styles.image}></Image>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{productName}</Text>
          <View style={styles.textSubContainer}>
            <Text style={styles.price}>{productPrice}đ</Text>
            <Text style={styles.quantity}>x{productQuantity}</Text>
          </View>
        </View>
      </View>
      {/* horizontal ruler */}
      <View
        style={{
          borderBottomColor: "#000",
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
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
  textContainer: {},
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 14,
    color: "#626D71",
  },
  textSubContainer: {
    flexDirection: "row",
    gap: 5,
  },
});
