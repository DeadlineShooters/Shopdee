import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";

export default function Home() {
  const navigation = useNavigation();
  function onPressFunction() {
    navigation.navigate("Home");
  }
  const initialFavoriteStatus = {};
  const [favoriteProducts, setFavoriteProducts] = useState(initialFavoriteStatus);
  const [productList, setProductList] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchBuyerProduct = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:3000/products/home");
        const productData = response.data;
        // console.log(productData);
        setProductList(productData);
      } catch (error) {
        console.log("Error fetching buyer product: ", error);
      }
    }
    fetchBuyerProduct();
  }, [navigation, isFocused]);
  const handleFavourite = (productId) => {
    setFavoriteProducts({
      ...favoriteProducts,
      [productId]: !favoriteProducts[productId],
    });
  };
  const [search, getSearch] = useState("");
  return (
    <View style={styles.container} >
           <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <AntDesign
            name="search1"
            size={20}
            color="gray"
            style={{ position: "absolute", paddingLeft: 15, zIndex: 2 }}
          />
          <TextInput
            style={styles.input}
            onChangeText={getSearch}
            value={search}
            placeholder="Search"
          />
        </View>
       
          <TouchableOpacity
            style={{          
              backgroundColor: "rgba(51, 153, 255, 0.5)",
              padding: 10,
              borderRadius: 20,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => { }}
          >
            <FontAwesome name="shopping-cart" size={20} color="gray" />
          </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingBottom:10 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { }}
        >
          <Text> Filter </Text>
          <AntDesign name="filter" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { }}
        >
          <Text> Sort </Text>
          <FontAwesome name="sort-amount-asc" size={18} color="gray" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.productList} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {productList.map((product, index) => (
            <View style={{ 
              width: "50%"
              }} key={index}>
              <TouchableOpacity 
                style={styles.productItem}
                onPress={() => {
                  navigation.navigate("ProductDetails", {product});
                }}
              >
                <Image source={{uri: product.image[0]?.url}} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>{product.price}</Text>
                    {<TouchableOpacity onPress={() => handleFavourite(product._id)}>
                      <AntDesign 
                        name={favoriteProducts[product._id] ? 'heart' : 'hearto'}
                        size={24}
                        color={favoriteProducts[product._id] ? 'red' : 'black'} />
                    </TouchableOpacity>}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: "top",
    padding: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    width: "95%",
    borderColor: "transparent",
    backgroundColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 40,
  },

  buttonText: {
    color: "black",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  text: {
    top: 7,
    left: 2,
    color: "gray",
    textAlign: "left",
    fontWeight: "bold",
  },
  productList: {
    marginTop:10
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "left",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin:5,
    height: 200,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 10
  },
  productImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  productDetails: {
    flex: 1,
    marginBottom: 10,
    textAlign: "left",
  },
  productName: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30,
    textAlign: "left",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#D3D3D3",
    padding: 5,
    paddingHorizontal:10,
    borderRadius: 20,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
