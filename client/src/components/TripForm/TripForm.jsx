import React, { useContext, useEffect, useState } from "react";
import "./TripForm.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext/UserContext";

function TripForm() {
  const [explorePlace, setExplorePlace] = useState(null);
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [budget, setBudget] = useState("00");
  const [modeOfTransport, setModeOfTransport] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [isSelectHotel, setIsSelectHotel] = useState(true);
  const [bookTrip, setBookTrip] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch place details
  useEffect(() => {
    const fetchPlaceById = async () => {
      if (!id) return;
      try {
        const VITE_BE = import.meta.env.VITE_BE;
        const response = await axios.get(`${VITE_BE}/get/place/id`, {
          params: { id },
        });
        setExplorePlace(response.data || { name: "" });
      } catch (err) {
        console.error("Error fetching place:", err);
      }
    };

    fetchPlaceById();
  }, [id]);

  // Handle trip booking toggle
  const handleBookTripBtn = () => {
    setBookTrip((prev) => !prev);
  };

  // Handle hotel selection change
  const handleChange = (e) => {
    setIsSelectHotel(e.target.value === "true");
  };

  // Authenticate user on component mount
  useEffect(() => {
    const authenticateUser = async (token) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BE}/auth`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          navigate("/signup");
        }
      } catch (err) {
        console.error("Authentication Error:", err);
        alert("An error occurred. You need to sign up first.");
        navigate("/signup");
      }
    };

    const token = localStorage.getItem("travel_buddy_token");

    if (!token) {
      alert("Sign up to book your trip.");
      navigate("/signup");
    } else {
      authenticateUser(token);
    }
  }, [navigate, setUserData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const hotelBookingLink = `https://www.booking.com/searchresults.html?ss=${
        explorePlace?.name || ""
      }&ac_position=0&ac_suggestion_list_length=5&search_selected=true&group_adults=${guests}&no_rooms=2&nflt=price%3DINR-min-${budget}-1&checkin=${checkIn}&checkout=${checkOut}`;

      const tripFormData = {
        user_email: userData?.user_email || "",
        user_name: userData?.user_name || "",
        destination: explorePlace?.name || "",
        hotel_name: isSelectHotel ? hotelBookingLink : "",
        no_of_guests: guests,
        check_in_date: checkIn,
        check_out_date: checkOut,
        number_of_nights: nights,
        budget: budget,
        mode_of_transport: modeOfTransport,
      };

      // console.log("Trip Data:", tripFormData);

      const response = await axios.post(
        `${import.meta.env.VITE_BE}/trip`,
        tripFormData
      );

      alert(response.data.message);
      setBookTrip(false);
      setLoading(false);

      if (isSelectHotel) {
        window.open(hotelBookingLink, "_blank");
      }
    } catch (error) {
      setLoading(false);
      alert("Error while creating trip");
      console.error("Trip booking error:", error);
    }
  };

  return (
    <>
      <div className="button-container">
        <button className="responsive-button" onClick={handleBookTripBtn}>
          Book Your Trip
        </button>
      </div>

      <div
        className={`trip-form-container ${
          bookTrip ? "" : "trip-form-container-disable"
        }`}
      >
        <h2 className="form-title">Trip Booking</h2>

        {loading ? (
          <p className="loading-text">Booking your trip, please wait...</p>
        ) : (
          <form onSubmit={handleSubmit} className="trip-form">
            <div className="form-group">
              <label htmlFor="destination">Destination:</label>
              <input
                type="text"
                id="destination"
                value={explorePlace?.name ? explorePlace?.name : ""}
                readOnly
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Stay in a hotel?</label>
              <select onChange={handleChange} className="input-field" required>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests:</label>
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                min="1"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nights">Number of Nights:</label>
              <input
                type="number"
                id="nights"
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                min="1"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget">Your Budget:</label>
              <input
                type="number"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                min="0"
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="check-in">Check-in Date:</label>
              <input
                type="date"
                id="check-in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="input-field"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="check-out">Check-out Date:</label>
              <input
                type="date"
                id="check-out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="input-field"
                required
                min={ checkIn ? new Date(checkIn).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="transport-type">Mode Of Transport:</label>
              <input
                type="text"
                id="transport-type"
                value={modeOfTransport}
                onChange={(e) => setModeOfTransport(e.target.value)}
                className="input-field"
                placeholder="Ex: Cab, vehicle, etc."
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Booking..." : "Book Trip"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default TripForm;
