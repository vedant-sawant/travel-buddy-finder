import React, { useState, useContext } from "react";
import "./Navbar.css";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa"; // Import icons for the menu
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext/UserContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { userData, userLoading } = useContext(UserContext);
  console.log(userData);

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>TravelBuddy</h1>
      </div>

      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(!menuOpen)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/search-destination" onClick={() => setMenuOpen(!menuOpen)}>
            Destinations
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(!menuOpen)}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(!menuOpen)}>
            Contact
          </Link>
        </li>
        <li className="register">
          <Link
            to={`${userData ? "/profile" : "/signup"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {userLoading
              ? "loading..."
              : `${userData ? "Profile" : "Register Now"}  `}
          </Link>
        </li>
      </ul>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar;
