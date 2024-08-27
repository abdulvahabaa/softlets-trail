import React, { useEffect, useState } from "react";
import "./authpage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    // Decode token to extract user ID
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.id;

    // Fetch user data
    axios
      .get(`http://localhost:9002/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Correct token usage
        },
      })
      .then((response) => {
        setUserName(response.data.name); // Adjust according to your response structure
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="Anonymous-page">
      <section className="branding">
        <div className="logo"></div>
        <h2>Authenticated Page</h2>
        <h3>
          Welcome to Softlets MR/Ms{" "}
          <span style={{ color: "blue" }}>{userName}</span>
        </h3>
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <button type="button" className="button primary" onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
