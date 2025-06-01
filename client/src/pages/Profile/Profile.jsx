import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { FaUserTie } from "react-icons/fa";
import UserContext from "../../context/UserContext/UserContext"; // Import UserContext
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { userData, setUserData } = useContext(UserContext); // Get user data
  // console.log(userData);
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!userData) {
    navigate("/");

  }
  function handlelogOutClick() {
    localStorage.clear();
    alert("log out");
    setUserData(null);
    navigate("/");
  }

  async function getTripHistory(email) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE}/trip/email`,
        { params: { email } }
      );
      const tripHistory = response.data;
      setTripData(tripHistory);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getTripHistory(userData?.user_email);
  }, [userData]);

  async function handleTripRemoveClick(id) {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_BE}/trip/delete`,
        {
          params: { id },
        }
      );
      getTripHistory(userData?.user_email);
      alert(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Picture */}
        <div className="profile-picture">
          <FaUserTie className="default-profile-icon" />
        </div>

        {/* User Info */}
        <h2 className="profile-name">{userData?.user_name || "User"}</h2>
        <p className="profile-email">{userData?.user_email || "No email"}</p>

        <div className="profile-info">
          <div className="info-item">
            <span>📍 City:</span> {userData?.user_city || "Not provided"}
          </div>
          <div className="info-item">
            <span>🌎 State:</span> {userData?.user_state || "Not provided"}
          </div>
          <div className="info-item">
            <span>👤 Gender:</span> {userData?.user_gender || "Not provided"}
          </div>
          <div className="info-item">
            <span>🔢 Aadhaar No:</span> {userData?.user_adhaar_no || "******"}
          </div>
        </div>

        {/* Preferences (If available) */}
        {userData?.user_preferances?.length > 0 && (
          <div className="preferences-section">
            <h3>Preferences</h3>
            <ul className="preferences-list">
              {userData.user_preferances.map((pref, index) => (
                <li key={index}>{pref}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Location Coordinates */}
        {userData?.user_location && (
          <div className="location-section">
            <h3>Location</h3>
            <p>Latitude: {userData.user_location.lat}</p>
            <p>Longitude: {userData.user_location.lon}</p>
          </div>
        )}

        {/* Edit Profile Button */}


        {userData.role === "admin" ? <button className="log-out-btn" style={{marginRight:"30px"}} onClick={() => navigate("/admin-dashboard")}>
          Go to Admin Panel
        </button> : null}


        <button className="log-out-btn" onClick={handlelogOutClick}>
          Log Out
        </button>
      </div>

      <div className="trip-history">
        <h2>Trip History</h2>

        {tripData.length ? (
          tripData?.map((trip, index) => {
            return (
              <div key={index}>
                <p>
                  <strong>Destination Name : </strong> {trip.destination}
                </p>
                <p>
                  <strong>Hotel Name : </strong>{" "}
                  <a href={trip.hotel_name}>
                    {" "}
                    {trip.hotel_name
                      ? "View Hotel Details"
                      : "No Hotel Details"}
                  </a>
                </p>
                <p>
                  <strong>Check In Date : </strong>
                  {trip.check_in_date}
                </p>
                <p>
                  <strong>Check Out Date : </strong>
                  {trip.check_out_date}
                </p>
                <span className="trip-remove-btn">
                  <button
                    disabled={loading}
                    style={{ cursor: `${loading ? "not-allowed" : "pointer"}` }}
                    onClick={() => handleTripRemoveClick(trip._id)}
                  >
                    Remove
                  </button>
                </span>
              </div>
            );
          })
        ) : (
          <p>No previouse data was found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
