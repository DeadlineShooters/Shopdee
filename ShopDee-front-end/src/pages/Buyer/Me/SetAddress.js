import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, Modal } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from "react";
import { COLORS } from "../../../../assets/Themes";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Dropdown } from "react-native-element-dropdown";

const SetAddress = ({ navigation }) => {
  const [name, setName] = useState("Golden Papaya");
  const [phone, setPhone] = useState("0921773092");
  const [address, SetAddress] = useState(" 227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh");
  const save = () => {
    console.log("Save function");
  }

  //Location type picker modal
  const [isFocus, setIsFocus] = useState(false);
  const [locationType, setLocationType] = useState("Home");
  const locationData = [
    { label: "Home", value: "home" },
    { label: "Workplace", value: "workplace" },
    { label: "School", value: "school" }
  ]
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
          onPress={() => navigation.goBack()}
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
                editable={true}
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
                editable={true}
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
                onChangeText={value => SetAddress(value)}
                editable={true}
                selection={{ start: 0 }}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={{
            flexDirection: "column",
            marginBottom: 6,
          }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Location type</Text>
            <Dropdown
              style={[{
                height: 50,
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                paddingHorizontal: 8,
                marginVertical: 6
              },
              isFocus && { borderColor: 'blue' }]}
              containerStyle={{
                backgroundColor: COLORS.primary,
                borderWidth: 0.5,
                borderRadius: 8,
              }}
              itemTextStyle={{ color: COLORS.lightBlue }}
              placeholderStyle={{ fontSize: 16 }}
              selectedTextStyle={{ fontSize: 16 }}
              data={locationData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? locationType : locationType}
              value={locationType}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setLocationType(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
}

export default SetAddress