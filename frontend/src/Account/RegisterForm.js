import React, { useState } from "react";
import "./Account.css";

const RegisterForm = () => {
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const descriptionLength = description.length;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Integrate with Email API to send brokerEmail
  };

  return (
    <form className="login-viewing-form" onSubmit={handleFormSubmit}>
      <div className="form-contents">
        <select
          className="province-name"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ width: 200 }}
        >
          <option value="">User Type:</option>
          <option value="BUYER">Buyer/Renter</option>
          <option value="BROKER">Broker</option>
        </select>

        <div className="email-pass">
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

        <div className="name">
          <input
            className="fname"
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="First Name"
          />

          <input
            className="lname"
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            placeholder="Last Name"
          />
        </div>

        <div className="address">
          <input
            className="city-name"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            disabled={type !== "BROKER"}
          />

          <select
            className="province-name"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            disabled={type !== "BROKER"}
          >
            <option value="">Province:</option>
            <option value="Ontario">Ontario</option>
            <option value="Apartment">Quebec</option>
            <option value="Nova Scotia">Nova Scotia</option>
            <option value="Manitoba">Manitoba</option>
            <option value="British Columbia">British Columbia</option>
            <option value="Prince Edward Island">Prince Edward Island</option>
            <option value="Saskatchewan">Saskatchewan</option>
            <option value="Alberta">Alberta</option>
            <option value="Newfoundland and Labrador">
              Newfoundland and Labrador
            </option>
            <option value="Northwest Territories">Northwest Territories</option>
            <option value="Yukon">Yukon</option>
            <option value="Nunavut">Nunavut</option>
          </select>
        </div>

        <input
          className="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone: +1 (III)-III-IIII"
          disabled={type !== "BROKER"}
        />

        <div className="description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            disabled={type !== "BROKER"}
          />
          <span>{300 - descriptionLength}</span>
        </div>
      </div>
      <div className="buttons">
        <button className="submit" type="submit">
          REGISTER ACCOUNT
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
