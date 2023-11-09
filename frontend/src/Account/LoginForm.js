import React, { useState } from "react";
import "./Account.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Integrate with Email API to send brokerEmail
  };

  return (
    <form className="login-viewing-form" onSubmit={handleFormSubmit}>
      <div className="form-contents">
        <input
          className="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="buttons">
        <button className="submit" type="submit">
          LOGIN
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
