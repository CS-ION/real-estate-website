import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    setUser(user);
    navigate("/Property");
  };

  return (
    <form className="login-viewing-form" onSubmit={handleFormSubmit}>
      <div className="form-contents-login">
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
