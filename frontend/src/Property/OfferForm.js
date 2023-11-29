import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import "./Property.css";

const OfferForm = ({ user, setShowOfferForm, houseId, setHouseId }) => {
  const [buyPrice, setBuyPrice] = useState("");
  const [description, setDescription] = useState("");

  const descriptionLength = description.length;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isNumber = /^\d+$/;
    const errors = {};

    if (description === "" || buyPrice === "") {
      errors.requiredFields = "All fields are mandatory";
    }
    if (description.length > 300) {
      errors.description = "Description must be 300 characters or less";
    }
    if (!isNumber.test(buyPrice) || parseInt(buyPrice, 10) <= 0) {
      errors.price = "Price must be a positive number";
    }
    if (Object.keys(errors).length > 0) {
      alert("Validation errors: " + Object.values(errors).join("\n"));
      return;
    }

    const messageBody = {
      offerDescription: description,
      offer_price: Number(buyPrice),
    };

    async function sentBuyOffer() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/houses/${houseId}`
        );
        const house = response.data;
        messageBody.offerDescription =
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
          `http://localhost:8080/api/users/buy-offer/${user.id}/${houseId}`,
          messageBody
        );
        alert("Request Sent");
      } catch (error) {
        alert("Error sending request!", error);
      }
    }

    sentBuyOffer();

    setHouseId("");
    setShowOfferForm(false);
  };

  return (
    <form className="viewing-form" onSubmit={handleFormSubmit}>
      <div className="form-contents">
        <input
          type="text"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          placeholder="Buy Offer (CAD)"
        />
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
          SUBMIT OFFER
        </button>
        <button
          className="close"
          onClick={() => {
            setShowOfferForm(false);
          }}
        >
          CLOSE FORM
        </button>
      </div>
    </form>
  );
};

export default OfferForm;
