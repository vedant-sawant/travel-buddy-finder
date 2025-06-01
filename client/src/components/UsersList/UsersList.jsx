import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UsersList.css";

// Haversine function to calculate the distance between two geo points
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert degrees to radians

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  return distance;
}

function UsersList({ userData, usersList, setUserClick, placeName }) {
  // const [toggleUsers, setToggleUsers] = useState(false);
  const [userSelectedGender, setUserSelectedGender] = useState("Both");
  const [userDetails, setUserDetails] = useState([]);
  const [range, setRange] = useState({ min: 0, max: 50 });

  // function handletoggleUserBtn() {
  //   setToggleUsers(!toggleUsers);
  // }

  function handleUserClick(user) {
    setUserClick(user);
    handletoggleUserBtn();
  }

  // Filtering users based on distance and gender
  const filterUsers = (users) => {
    return users.filter((user) => {
      const distance = haversine(
        userData.user_location.lat, // current user latitude
        userData.user_location.lon, // current user longitude
        user.user_location.lat, // target user latitude
        user.user_location.lon // target user longitude
      );

      // Check if user is within the selected range and matches gender filter
      return (
        distance >= range.min &&
        distance <= range.max &&
        (userSelectedGender.toLowerCase() === user.user_gender.toLowerCase() ||
          userSelectedGender.toLowerCase() === "both")
      );
    });
  };

  useEffect(() => {
    async function getUsersDetails(usersList) {
      try {
        const userDetails = [];

        for (let index = 0; index < usersList?.length; index++) {
          const user = usersList[index];
          const response = await axios.get(`${import.meta.env.VITE_BE}/user`, {
            params: user,
          });

          userDetails.push(response.data);
        }

        // Apply filtering logic for distance and gender after fetching user details
        const filteredUserDetails = filterUsers(userDetails);
        setUserDetails(filteredUserDetails);
      } catch (err) {
        console.error({ err });
      }
    }

    getUsersDetails(usersList);
  }, [usersList, userSelectedGender, range]);

  // Handle changes in the distance range (min and max)
  const handleMinChange = (event) => {
    setRange((prevRange) => ({
      ...prevRange,
      min: Math.min(event.target.value, range.max - 1), // Prevent min from being greater than max
    }));
  };

  const handleMaxChange = (event) => {
    setRange((prevRange) => ({
      ...prevRange,
      max: Math.max(event.target.value, range.min + 1), // Prevent max from being less than min
    }));
  };

  return (
    <div className="users-list-container">
      <div className="filter">
        <div className="distance-filter">
          <label htmlFor="min-distance">Distance range filter (in KM)</label>
          <div>
            <input
              type="range"
              id="min-distance"
              min="0"
              max="50"
              value={range.min}
              onChange={handleMinChange}
            />{" "}
            <span>{range.min} min</span>
            <br />
            <input
              type="range"
              id="max-distance"
              min="0"
              max="50"
              value={range.max}
              onChange={handleMaxChange}
            />
            <span>{range.max} max</span>
          </div>
        </div>

        <div className="user-filter">
          <label
            htmlFor="gender-filter"
            style={{ fontSize: "20px", fontWeight: "500px" }}
          >
            Gender filter
          </label>
          <br />
          <select
            value={userSelectedGender}
            onChange={(e) => {
              setUserSelectedGender(e.target.value);
            }}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Both</option>
          </select>
        </div>
      </div>

      <div className="user-container-list">
        <div className="users-list">
          {userDetails.length !== 0 ? (
            userDetails.map((user, index) => {
              return (
                <div
                  key={index}
                  className="user-list-details"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="user-list-profile">
                    <p>{user?.user_name ? user?.user_name[0] : ""}</p>
                  </div>
                  <div className="user-list-name">{`${user?.user_name} (${user?.user_gender})`}</div>
                </div>
              );
            })
          ) : (
            <h3 style={{ color: "orangered", margin: "10px 15px" }}>
              No any traveler to go at these place "{placeName || "NA"}"
            </h3>
          )}
        </div>
        {/* <div className="user-toggle-btn" onClick={handletoggleUserBtn}>
          {toggleUsers ? "☰" : "✖"}
        </div> */}
      </div>
    </div>
  );
}

export default UsersList;
