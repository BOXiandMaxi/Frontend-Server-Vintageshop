import axios from "axios";
import { useUserContext } from "../Context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import GoogleLoginButton from "../GoogleLogin/GoogleLoginButton";
import FacebookLoginButton from "../FacebookLogin/FacebookLoginButton";
import "./Header.css";

const Header = () => {
  const { userName, userEmail, setUserName, setUserEmail } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ ใช้ console.log เพื่อตรวจสอบ context
  console.log("🧠 Header context:", { userName, userEmail });

  const handleLogout = async () => {
    try {
      // เรียก backend logout
      const response = await axios.post(
        "https://vintage-shop-backend.infinityfree.me/loginandregister/logout.php",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setUserName(null);
        setUserEmail(null);
        sessionStorage.removeItem("userEmail");
        navigate("/");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img className="headerlogo" src="/picture/headerlogo.jpg" alt="logo" />
        <span className="header-logo-text">JohnJud_2hand</span>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="กำลังหาเสื้อ..."
          className="search-input"
        />
        <img src="./picture/search.svg" alt="Search" className="search-icon" />
      </div>

      {/* ถ้า user ยังไม่ login */}
      {!userName && (
        <div className="login">
          <div className="tooltip">
            {/* เปลี่ยนเป็น navigate ไปหน้า React login */}
            <div
              className="thelogouser"
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              <img src="/picture/Userlogo1.png" alt="User" />
            </div>
            <span className="tooltip-text">เข้าสู่ระบบ</span>
          </div>

          <GoogleLoginButton />
          <FacebookLoginButton />
        </div>
      )}

      {/* ถ้า user login แล้ว */}
      {userName && (
        <div className="UserNameEmail">
          {userName}
          <button onClick={handleLogout} className="button-logout">
            Logout
          </button>
        </div>
      )}

      <nav className="nav">
        <ul>
          <li>
            {location.pathname === "/" ? (
              <ScrollLink to="content" smooth={true} duration={500}>
                Home
              </ScrollLink>
            ) : (
              <RouterLink to="/">Home</RouterLink>
            )}
          </li>
          <li>
            <ScrollLink to="featured-products" smooth={true} duration={500}>
              Shop
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="about-container" smooth={true} duration={500}>
              About
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="contact-section" smooth={true} duration={500}>
              Contact
            </ScrollLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
