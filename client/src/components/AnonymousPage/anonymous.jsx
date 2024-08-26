import React from "react";
import "./anonymous.css"; 

const AnonymousPage = () => {
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
        <label className="input-text">
          <span>
            Email <em className="asterisk">*</em>
          </span>
          <div>
            <input type="text" placeholder="Place holder text" />
          </div>
          <div className="error">Field error sample text</div>
        </label>
        <label className="input-text">
          <span>
            Password <em className="asterisk">*</em>
          </span>
          <div>
            <input type="text" placeholder="Place holder text" />
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
        <button className="button primary">Login</button>
        <button className="button">Sign up</button>
      </section>
    </div>
  );
};

export default AnonymousPage;
