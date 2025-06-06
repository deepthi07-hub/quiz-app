import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const existingUser = localStorage.getItem("user");

    if (existingUser === email) {
      alert("⚠️ Account already exists. Please login.");
      navigate("/login");
    } else if (email && password) {
      localStorage.setItem("user", email);
      localStorage.setItem("password", password);
      localStorage.setItem("isAuthenticated", "false");

      alert("✅ Account created successfully! You can now login.");
      navigate("/login");
    } else {
      alert("❌ Please enter a valid email and password.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>📝 Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <button type="submit">Signup</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
