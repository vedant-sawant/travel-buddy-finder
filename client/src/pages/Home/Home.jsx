import React, { useEffect } from "react";
import "./Home.css";
import bg_image from "../../assets/images/bg_image.jpg";
import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";
import ReviewSection from "../../components/ReviewSection/ReviewSection";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="home-container">
        <div className="hero-section">
          <img src={bg_image} alt="bg_image" />
          <div className="hero-section-description">
            <h2>Experience the Beauty of the World.</h2>
            <h4>
              Travel beyond the ordinary, explore hidden gems, and immerse
              yourself in cultures that inspire, rejuvenate, and leave a lasting
              impression on your soul.
            </h4>
            <div className="search-section">
              <input
                onClick={() => navigate("/search-destination")}
                className="destination-search-bar"
                type="text"
                placeholder="Find your buddy..."
              />
              <span className="search-icon">
                <FaSearch style={{ color: "#004cff" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <PopularDestinations />
      <ReviewSection />
      <WhyChooseUs />
    </div>
  );
}

export default Home;
