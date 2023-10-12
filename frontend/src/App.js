import "./App.css";
import { useState } from "react";
import PropertyHeader from "./PropertyHeader";
import PropertyList from "./PropertyList";

function App() {
  const [properties, setProperties] = useState([
    {
      id: "A28299",
      status: "To Lease",
      unitNumber: 34,
      streetNumber: 152,
      streetName: "Av Viking",
      city: "Pointe-Claire",
      province: "Quebec",
      postalCode: "H9R-1K7",
      description: "",
      bathrooms: 2,
      bedrooms: 2,
      area: 567,
      price: 890000,
      type: "Condo",
    },
    {
      id: "A28296",
      status: "For Sale",
      unitNumber: 34,
      streetNumber: 152,
      streetName: "Av Viking",
      city: "Saint-Laurent",
      province: "Newfoundland and Labrador",
      postalCode: "H9R-1K7",
      description:
        "Spacious 5 bedroom 2.5 bath residence in great neighborhood. Ideal for a growing family, located close to schools, public transit, parks and recreation. Fantastic main floor layout comprised of; a formal vestibule entrance, powder room, living room, dining room, kitchen with dinette and laundry room that gives direct access to the garage and backyard. Incredible landscaped greenspace and backyard with mature trees and deck! Don't hesitate, a West Island gem to be discovered.",
      bathrooms: 2,
      bedrooms: 2,
      area: 456,
      price: 372828,
      type: "Apartment",
    },
    {
      id: "A28259",
      status: "To Lease",
      unitNumber: null,
      streetNumber: 152,
      streetName: "Boulevard Maisonneuve",
      city: "Pointe-Claire",
      province: "Alberta",
      postalCode: "H9R-1K7",
      description:
        "Spacious 5 bedroom 2.5 bath residence in great neighborhood. Ideal for a growing family, located close to schools, public transit, parks and recreation. Fantastic main floor layout comprised of; a formal vestibule entrance, powder room, living room, dining room, kitchen with dinette and laundry room that gives direct access to the garage and backyard. Incredible landscaped greenspace and backyard with mature trees and deck! Don't hesitate, a West Island gem to be discovered.",
      bathrooms: 2,
      bedrooms: 2,
      area: 456,
      price: 202929,
      type: "House",
    },
  ]);
  const [propertyToBeUpdated, setPropertyToBeUpdated] = useState(null);
  const [showForm, setShowForm] = useState(false);
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
      />
      <PropertyList
        properties={properties}
        setShowForm={setShowForm}
        setPropertyToBeUpdated={setPropertyToBeUpdated}
      />
    </div>
  );
}

export default App;
