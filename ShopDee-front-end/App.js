import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { Dimensions } from "react-native";

import BuyerBottomNavigator from "./src/components/BuyerBottomNavigator";
import SellerBottomNavigator from "./src/components/SellerBottomNavigator";
import ProductDetails from "./src/pages/Buyer/ProductDetails";
import Checkout from "./src/pages/Buyer/Checkout";
import Me from "./src/pages/Seller/ShopProfile";
import { View, Text } from "react-native";

import CreateShop from "./src/pages/Buyer/CreateShop";
import EditProfile from "./src/pages/Buyer/Me/EditProfile.js";
import EditShopProfile from "./src/pages/Seller/ShopProfile/EditShop.js";
import Settings from "./src/pages/Buyer/Me/Settings.js";
import SetAddress from "./src/pages/Buyer/Me/SetAddress.js";
import UserPrivacy from "./src/pages/Buyer/Me/UserPrivacy.js";
import AboutShopDee from "./src/pages/Buyer/Me/About.js";
import HelpSupport from "./src/pages/Buyer/Me/Support";
import ChangePassword from "./src/pages/Buyer/Me/ChangePassword";
import SignIn from "./src/pages/SignIn";
import SignUp from "./src/pages/SignIn/SignUp/index.jsx";
import SendMailVerify from "./src/pages/Helper/SendMailVerify.js";
import { UserProvider } from "./context/UserContext.js";
import AddProduct from "./src/pages/Seller/AddProduct.js";
import EditProduct from "./src/pages/Seller/EditProduct.js";

import PickAddressScreen from "./src/pages/PickAddressScreen.js";
import { COLORS } from "./assets/Themes.js";
import GoBack from "./src/components/goBackPanel.jsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <UserProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {
                <>
                  <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                  <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                  <Stack.Screen name="SendMail" component={SendMailVerify} options={{ headerShown: false }} />
                  <Stack.Screen name="BuyerBottomNav" component={BuyerBottomNavigator} options={{ headerShown: false }} />
                  <Stack.Screen name="CreateShop" component={CreateShop} options={{ headerShown: false }} />
                  <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
                  <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
                  <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
                  <Stack.Screen name="SetAddress" component={SetAddress} options={{ headerShown: false }} />
                  <Stack.Screen name="UserPrivacy" component={UserPrivacy} options={{ headerShown: false }} />
                  <Stack.Screen name="AboutShopDee" component={AboutShopDee} options={{ headerShown: false }} />
                  <Stack.Screen name="HelpSupport" component={HelpSupport} options={{ headerShown: false }} />
                  <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
                  <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
                </>
              }
              {
                <>
                  <Stack.Screen
                    name="SellerBottomNav"
                    component={SellerBottomNavigator}
                    // options={{ title: "Back to Me", headerTitleStyle: { fontSize: 13, color: COLORS.blue }, headerBackTitleStyle: { fontSize: 13 } }}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen name="Edit product" component={EditProduct} options={{ headerShown: false }} />
                  <Stack.Screen name="Add product" component={AddProduct} options={{ headerShown: false }} />
                  <Stack.Screen name="Edit Profile" component={EditShopProfile} options={{ headerShown: false }} />
                </>
              }
              <Stack.Screen name="AddressPicker" component={PickAddressScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </UserProvider>
    </>
  );
}

// function CustomHeader() {
//   return (
//     <View style={{ height: 50, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ fontSize: 13, color: COLORS.blue }}>Back to Me</Text>
//     </View>
//   );
// }
