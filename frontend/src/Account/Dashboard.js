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
      if (user.role === "USER") {
        try {
          const response_requests = await axios.get(
            `http://localhost:8080/api/users/viewing-requests/${user.id}`
          );
          setViewingRequests(response_requests.data);
        } catch (error) {
          console.log("Error fetching user data", error);
        }
        try {
          const response_offers = await axios.get(
            `http://localhost:8080/api/users/all-buy-offers/${user.id}`
          );
          setOffers(response_offers.data);
        } catch (error) {
          console.log("Error fetching user data", error);
        }
      } else if (user.role === "BROKER") {
        try {
          const response_requests = await axios.get(
            `http://localhost:8080/api/brokers/viewing-requests/${user.id}`
          );
          setViewingRequests(response_requests.data);
        } catch (error) {
          console.log("Error fetching broker data", error);
        }
        try {
          const response_offers = await axios.get(
            `http://localhost:8080/api/brokers/buy-offers/${user.id}`
          );
          setOffers(response_offers.data);
        } catch (error) {
          console.log("Error fetching user data", error);
        }
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
              id={viewingRequest.viewingRequestId}
              user={user}
              brokerId={viewingRequest.brokerId}
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
              id={offer.buy_offer_id}
              user={user}
              houseId={offer.houseId}
              description={offer.offerDescription}
              status={offer.status}
              price={offer.offer_price}
              setUpdates={setUpdates}
            />
          ))
        ) : (
          <strong>No Offers Found!</strong>
        )}
      </ul>
    </div>
  );
};

function ViewReq({
  id,
  user,
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
    async function deleteRequest() {
      try {
        await axios.delete(
          `http://localhost:8080/api/brokers/request-viewing/${brokerId}/${id}`
        );
      } catch (error) {
        alert("Could not update status of the offer!");
      }
    }
    deleteRequest();
    alert("REQUEST DELETED!");
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
  id,
  houseId,
  description,
  status,
  price,
  setUpdates,
}) {
  async function deleteProperty() {
    try {
      await axios.delete(
        `http://localhost:8080/api/houses/house-delete/${houseId}`
      );
    } catch (error) {
      console.log("Cannot Delete Property! " + error);
    }
  }
  async function updateOffer(status, isSold) {
    try {
      await axios.put(
        `http://localhost:8080/api/brokers/buy-offers/update-status/${id}?status=` +
          status
      );
      if (isSold) {
        deleteProperty();
      }
    } catch (error) {
      alert("Could not update status of the offer! " + error);
    }
  }
  const handleAccept = () => {
    if (user.role !== "BROKER") {
      alert("Unauthorized to accept requests!");
      return;
    }
    updateOffer("accepted", true);
    alert("OFFER ACCEPTED!");
    setUpdates((updates) => !updates);
  };
  const handleReject = () => {
    if (user.role !== "BROKER") {
      alert("Unauthorized to delete requests!");
      return;
    }
    updateOffer("rejected", false);
    alert("OFFER REJECTED!");
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
        {user.role === "BROKER" && status.toLowerCase() === "pending" ? (
          <>
            <button className="update" onClick={handleAccept}>
              Accept
            </button>
            <button className="delete" onClick={handleReject}>
              Reject
            </button>{" "}
          </>
        ) : null}
        {status.toLowerCase() !== "pending" ? (
          <span
            className="status"
            style={{
              backgroundColor:
                status.toLowerCase() === "rejected" ? "#FF0000" : "#008000",
            }}
          >
            {status}
          </span>
        ) : (
          <span
            className="status"
            style={{
              backgroundColor: "#0000FF",
            }}
          >
            {status}
          </span>
        )}
      </div>
    </li>
  );
}

export default Dashboard;
