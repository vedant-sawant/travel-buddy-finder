import React, { useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>Have any questions? We're here to help!</p>

        <div className="contact-details">
          <div className="contact-info">
            <h3>Our Address</h3>
            <p>
              📍 123 MG Road, Shivajinagar, Pune, Maharashtra, 411005, India
            </p>
          </div>

          <div className="contact-info">
            <h3>Phone</h3>
            <p>📞 +91 9087614352</p>
          </div>

          <div className="contact-info">
            <h3>Email</h3>
            <p>📧 support@travelbuddy.com</p>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send Us a Message</h3>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
