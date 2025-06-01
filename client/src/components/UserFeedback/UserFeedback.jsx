import React, { useContext, useState, useEffect } from "react";
import "./UserFeedback.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext/UserContext";

function UserFeedback() {
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error handling
  const [explorePlace, setExplorePlace] = useState(null);

  const { id } = useParams();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchPlaceById = async () => {
      try {
        const VITE_BE = import.meta.env.VITE_BE;
        const response = await axios.get(`${VITE_BE}/get/place/id`, {
          params: { id },
        });
        setExplorePlace(response.data);
      } catch (err) {
        console.error("Error fetching place:", err);
      }
    };
    fetchPlaceById();
  }, [id]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // Fetch feedbacks from backend
  useEffect(() => {
    const getFeedbacks = async () => {
      if (!explorePlace?.name) return; // Ensure the place exists before fetching

      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BE}/feedbacks`
        );

        const placeName = explorePlace?.name;

        const allFeedBacks = response.data;
        const prevFeedbacks = allFeedBacks.filter(
          (item) => item.destination.toLowerCase() === placeName.toLowerCase()
        );

        setFeedbacks(prevFeedbacks);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch feedbacks.");
      }
    };

    getFeedbacks();
  }, [explorePlace?.name]);

  async function sendFeedbacks(feedbackData) {
    try {
      await axios.post(`${import.meta.env.VITE_BE}/feedback`, feedbackData);
    } catch (error) {
      console.error(error);
      setError("Failed to submit feedback.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedbackData = {
      feedback,
      user_email: userData?.user_email || "Not Available",
      destination: explorePlace?.name || "Not Available",
    };

    if (feedback.trim()) {
      setFeedbacks([feedbackData, ...feedbacks]);
      sendFeedbacks(feedbackData);
      setFeedback("");
    }
  };

  return (
    <div className="user-feedback-container">
      <div className="user-feedback-input-section">
        <h2>Share Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="feedback-input"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here..."
            rows="5"
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div className="user-feedback">
        <h2>User Feedbacks</h2>
        {loading && <p>Loading feedbacks...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="feedback-list">
          {feedbacks.map((item, index) => (
            <div className="feedback-item" key={index}>
              <span className="user-email">
                <strong>User Email :</strong> {item.user_email}
              </span>
              <p className="feedback-content">{item.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserFeedback;
