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

const RegisterForm = ({ setUser }) => {
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

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isPhoneValid = /^\+1 \(\d{3}\)-\d{3}-\d{4}$/;
    const errors = {};

    if (type === "BROKER") {
      if (
        fname === "" ||
        lname === "" ||
        email === "" ||
        phone === "" ||
        city === "" ||
        province === "" ||
        description === "" ||
        password === ""
      ) {
        errors.requiredFields = "All fields are mandatory";
      }
      if (!isEmailValid.test(email)) {
        errors.email = "Enter valid email address";
      }
      if (!isPhoneValid.test(phone)) {
        errors.phone = "Enter valid phone number +1 (DDD)-DDD-DDDD";
      }
      if (description.length > 300) {
        errors.description = "Description must be 300 characters or less";
      }
      if (password.length <= 6) {
        errors.password = "Password must be greater than 6 characters";
      }
    } else if (type === "BUYER") {
      if (fname === "" || lname === "" || email === "" || password === "") {
        errors.requiredFields = "All fields are mandatory";
      }
      if (!isEmailValid.test(email)) {
        errors.email = "Enter valid email address";
      }
      if (password.length <= 6) {
        errors.password = "Password must be greater than 6 characters";
      }
    } else {
      errors.type = "User Type is required";
    }

    if (Object.keys(errors).length > 0) {
      alert("Validation errors: " + Object.values(errors).join("\n"));
      return;
    }

    const userObject = {};

    if (type === "BUYER") {
      userObject.email = email;
      userObject.password = password;
      userObject.first_name = fname;
      userObject.last_name = lname;

      async function addUser(userObject) {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/register-user",
            userObject
          );
          const token = response.data.token;
          const decodedToken = decodeJwt(token);
          console.log("Decoded Token:", decodedToken);
          setUser(decodedToken);
        } catch (error) {
          alert("Cannot register user", error);
        }
      }

      addUser(userObject);
    } else if (type === "BROKER") {
      userObject.first_name = fname;
      userObject.last_name = lname;
      userObject.email = email;
      userObject.password = password;
      userObject.phoneNumber = phone;
      userObject.location = {
        city: city,
        province: province,
      };
      userObject.broker_description = description;

      async function addBroker(userObject) {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/register-broker",
            userObject
          );
          const token = response.data.token;
          const decodedToken = decodeJwt(token);
          console.log("Decoded Token:", decodedToken);
          setUser(decodedToken);
        } catch (error) {
          alert("Cannot register user", error);
        }
      }

      addBroker(userObject);
    }

    navigate("/Property");
  };

  return (
    <form className="create-acc-form" onSubmit={handleFormSubmit}>
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
            placeholder="Password (>6 chars)"
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
