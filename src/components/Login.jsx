import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("user");
    const storedPassword = localStorage.getItem("password");

    if (!storedEmail || !storedPassword) {
      alert("⚠️ No account found. Please sign up first.");
      navigate("/signup");
      return;
    }

    if (email === storedEmail && password === storedPassword) {
      login();
      alert("✅ Login successful!");
      navigate("/");
    } else {
      alert("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>🔐 Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <input
            ref={emailInputRef}
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="auth-link">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
