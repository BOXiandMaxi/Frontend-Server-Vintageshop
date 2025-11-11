import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);  // null ไม่ใช่ ""
  const [userEmail, setUserEmail] = useState(null);

  return (
    <UserContext.Provider value={{ userName, setUserName, userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
