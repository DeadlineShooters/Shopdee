import { createContainer, createContext, useState, useEffect } from "react";
import { fetchUserInfo } from "../src/api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [sellerData, setSellerData] = useState("");

  const [shop, setShop] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userID = decodedToken.userID;
      setUserID(userID);
      try {
        const data = await fetchUserInfo(userID);
        setUser(data);
        console.log("@@ User: ", data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    getUser().then("success");
  }, []);

  console.log("User ID *****: ", userID);

  const defaultImage =
    "https://cdn.discordapp.com/attachments/973498508793503745/1188490835541639188/default-thumbnail.png?ex=659ab758&is=65884258&hm=cdda93ced374c9a74e4c4729cd780f653ac6f8f5b04b48bde53bfc57d998a7a3&";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchShopInfo();
  //       setShop(data);

  //       console.log("@@ Shop: ", data);
  //       // i.g data: {"_id": "6579412001a6e7d1a58a8df1", "address": "tphcm", "description": "Day la mo ta", "image": "/image/path", "name": "Shop", "phone": "0909", "user": "65701eca56192c1c414ed11d"}
  //     } catch (error) {
  //       console.error("Error fetching shop info:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <UserContext.Provider value={{ userID, setUserID, user, setUser, sellerData, setSellerData, shop, setShop, defaultImage }}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
