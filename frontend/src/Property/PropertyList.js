import React, { useState } from "react";
import "./Property.css";
import axios from "axios";
import ViewingForm from "./ViewingForm";

const TYPE = [
  { name: "CONDO", color: "#ef4444" },
  { name: "APARTMENT", color: "#eab308" },
  { name: "HOUSE", color: "#db2777" },
];

const PropertyList = ({
  properties,
  setShowForm,
  setPropertyToBeUpdated,
  showViewForm,
  setShowViewForm,
  setProperties,
  setCrud,
}) => {
  const [brokerEmail, setBrokerEmail] = useState("");
  if (properties.length === 0) {
    return <p>No Properties to Display!!</p>;
  }
  return (
    <div className="property-list-container">
      {showViewForm ? (
        <ViewingForm
          setViewForm={setShowViewForm}
          brokerEmail={brokerEmail}
          setBrokerEmail={setBrokerEmail}
        />
      ) : null}
      <ul className="property-list">
        {properties.map((property) => (
          <Property
            key={property.id}
            id={property.id}
            unitNumber={property.unitNumber}
            streetNumber={property.address.streetNumber}
            streetName={property.address.streetName}
            city={property.address.city}
            province={property.address.province}
            postalCode={property.address.postalCode}
            description={property.description}
            bathrooms={property.bathrooms}
            bedrooms={property.bedrooms}
            area={property.area}
            price={property.price}
            type={property.type}
            status={property.status}
            email={property.broker.email}
            setBrokerEmail={setBrokerEmail}
            setShowForm={setShowForm}
            setShowViewForm={setShowViewForm}
            setPropertyToBeUpdated={setPropertyToBeUpdated}
            setProperties={setProperties}
            setCrud={setCrud}
          />
        ))}
      </ul>
    </div>
  );
};

function Property({
  id,
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
  email,
  setBrokerEmail,
  setShowForm,
  setShowViewForm,
  setPropertyToBeUpdated,
  setProperties,
  setCrud,
}) {
  const handleDelete = (propertyId) => {
    async function deleteProperties() {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/houses/house-delete/${propertyId}`
        );
        setProperties(response.data);
      } catch (error) {
        alert("Cannot Update Property! " + error);
      }
    }
    deleteProperties();
    alert("Deleted Property with ID " + propertyId);
    setCrud((crud) => !crud);
  };
  const handleUpdate = () => {
    setPropertyToBeUpdated({
      id: id,
      status: status,
      type: type,
      unitNumber: unitNumber,
      address: {
        streetNumber: streetNumber,
        streetName: streetName,
        city: city,
        province: province,
        postalCode: postalCode,
      },
      description: description,
      area: area,
      price: price,
      bathrooms: bathrooms,
      bedrooms: bedrooms,
    });
    setShowViewForm(false);
    setShowForm(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleRequestViewing = () => {
    setShowForm(false);
    setShowViewForm(true);
    setBrokerEmail(email);
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
              <p>Price(CAD)</p>$ {price}
            </div>
          </div>
        </div>
        <div className="li-description">{description}</div>
      </div>
      <div className="prop-buttons">
        <button className="update" onClick={handleUpdate}>
          Update
        </button>
        <button className="delete" onClick={() => handleDelete(id)}>
          Delete
        </button>
        <button className="request-viewing" onClick={handleRequestViewing}>
          Request Viewing
        </button>
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
