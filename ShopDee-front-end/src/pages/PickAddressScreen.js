import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

const PickAddressScreen = ({ navigation, route, previousScreen }) => {
  console.log("Key", GOOGLE_MAPS_API_KEY);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("Current location: ", location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleMapPress = (e) => {
    // The user has tapped on the map, you can now update the selected location
    setRegion({
      ...e.nativeEvent.coordinate,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleConfirmAddress = async (data, details) => {
    const selectedAddress = details.description;

    console.log("Details ", details);

    // Fetch latitude and longitude using place_id
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${details.place_id}&key=${GOOGLE_MAPS_API_KEY}`);
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    const json = await response.json();
    console.log("@@ json", json);
    const location = json.result.geometry.location;

    // update marker
    setRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    console.log(selectedAddress);
    navigation.navigate(previousScreen, { selectedAddress });
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView style={styles.map} region={region} onPress={handleMapPress}>
          <Marker coordinate={region} />
        </MapView>
      )}
      <GooglePlacesAutocomplete
        minLength={2}
        placeholder="Enter your address"
        onPress={handleConfirmAddress}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        styles={{
          textInput: styles.addressInput,
          container: styles.addressContaier,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addressContaier: {
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    top: 15,
  },
  addressInput: {
    // position: "absolute",
    // height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
  },
  // confirmButton: {
  //   position: "absolute",
  //   bottom: 20,
  //   alignSelf: "center",
  //   backgroundColor: "#3498db",
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // confirmButtonText: {
  //   color: "#fff",
  //   fontSize: 16,
  // },
});

export default PickAddressScreen;
