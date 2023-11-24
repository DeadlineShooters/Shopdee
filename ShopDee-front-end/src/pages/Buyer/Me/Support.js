import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { COLORS } from "../../../../assets/Themes";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const HelpSupport = ({ navigation }) => {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white,
            paddingHorizontal: 22,
        }}>
            <View style={{
                marginVertical: 36,
                flexDirection: "row",
                justifyContent: "center",
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        position: "absolute",
                        left: 0,
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.lightBlue}
                    />
                    <Text style={{ color: COLORS.lightBlue }}>Profile</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 600 }}>Help & Support</Text>
            </View>
            <ScrollView>
                <View style={{
                    flexDirection: "column",
                    marginBottom: 6,
                }}>
                    <Text style={{
                        fontSize: 18, fontWeight: "bold"
                    }}>The application usage </Text>
                    <View style={{
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        backgroundColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginVertical: 6,
                    }}>
                        <TouchableOpacity 
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginVertical: 10
                        }}>
                            <Text style={{fontWeight: "bold"}}>1. How to buy the product in this application?</Text>
                            <AntDesign name="downcircle" size={24} color="black"/>
                        </TouchableOpacity>
                        <View style={{
                            width: "100%"
                        }}>
                            <View style={{
                                padding: 20,
                                backgroundColor: "#F0F0F4",
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    textAlign: "justify"
                                }}>
                                    {'\t'}{'\t'}{'\t'}{'\t'}On the product menu list, you can select one of them to find further
                                    information. Once you confirm to buy, press on "Buy now" button to move to the payment and delivery checking page. 
                                    After this progress, the product order will be formed and your product is on the way to you.
                                    Now, you have done this task totally!
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        backgroundColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginVertical: 6,
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginVertical: 10
                        }}>
                            <Text style={{fontWeight: "bold", flex: 1}}>2. How to find the desired product?</Text>
                            <AntDesign name="downcircle" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{
                            width: "100%"
                        }}>
                            <View style={{
                                padding: 20,
                                backgroundColor: "#F0F0F4",
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    textAlign: "justify"
                                }}>
                                    {'\t'}{'\t'}{'\t'}{'\t'}On the product menu list, you can see the search bar, just press on it and 
                                    input the name of the product you want to find. By the way, the filter and sort items
                                    in the right side of the search bar can help you reduce the range of searching to find the 
                                    best match of your product. Good luck!
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        backgroundColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginVertical: 6,
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginVertical: 10
                        }}>
                            <Text style={{fontWeight: "bold", flex: 1}}>3. How to cancel the order?</Text>
                            <AntDesign name="downcircle" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{
                            width: "100%"
                        }}>
                            <View style={{
                                padding: 20,
                                backgroundColor: "#F0F0F4",
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    textAlign: "justify"
                                }}>
                                    {'\t'}{'\t'}{'\t'}{'\t'}In the my order tab, you can see the order of your product is devided into many phases. When
                                    your order haven't confirmed by the store yet, you can press the order for detail showing. In 
                                    this screen, you can see the 'Cancel' button. Just press on it and confirms again, you can cancel
                                    the order. Just remind that, you can only cancel it if the order is still being in wait for the 
                                    shop's confirmation or not being in delivery's process.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: 18, fontWeight: "bold"
                    }}>The profile management </Text>
                    <View style={{
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        backgroundColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginVertical: 6,
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginVertical: 10
                        }}>
                            <Text style={{fontWeight: "bold", flex: 1}}>1. How to change my avatar?</Text>
                            <AntDesign name="downcircle" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{
                            width: "100%"
                        }}>
                            <View style={{
                                padding: 20,
                                backgroundColor: "#F0F0F4",
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    textAlign: "justify"
                                }}>
                                    {'\t'}{'\t'}{'\t'}{'\t'}Press the edit profile button, the system redirects you to the edit profile page.
                                    Now, you can press on the avatar, select your new avatar in image stock of your phone to change 
                                    new avatar. Done!
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        backgroundColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 10,
                        marginVertical: 6,
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginVertical: 10
                        }}>
                            <Text style={{fontWeight: "bold", flex: 1}}>2. How to change my password?</Text>
                            <AntDesign name="downcircle" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{
                            width: "100%"
                        }}>
                            <View style={{
                                padding: 20,
                                backgroundColor: "#F0F0F4",
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    textAlign: "justify"
                                }}>
                                    {'\t'}{'\t'}{'\t'}{'\t'}Press the settings button, the system redirects you to the settings page.
                                    Now, you select change password section, and move to the change password page. Just input the new password 
                                    and re-input it, so you can set the new password. Done!
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HelpSupport;