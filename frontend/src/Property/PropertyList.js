import React, { useState } from "react";
import "./Property.css";
import axios from "axios";
import ViewingForm from "./ViewingForm";
import OfferForm from "./OfferForm";

const TYPE = [
  { name: "CONDO", color: "#ef4444" },
  { name: "APARTMENT", color: "#eab308" },
  { name: "HOUSE", color: "#db2777" },
];

const PropertyList = ({
  user,
  properties,
  setShowForm,
  setPropertyToBeUpdated,
  showViewForm,
  setShowViewForm,
  showOfferForm,
  setShowOfferForm,
  setCrud,
}) => {
  const [houseId, setHouseId] = useState("");
  if (properties.length === 0) {
    return <p>No Properties to Display!!</p>;
  }
  return (
    <div className="property-list-container">
      {showViewForm ? (
        <ViewingForm
          user={user}
          setViewForm={setShowViewForm}
          houseId={houseId}
          setHouseId={setHouseId}
        />
      ) : null}
      {showOfferForm ? (
        <OfferForm
          user={user}
          setShowOfferForm={setShowOfferForm}
          houseId={houseId}
          setHouseId={setHouseId}
        />
      ) : null}
      <ul className="property-list">
        {properties.map((property) => (
          <Property
            key={property.id}
            user={user}
            property={property}
            id={property.houseId}
            unitNumber={property.unit}
            streetNumber={property.address.streetNumber}
            streetName={property.address.street}
            city={property.address.city}
            province={property.address.province}
            postalCode={property.address.postalCode}
            description={property.house_description}
            bathrooms={property.numberOfBathrooms}
            bedrooms={property.numberOfBedrooms}
            area={property.area}
            price={property.price}
            type={property.type}
            status={property.status}
            brokerId={property.broker.brokerId}
            fname={property.broker.firstName}
            lname={property.broker.lastName}
            setHouseId={setHouseId}
            setShowForm={setShowForm}
            setShowViewForm={setShowViewForm}
            setShowOfferForm={setShowOfferForm}
            setPropertyToBeUpdated={setPropertyToBeUpdated}
            setCrud={setCrud}
          />
        ))}
      </ul>
    </div>
  );
};

function Property({
  id,
  user,
  property,
  unitNumber,
  streetNumber,
  streetName,
  city,
  province,
  postalCode,
  description,
  bathrooms,
  bedrooms,
  area,
  price,
  type,
  status,
  brokerId,
  fname,
  lname,
  setHouseId,
  setShowForm,
  setShowViewForm,
  setShowOfferForm,
  setPropertyToBeUpdated,
  setCrud,
}) {
  const handleDelete = (propertyId) => {
    if (user.role === "USER" || user.id !== brokerId) {
      alert("Unauthorized to delete properties!");
      return;
    }
    async function deleteProperties() {
      try {
        await axios.delete(
          `http://localhost:8080/api/houses/house-delete/${propertyId}`
        );
        setCrud((crud) => !crud);
        alert("Deleted Property with broker " + fname + " " + lname);
      } catch (error) {
        alert("Cannot Delete Property! " + error);
      }
    }
    deleteProperties();
  };
  const handleUpdate = () => {
    if (user.role === "USER" || user.id !== brokerId) {
      alert("Unauthorized to delete properties!");
      return;
    }
    setPropertyToBeUpdated(property);
    setShowViewForm(false);
    setShowForm(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleRequestViewing = () => {
    if (user.role !== "USER") {
      alert("Unauthorized to request viewings!");
      return;
    }
    setShowForm(false);
    setShowOfferForm(false);
    setShowViewForm(true);
    setHouseId(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleBuyOffer = () => {
    if (user.role !== "USER") {
      alert("Unauthorized to submit offers!");
      return;
    }
    setShowForm(false);
    setShowViewForm(false);
    setShowOfferForm(true);
    setHouseId(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <li className="property">
      <div className="prop-deets">
        <div className="location-amenities">
          <div className="li-location">
            <div className="li-city">
              {city}, {province} {postalCode}
            </div>
            <div className="li-address">
              {unitNumber && `#${unitNumber}, `}
              {streetNumber} {streetName}
            </div>
          </div>
          <div className="amenities">
            <div className="li-bathrooms">
              <p>Bathrooms</p>
              {bathrooms}
            </div>
            <div className="li-bedrooms">
              <p>Bedrooms</p>
              {bedrooms}
            </div>
            <div className="li-area">
              <p>Area(SqFt)</p>
              {area}
            </div>
            <div className="li-price">
              <p>Price(CAD)</p>
              {price}
            </div>
          </div>
        </div>
        <div className="li-broker">
          <strong>{"Broker Name: " + fname + " " + lname}</strong>
        </div>
        <div className="li-description">{description}</div>
      </div>
      <div className="prop-buttons">
        {user.role === "BROKER" ? (
          <>
            <button className="update" onClick={handleUpdate}>
              Update
            </button>
            <button className="delete" onClick={() => handleDelete(id)}>
              Delete
            </button>{" "}
          </>
        ) : null}
        {user.role === "USER" ? (
          <>
            <button className="request-viewing" onClick={handleRequestViewing}>
              Request Viewing
            </button>
            <button className="buy-offer" onClick={handleBuyOffer}>
              Submit Offer
            </button>
          </>
        ) : null}
        <span
          className="status"
          style={{
            backgroundColor: status === "FOR_SALE" ? "#3b82f6" : "#16a34a",
          }}
        >
          {status}
        </span>
        <span
          className="type"
          style={{
            backgroundColor: TYPE.find((typeObj) => typeObj.name === type)
              .color,
          }}
        >
          {type}
        </span>
      </div>
    </li>
  );
}

export default PropertyList;
