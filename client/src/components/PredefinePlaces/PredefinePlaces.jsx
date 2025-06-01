import React, { useContext, useEffect, useState } from "react";
import "./PredefinePlaces.css"; // Import the styles
import DataContext from "../../context/DataContext";
import { Link } from "react-router-dom";

const PredefinePlaces = () => {
  const categories = [
    "Beach",
    "Mountain",
    "Adventure",
    "Cultural",
    "Historical",
  ];

  const { destinations, showMoreButton, setCategory, setPages, loading } =
    useContext(DataContext);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCategory(selectedCategory === category ? null : category);
  };

  // Apply local category filter
  useEffect(() => {
    let filteredData = destinations;

    if (selectedCategory) {
      filteredData = destinations.filter(
        (place) =>
          place.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredDestinations(filteredData);
  }, [selectedCategory, destinations]);

  return (
    <div className="predefine-places-container">
      {/* Category Filters */}
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Destination Grid */}
      <div className="predefine-destination-grid">
        {filteredDestinations?.map((place, index) => (
          <div key={index} className="predefine-destination-card">
            <div className="destination-information">
              <h3>{place.name}</h3>
              <p className="country-city">
                {place.city}, {place.country}
              </p>
              <p className="category">{place.category}</p>
              <p className="short-description">{place.shortDescription}</p>
              <Link to={`/explore-more/${place._id}`}>
                <button className="view-more-btn">View More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {showMoreButton && (
        <button
          className={`load-more-btn ${
            loading ? "loaing-circle-animation" : ""
          }`}
          disabled={loading}
          onClick={() => setPages((prev) => prev + 1)}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default PredefinePlaces;
