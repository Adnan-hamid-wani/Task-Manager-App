import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase Auth
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate hook
import "../styles/Login.css";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockClockRoundedIcon from "@mui/icons-material/LockClockRounded";

const getErrorMessage = (code) => {
  const errorMessages = {
    "auth/invalid-email": "Invalid email address. Please check and try again.",
    "auth/user-not-found": "No account found with this email. Sign up first.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use":
      "This email is already registered. Log in instead.",
    "auth/weak-password": "Password should be at least 6 characters long.",
    "auth/network-request-failed":
      "Network error. Please check your internet connection.",
    "auth/invalid-credential": "Invalid email or password . Please try again.",
  };

  // Log unhandled errors during development for debugging

  return errorMessages[code] || "Something went wrong. Please try again.";
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate instead of history

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(getErrorMessage(err.code)); // Map error code
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <EmailRoundedIcon className="email__icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <div className="input-container">
            <LockClockRoundedIcon className="password__icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
