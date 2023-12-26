import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Axios } from "./axios";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export const fetchShopInfo = async (userID) => {
  const findUser = {userID};
  try {
    const shop = await Axios.post("http://10.0.2.2:3000/user/profile/checkShopOwner", findUser);
    console.log("@@ Shop: ", shop.data);
    return shop.data;
  } catch (error) {
    console.error("@@ Error fetching shop info:", error);

    // Check if the error has a response and data properties
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      console.error("@@ Backend error message:", message);
      throw new Error(message); // Rethrow the error with the backend message
    }

    // If there's no specific backend error message, rethrow the original error
    throw error;
  }
};

export const fetchOrders = async (status, shopID) => {
  // return orders based on status
  try {
    const response = await Axios.get(`/shop/${shopID}/orders?status=${status}`);

    return response.data;
  } catch (error) {
    console.error("@@ Error fetching orders:", error);

    // Check if the error has a response and data properties
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      console.error("@@ Backend error message:", message);
      throw new Error(message); // Rethrow the error with the backend message
    }

    // If there's no specific backend error message, rethrow the original error
    throw error;
  }
};

export const updateOrderStatus = async (shopId, order) => {
  const url = `/shop/${shopId}/orders/${order._id}`;
  console.log("@@ url: ", url);
  try {
    const response = await Axios.put(url, order);
    console.log("@@ Order updated: ", response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);

    // Check if the error has a response and data properties
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      console.error("@@ Backend error message:", message);
      throw new Error(message); // Rethrow the error with the backend message
    }

    // If there's no specific backend error message, rethrow the original error
    throw error;
  }
};
