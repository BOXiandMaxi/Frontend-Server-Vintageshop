import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://vintage-shop-backend.infinityfree.me/loginandregister/register.php",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      // หลัง register เสร็จ → กลับไปหน้า login
      if (res.data.success) {
        navigate("/login");
      } else {
        setMessage(res.data.message || "Register failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;
