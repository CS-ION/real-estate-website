import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Property from "./Property/Property";
import Broker from "./Broker/Broker";
import Login from "./Account/LoginForm";
import Register from "./Account/RegisterForm";
import Dashboard from "./Account/Dashboard";
import Mortgage from "./Mortgage/MortgageCalculator";

function App() {
  const [user, setUser] = useState(null);
  const dashboardRoutes =
    user !== null ? (
      <Route path="Dashboard" element={<Dashboard user={user} />} />
    ) : null;
  const propertyRoutes =
    user !== null ? (
      <Route path="Property" element={<Property user={user} />} />
    ) : null;
  const brokerRoutes =
    user !== null ? (
      <Route path="Broker" element={<Broker user={user} />} />
    ) : null;
  const mortgageRoutes =
    user !== null ? <Route path="Mortgage" element={<Mortgage />} /> : null;

  return (
    <div className="app-container">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="Dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="Property">Property</Link>
          </li>
          <li className="nav-item">
            <Link to="Broker">Broker</Link>
          </li>
          <li className="nav-item">
            <Link to="Mortgage">Mortgage Calculator</Link>
          </li>
          <li className="nav-item">
            <span
              onClick={() =>
                user ? setUser(null) : alert("Please Login First")
              }
            >
              Log Out
            </span>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </nav>

      {user === null ? (
        <div className="login-register">
          <Login setUser={setUser} />
          <Register setUser={setUser} />
        </div>
      ) : null}

      <Routes>
        {propertyRoutes}
        {brokerRoutes}
        {dashboardRoutes}
        {mortgageRoutes}
      </Routes>
    </div>
  );
}

export default App;
