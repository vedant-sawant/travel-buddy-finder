import React, { useEffect, useState } from "react";
import "./PopularDestinations.css";
import goaImage from "../../assets/images/goa.webp";
import jaipurImage from "../../assets/images/jaipur.jpg";
import munnarImage from "../../assets/images/munnar.jfif";
import baliImage from "../../assets/images/bali.jpg";
import santoriniImage from "../../assets/images/santorini.jpg";
import kholaImage from "../../assets/images/khola.png";

const destinations = [
  {
    name: "Goa, India",
    image: goaImage,
    description: "Beaches, nightlife, and Portuguese heritage.",
  },
  {
    name: "Jaipur, India",
    image: jaipurImage,
    description: "The Pink City known for forts, palaces, and vibrant markets.",
  },
  {
    name: "Munnar, India",
    image: munnarImage,
    description: "Tea plantations, waterfalls, and wildlife sanctuaries.",
  },
  {
    name: "Bali, Indonesia",
    image: baliImage,
    description: "Stunning beaches, temples, and lush green landscapes.",
  },
  {
    name: "Santorini, Greece",
    image: santoriniImage,
    description: "White-washed buildings, blue domes, and stunning sunsets.",
  },
  {
    name: "Khola, Beach",
    image: kholaImage,
    description: "A hidden gem in South Goa, offering serene landscapes and unspoiled beauty.",
  },
];

const PopularDestinations = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("popular-destinations");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setVisible(true);
        }
        else{
          setVisible(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="popular-destinations" className="popular-section">
      <h2 className="section-title">Popular Destinations</h2>
      <div className={`destination-grid ${visible ? "animate" : ""}`}>
        {destinations.map((place, index) => (
          <div key={index} className={`destination-card card-${index + 1}`}>
            <img
              src={place.image}
              alt={place.name}
              className="destination-img"
            />
            <div className="destination-info">
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
