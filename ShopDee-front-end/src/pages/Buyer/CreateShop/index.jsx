import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, SafeAreaView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Ionic from 'react-native-vector-icons/Ionicons';
export default function Me() {
    const [shopName, setShopName] = useState('');
    const [bio, setBio] = useState('');
    const [maxCharactersName] = useState(30); // Số ký tự tối đa cho phép
    const [maxCharactersBio] = useState(200);
    const showToast = () => {
        ToastAndroid.show('Toast message displayed!', ToastAndroid.SHORT);
    };

    const handleShopNameChange = (text) => {
        if (text.length <= maxCharactersName) {
            setShopName(text);
        }
    };

    const handleBioChange = (text) => {
        if (text.length <= maxCharactersBio) {
            setBio(text);
        }
    };
    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        })
        if (!result.canceled) {
          setSelectedImage(result.assets[0].url);
        }
      }
    return (
        <SafeAreaView
            style={{
                // width: '100%',
                // height: '100%',
                backgroundColor: '#E3E3E3',
                flex: 1
            }}>
            <View
                style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    marginTop: 22
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionic name="close-outline" style={{ fontSize: 35 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Information shop settings </Text>
                <TouchableOpacity onPress={() => {
                    TostMessage();
                    navigation.goBack();
                }}>
                    <Ionic name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#00a7e1' }}>
          <Image
            source={require('./avatar.jpg')}
            style={{ width: 80, height: 80, borderRadius: 100 }} 
           />
            <View>
            <TouchableOpacity onPress={handleImageSelection}>
              <Text
                style={{
                  color: 'white',
                }}>
                Change profile photo
              </Text>
              </TouchableOpacity>
            </View>
      </View>
            <View style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                padding: 10,
                alignItems: 'center',
                marginTop: 10,
            }}>
                <Text style={{ fontSize: 16 }}>Shop name</Text>
                <TextInput
                    placeholder="Shop name"
                    style={{
                        fontSize: 16,
                        borderColor: '#CDCDCD',
                        marginHorizontal: 10,
                        flex: 1
                    }}
                    value={shopName}
                    onChangeText={handleShopNameChange}
                    maxLength={maxCharactersName}
                />
                <Text>{shopName.length}/{maxCharactersName}</Text>
            </View>
            <View style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                padding: 10,
                // alignItems: 'center',
            }}>
                <Text style={{ fontSize: 16 }}>Bio</Text>
                <TextInput
                    multiline={true}
                    placeholder="Shop description"
                    style={{
                        fontSize: 16,
                        borderColor: '#CDCDCD',
                        marginHorizontal: 10,
                        flex: 1
                    }}
                    value={bio}
                    onChangeText={handleBioChange}
                    maxLength={maxCharactersBio}
                    numberOfLines={5} // Số dòng hiển thị
                    textAlignVertical="top" // Căn văn bản từ phía trên xuống
                />
                <Text>{bio.length}/{maxCharactersBio}</Text>
            </View>
            <View style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                justifyContent: 'space-between',
                marginTop: 10,
            }}>
                <Text
                    style={{ fontSize: 16 }}>
                    Pickup address
                </Text>
                <TextInput
                    placeholder="setup"
                    style={{
                        fontSize: 16,
                        borderColor: '#CDCDCD',
                        marginHorizontal: 10,
                        flex: 1,
                    }} />
            </View>
            <View style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                justifyContent: 'space-between',
            }}>
                <Text
                    style={{ fontSize: 16 }}>
                    Email
                </Text>
                <TextInput
                    placeholder="setup"
                    style={{
                        fontSize: 16,
                        borderColor: '#CDCDCD',
                        marginHorizontal: 10,
                        flex: 1,
                    }} />
            </View>
            <View style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                justifyContent: 'space-between',
            }}>
                <Text
                    style={{ fontSize: 16 }}>
                    Phone number
                </Text>
                <TextInput
                    placeholder="setup"
                    style={{
                        fontSize: 16,
                        borderColor: '#CDCDCD',
                        marginHorizontal: 10,
                        flex: 1,
                    }} />
            </View>
        </SafeAreaView>
    );
}
