import { Link, Route, Routes } from "react-router-dom";
import Property from "./Property/Property";
import Broker from "./Broker/Broker";
import Login from "./Account/LoginForm";
import Register from "./Account/RegisterForm";
import "./App.css";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const propertyRoutes =
    user !== null ? <Route path="Property" element={<Property />} /> : null;
  const brokerRoutes =
    user !== null ? <Route path="Broker" element={<Broker />} /> : null;

  return (
    <div className="app-container">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="Property">Property</Link>
          </li>
          <li className="nav-item">
            <Link to="Broker">Broker</Link>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </nav>

      {user === null ? (
        <div className="login-register">
          <Login />
          <Register />
        </div>
      ) : null}

      <Routes>
        {propertyRoutes}
        {brokerRoutes}
        {/* Add more routes for other components */}
      </Routes>
    </div>
  );
}

export default App;
