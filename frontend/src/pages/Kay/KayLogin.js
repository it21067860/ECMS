import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <>
      <style>
        {`
          .kay-login-container {
            max-width: 400px;
            margin: 50px auto;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .kay-login-container h2 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 25px;
            font-weight: 600;
          }
          
          .kay-error-message {
            color: #e74c3c;
            background-color: #fadbd8;
            padding: 10px 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 14px;
            text-align: center;
          }
          
          .kay-login-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .kay-form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          
          .kay-form-group label {
            font-weight: 500;
            color: #34495e;
            font-size: 14px;
          }
          
          .kay-form-group input {
            padding: 12px 15px;
            border: 1px solid #bdc3c7;
            border-radius: 5px;
            font-size: 14px;
            transition: border-color 0.3s ease;
          }
          
          .kay-form-group input:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
          }
          
          .kay-btn {
            padding: 12px;
            border: none;
            border-radius: 5px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          
          .kay-login-btn {
            background-color: #3498db;
            color: white;
            font-size: 16px;
            margin-top: 10px;
          }
          
          .kay-login-btn:hover {
            background-color: #2980b9;
          }
          
          .kay-login-footer {
            margin-top: 25px;
            text-align: center;
            font-size: 14px;
            color: #7f8c8d;
          }
          
          .kay-login-footer a {
            color: #3498db;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          
          .kay-login-footer a:hover {
            color: #2980b9;
            text-decoration: underline;
          }
          
          .kay-login-footer p {
            margin: 8px 0;
          }
          
          @media (max-width: 480px) {
            .kay-login-container {
              margin: 20px;
              padding: 20px;
            }
          }
        `}
      </style>

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
    </>
  );
};

export default KayLogin;