import React from "react";
import "./Broker.css";

const BrokerList = ({ brokers, setShowForm, setBrokerToBeUpdated }) => {
  if (brokers.length === 0) {
    return <p>No Brokers to Display!!</p>;
  }
  return (
    <div className="broker-list-container">
      <ul className="broker-list">
        {brokers.map((broker) => (
          <Broker
            key={broker.id}
            id={broker.id}
            fname={broker.fname}
            lname={broker.lname}
            city={broker.city}
            province={broker.province}
            email={broker.email}
            phone={broker.phone}
            description={broker.description}
            setShowForm={setShowForm}
            setBrokerToBeUpdated={setBrokerToBeUpdated}
          />
        ))}
      </ul>
    </div>
  );
};

function Broker({
  id,
  fname,
  lname,
  city,
  province,
  email,
  phone,
  description,
  setShowForm,
  setBrokerToBeUpdated,
}) {
  const handleDelete = () => {
    alert("Deleted Broker with ID " + id);
    /* WILL IMPLEMENT WHEN INTEGRATED WITH BACKEND
    // Send a delete request to the backend
    fetch(`/api/properties/${propertyId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Property successfully deleted, update the UI
          // You can remove the property from the local state or re-fetch the updated property list.
        } else {
          // Handle errors, e.g., show an error message to the user
        }
      })
      .catch((error) => {
        // Handle network or other errors
      });*/
  };
  const handleUpdate = () => {
    setBrokerToBeUpdated({
      id: id,
      fname: fname,
      lname: lname,
      city: city,
      province: province,
      email: email,
      phone: phone,
      description: description,
    });
    console.log(
      JSON.stringify(
        {
          id: id,
          fname: fname,
          lname: lname,
          city: city,
          province: province,
          email: email,
          phone: phone,
          description: description,
        },
        null,
        2
      )
    );
    setShowForm(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        <div className="li-description">{description}</div>
      </div>
      <div className="brok-buttons">
        <button className="update" onClick={handleUpdate}>
          Update
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default BrokerList;
