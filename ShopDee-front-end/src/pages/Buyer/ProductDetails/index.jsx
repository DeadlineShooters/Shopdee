import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { SIZES, COLORS, FONTS } from "./theme";
import {
    MaterialIcons,
    Ionicons,
    Feather,
    AntDesign,
} from "@expo/vector-icons";
import img from "./shoe.png";
// import shopProfilePicture from './adaptive-icon.png'
import shopProfilePicture from "./favicon.png";

export default function Home() {
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handelSizeSelection = (size) => {
        setSelectedSize(size);
    };
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "#fff", overflow: "scroll" }}
        >
            <ScrollView style={{ flex: 1, backgroundColor: COLORS.gray }}>
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
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{backgroundColor: COLORS.white, padding: 5, borderRadius: 50}}>
                        <AntDesign name="shoppingcart" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Image
                    source={img}
                    // resizeMode="contain"
                    // style={{ flex: 1, height: undefined, width: undefined }}
                    style={{
                        width: "100%",
                        height: undefined,
                        aspectRatio: 1,
                    }}
                />

                <View style={[{
                    flexDirection: 'row-reverse', justifyContent: "space-between",

                }, styles.contentBox]}>
                    <TouchableOpacity
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        {isFavorite ? (
                            <Ionicons name="md-heart-sharp" size={24} color />
                        ) : (
                            <Ionicons
                                name="md-heart-outline"
                                size={24}
                                color={COLORS.black}
                            />
                        )}
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Nike air water</Text>
                        <Text style={{ ...FONTS.h1 }}>500,000đ</Text>
                        <Text>4.5 *</Text>
                    </View>
                </View>

                <View
                    style={[{
                        flexDirection: "row",
                        height: 100,
                        alignItems: "center",
                    }, styles.contentBox]}
                >
                    <Image
                        source={shopProfilePicture}
                        style={{
                            height: "75%",
                            width: undefined,
                            aspectRatio: 1,
                            marginRight: 15,
                        }}
                    />
                    <View>
                        <Text style={{ ...FONTS.h4 }}>Golden Papaya</Text>
                        <Text style={{ color: "gray" }}>
                            Active 28 minutes ago
                        </Text>
                        <Text style={{ color: "gray" }}>Hồ Chí Minh</Text>
                    </View>
                </View>

                <View style={[styles.contentBox]}>
                    <Text style={{ ...FONTS.h4 }}>Product description</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto commodi nulla dolor hic maxime sit! Impedit iusto eos cumque culpa assumenda voluptatibus animi asperiores error neque facilis voluptatum, similique earum.</Text>
                </View>
                

                <View
                    style={{
                        backgroundColor: COLORS.white,
                        // borderRadius: 36,
                        padding: 15,
                        // position: "absolute",
                        width: "100%",
                        // bottom: 0,
                    }}
                >
                    <View style={{ marginVertical: 22 }}>
                        <Text style={{ ...FONTS.h4 }}>Select Size</Text>

                        <View
                            style={{ flexDirection: "row", marginVertical: 18 }}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedSize === "S" &&
                                        styles.selectedCheckbox,
                                ]}
                                onPress={() => handelSizeSelection("S")}
                            >
                                <Text
                                    style={[
                                        selectedSize === "S" &&
                                            styles.checkboxText,
                                    ]}
                                >
                                    S
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedSize === "M" &&
                                        styles.selectedCheckbox,
                                ]}
                                onPress={() => handelSizeSelection("M")}
                            >
                                <Text
                                    style={[
                                        selectedSize === "M" &&
                                            styles.checkboxText,
                                    ]}
                                >
                                    M
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedSize === "L" &&
                                        styles.selectedCheckbox,
                                ]}
                                onPress={() => handelSizeSelection("L")}
                            >
                                <Text
                                    style={[
                                        selectedSize === "L" &&
                                            styles.checkboxText,
                                    ]}
                                >
                                    L
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={{ ...FONTS.h4 }}>Qty</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginVertical: 6,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: COLORS.gray,
                                height: 48,
                                width: 134,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingHorizontal: 12,
                                borderRadius: 24,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    if (quantity > 1) {
                                        setQuantity(quantity - 1);
                                    }
                                }}
                                style={{
                                    height: 32,
                                    width: 32,
                                    borderRadius: 16,
                                    backgroundColor: COLORS.white,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Feather
                                    name="minus"
                                    size={24}
                                    color={COLORS.black}
                                />
                            </TouchableOpacity>
                            <Text style={{ ...FONTS.body3 }}>{quantity}</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    setQuantity(quantity + 1);
                                }}
                                style={{
                                    height: 32,
                                    width: 32,
                                    borderRadius: 16,
                                    backgroundColor: COLORS.white,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Feather
                                    name="plus"
                                    size={24}
                                    color={COLORS.black}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ ...FONTS.body4 }}>Total Price</Text>
                            <Text style={{ ...FONTS.h3 }}>$18.00</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Feather
                            name="shopping-bag"
                            size={24}
                            color={COLORS.white}
                        />

                        <Text
                            style={{
                                ...FONTS.h3,
                                color: COLORS.white,
                                marginLeft: 12,
                            }}
                        >
                            Add to Bag
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
            
            <View style={{
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 999,
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity>
                        <AntDesign name="shoppingcart" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Buy now</Text>
                    </TouchableOpacity>
                </View>
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
        borderBottomColor: COLORS.gray,
    }
});
