import { Link, Route, Routes } from "react-router-dom";
import Property from "./Property";
import "./App.css"; // Import your CSS file

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="Property">Property</Link>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </nav>
      <Routes>
        <Route path="Property" element={<Property />} />
        {/* Add more routes for other components */}
      </Routes>
    </div>
  );
}

export default App;
