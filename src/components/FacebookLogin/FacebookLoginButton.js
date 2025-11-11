// src/components/FacebookLoginButton.js

import { useEffect, useState } from "react";
import "./FacebookLoginButton.css";

export default function FacebookLoginButton() {
  const [fbReady, setFbReady] = useState(false); // ตรวจสอบว่า SDK โหลดเสร็จ

  useEffect(() => {
    // ฟังก์ชัน fbAsyncInit จะถูกเรียกโดย SDK หลังโหลดเสร็จ
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FB_APP_ID, // App ID จาก .env
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      setFbReady(true); // SDK โหลดเสร็จ
    };

    // โหลด SDK script แบบ asynchronous
    (function (d, s, id) {
      if (d.getElementById(id)) return; // ถ้าโหลดแล้วก็ไม่ต้องโหลดซ้ำ
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      const fjs = d.getElementsByTagName(s)[0];
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFBLogin = () => {
    if (!fbReady) {
      console.warn("Facebook SDK ยังโหลดไม่เสร็จ");
      return; // ป้องกันเรียก FB.login ก่อน SDK โหลดเสร็จ
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          // ดึงข้อมูลผู้ใช้
          window.FB.api("/me", { fields: "name,email" }, (userInfo) => {
            console.log("Facebook user info:", userInfo);

            // ส่งข้อมูลไป backend เพื่อเก็บ session
            fetch(process.env.REACT_APP_FB_BACKEND, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(userInfo),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Session set result:", data);
                if (data.status === "success") {
                  window.location.reload(); // โหลดหน้าใหม่เพื่อแสดงชื่อ
                }
              });
          });
        } else {
          console.log("Facebook login failed or cancelled.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div
      id="facebookLoginDiv"
      onClick={handleFBLogin}
      style={{ cursor: fbReady ? "pointer" : "not-allowed" }}
      title={fbReady ? "Login with Facebook" : "Loading..."}
    ></div>
  );
}



// // src/components/FacebookLoginButton.js

// import { useEffect } from "react";
// import "./FacebookLoginButton.css";

// export default function FacebookLoginButton() {
//   useEffect(() => {
//     // โหลด Facebook SDK
//     window.fbAsyncInit = function () {
//       window.FB.init({
//         appId: "1275973740781968", // 👉 ใส่ App ID ที่คุณได้จาก Facebook Developer
//         cookie: true,
//         xfbml: true,
//         version: "v19.0", // หรือเวอร์ชันล่าสุดที่ Facebook แนะนำ
//       });
//     };

//     // โหลด SDK script
//     (function (d, s, id) {
//       var js,
//         fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) return;
//       js = d.createElement(s);
//       js.id = id;
//       js.src = "https://connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     })(document, "script", "facebook-jssdk");
//   }, []);

//   const handleFBLogin = () => {
//     window.FB.login(
//       function (response) {
//         if (response.authResponse) {
//           // ดึงข้อมูลโปรไฟล์ผู้ใช้
//           window.FB.api("/me", { fields: "name,email" }, function (userInfo) {
//             console.log("Facebook user info:", userInfo);

//             // ส่งข้อมูลไป backend PHP เพื่อเก็บ session
//             fetch("http://localhost:8000/set_facebook_session.php", {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   credentials: "include",
//                   body: JSON.stringify(userInfo),
//                 })
//               .then((res) => res.json())
//               .then((data) => {
//                 console.log("Session set result:", data);
//                 if (data.status === "success") {
//                   window.location.reload(); // โหลดใหม่เพื่อให้ Header แสดงชื่อ
//                 }
//               });
//           });
//         } else {
//           console.log("Facebook login failed or cancelled.");
//         }
//       },
//       { scope: "public_profile,email" } // ขอสิทธิ์อ่านชื่อกับอีเมล
//     );
//   };

//   return <div id="facebookLoginDiv" onClick={handleFBLogin}></div>;
// };



