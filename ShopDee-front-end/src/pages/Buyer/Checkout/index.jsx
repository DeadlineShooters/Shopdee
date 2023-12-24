import { SafeAreaView, ScrollView, Text, View, Pressable, StyleSheet, Image, TouchableOpacity } from "react-native"
import { SIZES, COLORS, FONTS } from "../../../../assets/Themes";
import GoBack from '../../../components/goBackPanel'
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import {
    MaterialIcons,
    Ionicons,
    Feather,
    AntDesign,
    MaterialCommunityIcons,
    SimpleLineIcons 
} from "@expo/vector-icons";

import axios from "axios";

const user = {
    name: 'Nguyễn Tuấn Kiệt',
    phone: '0902800628',
}


export default function Checkout({ route }) {
    const [selectedPayment, setSelectedPayment] = useState('Cash');
    const navigation = useNavigation();
    const {product, quantity} = route.params;
    const price = product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    const deliveryFee = 15000;
    const total = (product.price+deliveryFee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    
    const placeOrder = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            const userID = jwtDecode(token).userID;
    
            const order = {
                quantity,
                totalPrice: product.price+deliveryFee,
                orderDate: new Date(),
                deliveryDate: null, // Fix the typo here
                status: "toConfirm",
                paymentMethod: selectedPayment,
                product: product._id,
                user: userID,
            };
    
            const response = await axios.post(`http://10.0.2.2:3000/shop/${product.shop._id}/orders`, order);
            console.log(response.data);
    
            navigation.goBack();
        } catch (error) {
            console.error("Error placing order:", error);
            // Handle the error, e.g., show an error message to the user
        }
    };
    
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <GoBack currentTitle="Checkout" prevTitle="Details" func={() => navigation.goBack()}></GoBack>
            <ScrollView
                style={{
                    backgroundColor: COLORS.gray,
                }}
            >
                <View style={styles.section}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SimpleLineIcons name="location-pin" size={24} color={COLORS.blue} />
                        <Text style={{marginLeft: 10}}>Delivery Address</Text>
                    </View>
                    <Text style={{ paddingLeft: 36 }}>{user.name} | {user.phone}{'\n'}27 Nguyễn Văn Cừ{'\n'}P. Bình Trị Đông, Q. Bình Tân, TPHCM</Text>
                    <Pressable onPress={() => {}} style={{
                            position: 'absolute', top:35, right:20,
                        }} >
                        <MaterialIcons name="keyboard-arrow-right" size={24}/>
                    </Pressable>
                </View>

                <View style={styles.section}>
                    <Text style={{marginBottom: 15}}>{ product.shop.name }</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: product.images[0].url}} style={styles.image}></Image>
                        </View>
                        <View>
                            <Text>{product.name}</Text>
                            <Text style={{marginTop: 10}}>{price} x {quantity}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        <Ionicons name="receipt-outline" size={24} color={COLORS.blue} />
                        <Text style={{marginLeft: 10}}>Payment Details</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 5}}>
                        <Text>Merchandise Subtotal</Text>
                        <Text>{price}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 5}}>
                        <Text>Delivery</Text>
                        <Text>{deliveryFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: "space-between", marginBottom: 5,
                        fontSize: 20
                    }}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Merchandise Subtotal</Text>
                        <Text style={{fontSize: 18, color: 'red'}}>{total}</Text>
                    </View>

                </View>
                <View style={styles.section}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcons name="payment" size={24} color={COLORS.blue} />
                        <Text style={{marginLeft: 10}}>Payment Options</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginVertical: 18 }}>
                        <Pressable
                            style={[
                                styles.paymentOption,
                                selectedPayment === "Cash" && styles.selectedPayment,
                            ]}
                            onPress={() => setSelectedPayment("Cash")}
                        >
                            <Text style={[selectedPayment === "Cash" && styles.checkboxText]}>Cash</Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.paymentOption,
                                selectedPayment === "ShopdeePay" && styles.selectedPayment,
                            ]}
                            onPress={() => setSelectedPayment("ShopdeePay")}
                        >
                            <Text style={[selectedPayment === "ShopdeePay" && styles.checkboxText]}>ShopdeePay</Text>
                        </Pressable>
                    </View> 
                </View>

                <View style={styles.section}>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 1}}>
                        <AntDesign name="profile" size={24} color={COLORS.blue} />
                        <Text style={{marginHorizontal: 10}}>By clicking “Place Order”, you are agreeing to ShopDee's General Transaction Terms</Text>
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
                <View style={{
                    flex: 0.6, backgroundColor: 'white', alignItems: 'flex-end',
                    justifyContent: 'center',
                    // padding: 10,
                }}>
                    <View style={{marginRight: 10, alignItems: 'flex-end'}}>
                        <Text>Total Payment</Text>
                        <Text style={{ fontSize: 20, color: 'red' }}>{total}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.blue,
                        flex: 0.4,
                        padding: 15,
                        alignItems: "center",
                    }}
                    onPress={() => {
                        // setOpenModel(true);
                        placeOrder();
                    }}
                >
                    <Text style={{ fontSize: 20, color: "white" }}>
                        Buy now
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: COLORS.white, marginBottom: 5, padding:15
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
    paymentOption: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
    },
    selectedPayment: {
        borderColor: COLORS.blue,
    },
    checkboxText: {
        color: COLORS.blue
    }
});