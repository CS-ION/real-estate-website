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
  setShowOfferForm,
  setCrud,
}) => {
  return (
    <div className="property-listing-header">
      <div className="property-listing-header-contents">
        <h1 className="property-listings">PROPERTY LISTINGS</h1>
        {user.role === "BROKER" ? (
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
                setShowOfferForm(false);
              }
              setPropertyToBeUpdated(null);
            }}
          >
            {showForm || propertyToBeUpdated ? "CLOSE FORM" : "ADD A PROPERTY"}
          </button>
        ) : null}
      </div>
      <div className="form-container">
        {showForm || propertyToBeUpdated ? (
          <PropertyForm
            user={user}
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
