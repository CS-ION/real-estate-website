import axios from "axios";
import "../App.css";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  let viewingRequests = [];
  async function getViewingRequests() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/viewing-requests/${user.id}`
      );
      viewingRequests = response.data;
    } catch (error) {
      alert("Error fetching user data", error);
    }
  }
  getViewingRequests();
  return (
    <div className="dashboard-containter">
      <h1>{user.id}</h1>
      <ul className="request-list">
        {viewingRequests.map((viewingRequest) => (
          <ViewReq
            key={viewingRequest.viewingRequestId}
            houseId={viewingRequest.houseId}
            brokerId={viewingRequest.brokerId}
            description={viewingRequest.availability_description}
            availability={viewingRequest.availability}
          />
        ))}
      </ul>
    </div>
  );
};

function ViewReq({ houseId, brokerId, description, availability }) {
  <li className="request">
    {availability}
    {description}
  </li>;
}

export default Dashboard;
