import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Broker.css";

const BrokerForm = ({
  setShowForm,
  brokerToBeUpdated,
  setBrokerToBeUpdated,
  setCrud,
}) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (brokerToBeUpdated) {
      setFname(brokerToBeUpdated.firstName);
      setLname(brokerToBeUpdated.lastName);
      setEmail(brokerToBeUpdated.email);
      setPhone(brokerToBeUpdated.phoneNumber);
      setCity(brokerToBeUpdated.location.city);
      setProvince(brokerToBeUpdated.location.province);
      setDescription(brokerToBeUpdated.broker_description);
    }
  }, [brokerToBeUpdated]);

  const descriptionLength = description.length;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isPhoneValid = /^\+1 \(\d{3}\)-\d{3}-\d{4}$/;

    const errors = {};

    if (
      fname === "" ||
      lname === "" ||
      email === "" ||
      phone === "" ||
      city === "" ||
      province === "" ||
      description === ""
    ) {
      errors.requiredFields = "All fields are mandatory";
    }
    if (!isEmailValid.test(email)) {
      errors.email = "Enter valid email address";
    }
    if (!isPhoneValid.test(phone)) {
      errors.phone = "Enter valid phone number (DDD-DDD-DDDD)";
    }
    if (description.length > 300) {
      errors.description = "Description must be 300 characters or less";
    }
    if (Object.keys(errors).length > 0) {
      alert("Validation errors: " + Object.values(errors).join("\n"));
      return;
    }

    const newBroker = {
      firstName: fname,
      lastName: lname,
      email: email,
      phoneNumber: phone,
      location: {
        city: city,
        province: province,
      },
      broker_description: description,
    };

    if (brokerToBeUpdated) {
      newBroker.brokerId = brokerToBeUpdated.brokerId;
      async function updateBrokers() {
        try {
          const response = await axios.put(
            "http://localhost:8080/api/brokers/broker-update/",
            newBroker
          );
          setCrud(response.data);
        } catch (error) {
          alert("Cannot Update Broker! " + error);
        }
      }
      updateBrokers();
      setBrokerToBeUpdated(null);
    } else {
      async function addBrokers() {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/brokers/add-broker",
            newBroker
          );
          setCrud(response.data);
        } catch (error) {
          alert("Cannot Add Broker! " + error);
        }
      }
      addBrokers();
      alert("Broker Added");
    }
    setCrud((crud) => !crud);
    setShowForm(false);
  };

  return (
    <form className="add-broker-form" onSubmit={handleFormSubmit}>
      <div className="form-contents">
        <div className="name-address">
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
            />

            <select
              className="province-name"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
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
              <option value="Northwest Territories">
                Northwest Territories
              </option>
              <option value="Yukon">Yukon</option>
              <option value="Nunavut">Nunavut</option>
            </select>
          </div>
        </div>

        <div className="email-phone">
          <input
            className="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />

          <input
            className="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone: +1 (III)-III-IIII"
          />
        </div>

        <div className="description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          />
          <span>{300 - descriptionLength}</span>
        </div>
      </div>
      <button className="submit" type="submit">
        {brokerToBeUpdated ? "Update Broker" : "Add Broker"}
      </button>
    </form>
  );
};

export default BrokerForm;
