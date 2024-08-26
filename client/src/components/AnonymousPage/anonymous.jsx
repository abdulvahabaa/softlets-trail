import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./anonymous.css";

const AnonymousPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      navigate("/auth");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9002/auth/login", {
        email,
        password,
      });
      console.log("Login successful", response.data);

      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/auth"); // Navigate to the Auth page after successful login
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password");
    }
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
        <h2>Heading 2</h2>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua."
        </p>
        <form onSubmit={handleLogin}>
          <label className="input-text">
            <span>
              Email <em className="asterisk">*</em>
            </span>
            <div>
              <input
                type="text"
                placeholder="Place holder text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="error">Field error sample text</div>
          </label>
          <label className="input-text">
            <span>
              Password <em className="asterisk">*</em>
            </span>
            <div>
              <input
                type="password"
                placeholder="Place holder text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="error">Field error sample text</div>
          </label>
          <label className="checkbox">
            <div>
              <input type="checkbox" />
              <i></i> <span>Checkbox text value</span>
            </div>
            <div className="error">Field error sample text</div>
          </label>
          <button type="submit" className="button primary">
            Login
          </button>
          <button type="button" className="button">
            Sign up
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </section>
    </div>
  );
};

export default AnonymousPage;
