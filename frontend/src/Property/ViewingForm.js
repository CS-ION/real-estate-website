import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import "./Property.css";

const ViewingForm = ({ user, setViewForm, houseId, setHouseId }) => {
  const [selectedDays, setSelectedDays] = useState("");
  const [description, setDescription] = useState("");

  const descriptionLength = description.length;

  const handleCheckboxChange = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (description === "" || !selectedDays.length) {
      errors.requiredFields = "All fields are mandatory";
    }
    if (description.length > 300) {
      errors.description = "Description must be 300 characters or less";
    }

    if (Object.keys(errors).length > 0) {
      alert("Validation errors: " + Object.values(errors).join("\n"));
      return;
    }

    const messageBody = {
      availabilityDescription: description,
      availability: selectedDays,
    };

    async function sentViewingRequest() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/houses/${houseId}`
        );
        const house = response.data;
        messageBody.availabilityDescription =
          house.address.streetNumber +
          " " +
          house.address.street +
          ", " +
          house.address.city +
          ", " +
          house.address.province +
          " " +
          house.address.postalCode +
          "\n\n" +
          description;

        await axios.post(
          `http://localhost:8080/api/users/request-viewing/${user.id}/${houseId}`,
          messageBody
        );
        alert("Request Sent");
      } catch (error) {
        alert("Error sending request!", error);
      }
    }

    sentViewingRequest();

    setHouseId("");
    setViewForm(false);
  };

  return (
    <form className="viewing-form" onSubmit={handleFormSubmit}>
      <div className="form-contents">
        <div className="name-address">
          <div className="days">
            <label>Select the days you are available:</label>
            <div className="theDays">
              <label>
                <input
                  type="checkbox"
                  checked={selectedDays.includes("Sunday")}
                  onChange={() => handleCheckboxChange("Sunday")}
                />
                Sunday
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={selectedDays.includes("Monday")}
                  onChange={() => handleCheckboxChange("Monday")}
                />
                Monday
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={selectedDays.includes("Tuesday")}
                  onChange={() => handleCheckboxChange("Tuesday")}
                />
                Tuesday
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={selectedDays.includes("Wednesday")}
                  onChange={() => handleCheckboxChange("Wednesday")}
                />
                Wednesday
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={selectedDays.includes("Thursday")}
                  onChange={() => handleCheckboxChange("Thursday")}
                />
                Thursday
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={selectedDays.includes("Friday")}
                  onChange={() => handleCheckboxChange("Friday")}
                />
                Friday
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={selectedDays.includes("Saturday")}
                  onChange={() => handleCheckboxChange("Saturday")}
                />
                Saturday
              </label>
            </div>
          </div>
        </div>

        <div className="description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter detailed description about your availability eg. time of day, etc."
          />
          <span>{300 - descriptionLength}</span>
        </div>
      </div>
      <div className="buttons">
        <button className="submit" type="submit">
          SUBMIT REQUEST
        </button>
        <button
          className="close"
          onClick={() => {
            setViewForm(false);
          }}
        >
          CLOSE FORM
        </button>
      </div>
    </form>
  );
};

export default ViewingForm;
