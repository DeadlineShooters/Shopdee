import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, Modal } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from "react";
import { COLORS } from "../../../../assets/Themes";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Dropdown } from "react-native-element-dropdown";

const AboutShopDee = ({ navigation }) => {
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
        <Text style={{ fontSize: 20, fontWeight: 600 }}>About ShopDee</Text>
      </View>
      <ScrollView>
        <View style={{
          flexDirection: "column",
          marginBottom: 6,
        }}>
          <Text style={{
            fontSize: 18, fontWeight: "bold"
          }}>About development team</Text>
          <View style={{
            height: 260,
            width: "100%",
            borderColor: COLORS.secondaryGray,
            borderWidth: 1,
            borderRadius: 4,
            marginVertical: 6,
            justifyContent: "center",
            paddingLeft: 8
          }}>
            <Text style={{
              textAlign: "justify",
              margin: 10,
            }}> {'\t'}{'\t'}{'\t'}{'\t'}This team is setup in the Intro2SE course, 21CLC03 class, FITUS department. {"\n"}
              {'\t'}{'\t'}{'\t'}{'\t'}The team has five members, with the name is Papaya. The information of them are described
              detailly in the below section. In this course, the team has made the great team work under the guidance of our respect TAs, they are
              teacher Nguyen Minh Huy and Nguyen Le Hoang Dung.{"\n"}
              {'\t'}{'\t'}{'\t'}{'\t'}The below is team member's information:{"\n"}
              <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}{'\t'}Nguyen Tuan Kiet - ID: 21127089{"\n"}
              <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}{'\t'}Pham Anh Nhu Ngoc - ID: 21127119{"\n"}
              <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}{'\t'}Nguyen Duc Vinh Hoa - ID: 21127609{"\n"}
              <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}{'\t'}Nguyen Xuan Loc - ID: 21127641{"\n"}
              <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}{'\t'}Nguyen Minh Thong - ID: 21127696{"\n"}
            </Text>
          </View>
          <Text style={{
            fontSize: 18, fontWeight: "bold"
          }}>About the application</Text>
          <View style={{
            height: 300,
            width: "100%",
            borderColor: COLORS.secondaryGray,
            borderWidth: 1,
            borderRadius: 4,
            marginVertical: 6,
            justifyContent: "center",
            paddingLeft: 8
          }}>
            <Text style={{
              textAlign: "justify",
              margin: 10,
            }}> {'\t'}{'\t'}{'\t'}{'\t'}This application's name is ShopDee . {"\n"}
              {'\t'}{'\t'}{'\t'}{'\t'}What is this application about ? Shopdee is an online-shopping app that provides an easy, safe, and
              fast online-shopping experience for users and greatly expands any individual/ organization business to the
              online platform.{"\n"}
              {'\t'}{'\t'}{'\t'}{'\t'}Why do we build this app? Based on current e-commerce platforms in the world like Shopee, Amazon,...
              which have provided users with an easy, safe, and fast experience when shopping online through payment and shipping support
              systems and ensure operation, we have the motivation and desire to build the moderate version of those above platforms for
              our own to carry out further research and development in the future. This is all about our application.{"\n"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AboutShopDee;