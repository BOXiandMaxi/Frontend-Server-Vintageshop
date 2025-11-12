import React, { useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../Context/UserContext";

const SessionLoader = ({ children }) => {
  const { setUserName, setUserEmail } = useUserContext();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          'https://vintage-shop-backend.infinityfree.me/loginandregister/check_login_v2.php',
          { withCredentials: true }
        );
    
        if (response.data.loggedIn) {
          const { firstName, email } = response.data;
          setUserName(firstName);
          setUserEmail(email);
        } else {
          console.warn("⛔ ไม่มี session login");
        }
      } catch (error) {
        console.error("❌ Session check error:", error);
      }
    };
    
    checkSession();
  }, [setUserName, setUserEmail]);

  return <>{children}</>;
};

export default SessionLoader;
