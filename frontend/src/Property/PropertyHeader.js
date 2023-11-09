import "../App.css";
import "./Property.css";
import PropertyForm from "./PropertyForm";

const PropertyHeader = ({
  user,
  showForm,
  setShowForm,
  propertyToBeUpdated,
  setPropertyToBeUpdated,
  setShowViewForm,
  setCrud,
}) => {
  return (
    <div className="property-listing-header">
      <div className="property-listing-header-contents">
        <h1 className="property-listings">PROPERTY LISTINGS</h1>
        <button
          className="showForm"
          onClick={() => {
            if (user.role === "USER") {
              alert("Unauthorized to add properties!");
              return;
            }
            setShowForm((show) => !show);
            if (!showForm) {
              setShowViewForm(false);
            }
            setPropertyToBeUpdated(null);
          }}
        >
          {showForm || propertyToBeUpdated ? "CLOSE FORM" : "ADD A PROPERTY"}
        </button>
      </div>
      <div className="form-container">
        {showForm || propertyToBeUpdated ? (
          <PropertyForm
            setShowForm={setShowForm}
            propertyToBeUpdated={propertyToBeUpdated}
            setPropertyToBeUpdated={setPropertyToBeUpdated}
            setCrud={setCrud}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PropertyHeader;
