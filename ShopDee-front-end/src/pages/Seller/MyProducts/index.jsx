import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, RefreshControl } from "react-native";
import { SIZES, COLORS, FONTS } from "../../../../assets/Themes";
import GoBack from "../../../components/goBackPanel";
// import { products } from "../../../../data/product";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useIsFocused} from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { UserType } from "../../../../context/UserContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
export default function MyProducts() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const [products, setProductList] = useState([]);
  const deleteThisProduct = async (productId) => { 
    console.log(productId);
    const shopID = '6579412001a6e7d1a58a8df1';
    try {
      const response = await axios.delete(`http://10.0.2.2:3000/shop/${shopID}/products/delete/${productId}`)
      if (response.status == 200) {
        console.log("delete successfully");
        //fetchShopProduct();
      } else console.error("Error");
    } catch (error) {
      console.log(error);
    } 
  } 
  const handleDeleteProduct = (productId) => {
    Alert.alert('Confirm message', 'Do you really want to delete this product?', [
      {
          text: 'Cancel',
          onPress: () => console.log('Cancel request'),
      },
      {
          text: 'Ok',
          onPress: () => deleteThisProduct(productId),
      }
  ]);
  }
  const isFocused = useIsFocused();
    useEffect(() => {
    const fetchShopProduct = async () => {
    const shopID = '6579412001a6e7d1a58a8df1';
    try {
        const response = await axios.get(`http://10.0.2.2:3000/shop/${shopID}/products/index`);
        if (response.status === 200) {
          const productsData = response.data.products;
          console.log(productsData);
          setProductList(productsData);
        } 
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchShopProduct(); 
  }, [navigation, isFocused]);
  // 
  console.log(products);
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
        <TouchableOpacity onPress={() => navigation.navigate("Add product")}>
          <MaterialIcons name="add-box" size={35} color={COLORS.blue} />
        </TouchableOpacity>
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
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Edit product")}>
                <Text style={{ color: COLORS.white }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDeleteProduct(product._id)}> 
                <Text style={{ color: COLORS.white }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          )
        )
      }
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