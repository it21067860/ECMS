import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../pages/css/Login.css";

const KayLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Hardcoded admin login (username/password only)
      if (identifier === "Admin625" && password === "625") {
        localStorage.setItem("token", "admin-token");
        localStorage.setItem("userType", "admin");
        navigate("/admin/dashboard");
        return;
      }

      // Staff login (username/password) - caregivers, volunteers
      const endpoint = "http://localhost:8079/api/staff/login";
      const payload = { username: identifier, password };

      const res = await axios.post(endpoint, payload);

      // Store authentication data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", res.data.userType); // 'caregiver', 'volunteer'
      
      if (res.data.caregiver) localStorage.setItem("caregiver", JSON.stringify(res.data.caregiver));
      if (res.data.volunteer) localStorage.setItem("volunteer", JSON.stringify(res.data.volunteer));

      // Redirect based on user type
      switch(res.data.userType) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "caregiver":
          navigate("/caregiver/profile");
          break;
        case "volunteer":
          navigate("/volunteer/dashboard");
          break;
        default:
          navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="kay-login-container">
      <h2>Staff Login - Safe Haven</h2>

      {error && <div className="kay-error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="kay-login-form">
        <div className="kay-form-group">
          <label htmlFor="identifier">Username</label>
          <input
            id="identifier"
            type="text"
            placeholder="Enter username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="kay-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="kay-btn kay-login-btn">
          Login
        </button>
      </form>

      <div className="kay-login-footer">
        <p>
          Don't have an account?{" "}
          <a href="/register/staff">Register here</a>
        </p>
        <p>
          <a href="/forgot-password">Forgot password?</a>
        </p>
      </div>
    </div>
  );
};

export default KayLogin;
