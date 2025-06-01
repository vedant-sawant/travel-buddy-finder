import React, { useEffect, useState } from "react";
import "./WhyChooseUs.css";
import {
  FaComments,
  FaHeart,
  FaPlaneDeparture,
  FaSearch,
} from "react-icons/fa";

const features = [
  {
    icon: <FaComments />,
    title: "Chat with Travelers",
    description:
      "Connect with other travelers, share experiences, and get recommendations.",
  },
  {
    icon: <FaSearch />,
    title: "Find Your Destination",
    description:
      "Search for the perfect travel destination tailored to your interests.",
  },
  {
    icon: <FaPlaneDeparture />,
    title: "Book Your Trip",
    description:
      "Plan your next adventure with hassle-free booking and great deals.",
  },
  {
    icon: <FaHeart />,
    title: "User Likes & Responses",
    description:
      "See what other travelers love and engage with their experiences.",
  },
];

const WhyChooseUs = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("why-choose-us");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="why-choose-us" className="why-choose-us-section">
      <h2 className="section-title">Why Choose Us?</h2>
      <div className={`features-container ${visible ? "visible" : ""}`}>
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
