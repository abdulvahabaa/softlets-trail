import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./anonymous.css";
import { validateEmail, validatePassword, validateName } from "./validations";

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
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        setEmailError(validateEmail(value));
        break;
      case "password":
        setPassword(value);
        setPasswordError(validatePassword(value));
        break;
      case "name":
        setName(value);
        setNameError(validateName(value));
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const validName = validateName(name);
    setEmailError(validEmail);
    setPasswordError(validPassword);
    setNameError(validName);
    return !validEmail && !validPassword && !validName;
  };

  const handleLogin = async (e) => {
    alert("handle login cliked");
    e.preventDefault();
    // if (!validateForm()) return;

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
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:9002/auth/signup", {
        name,
        email,
        password,
      });
      console.log("Signup successful", response.data);

      if (response.status === 201) {
        setIsSignup(false);
        setPassword("")

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
