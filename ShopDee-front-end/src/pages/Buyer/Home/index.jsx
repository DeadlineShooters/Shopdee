import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, ScrollView} from "react-native";
import { useState } from "react";
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
export default function Home() {
  const navigation = useNavigation();
  function onPressFunction() {
    navigation.navigate("Home");
  }

  const localImageUrls = [
    require('./sunglasses.png'),
    require('./hat.png'),
  ];

  const products = [
    {
      id: '1',
      name: 'Sunglasses',
      description: '$ 48.9',
      imageUrl: localImageUrls[0],
    },
    {
      id: '2',
      name: 'Hat',
      description: '$ 47.7',
      imageUrl: localImageUrls[1],
    },
    {
      id: '3',
      name: 'Sunglasses',
      description: '$ 48.9',
      imageUrl: localImageUrls[0],
    },
    {
      id: '4',
      name: 'Hat',
      description: '$ 47.7',
      imageUrl: localImageUrls[1],
    },
    {
      id: '5',
      name: 'Sunglasses',
      description: '$ 48.9',
      imageUrl: localImageUrls[0],
    },
    {
      id: '6',
      name: 'Hat',
      description: '$ 47.7',
      imageUrl: localImageUrls[1],
    },
    // {
    //   id: '3',
    //   name: 'Product 3',
    //   description: 'Description for product 3',
    //   imageUrl: 'https://example.com/product2.jpg',
    // },
    // {
    //   id: '4',
    //   name: 'Product 4',
    //   description: 'Description for product 4',
    //   imageUrl: 'https://example.com/product2.jpg',
    // },
    // {
    //   id: '5',
    //   name: 'Product 5',
    //   description: 'Description for product 5',
    //   imageUrl: 'https://example.com/product2.jpg',
    // },
 ];


  const [search, getSearch] = useState('');
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressFunction}>        
    </Pressable>

    <View style ={{flexDirection:'row', alignItems: 'center', paddingBottom: 10, paddingLeft: 10, paddingRight: 40 }} >
      <View style = {{flexDirection:'row', alignItems: 'center', display: 'flex',}}>
      <AntDesign name="search1" size={20} color="gray" style= {{position: 'absolute',paddingLeft: 15, zIndex: 2,}}/>
      <TextInput
        style={styles.input}
        onChangeText={getSearch}
        value={search}        
        placeholder='Search'
      />
      </View> 
        <View  style = {{flexDirection:'row', marginRight: 20}}>            
          <TouchableOpacity style = {{flexDirection: 'row', backgroundColor: 'rgba(51, 153, 255, 0.5)', padding: 10, borderRadius: 20, width : 40, height : 40 ,  alignItems: 'center', justifyContent: 'center'}}  onPress={() => {}}>       
          <FontAwesome name="shopping-cart" size={20} color="gray" /> 
          </TouchableOpacity>  
        </View>  
      </View>

      <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#D3D3D3', padding: 5, borderRadius: 20, marginRight: 20}}  onPress={() => {}}>
          <Text> Filter </Text>
          <AntDesign name="filter" size={20} color="gray"/>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#D3D3D3', padding: 5, borderRadius: 20, marginRight: 20, paddingRight: 10}} onPress={() => {}}>
          <Text> Sort </Text>
          <FontAwesome name="sort-amount-asc" size={20} color="gray"/>
        </TouchableOpacity>
      </View>


      <ScrollView contentContainerStyle={styles.productList}>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {products.map((product, index) => (
            <View style={{ width: '50%', padding: 5 }}  key={index}>
              <TouchableOpacity key={product.id} style={styles.productItem} onPress={() => {}}>
                  <Image source={product.imageUrl} style={styles.productImage} />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text>{product.description}</Text>
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
      marginTop: 50,
      justifyContent: 'top',
      padding: 10,
      paddingHorizontal: 10,
      
    },
    input: {      
      height: 40,
      width: '95%',
      borderColor: 'transparent',
      backgroundColor: '#D3D3D3',
      borderWidth: 1,
      borderRadius: 30,
      paddingLeft: 40,      
    },
    
    cartButton: {
      position: 'absolute',
      left: 330,
      top: 0,
      zIndex: 2,
      height: 40,
      width: '12%',
      borderColor: 'transparent',
      backgroundColor: 'rgba(51, 153, 255, 0.5)',
      borderWidth: 1,
      borderRadius: 30,
      paddingLeft: 10,
      marginBottom: 10,
      zIndex: 2,
    },
    buttonText: {
      color: 'black',
      fontSize: 18,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    filterButton: {
      left: 275,
      top: -40,
      zIndex: 2,
      height: 40,
      width: '25%',
      borderColor: 'transparent',
      backgroundColor: '#EAEAEA',
      borderWidth: 1,
      borderRadius: 30,
      paddingLeft: 10,
      marginBottom: 10,
      zIndex: 1,
    },
    sortButton: {
      left: 170,
      top: -90,
      zIndex: 2,
      height: 40,
      width: '25%',
      borderColor: 'transparent',
      backgroundColor: '#EAEAEA',
      borderWidth: 1,
      borderRadius: 30,
      paddingLeft: 10,
      marginBottom: 10,
      zIndex: 1,
    },
    text: {
      top: 7,
      left: 2,
      color: 'gray',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    productList: {
      paddingHorizontal: 10,
    },
    productRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    productItem: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'left',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      height: 200,
    },
    productImage: {
      flex: 1, 
      width: '100%', 
      height: '100%',
    },
    productDetails: {
      flex: 1,
      marginBottom: 10,
      textAlign: 'left',
    },
    productName: {
      fontWeight: 'bold',
      marginBottom: 50,
      textAlign: 'left',
    },
  }); 