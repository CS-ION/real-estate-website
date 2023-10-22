import React, { useState } from "react";
import "../App.css";
import "./Property.css";

const ViewingForm = ({ setViewForm }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
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
    // Integrate with API

    const errors = {};

    if (
      fname === "" ||
      lname === "" ||
      description === "" ||
      !selectedDays.length
    ) {
      errors.requiredFields = "All fields are mandatory";
    }
    if (description.length > 300) {
      errors.description = "Description must be 300 characters or less";
    }
    if (Object.keys(errors).length > 0) {
      alert("Validation errors: " + Object.values(errors).join("\n"));
      return;
    }

    setViewForm(false);
    alert("Message Sent");
  };

  return (
    <form className="viewing-form" onSubmit={handleFormSubmit}>
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
