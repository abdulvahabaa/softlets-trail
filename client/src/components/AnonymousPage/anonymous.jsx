import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./anonymous.css";

const AnonymousPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/auth");
    }
  }, [navigate]);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Name validation regex (letters and spaces only)
  const nameRegex = /^[A-Za-z\s]+$/;

  // Validate email
  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email is required.");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Validate password
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required.");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Validate name
  const validateName = (name) => {
    if (isSignup) {
      if (!name) {
        setNameError("Name is required.");
        return false;
      } else if (!nameRegex.test(name)) {
        setNameError("Name should contain only letters and spaces.");
        return false;
      } else if (name.length < 2) {
        setNameError("Name must be at least 2 characters long.");
        return false;
      }
      setNameError("");
      return true;
    }
    setNameError("");
    return true;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        validateEmail(value);
        break;
      case "password":
        setPassword(value);
        validatePassword(value);
        break;
      case "name":
        setName(value);
        validateName(value);
        break;
      default:
        break;
    }
  };

  // Validation before form submission
  const validateForm = () => {
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const validName = validateName(name);
    return validEmail && validPassword && validName;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate before submitting

    try {
      const response = await axios.post("http://localhost:9002/auth/login", {
        email,
        password,
      });
      console.log("Login successful", response.data);

      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/auth");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate before submitting

    try {
      const response = await axios.post("http://localhost:9002/auth/signup", {
        name,
        email,
        password,
      });
      console.log("Signup successful", response.data);

      if (response.status === 201) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/"); // Navigate to the root page after successful signup
      }
    } catch (error) {
      console.error("Signup failed", error);
      setError("Signup failed. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setError(""); // Clear any error messages when toggling forms
    setEmailError("");
    setPasswordError("");
    setNameError("");
  };

  return (
    <div className="anonymous-page">
      <section className="branding">
        <div className="logo"></div>
        <h3>Anonymous Page</h3>
        <h3>Discover Seamless Collaboration</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
      <section className="action-items" id="base">
        <h2>Welcome to Solftlets</h2>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
        </p>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          {isSignup && (
            <label className="input-text">
              <span>
                Name <em className="asterisk">*</em>
              </span>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              {nameError && <div className="error">{nameError}</div>}
            </label>
          )}
          <label className="input-text">
            <span>
              Email <em className="asterisk">*</em>
            </span>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
              />
            </div>
            {emailError && <div className="error">{emailError}</div>}
          </label>
          <label className="input-text">
            <span>
              Password <em className="asterisk">*</em>
            </span>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
              />
            </div>
            {passwordError && <div className="error">{passwordError}</div>}
          </label>
          <button type="submit" className="button primary">
            {isSignup ? "Sign Up" : "Login"}
          </button>
          <button type="button" className="button" onClick={toggleForm}>
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </section>
    </div>
  );
};

export default AnonymousPage;
