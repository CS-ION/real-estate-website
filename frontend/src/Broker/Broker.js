import "../App.css";
import "./Broker.css";
import { useState, useEffect } from "react";
import axios from "axios";
import BrokerHeader from "./BrokerHeader";
import BrokerList from "./BrokerList";

const Broker = () => {
  const [brokers, setBrokers] = useState([]);
  const [brokerToBeUpdated, setBrokerToBeUpdated] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [crud, setCrud] = useState(false);

  useEffect(() => {
    async function getBrokers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/brokers/all-brokers"
        );
        setBrokers(response.data);
      } catch (error) {
        alert("Cannot Load Data! " + error);
      }
    }
    getBrokers();
  }, [crud]);

  return (
    <div className="mainframe">
      <BrokerHeader
        showForm={showForm}
        setShowForm={setShowForm}
        brokerToBeUpdated={brokerToBeUpdated}
        setBrokerToBeUpdated={setBrokerToBeUpdated}
        setCrud={setCrud}
      />
      <BrokerList
        brokers={brokers}
        setShowForm={setShowForm}
        setBrokerToBeUpdated={setBrokerToBeUpdated}
        setCrud={setCrud}
      />
    </div>
  );
};

export default Broker;
