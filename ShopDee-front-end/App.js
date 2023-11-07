// import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { Dimensions } from "react-native";

import SignIn from "./src/pages/SignIn";
import BuyerBottomNavigator from "./src/components/BuyerBottomNavigator";
import SellerBottomNavigator from "./src/components/SellerBottomNavigator";

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
        <BuyerBottomNavigator />
      </NavigationContainer>
    );
  else if (seller) {
    // seller
    return (
      <NavigationContainer>
        <SellerBottomNavigator />
      </NavigationContainer>
    );
  }
}
