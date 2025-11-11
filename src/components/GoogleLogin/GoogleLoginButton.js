import React, { useEffect } from "react";
import { useUserContext } from "../Context/UserContext";
import "./GoogleLoginButton.css";

const GoogleLoginButton = () => {
  const { setUserName, setUserEmail } = useUserContext();

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(window.atob(base64));

      setUserName(decodedPayload.name);
      setUserEmail(decodedPayload.email);
    };

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, [setUserName, setUserEmail]); // ✅ ใช้แค่ state setter เป็น dependency

  return <div id="googleSignInDiv"></div>;
};

export default GoogleLoginButton;
