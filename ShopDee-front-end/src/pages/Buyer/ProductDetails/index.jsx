import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { SIZES, COLORS, FONTS } from "../../../../assets/Themes";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';

export default function ProductDetails({route}) {
  const productData = route.params.product;
  console.log(productData);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModel] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const navigation = useNavigation();

  // const handelSizeSelection = (size) => {
  //   setSelectedSize(size);
  // };

  function renderModal() {
    return (
      <Modal visible={openModal} animationType="none" transparent={true}>
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)" }}
          onPress={() => setOpenModel(false)}
        ></Pressable>
        <View
          style={{backgroundColor: "#00000050", width: "100%",}}>
          <View
            style={{position: "absolute",bottom: 0,width: "100%",}}>
            <View
              style={{
                zIndex: 999,
                flexDirection: "row",
                backgroundColor: "white",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20 }}>Quanity</Text>
              <View
                style={{
                  backgroundColor: COLORS.gray,
                  width: 120,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: COLORS.gray,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  style={{
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Feather name="minus" size={20} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={{...FONTS.body3,flex: 1,textAlign: "center",}}>
                  {quantity}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setQuantity(quantity + 1);
                  }}
                  style={{
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Feather name="plus" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>
            <Pressable
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                backgroundColor: COLORS.blue,
              }}
              onPress={() => {
                navigation.navigate("Checkout", { product, quantity });
                setOpenModel(false);
              }}
            >
              <Text style={{ fontSize: 23, color: "white" }}>Buy Now</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{backgroundColor: COLORS.gray, marginBottom: 56,}}>
        <View>
          <View
            style={{
              marginHorizontal: 22,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              width: SIZES.width - 44,
              top: 22,
              zIndex: 999,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black}/>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.white,
                padding: 5,
                borderRadius: 50,
              }}
            >
              <MaterialCommunityIcons name="cart-outline" size={24} color="black"/>
            </TouchableOpacity>
          </View>

          <View>
            <Carousel
              data={productData.image}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.url }}
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1,
                    resizeMode: 'contain',
                  }}
                />
              )}
              sliderWidth={SIZES.width}
              itemWidth={SIZES.width}
              loop={false}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={product.images.length}
              activeDotIndex={activeSlide}
              containerStyle={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: COLORS.lightBlue,
              }}
              inactiveDotStyle={{
                // Define styles for inactive dots if needed
                backgroundColor: 'lightgray',
              }}
              inactiveDotOpacity={0.6}
              inactiveDotScale={0.8}
            />
          </View>

          <View
            style={[
              {
                flexDirection: "row-reverse",
                justifyContent: "space-between",
              },
              styles.contentBox,
            ]}
          >
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
              {isFavorite ? (
                <Ionicons name="md-heart-sharp" size={24} color />
              ) : (
                <Ionicons name="md-heart-outline" size={24} color={COLORS.black}/>
              )}
            </TouchableOpacity>
            <View style={{flex: 1,}}>
              <Text style={{ ...FONTS.h3 }}>{productData.name}</Text>
              <Text style={{ ...FONTS.h1 }}>{productData.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
              {/* <Text>4.5 *</Text> */}
            </View>
          </View>

          <View
            style={[
              {
                flexDirection: "row",
                height: 100,
                alignItems: "center",
                marginTop: 10,
              },
              styles.contentBox,
            ]}
          >
            <Image
              source={{uri: productData.shop.image.url}}
              style={{
                height: "75%",
                width: undefined,
                aspectRatio: 1,
                marginRight: 15,
              }}
            />
            <View>
              <Text style={{ ...FONTS.h4 }}>{productData.shop.name}</Text>
              <Text style={{ color: "gray" }}>Active 28 minutes ago</Text>
              <Text style={{ color: "gray" }}>{productData.shop.address}</Text>
            </View>
          </View>

          <View style={[styles.contentBox]}>
            <Text style={{ ...FONTS.h4 }}>Product description</Text>
            <Text>{productData.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 999,
          flexDirection: "row",
          backgroundColor: COLORS.red,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.gray,
            flex: 0.3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="cart-plus" size={30} color="black" />
          <Text>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.blue,
            flex: 0.7,
            padding: 15,
            alignItems: "center",
          }}
          onPress={() => {
            setOpenModel(true);
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Buy now</Text>
        </TouchableOpacity>
      </View>

      {renderModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12,
  },
  selectedCheckbox: {
    backgroundColor: COLORS.black,
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 12,
  },
  button: {
    marginTop: 12,
    height: 60,
    width: SIZES.width - 44,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
  contentBox: {
    padding: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
});
