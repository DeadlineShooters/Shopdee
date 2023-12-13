import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { Dimensions } from "react-native";

import Home from "./src/pages/Buyer/Home";
import BuyerBottomNavigator from "./src/components/BuyerBottomNavigator";
import SellerBottomNavigator from "./src/components/SellerBottomNavigator";
import ProductDetails from "./src/pages/Buyer/ProductDetails";
import Me from "./src/pages/Seller/EditProfile";

import CreateShop from "./src/pages/Buyer/CreateShop";
import EditProfile from "./src/pages/Buyer/Me/EditProfile.js";
import Settings from "./src/pages/Buyer/Me/Settings.js";
import SetAddress from "./src/pages/Buyer/Me/SetAddress.js";
import UserPrivacy from "./src/pages/Buyer/Me/UserPrivacy.js";
import AboutShopDee from "./src/pages/Buyer/Me/About.js";
import HelpSupport from "./src/pages/Buyer/Me/Support";
import ChangePassword from "./src/pages/Buyer/Me/ChangePassword";
import SignIn from "./src/pages/SignIn";
import SignUp from "./src/pages/SignIn/SignUp/index.jsx";
import { UserContext } from "./UserContext.js";
const Stack = createNativeStackNavigator();

export default function App() {
  let loggedIn = false;
  let buyer = true;
  let seller = false;

  // var { height, width } = Dimensions.get("window");
  // console.log("Width is: " + width);
  // console.log("Height is: " + height);
  return (
    <>
      <StatusBar />
        <UserContext>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator>
                {buyer && (
                  <>
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
                    <Stack.Screen
                      name="BuyerBottomNav"
                      component={BuyerBottomNavigator}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="EditProfile"
                      component={EditProfile}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Settings"
                      component={Settings}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="ChangePassword"
                      component={ChangePassword}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="SetAddress"
                      component={SetAddress}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="UserPrivacy"
                      component={UserPrivacy}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="AboutShopDee"
                      component={AboutShopDee}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="HelpSupport"
                      component={HelpSupport}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Product Details"
                      component={ProductDetails}
                      options={{ headerShown: false }}
                    />
                     <Stack.Screen
                      name="CreateShop"
                      component={CreateShop}
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
          </SafeAreaProvider >
        </UserContext>
    </>
  );
}