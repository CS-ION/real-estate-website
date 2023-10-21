import "../App.css";
import "./Broker.css";
import { useState } from "react";
import BrokerHeader from "./BrokerHeader";
import BrokerList from "./BrokerList";

const Broker = () => {
  const [brokers, setBrokers] = useState([
    {
      id: "B28299",
      fname: "Bola",
      lname: "Ghattas",
      city: "Montreal",
      province: "Quebec",
      phone: "514-456-7890",
      email: "bola@gmail.com",
      description:
        "I am a very enamoured real estate dealer with various properties",
    },
    {
      id: "B28269",
      fname: "Dhingra",
      lname: "Dingu",
      city: "Montreal",
      province: "Quebec",
      phone: "514-496-7888",
      email: "dhingra@gmail.com",
      description:
        "I am a very enamoured real estate dealer with various properties",
    },
    {
      id: "B26299",
      fname: "Ivan",
      lname: "Ghattas",
      city: "Montreal",
      province: "Quebec",
      phone: "514-667-7890",
      email: "ivan@gmail.com",
      description:
        "I am a very enamoured real estate dealer with various properties",
    },
  ]);
  const [brokerToBeUpdated, setBrokerToBeUpdated] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const addBroker = (newBroker) => {
    setBrokers([...brokers, newBroker]);
  };
  return (
    <div className="mainframe">
      <BrokerHeader
        showForm={showForm}
        setShowForm={setShowForm}
        addBroker={addBroker}
        brokerToBeUpdated={brokerToBeUpdated}
        setBrokerToBeUpdated={setBrokerToBeUpdated}
      />
      <BrokerList
        brokers={brokers}
        setShowForm={setShowForm}
        setBrokerToBeUpdated={setBrokerToBeUpdated}
      />
    </div>
  );
};

export default Broker;
