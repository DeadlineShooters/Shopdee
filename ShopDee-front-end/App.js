// import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { Dimensions } from "react-native";

import SignIn from "./src/pages/SignIn";
import BuyerBottomNavigator from "./src/components/BuyerBottomNavigator";
import SellerBottomNavigator from "./src/components/SellerBottomNavigator";
import ProductDetails from "./src/pages/Buyer/ProductDetails";
import EditProfile from "./src/pages/Buyer/Me/EditProfile.js";
import Settings from "./src/pages/Buyer/Me/Settings.js";
import SetAddress from "./src/pages/Buyer/Me/SetAddress.js";
const Stack = createNativeStackNavigator();

export default function App() {
  let loggedIn = true;
  let buyer = true;
  let seller = false;

  // var { height, width } = Dimensions.get("window");
  // console.log("Width is: " + width);
  // console.log("Height is: " + height);

  if (!loggedIn) return <SignIn />;
  else if (buyer)
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BuyerBottomNav"
            component={BuyerBottomNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Product Details"
            component={ProductDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="EditProfile"
            component={EditProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="SetAddress"
            component={SetAddress}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  else if (seller) {
    // seller
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SellerBottomNav"
            component={SellerBottomNavigator}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
