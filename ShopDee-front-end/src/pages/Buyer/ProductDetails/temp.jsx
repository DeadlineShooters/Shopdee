<View style={{ marginVertical: 22 }}>
    <Text style={{ ...FONTS.h4 }}>Select Size</Text>

    <View style={{ flexDirection: "row", marginVertical: 18 }}>
        <TouchableOpacity
            style={[
                styles.checkboxContainer,
                selectedSize === "S" && styles.selectedCheckbox,
            ]}
            onPress={() => handelSizeSelection("S")}
        >
            <Text style={[selectedSize === "S" && styles.checkboxText]}>S</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[
                styles.checkboxContainer,
                selectedSize === "M" && styles.selectedCheckbox,
            ]}
            onPress={() => handelSizeSelection("M")}
        >
            <Text style={[selectedSize === "M" && styles.checkboxText]}>M</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[
                styles.checkboxContainer,
                selectedSize === "L" && styles.selectedCheckbox,
            ]}
            onPress={() => handelSizeSelection("L")}
        >
            <Text style={[selectedSize === "L" && styles.checkboxText]}>L</Text>
        </TouchableOpacity>
    </View>
</View>;
