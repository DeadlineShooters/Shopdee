import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Axios } from "../api/axios";

export const fetchUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    const userID = jwtDecode(token).userID;
    const shop = await Axios.get(`/shop/shopProfile/${userID}`);

    return {
      userID,
      shop,
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
