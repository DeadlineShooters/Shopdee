import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import { COLORS } from "../../../assets/Themes";
import { useState, useRef, useEffect, useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GoBack from "../../components/goBackPanel";
import { Axios } from "../../api/axios";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../context/UserContext";
import mongoose from "mongoose";

export default function AddProduct({ productId }) {
  const navigation = useNavigation();
  const [productNameText, setProductNameText] = useState("");
  const [productDescText, setProductDescText] = useState("");
  const [price, setPrice] = useState(""); // New state for price
  const [stock, setStock] = useState(""); // New state for stock
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productPhotos, setProductPhotos] = useState([]);
  const { userID, setUserID } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const { sellerData } = useContext(UserContext);
  const shopID = sellerData._id;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get("/categories", {
          timeout: 5000, // Set timeout to 5 seconds (adjust as needed)
        });
        const fetchedCategories = response.data;
        console.log("{GET http://localhost:3000/categories}", fetchedCategories);
        setCategories(fetchedCategories); // Update the state
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Set an empty array in case of an error
      }
    };

    fetchCategories();
  }, []);

  const handleAdd = async () => {
    // Validate that all required fields are filled
    if (!productNameText || !productDescText || !price || !stock || !selectedCategory || productPhotos.length === 0) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      productPhotos.map(async (photo) => {
        const formData = new FormData();
        const imageName = `image_${Date.now()}.jpg`;
        const fileExtension = photo.uri.split(".").pop();

        formData.append("file", {
          uri: photo.uri,
          type: `image/${fileExtension}`,
          name: imageName,
        });
        formData.append("upload_preset", "ShopDeeImageStock");

        try {
          const response = await Axios.post("https://api.cloudinary.com/v1_1/dqxtf297o/image/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          console.log("@@@ response: ", response.data);

          return {
            public_id: response.data.public_id,
            url: response.data.secure_url,
          };
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
          if (error.response && error.response.data) {
            const cloudinaryError = error.response.data;
            console.error("Cloudinary error:", cloudinaryError);
          }
          return null;
        }
      })
    );

    // Filter out any failed uploads
    const successfulUploads = imageUrls.filter((url) => url !== null);
    console.log("@@@ imageURLs: ", successfulUploads);

    try {
      const response = await Axios.post(`/shop/${shopID}/products/create-product`, {
        name: productNameText,
        description: productDescText,
        image: successfulUploads,
        price,
        quantity: stock,
        category: selectedCategory,
        shop: new mongoose.Types.ObjectId(shopID),
      });

      console.log("@@ Product added successfully", response.data);
      navigation.navigate("My Product");
    } catch (error) {
      console.error("@@ Error creating new product:", error);

      // Check if the error has a response and data properties
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        console.error("@@ Backend error message:", message);
        throw new Error(message); // Rethrow the error with the backend message
      }

      // If there's no specific backend error message, rethrow the original error
      throw error;
    }
  };

  const onChangeProductName = (text) => {
    setProductNameText(text);
  };
  const onChangeProductDesc = (text) => {
    setProductDescText(text);
  };

  // Handler for price input
  const onChangePrice = (text) => {
    // Check if the input is numeric
    if (/^\d+$/.test(text) || text === "") {
      setPrice(text);
    }
  };

  // Handler for stock input (same logic as price)
  const onChangeStock = (text) => {
    if (/^\d+$/.test(text) || text === "") {
      setStock(text);
    }
  };

  const handleCategoryChange = (itemValue) => {
    setSelectedCategory(itemValue);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      canceled: true,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setProductPhotos(result.assets.map((item) => ({ uri: item.uri })));
    }
  };

  // Check form changes
  const initialFormState = useRef({
    productNameText,
    productDescText,
    price,
    stock,
    selectedCategory,
    productPhotos,
  });

  const isFormEdited = useRef(false);

  useEffect(() => {
    // Compare the current form state with the initial state
    const isEdited =
      productNameText !== initialFormState.current.productNameText ||
      productDescText !== initialFormState.current.productDescText ||
      price !== initialFormState.current.price ||
      stock !== initialFormState.current.stock ||
      selectedCategory !== initialFormState.current.selectedCategory ||
      JSON.stringify(productPhotos) !== JSON.stringify(initialFormState.current.productPhotos);

    // Set the flag accordingly
    isFormEdited.current = isEdited;

    // Cleanup function to reset the flag when the component unmounts
    return () => {
      isFormEdited.current = false;
    };
  }, [productNameText, productDescText, price, stock, selectedCategory, productPhotos]);

  const handleGoBack = () => {
    if (isFormEdited.current) {
      // If there are unsaved changes, show a confirmation prompt
      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Do you want to discard?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Discard",
            onPress: () => {
              // Reset the flag and navigate back
              isFormEdited.current = false;
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      // If no changes, simply navigate back
      navigation.goBack();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <GoBack currentTitle="Add Product" prevTitle="My Products" func={handleGoBack}></GoBack>

      <View style={styles.mainPanel}>
        {/* Product name  */}
        <View style={styles.fieldContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 15 }}>Product name: </Text>
            <Text style={{ color: COLORS.lightBlue, fontSize: 15 }}>*</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} onChangeText={onChangeProductName} value={productNameText} maxLength={30} />
            <Text style={{ color: COLORS.limitGray, fontSize: 15 }}>{productNameText.length}</Text>
            <Text style={{ color: COLORS.limitGray, fontSize: 15 }}>/30</Text>
          </View>
        </View>
        {/* Product description */}
        <View style={[styles.fieldContainer, { flexDirection: "column" }]}>
          <View style={styles.productDescHeader}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 15 }}>Product description:</Text>
              <Text style={{ color: COLORS.lightBlue, fontSize: 15 }}>*</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: COLORS.limitGray, fontSize: 15 }}>{productDescText.length}</Text>
              <Text style={{ color: COLORS.limitGray, fontSize: 15 }}>/400</Text>
            </View>
          </View>

          <TextInput
            editable
            style={styles.productDescInput}
            onChangeText={onChangeProductDesc}
            value={productDescText}
            maxLength={400}
            multiline
            numberOfLines={10}
          />
        </View>
        {/* Price field */}
        <View style={styles.fieldContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 15 }}>Price: </Text>
            <Text style={{ color: COLORS.lightBlue, fontSize: 15 }}>*</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangePrice}
              value={price}
              keyboardType="numeric" // Set the keyboard type to numeric
              maxLength={10} // Set maximum input length if needed
            />
          </View>
        </View>
        {/* Stock field (similar structure to Price) */}
        <View style={styles.fieldContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 15 }}>Stock: </Text>
            <Text style={{ color: COLORS.lightBlue, fontSize: 15 }}>*</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} onChangeText={onChangeStock} value={stock} keyboardType="numeric" maxLength={10} />
          </View>
        </View>
        {/* Category field */}
        <View style={[styles.fieldContainer, { alignItems: "flex-start" }]}>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: 15 }}>Category: </Text>
            <Text style={{ color: COLORS.lightBlue, fontSize: 15 }}>*</Text>
          </View>
          <View style={{ flex: 1, flexGrow: 1 }}>
            <Picker selectedValue={selectedCategory} style={styles.pickerStyle} onValueChange={handleCategoryChange}>
              <Picker.Item label="Select Category" value="" style={styles.categoryLabel} />
              {categories.map((category, index) => {
                return <Picker.Item label={category.name} value={category._id} key={index} style={styles.categoryLabel} />;
              })}
            </Picker>
          </View>
        </View>
        {/* Product Photos field */}
        <View style={styles.fieldContainer}>
          <Text style={{ fontSize: 15 }}>Product Photos: </Text>
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
              <MaterialCommunityIcons name="file-image-plus" size={30} color="black" />
            </TouchableOpacity>
            <FlatList
              data={productPhotos}
              renderItem={({ item, index }) => <Image key={index} source={item} style={styles.productImage} />}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3} // Set the number of columns
            />
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainPanel: {
    marginTop: 10,
    backgroundColor: COLORS.white,
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondaryGray,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center", // Align vertically if needed
    flex: 1, // Take remaining space
  },
  textInput: {
    flex: 1, // Take remaining space within inputContainer
    borderColor: "gray", // Just for visibility
    paddingHorizontal: 8, // Optional padding for TextInput
  },
  productDescInput: {
    // paddingHorizontal: 5,
    textAlignVertical: "top",
  },
  productDescHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: COLORS.secondaryGray,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  pickerStyle: {
    width: "100%",
    alignItems: "center",
  },
  categoryLabel: {
    fontSize: 15,
    color: COLORS.black,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  photoContainer: {},
  addText: {
    color: COLORS.lightBlue,
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    right: 10,
    top: 35,
    zIndex: 100,
    padding: 10,
    borderRadius: 5,
  },
});
