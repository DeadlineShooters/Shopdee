import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../assets/Themes";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export default function EditProduct() {
  const [productNameText, setProductNameText] = useState("");
  const [productDescText, setProductDescText] = useState("");
  const [price, setPrice] = useState(""); // New state for price
  const [stock, setStock] = useState(""); // New state for stock
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productPhotos, setProductPhotos] = useState([]);

  const categories = [
    "Flowers and Vases",
    "Gift Box",
    "Beauty Products",
    "Online Grocery",
    "Gift Package",
    "Notebooks and Papers",
    "Accessories & Women Jewelry",
    "Wall Decor",
    "Paper Bags",
    "Pens",
    "Party Decorations",
    "Bartending Tools",
  ];

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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainPanel}>
        {/* Product name  */}
        <View style={styles.fieldContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 15 }}>Product name: </Text>
            <Text style={{ color: COLORS.lightBlue, fontSize: 15 }}>*</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeProductName}
              value={productNameText}
              maxLength={30}
            />
            <Text style={{ color: COLORS.limitGray, fontSize: 15 }}>
              {productNameText.length}
            </Text>
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
              <Text style={{ color: COLORS.limitGray, fontSize: 15 }}>
                {productDescText.length}
              </Text>
              <Text style={{ color: COLORS.limitGray, fontSize: 15 }}>
                /400
              </Text>
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
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeStock}
              value={stock}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
        </View>
        {/* Category field */}
        <View
          style={[
            styles.fieldContainer,
            { padding: 0, alignItems: "flex-start" },
          ]}
        >
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: 15 }}>Category: </Text>
            <Text style={{ color: COLORS.lightBlue, fontSize: 15 }}>*</Text>
          </View>
          <View style={{ flex: 1, flexGrow: 1 }}>
            <Picker
              selectedValue={selectedCategory}
              style={styles.pickerStyle}
              onValueChange={handleCategoryChange}
            >
              <Picker.Item
                label="Select Category"
                value=""
                style={styles.categoryLabel}
              />
              {categories.map((category, index) => {
                return (
                  <Picker.Item
                    label={category}
                    value={category}
                    key={index}
                    style={styles.categoryLabel}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
        {/* Product Photos field */}
        <View style={styles.fieldContainer}>
          <Text style={{ fontSize: 15 }}>Product Photos: </Text>
          <View style={styles.photoContainer}>
            {productPhotos.map((photo, index) => (
              <Image key={index} source={photo} style={styles.productImage} />
            ))}
            {productPhotos.length < 5 && (
              <TouchableOpacity style={styles.addPhotoButton}>
                <Text>Add Photo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 10,
  },
  mainPanel: {
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
  },
  pickerStyle: {
    width: "100%",
    alignItems: "center",
  },
  categoryLabel: {
    fontSize: 15,
    color: COLORS.black,
  },
});
