import { createContainer, createContext, useState, useEffect } from "react";
import { fetchShopInfo } from "../src/api/shopApi";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState("");
  const [shop, setShop] = useState(null);
  // shop

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShopInfo();
        setShop(data);

        console.log("@@ Shop: ", data);
        // i.g data: {"_id": "6579412001a6e7d1a58a8df1", "address": "tphcm", "description": "Day la mo ta", "image": "/image/path", "name": "Shop", "phone": "0909", "user": "65701eca56192c1c414ed11d"}
      } catch (error) {
        console.error("Error fetching shop info:", error);
      }
    };

    fetchData();
  }, []);

  return <UserContext.Provider value={{ userID, setUserID, shop, setShop }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
