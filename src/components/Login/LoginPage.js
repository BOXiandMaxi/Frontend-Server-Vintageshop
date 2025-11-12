import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "./UserContext";

const LoginPage = () => {
  const { setUserName, setUserEmail } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://vintage-shop-backend.infinityfree.me/loginandregister/login.php",
        { email, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        setUserName(res.data.firstName);
        setUserEmail(res.data.email);
        setError("");
        navigate("/"); // กลับหน้า Home หลัง login
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        Don't have an account? <span style={{color:"blue", cursor:"pointer"}} onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
};

export default LoginPage;
