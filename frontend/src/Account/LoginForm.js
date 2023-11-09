import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Account.css";

function decodeJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const payload = JSON.parse(atob(base64));
  return payload;
}

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

    async function addUser(user) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/authenticate-user",
          user
        );
        const token = response.data.token;
        const decodedToken = decodeJwt(token);
        console.log("Decoded Token:", decodedToken);
        setUser(decodedToken);
      } catch (error) {
        alert("Cannot Login!", error);
      }
    }
    addUser(user);
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
