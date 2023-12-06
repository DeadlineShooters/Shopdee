import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { Dimensions } from "react-native";

import SignIn from "./src/pages/SignIn";
import Home from "./src/pages/Buyer/Home";
import BuyerBottomNavigator from "./src/components/BuyerBottomNavigator";
import SellerBottomNavigator from "./src/components/SellerBottomNavigator";
import ProductDetails from "./src/pages/Buyer/ProductDetails";
import Checkout from "./src/pages/Buyer/Checkout";
import SignUp from "./src/pages/SignIn/SignUp";

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
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
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
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Checkout"
                  component={Checkout}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
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
