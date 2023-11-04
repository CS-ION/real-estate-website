const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://uuaqwmovxshultoayowt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1YXF3bW92eHNodWx0b2F5b3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MjAyMzYsImV4cCI6MjAxNDA5NjIzNn0.BW11ygWZBweisR7OJ9XwUTQVE9HjG5n7F0LM7c2kP2w";
const supabase = createClient(supabaseUrl, supabaseKey);

//GET PROPERTIES API CALL
async function getAllProperties() {
  const { data, error } = await supabase.from("Properties").select("*");

  if (!error) {
    console.log(data);
  } else {
    console.error(error);
  }
}

//DELETE PROPERTY API CALL
async function deleteProperty(PROPERTY_ID) {
  const { data, error } = await supabase
    .from("Properties")
    .delete()
    .eq("houseId", PROPERTY_ID);

  if (!error) {
    console.log(data);
  } else {
    console.error(error);
  }
}

//UPDATE PROPERTY API CALL
async function updateProperty(PROPERTY_ID) {
  const { data, error } = await supabase
    .from("Properties")
    .update({
      area: 600,
      numberOfBathrooms: 2,
      numberOfBedrooms: 2,
      description: "Very Nice house as well",
      price: 640000,
    })
    .eq("houseId", PROPERTY_ID);

  if (!error) {
    console.log(data);
  } else {
    console.error(error);
  }
}

//ADD PROPERTY API CALL
async function addProperty() {
  const { data: newFact, error } = await supabase
    .from("Properties")
    .insert([
      {
        type: "HOUSE",
        status: "FOR_SALE",
        area: 200,
        address: {
          city: "Pointe-Claire",
          province: "Quebec",
          postalCode: "H9R 1K7",
          streetName: "Avenue Viking",
          streetNumber: 152,
        },
        numberOfBathrooms: 3,
        numberOfBedrooms: 4,
        description: "Very Nice house",
        price: 340000,
        broker: {
          email: "bohn.doe@gmail.com",
        },
      },
    ])
    .select("*");

  if (!error) {
    console.log(newFact);
  } else {
    console.error(error);
  }
}

module.exports = supabase;
