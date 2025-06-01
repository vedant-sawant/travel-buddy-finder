import React from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/*  Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search-destination">Destinations</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/signup">Register Now</Link>
            </li>
          </ul>
        </div>

        {/*  Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            <FaMapMarkerAlt /> 123 MG Road, Shivajinagar, Pune, Maharashtra,
            411005, India
          </p>
          <p>
            <FaPhoneAlt /> +91 9087614352
          </p>
          <p>
            <FaEnvelope /> support@travel.com
          </p>
        </div>

        {/*  Newsletter Subscription */}
        <div className="footer-section newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest travel deals and tips directly in your inbox.</p>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/*  Social Media Links */}
      <div className="social-media">
        <Link to="#">
          <FaFacebook />
        </Link>
        <Link to="#">
          <FaInstagram />
        </Link>
        <Link to="#">
          <FaTwitter />
        </Link>
        <Link to="#">
          <FaYoutube />
        </Link>
      </div>

      {/*  Copyright Section */}
      <div className="copyright">
        <p>© 2025 Travel Buddy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
