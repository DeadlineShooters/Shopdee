import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { Dimensions } from "react-native";

import SignIn from "./src/pages/SignIn";
import BuyerBottomNavigator from "./src/components/BuyerBottomNavigator";
import SellerBottomNavigator from "./src/components/SellerBottomNavigator";
import ProductDetails from "./src/pages/Buyer/ProductDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  let loggedIn = true;
  let buyer = false;
  let seller = true;

  // var { height, width } = Dimensions.get("window");
  // console.log("Width is: " + width);
  // console.log("Height is: " + height);

  if (!loggedIn)
    return (
      <>
        <StatusBar />
        <SignIn />
      </>
    );
  return (
    <>
      <StatusBar />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {buyer && (
              <>
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
              </>
            )}
            {seller && (
              <Stack.Screen
                name="SellerBottomNav"
                component={SellerBottomNavigator}
                options={{
                  headerShown: false,
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}
