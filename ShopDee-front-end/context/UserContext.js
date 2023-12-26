import {createContainer, createContext, useState} from "react";

const UserType = createContext();

const UserContext = ({children}) => {
    const [userID, setUserID] = useState("");
    const [userData, setUserData] = useState("");
    const [sellerData, setSellerData] = useState("");
    return (
        <UserType.Provider 
            value={{
                userID,
                setUserID, 
                userData, 
                setUserData, 
                sellerData, 
                setSellerData}}>
            {children}
        </UserType.Provider>
    )
}

export {UserType, UserContext};