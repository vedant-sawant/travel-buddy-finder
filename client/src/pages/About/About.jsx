import React, { useEffect } from "react";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About TravelBuddy</h2>
        <p>
          Welcome to <strong>TravelBuddy</strong>, your ultimate travel
          companion! We believe in making travel accessible, seamless, and
          unforgettable. Whether you're looking for breathtaking landscapes,
          rich cultural experiences, or hidden gems, we've got you covered.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🌍 Discover New Destinations</h3>
            <p>Explore unique places tailored to your travel interests.</p>
          </div>
          <div className="feature-card">
            <h3>🛫 Hassle-Free Booking</h3>
            <p>
              Find the best travel deals and book your next adventure in a few
              clicks.
            </p>
          </div>
          <div className="feature-card">
            <h3>💬 Connect with Travelers</h3>
            <p>
              Join our community, share experiences, and get personalized
              recommendations.
            </p>
          </div>
          {/* <div className="feature-card">
            <h3>⭐ Trusted by Travelers</h3>
            <p>
              Over 10,000+ happy travelers have trusted us for their journeys.
            </p>
          </div> */}
        </div>

        <div className="categories-section">
          <h3>🌟 Explore by Categories</h3>
          <div className="categories-list">
            <div className="category-box">🏖️ Beach</div>
            <div className="category-box">🏔️ Mountain</div>
            <div className="category-box">🎢 Adventure</div>
            <div className="category-box">🎭 Cultural</div>
            <div className="category-box">🏰 Historical</div>
          </div>
        </div>

        <div className="cta-section">
          <h3>Start Your Journey with TravelBuddy!</h3>
          <Link to={"/search-destination"}>
            <button className="cta-button">Explore Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
