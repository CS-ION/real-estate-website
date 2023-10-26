import "../App.css";
import "./Property.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PropertyHeader from "./PropertyHeader";
import PropertyList from "./PropertyList";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [propertyToBeUpdated, setPropertyToBeUpdated] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);
  useEffect(() => {
    async function getProperties() {
      try {
        const response = await axios.get(
          "https://curious-cat-bdf32c.netlify.app/api/houses/all-houses"
        );
        setProperties(response.data);
      } catch (error) {
        alert("Cannot Load Data! " + error);
      }
    }
    getProperties();
  }, []);
  const addProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
  };
  return (
    <div className="mainframe">
      <PropertyHeader
        showForm={showForm}
        setShowForm={setShowForm}
        addProperty={addProperty}
        propertyToBeUpdated={propertyToBeUpdated}
        setPropertyToBeUpdated={setPropertyToBeUpdated}
        setShowViewForm={setShowViewForm}
      />
      <PropertyList
        properties={properties}
        setShowForm={setShowForm}
        setPropertyToBeUpdated={setPropertyToBeUpdated}
        showViewForm={showViewForm}
        setShowViewForm={setShowViewForm}
      />
    </div>
  );
};

export default Property;
