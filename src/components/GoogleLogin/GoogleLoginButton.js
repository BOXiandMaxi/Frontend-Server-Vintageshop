import React, { useEffect } from "react";
import { useUserContext } from "../Context/UserContext";
import "./GoogleLoginButton.css";


const GoogleLoginButton = () => {
  const { setUserName, setUserEmail } = useUserContext();

/* global google */
useEffect(() => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handleCredentialResponse = (response) => {
    // response.credential คือ JWT token ที่ encode ข้อมูล user
    // Decode token แบบง่าย ๆ ด้วย library เช่น jwt-decode หรือ decode manually
    // ตัวอย่าง decode แบบง่าย (ไม่แนะนำสำหรับ production):
    const base64Url = response.credential.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(window.atob(base64));

    setUserName(decodedPayload.name);
    setUserEmail(decodedPayload.email);
  };

  return <div id="googleSignInDiv"></div>;
 
};

export default GoogleLoginButton;



