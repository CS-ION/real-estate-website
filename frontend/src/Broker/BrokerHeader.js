import "../App.css";
import "./Broker.css";
import BrokerForm from "./BrokerForm";

const BrokerHeader = ({
  showForm,
  setShowForm,
  brokerToBeUpdated,
  setBrokerToBeUpdated,
  setCrud,
}) => {
  return (
    <div className="broker-listing-header">
      <div className="broker-listing-header-contents">
        <h1 className="broker-listings">BROKER LISTINGS</h1>
        <button
          className="showForm"
          onClick={() => {
            setShowForm((show) => !show);
            setBrokerToBeUpdated(null);
          }}
        >
          {showForm || brokerToBeUpdated ? "CLOSE FORM" : "ADD A BROKER"}
        </button>
      </div>
      <div className="form-container">
        {showForm || brokerToBeUpdated ? (
          <BrokerForm
            setShowForm={setShowForm}
            brokerToBeUpdated={brokerToBeUpdated}
            setBrokerToBeUpdated={setBrokerToBeUpdated}
            setCrud={setCrud}
          />
        ) : null}
      </div>
    </div>
  );
};

export default BrokerHeader;
