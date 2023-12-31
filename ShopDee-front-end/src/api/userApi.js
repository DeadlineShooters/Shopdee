import { Axios } from "./axios";

export const fetchUserInfo = async (userId) => {
  console.log("@@@ user id: " + userId);
  try {
    const response = await Axios.get(`/user/profile/${userId}`);
    console.log("@@ User Info: ", response.data.User);

    return response.data.User;
  } catch (error) {
    console.error("@@ Error fetching user info:", error);

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
