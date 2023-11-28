import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Property.css";

const PropertyForm = ({
  user,
  setShowForm,
  propertyToBeUpdated,
  setPropertyToBeUpdated,
  setCrud,
}) => {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [description, setDescription] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [price, setPrice] = useState("");
  const [bathrooms, setBathrooms] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);

  useEffect(() => {
    if (type !== "CONDO" && type !== "APARTMENT") {
      setUnitNumber("");
    }
  }, [type]);

  useEffect(() => {
    if (propertyToBeUpdated) {
      setStatus(propertyToBeUpdated.status);
      setType(propertyToBeUpdated.type);
      setUnitNumber(propertyToBeUpdated.unit);
      setStreetNumber(propertyToBeUpdated.address.streetNumber);
      setStreetName(propertyToBeUpdated.address.street);
      setCity(propertyToBeUpdated.address.city);
      setProvince(propertyToBeUpdated.address.province);
      setPostalCode(propertyToBeUpdated.address.postalCode);
      setDescription(propertyToBeUpdated.house_description);
      setSquareFeet(propertyToBeUpdated.area);
      setPrice(propertyToBeUpdated.price);
      setBathrooms(propertyToBeUpdated.numberOfBathrooms);
      setBedrooms(propertyToBeUpdated.numberOfBedrooms);
    }
  }, [propertyToBeUpdated]);

  const descriptionLength = description.length;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isPostalCodeValid = /^[A-Z]\d{1}[A-Z] \d{1}[A-Z]\d{1}$/;
    const isNumber = /^\d+$/;
    const errors = {};

    if (
      status === "" ||
      type === "" ||
      streetNumber === "" ||
      streetName === "" ||
      city === "" ||
      province === "" ||
      postalCode === "" ||
      description === "" ||
      squareFeet === "" ||
      price === ""
    ) {
      errors.requiredFields = "All fields are mandatory";
    }
    if (
      type !== "HOUSE" &&
      (!unitNumber ||
        !isNumber.test(unitNumber) ||
        parseInt(unitNumber, 10) <= 0)
    ) {
      errors.unitNumber =
        "Unit number is required and must be a positive number";
    }
    if (!isNumber.test(streetNumber) || parseInt(price, 10) <= 0) {
      errors.price = "Street Number must be a positive number";
    }
    if (!isPostalCodeValid.test(postalCode)) {
      errors.postalCode = "Postal code must be in the format 'H9H-1K7'";
    }
    if (!isNumber.test(price) || parseInt(price, 10) <= 0) {
      errors.price = "Price must be a positive number";
    }
    if (!isNumber.test(squareFeet) || parseInt(squareFeet, 10) <= 0) {
      errors.squareFeet = "Square feet must be a positive number";
    }
    if (description.length > 300) {
      errors.description = "Description must be 300 characters or less";
    }
    if (Object.keys(errors).length > 0) {
      alert("Validation errors: " + Object.values(errors).join("\n"));
      return;
    }

    const newProperty = {
      status: status,
      type: type,
      unitNumber: unitNumber === "" || unitNumber === null ? null : unitNumber,
      address: {
        streetNumber: streetNumber,
        street: streetName,
        city: city,
        province: province,
        postalCode: postalCode,
      },
      house_description: description,
      area: squareFeet,
      price: price,
      numberOfBathrooms: bathrooms,
      numberOfBedrooms: bedrooms,
    };

    if (propertyToBeUpdated) {
      newProperty.houseId = propertyToBeUpdated.houseId;
      async function updateProperties() {
        try {
          const response = await axios.put(
            "http://localhost:8080/api/houses/house-update/" + user.id,
            newProperty
          );
          setCrud(response.data);
        } catch (error) {
          alert("Cannot Update Property! " + error);
        }
      }
      updateProperties();
      setPropertyToBeUpdated(null);
    } else {
      async function addProperties() {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/houses/add-house/" + user.id,
            newProperty
          );
          setCrud(response.data);
        } catch (error) {
          alert("Cannot Add Property! " + error);
        }
      }
      addProperties();
      alert("Property Added");
    }
    setCrud((crud) => !crud);
    setShowForm(false);
  };

  return (
    <form className="add-property-form" onSubmit={handleFormSubmit}>
      <div className="form-contents">
        <div className="s_a_c">
          <div className="status-type">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Choose Status:</option>
              <option value="FOR_SALE">For Sale</option>
              <option value="FOR_LEASE">To Lease</option>
            </select>

            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Choose Type:</option>
              <option value="CONDO">Condo</option>
              <option value="APARTMENT">Apartment</option>
              <option value="HOUSE">House</option>
            </select>
          </div>

          <div className="location">
            <input
              className="unit-number"
              type="text"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              placeholder="Unit #"
              disabled={type !== "CONDO" && type !== "APARTMENT"}
            />

            <input
              className="street-number"
              type="text"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              placeholder="Street #"
            />

            <input
              className="street-name"
              type="text"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              placeholder="Street Name"
            />
          </div>

          <div className="address">
            <input
              className="city-name"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />

            <select
              className="province-name"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option value="">Province:</option>
              <option value="Ontario">Ontario</option>
              <option value="Quebec">Quebec</option>
              <option value="Nova Scotia">Nova Scotia</option>
              <option value="Manitoba">Manitoba</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Prince Edward Island">Prince Edward Island</option>
              <option value="Saskatchewan">Saskatchewan</option>
              <option value="Alberta">Alberta</option>
              <option value="Newfoundland and Labrador">
                Newfoundland and Labrador
              </option>
              <option value="Northwest Territories">
                Northwest Territories
              </option>
              <option value="Yukon">Yukon</option>
              <option value="Nunavut">Nunavut</option>
            </select>

            <input
              className="postal-code"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal Code"
            />
          </div>
        </div>

        <div className="a_b_b">
          <div className="p_a">
            <div className="area">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price (CAD)"
              />
            </div>

            <div className="area">
              <input
                type="text"
                value={squareFeet}
                onChange={(e) => setSquareFeet(e.target.value)}
                placeholder="Area (sqft)"
              />
            </div>
          </div>

          <div className="b_b">
            <div className="bathrooms">
              <label>Bathrooms</label>
              <button
                className="decrement"
                onClick={(e) => {
                  e.preventDefault();
                  setBathrooms(bathrooms - 1);
                }}
                disabled={bathrooms === 1}
              >
                -
              </button>
              <div className="number">{bathrooms}</div>
              <button
                className="increment"
                onClick={(e) => {
                  e.preventDefault();
                  setBathrooms(bathrooms + 1);
                }}
              >
                +
              </button>
            </div>

            <div className="bedrooms">
              <label>Bedrooms</label>
              <button
                className="decrement"
                onClick={(e) => {
                  e.preventDefault();
                  setBedrooms(bedrooms - 1);
                }}
                disabled={bedrooms === 1}
              >
                -
              </button>
              <div className="number">{bedrooms}</div>
              <button
                className="increment"
                onClick={(e) => {
                  e.preventDefault();
                  setBedrooms(bedrooms + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          />
          <span>{300 - descriptionLength}</span>
        </div>
      </div>
      <button className="submit" type="submit">
        {propertyToBeUpdated ? "Update Property" : "Add Property"}
      </button>
    </form>
  );
};

export default PropertyForm;
