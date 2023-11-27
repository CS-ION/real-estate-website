import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const [updates, setUpdates] = useState(false);
  const [viewingRequests, setViewingRequests] = useState(null);
  const [offers, setOffers] = useState(null);

  useEffect(() => {
    async function getViewingRequests() {
      try {
        const response_requests = await axios.get(
          `http://localhost:8080/api/users/viewing-requests/${user.id}`
        );
        setViewingRequests(response_requests.data);

        const response_offers = await axios.get(
          `http://localhost:8080/api/users/all-buy-offers/${user.id}`
        );
        setOffers(response_offers.data);
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    }
    getViewingRequests();
  }, [updates, user.id]);

  return (
    <div className="dashboard-containter">
      <ul className="request-list">
        <h3 className="requests-listings">PENDING VIEWING REQUESTS</h3>
        {viewingRequests ? (
          viewingRequests.map((viewingRequest) => (
            <ViewReq
              key={viewingRequest.viewingRequestId}
              user={user}
              houseId={viewingRequest.houseId}
              house={null}
              brokerId={viewingRequest.brokerId}
              broker={null}
              description={viewingRequest.availabilityDescription}
              availability={viewingRequest.availability}
              setUpdates={setUpdates}
            />
          ))
        ) : (
          <strong>No Viewing Requests Found!</strong>
        )}
      </ul>
      <ul className="request-list">
        <h3 className="requests-listings">PROPERTY OFFER LIST</h3>
        {offers ? (
          offers.map((offer) => (
            <OfferReq
              key={offer.buy_offer_id}
              user={user}
              houseId={offer.houseId}
              brokerId={offer.brokerId}
              description={offer.offerDescription}
              status={offer.status}
              price={offer.offer_price}
              setUpdates={setUpdates}
            />
          ))
        ) : (
          <strong>No Viewing Requests Found!</strong>
        )}
      </ul>
    </div>
  );
};

function ViewReq({
  user,
  houseId,
  brokerId,
  description,
  availability,
  setUpdates,
}) {
  const handleDelete = () => {
    if (user.role !== "BROKER") {
      alert("Unauthorized to delete requests!");
      return;
    }
    setUpdates((updates) => !updates);
  };

  return (
    <li className="request">
      <div className="deets">
        <div className="li-available">
          Days Available: {availability.join(", ")}
        </div>
        <div className="li-description">
          {description ? description : "No description provided!"}
        </div>
      </div>
      {user.role === "BROKER" ? (
        <div className="brok-buttons">
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : null}
    </li>
  );
}

function OfferReq({
  user,
  houseId,
  house,
  brokerId,
  broker,
  description,
  status,
  price,
  setUpdates,
}) {
  async function deleteProperties() {
    try {
      await axios.delete(
        `http://localhost:8080/api/houses/house-delete/${houseId}`
      );
    } catch (error) {
      alert("Cannot Delete Property! " + error);
    }
  }
  const handleAccept = () => {
    if (user.role !== "BROKER") {
      alert("Unauthorized to accept requests!");
      return;
    }
    deleteProperties();
    setUpdates((updates) => !updates);
  };
  const handleDelete = () => {
    if (user.role !== "BROKER") {
      alert("Unauthorized to delete requests!");
      return;
    }
    deleteProperties();
    setUpdates((updates) => !updates);
  };

  return (
    <li className="request">
      <div className="deets">
        <div className="li-available">Offer Price (CAD): {price}</div>
        <div className="li-description">
          {description ? description : "No description provided!"}
        </div>
      </div>
      <div className="brok-buttons">
        {user.role === "BROKER" && status === "Pending" ? (
          <>
            <button className="update" onClick={handleAccept}>
              Accept
            </button>
            <button className="delete" onClick={handleDelete}>
              Reject
            </button>{" "}
          </>
        ) : null}
        <span
          className="status"
          style={{
            backgroundColor: status === "Pending" ? "#3b82f6" : "#16a34a",
          }}
        >
          {status}
        </span>
      </div>
    </li>
  );
}

export default Dashboard;
