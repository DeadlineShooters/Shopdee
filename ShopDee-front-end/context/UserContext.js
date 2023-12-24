import { createContainer, createContext, useState, useEffect } from "react";
import { fetchShopInfo } from "../src/api/shopApi";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // this UserProvider not UserProvider, UserContext is UserProvider. UserProvider provides both shop and user
  const [userID, setUserID] = useState("");
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShopInfo();
        setShop(data);
      } catch (error) {
        console.error("Error fetching shop info:", error);
      }
    };

    fetchData();
  }, []);

  return <UserContext.Provider value={{ userID, setUserID, shop, setShop }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
