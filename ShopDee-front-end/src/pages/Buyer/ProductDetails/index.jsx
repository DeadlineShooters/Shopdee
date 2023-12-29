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
// import shopProfilePicture from "./favicon.png";
import { useNavigation } from "@react-navigation/native";
// import { product } from "../../../../data/product";
import axios from "axios";
import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// export const product = {
//   _id: '6579401a01a6e7d1a58a8dee',
//   name: "Giày thể thao thông dụng",
//   images: [
//       {
//         url: "https://cdn.discordapp.com/attachments/987699517497438218/1176447491177193542/nike-red.png?ex=656ee71b&is=655c721b&hm=762dc70ed9d73fa64eb157260b7686e3e0c77a205e637286944f75fddc2eadf6&",
//         public_id: "alo"
//       },
//       {
//         url: "https://s3-alpha-sig.figma.com/img/5c73/7e2c/9a82f54116ae04171c97b2acdac77fd2?Expires=1701648000&Signature=oUeD46F8TkoJIdXXYdoyj9vY1ao9gyytJsls2UDO8GYZ4TJVqkSROk-DdPJAB6l0Z7HwpRKNqHcbIzWN6ojRZTlNpGKYebm9AGCxJPodxuC2d2b9E2CF2ctqT9SX9jEOp5gd8Kxg~x5R6RSQBiEcCTUsfgfAYu~QJD8d2Fov1f9XwALZ3KwGB56yo0f-bZ03pYNDCPY-EuN53g0xAqU7WOnmzINnN5cQDDcGbZ5pE5nZX64unIvxT4K0BpSoTFElkwWnDI6hBizAXE0fxpySS9fdZRjqijk4JtsxfW5OFURXk06~CGstU-9c0FvRQwYMoQqrfwdLFNZTK1OmQ7EkVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//         public_id: "alo"
//       }
//   ],
//   category: "6579412001a6e7d1a58a8df1",
//   description:
//       'Giày thể thao thông dụng nam Biti\'s Basic BSM000600 được xem là mẫu giày "quốc dân" chưa bao giờ ngừng hot. Mặc dù đã ra mắt từ rất lâu nhưng đây vẫn được xem là sự lựa chọn hàng đầu cho những bạn yêu thích sự đơn giản. Thiết kế giày full đen hoặc trắng sẽ là điểm nhấn làm rung động biết bao nhiêu tín đồ mê phong cách thời trang hiện đại, trẻ trung.',
//   price: 650000,
//   size: ['35', '36', '37', '38', '39', '40'],
//   quantity: 153,
//   shop: {
//     _id: '1234',
//     image: {
//       url: "https://s3-alpha-sig.figma.com/img/5c73/7e2c/9a82f54116ae04171c97b2acdac77fd2?Expires=1701648000&Signature=oUeD46F8TkoJIdXXYdoyj9vY1ao9gyytJsls2UDO8GYZ4TJVqkSROk-DdPJAB6l0Z7HwpRKNqHcbIzWN6ojRZTlNpGKYebm9AGCxJPodxuC2d2b9E2CF2ctqT9SX9jEOp5gd8Kxg~x5R6RSQBiEcCTUsfgfAYu~QJD8d2Fov1f9XwALZ3KwGB56yo0f-bZ03pYNDCPY-EuN53g0xAqU7WOnmzINnN5cQDDcGbZ5pE5nZX64unIvxT4K0BpSoTFElkwWnDI6hBizAXE0fxpySS9fdZRjqijk4JtsxfW5OFURXk06~CGstU-9c0FvRQwYMoQqrfwdLFNZTK1OmQ7EkVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//       public_id: "alo"
//     },
//     name: "BITES'S OFFICIAL STORE",
//     phone: "0902800729",
//     address: "HCM",
//   },
// };

export default function ProductDetails({route}) {
  const product = route.params.product;
  // console.log("ayoo: "+JSON.stringify(product));
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
              data={product.image}
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
              dotsLength={product.image.length}
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
              <Text style={{ ...FONTS.h3 }}>{product.name}</Text>
              <Text style={{ ...FONTS.h1 }}>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
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
              source={{uri: product.shop.image?.url}}
              style={{
                height: "75%",
                width: undefined,
                aspectRatio: 1,
                marginRight: 15,
              }}
            />
            <View>
              <Text style={{ ...FONTS.h4 }}>{product.shop.name}</Text>
              <Text style={{ color: "gray" }}>Active 28 minutes ago</Text>
              <Text style={{ color: "gray" }}>{product.shop.address}</Text>
            </View>
          </View>

          <View style={[styles.contentBox]}>
            <Text style={{ ...FONTS.h4 }}>Product description</Text>
            <Text>{product.description}</Text>
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
