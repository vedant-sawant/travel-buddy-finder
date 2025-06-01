import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BE;

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState([]);
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [placeData, setPlaceData] = useState({
        name: "",
        country: "",
        city: "",
        category: "",
        shortDescription: "",
        bestSeasonToVisit: "",
        averageTemperatureRange: "",
        rainfallClimateConsiderations: "",
        topAttractionsNearby: [],
        activitiesExperiences: [],
        famousDishes: [],
        safetyTravelTips: "",
        estimatedDailyBudget: "",
        activityPricing: "",
        detailedDescription: "",
        latitude: "",
        longitude: "",
        byRoad: "",
        byAir: "",
        byTrain: "",
        byWater: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("travel_buddy_token");
        if (!token) {
            alert("You need to sign in first.");
            navigate("/signin");
            return;
        }
        if (activeTab === "users") {
            axios.get("/allusers", {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token in the Authorization header
                }
            })
                .then((res) => setUsers(res.data.data))
                .catch((err) => {
                    console.error(err);
                    alert("You are not authenticated.");
                    navigate("/signin");
                });
        } else if (activeTab === "trips") {
            axios.get("/trips")
                .then((res) => setTrips(res.data))
                .catch((err) => {
                    console.error(err);
                    alert("Error fetching trips.");
                });
        }
    }, [activeTab]);

    const handlePlaceChange = (e) => {
        const { name, value } = e.target;
        if (["topAttractionsNearby", "activitiesExperiences", "famousDishes"].includes(name)) {
            setPlaceData({ ...placeData, [name]: value.split(",") });
        } else {
            setPlaceData({ ...placeData, [name]: value });
        }
    };

    const handlePlaceSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const formattedPlaceData = {
            ...placeData,
            latitudeLongitude: {
                latitude: parseFloat(placeData.latitude),
                longitude: parseFloat(placeData.longitude)
            },
            howToTravelThere: {
                byRoad: placeData.byRoad,
                byAir: placeData.byAir,
                byTrain: placeData.byTrain,
                byWater: placeData.byWater
            }
        };

        axios.post("/add/place", formattedPlaceData)
            .then((res) => {
                alert(res.data.message);
                setPlaceData({
                    name: "",
                    country: "",
                    city: "",
                    category: "",
                    shortDescription: "",
                    bestSeasonToVisit: "",
                    averageTemperatureRange: "",
                    rainfallClimateConsiderations: "",
                    topAttractionsNearby: [],
                    activitiesExperiences: [],
                    famousDishes: [],
                    safetyTravelTips: "",
                    estimatedDailyBudget: "",
                    activityPricing: "",
                    detailedDescription: "",
                    latitude: "",
                    longitude: "",
                    byRoad: "",
                    byAir: "",
                    byTrain: "",
                    byWater: ""
                });
            })
            .catch((err) => {
                console.error(err)
                alert("Error adding place. Please try again.");
                alert(err.response.data.error);
            }).finally(() => setLoading(false));
    };

    return (
        <div className="admin-panel">
            <div className="tabs">
                <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>All Users</button>
                <button className={activeTab === "trips" ? "active" : ""} onClick={() => setActiveTab("trips")}>All Trips</button>
                <button className={activeTab === "addPlace" ? "active" : ""} onClick={() => setActiveTab("addPlace")}>Add New Place</button>
            </div>

            <div className="tab-content">
                {activeTab === "users" && (
                    <div className="users-tab">
                        <h2>
                            All Users
                            <span style={{ marginLeft: "30px", color: "blue", fontSize: "18px", fontWeight: "bold" }}>
                                (Count: {users.length})
                            </span>
                        </h2>
                        {users.length === 0 ? <p>No users found.</p> : (
                            <ul>
                                {users.map((user) => (
                                    <li style={{ cursor: "pointer" }} key={user._id}>
                                        <span style={{ fontWeight: "bold" }}>User Name:</span> {user.user_name}
                                        <br />
                                        <span style={{ fontWeight: "bold" }}>User Email:</span> {user.user_email}

                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {activeTab === "trips" && (
                    <div className="trips-tab">
                        <h2>All Trips</h2>
                        {trips.length === 0 ? <p>No trips found.</p> : (
                            <ul>
                                {trips.map((trip) => (
                                    <li style={{ cursor: "pointer" }} key={trip._id}>
                                        User: {trip.user_name || "Unknown"} | Place: {trip.destination || "Unknown"} | Dates: {new Date(trip.check_in_date).toLocaleDateString()} - {new Date(trip.check_out_date).toLocaleDateString()}
                                        {new Date(trip.check_out_date) < new Date() ? <span style={{ color: "red", fontWeight: "bold", float: "right" }}> Completed</span> : <span style={{ color: "green", fontWeight: "bold", float: "right" }}> Ongoing</span>}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {activeTab === "addPlace" && (
                    <div className="add-place-tab">
                        <h2>Add New Place</h2>
                        <form onSubmit={handlePlaceSubmit} className="place-form">
                            <input type="text" name="name" placeholder="Name" value={placeData.name} onChange={handlePlaceChange} required />
                            <input type="text" name="country" placeholder="Country" value={placeData.country} onChange={handlePlaceChange} required />
                            <input type="text" name="city" placeholder="City" value={placeData.city} onChange={handlePlaceChange} required />
                            <select
                                name="category"
                                value={placeData.category}
                                onChange={handlePlaceChange}
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    border: "2px solid #3498db",
                                    backgroundColor: "#f8f9fa",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#333",
                                    cursor: "pointer",
                                    transition: "0.3s",
                                    outline: "none"
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#2ecc71"}
                                onBlur={(e) => e.target.style.borderColor = "#3498db"}
                            >
                                <option value="">Select Category</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Beach">Beach</option>
                                <option value="Historical">Historical</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Mountain">Mountain</option>
                            </select>


                            <textarea style={{ maxWidth: "100%" }} name="shortDescription" placeholder="Short Description" value={placeData.shortDescription} onChange={handlePlaceChange} required></textarea>
                            <input type="text" name="bestSeasonToVisit" placeholder="Best Season to Visit" value={placeData.bestSeasonToVisit} onChange={handlePlaceChange} required />
                            <input type="text" name="averageTemperatureRange" placeholder="Average Temperature Range" value={placeData.averageTemperatureRange} onChange={handlePlaceChange} required />
                            <input type="text" name="rainfallClimateConsiderations" placeholder="Rainfall/Climate" value={placeData.rainfallClimateConsiderations} onChange={handlePlaceChange} required />
                            <textarea style={{ maxWidth: "100%" }} name="detailedDescription" placeholder="Detailed Description" value={placeData.detailedDescription} onChange={handlePlaceChange} required></textarea>
                            <input type="text" name="topAttractionsNearby" placeholder="Top Attractions (comma-separated)" value={placeData.topAttractionsNearby.join(",")} onChange={handlePlaceChange} required />
                            <input type="text" name="activitiesExperiences" placeholder="Activities (comma-separated)" value={placeData.activitiesExperiences.join(",")} onChange={handlePlaceChange} required />
                            <input type="text" name="famousDishes" placeholder="Famous Dishes (comma-separated)" value={placeData.famousDishes.join(",")} onChange={handlePlaceChange} required />
                            <input type="number" step="any" name="latitude" placeholder="Latitude" value={placeData.latitude} onChange={handlePlaceChange} required />
                            <input type="number" step="any" name="longitude" placeholder="Longitude" value={placeData.longitude} onChange={handlePlaceChange} required />
                            <input type="text" name="byRoad" placeholder="By Road" value={placeData.byRoad} onChange={handlePlaceChange} />
                            <input type="text" name="byAir" placeholder="By Air" value={placeData.byAir} onChange={handlePlaceChange} />
                            <input type="text" name="byTrain" placeholder="By Train" value={placeData.byTrain} onChange={handlePlaceChange} />
                            <input type="text" name="byWater" placeholder="By Water" value={placeData.byWater} onChange={handlePlaceChange} />
                            <button type="submit" style={{backgroundColor:`${loading ? "slategrey" :""}`,cursor: `${loading ? "not-allowed" :""}` }}  ><strong>{loading ? "Place is adding..." : "Add Place"}</strong> </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
