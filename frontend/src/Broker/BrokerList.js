import React from "react";
import axios from "axios";
import "./Broker.css";

const BrokerList = ({ user, brokers, setCrud }) => {
  if (brokers.length === 0) {
    return <p>No Brokers to Display!!</p>;
  }
  return (
    <div className="broker-list-container">
      <ul className="broker-list">
        {brokers.map((broker) => (
          <Broker
            key={broker.brokerId}
            user={user}
            id={broker.brokerId}
            fname={broker.firstName}
            lname={broker.lastName}
            city={broker.location.city}
            province={broker.location.province}
            email={broker.email}
            phone={broker.phoneNumber}
            description={broker.broker_description}
            setCrud={setCrud}
          />
        ))}
      </ul>
    </div>
  );
};

function Broker({
  id,
  user,
  fname,
  lname,
  city,
  province,
  email,
  phone,
  description,
  setCrud,
}) {
  const handleDelete = (brokerId) => {
    if (user.role !== "ADMIN") {
      alert("Unauthorized to delete properties!");
      return;
    }
    async function deleteBrokers() {
      try {
        await axios.delete(
          `http://localhost:8080/api/brokers/delete-broker/${brokerId}`
        );
        setCrud((crud) => !crud);
      } catch (error) {
        alert("Cannot Delete Broker! " + error);
      }
    }
    deleteBrokers();
    alert("Deleted Broker with ID " + brokerId);
  };

  return (
    <li className="broker">
      <div className="brok-deets">
        <div className="name-address-deets">
          <div className="li-address-name">
            <div className="li-city">
              {city}, {province}
            </div>
            <div className="li-address">
              {fname} {lname}
            </div>
          </div>
          <div className="details">
            <div className="li-email">Email: {email}</div>
            <div className="li-phone">Phone: {phone}</div>
          </div>
        </div>
        <div className="li-description">
          {description ? description : "No Description Provided!"}
        </div>
      </div>
      <div className="brok-buttons">
        {user.role === "ADMIN" ? (
          <button className="delete" onClick={() => handleDelete(id)}>
            Delete
          </button>
        ) : null}
      </div>
    </li>
  );
}

export default BrokerList;
