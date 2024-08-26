import React from "react";
import "./authpage.css"; 

const AuthPage = () => {
  return (
    <div className="authpage-page">
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
            Field Name <em className="asterisk">*</em>
          </span>
          <div>
            <input type="text" placeholder="Place holder text" />
          </div>
          <div className="error">Field error sample text</div>
        </label>
        <label className="input-text">
          <span>
            Field Name <em className="asterisk">*</em>
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
        <button className="button primary">Button text</button>
        <button className="button">Button text</button>
      </section>
    </div>
  );
};

export default AuthPage;
