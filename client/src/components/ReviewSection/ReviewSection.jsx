import React, { useEffect, useState } from "react";
import "./ReviewSection.css";
import { FaUser } from "react-icons/fa";

const testimonials = [
  {
    name: "Amit Sharma",
    image: <FaUser />,
    rating: 5,
    review:
      "Absolutely fantastic experience! The best trip planning service I have ever used. Highly recommend!",
  },
  {
    name: "Sarah Johnson",
    image: <FaUser />,
    rating: 4,
    review:
      "The entire process was smooth and easy. Customer support was top-notch!",
  },
  {
    name: "Rahul Verma",
    image: <FaUser />,
    rating: 5,
    review:
      "Great deals, hassle-free booking, and unforgettable experiences. Would definitely book again!",
  },
  {
    name: "Lisa Brown",
    image: <FaUser />,
    rating: 4,
    review:
      "Loved the personalized itineraries. Made our vacation stress-free!",
  },
  {
    name: "Michael Lee",
    image: <FaUser />,
    rating: 3,
    review:
      "Fantastic service with great recommendations. Made our trip memorable!",
  },
];

const ReviewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="testimonials-section">
      <h2 className="section-title">What Our Customers Say</h2>
      <div className="testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial-card ${
              index === activeIndex ? "active" : ""
            }`}
          >
            <div className="testimonial-front">
              {/* <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-img"
              /> */}
              <div
                style={{ height: "140px", fontSize: "90px", color: "#272626" }}
              >
                {" "}
                {testimonial.image}{" "}
              </div>
              <h3>{testimonial.name}</h3>
              <div className="stars">
                {"★".repeat(testimonial.rating)}
                {"☆".repeat(5 - testimonial.rating)}
              </div>
            </div>
            <div className="testimonial-back">
              <p>{testimonial.review}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
