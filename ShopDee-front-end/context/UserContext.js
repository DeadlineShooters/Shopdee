import { createContainer, createContext, useState, useEffect } from "react";
import { fetchShopInfo } from "../src/api/shopApi";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // this UserProvider not UserProvider, UserContext is UserProvider. UserProvider provides both shop and user
  const [userID, setUserID] = useState("");
  const [shop, setShop] = useState(null);

  const defaultImage =
    "https://cdn.discordapp.com/attachments/973498508793503745/1188490835541639188/default-thumbnail.png?ex=659ab758&is=65884258&hm=cdda93ced374c9a74e4c4729cd780f653ac6f8f5b04b48bde53bfc57d998a7a3&";

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

  return <UserContext.Provider value={{ userID, setUserID, shop, setShop, defaultImage }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
