import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, Modal, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from "react";
import { COLORS } from "./Themes.js";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Dropdown } from "react-native-element-dropdown";

const SetAddress = ({ navigation }) => {
  const [name, setName] = useState("Golden Papaya");
  const [phone, setPhone] = useState("0921773092");
  const [address, SetAddress] = useState("227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh");
  const [changeAddress, setChangeAddress] = useState("227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh");
  const handleOnPressGoBack = ({navigation}) => {
    if (address != changeAddress)
    {
      Alert.alert('Confirm message', 'Your address is not saved. Exit now?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel request'),
        },
        {
          text: 'Ok',
          onPress: () => navigation.goBack(),
        }
      ]);
    }
    else {
      navigation.goBack()
    }
  }
  const save = () => {
    setChangeAddress(address);
  }
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
        alignItems: "center"
      }}>
        <TouchableOpacity
          onPress={() => handleOnPressGoBack({navigation})}
          style={{
            position: "absolute",
            left: -10,
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
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Delivery Address</Text>
      </View>
      <ScrollView>
        <View>
          <View style={{
            flexDirection: "column",
            marginBottom: 6,
          }}>
            <Text style={{
              fontSize: 16, fontWeight: "bold"
            }}>Name</Text>
            <View style={{
              height: 44,
              width: "100%",
              backgroundColor: COLORS.secondaryGray,
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8
            }}>
              <TextInput
                value={name}
                onChangeText={value => setName(value)}
                editable={false}
                style={{
                  color: COLORS.black
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={{
            flexDirection: "column",
            marginBottom: 6,
          }}>
            <Text style={{
              fontSize: 16, fontWeight: "bold"
            }}>Phone</Text>
            <View style={{
              height: 44,
              width: "100%",
              backgroundColor: COLORS.secondaryGray,
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8
            }}>
              <TextInput
                value={phone}
                onChangeText={value => setPhone(value)}
                editable={false}
                style={{
                  color: COLORS.black
                }}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={{
            flexDirection: "column",
            marginBottom: 6,
          }}>
            <Text style={{
              fontSize: 16, fontWeight: "bold"
            }}>Address</Text>
            <View style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8
            }}>
              <TextInput
                value={address}
                onChangeText={value => { SetAddress(value)}}
                editable={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {changeAddress == address ?
        <View style={{
          marginBottom: 20,
        }}>
          <View style={{
            borderRadius: 12,
            backgroundColor: COLORS.secondaryGray,
            alignItems: "center",
          }}>
            <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10, color: COLORS.white }}>Save</Text>
          </View>
        </View> : 
        <TouchableOpacity onPress={save}>
          <View style={{
            marginBottom: 20,
          }}>
            <View style={{
              borderRadius: 12,
              backgroundColor: COLORS.blue,
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 16, fontWeight: 600, marginVertical: 10, color: COLORS.white }}>Save</Text>
          </View>
        </View>
      </TouchableOpacity>
      }
    </SafeAreaView>
  );
}

export default SetAddress