import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ExploreMore.css";
import UserContext from "../../context/UserContext/UserContext";
import TripForm from "../../components/TripForm/TripForm";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import UserFeedback from "../../components/UserFeedback/UserFeedback";

function ExploreMore() {
  const { id } = useParams(); // Get the ID from the URL
  const [place, setPlace] = useState(null);
  const [relatedPlaces, setRelatedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [distanceLoading, setDistanceLoading] = useState(true);
  const [loadingRelatedPlaces, setLoadingRelatedPlaces] = useState(true);
  const { userData } = useContext(UserContext);
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [distanceData, setDistanceData] = useState({
    distance: null,
    duration: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [place]);

  useEffect(() => {
    const fetchPlaceById = async () => {
      try {
        const VITE_BE = import.meta.env.VITE_BE;
        const response = await axios.get(`${VITE_BE}/get/place/id`, {
          params: { id },
        });
        setPlace(response.data);
        console.log("Place:", response.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching place:", err);
        setLoading(false);
      }
    };

    fetchPlaceById();
  }, [id]);

  useEffect(() => {
    if (place) {
      const fetchRelatedPlaces = async () => {
        try {
          const VITE_BE = import.meta.env.VITE_BE;
          const response = await axios.get(`${VITE_BE}/get/places/category`, {
            params: { category: place.category },
          });
          setRelatedPlaces(response.data);
        } catch (err) {
          console.error("Error fetching related places:", err);
        } finally {
          setLoadingRelatedPlaces(false);
        }
      };

      fetchRelatedPlaces();
    }
  }, [place]);

  function getUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }

  useEffect(() => {
    getUserPosition();
  }, []);

  async function getDistanceAndTime() {
    setDistanceLoading(true);
    if (!place || !position.lat || !position.lon) return; // Ensure valid data

    try {
      const API_KEY = "BE-gG-y_dzlmCoNWLMkT41KOuBO-kt6xWU-J3YdO7xo";
      const response = await axios.get(
        `https://router.hereapi.com/v8/routes?transportMode=car&origin=${position.lat},${position.lon}&destination=${place?.latitudeLongitude?.latitude},${place?.latitudeLongitude?.longitude}&return=summary&apiKey=${API_KEY}`
      );

      const data = response?.data;
      if (data?.routes && data?.routes?.length > 0) {
        const distance = data.routes[0].sections[0].summary.length;
        const duration = data.routes[0].sections[0].summary.duration;

        setDistanceData({ distance, duration });
      }
    } catch (err) {
      console.error("Error fetching distance and time:", err);
    } finally {
      setDistanceLoading(false);
    }
  }

  useEffect(() => {
    getDistanceAndTime();
  }, [place, position]);

  const formatDistance = (distance) => {
    if (!distance) return "No way to reach by car.";
    return distance >= 1000
      ? `${Math.floor(distance / 1000)} km ${Math.round(distance % 1000)} m`
      : `${distance} m`;
  };

  const formatDuration = (duration) => {
    if (!duration) return "No way to reach by car.";
    return duration >= 3600
      ? `${Math.floor(duration / 3600)} hrs ${Math.round(
          (duration % 3600) / 60
        )} min`
      : `${Math.round(duration / 60)} min`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!place) {
    return <p>Place not found.</p>;
  }

  return (
    <div className="explore-more-container">
      <div className="place-details">
        <h1 className="place-title">{place.name}</h1>
        <p className="place-location">
          {place.city}, {place.country}
        </p>
        <div className="place-description">
          <p>{place.shortDescription}</p>
          <p>{place.detailedDescription}</p>
        </div>

        <div className="place-category">
          <span>{place.category}</span>
        </div>

        <div className="place-info">
          <div className="info-item">
            <strong>Distance 🗺️ : </strong>{" "}
            {distanceLoading
              ? "Loading..."
              : formatDistance(distanceData.distance)}
          </div>

          <div className="info-item">
            <strong>Time Needed ⏳ : </strong>{" "}
            {distanceLoading
              ? "Loading..."
              : formatDuration(distanceData.duration)}
          </div>

          <div className="info-item">
            <strong>Best Season to Visit 🍂 : </strong> {place.bestSeasonToVisit}
          </div>
          <div className="info-item">
            <strong>Temperature Range 🌡️ : </strong> {place.averageTemperatureRange}
          </div>
          <div className="info-item">
            <strong>Rainfall Considerations 🌧️ : </strong>{" "}
            {place.rainfallClimateConsiderations}
          </div>
          <div className="info-item">
            <strong>Top Attractions Nearby 🌟 : </strong>
            <ul>
              {place?.topAttractionsNearby?.map((attraction, index) => (
                <li  key={index}>{attraction}</li>
              ))}
            </ul>
          </div>
          <div className="info-item">
            <strong>Activities To Experience 🎯 : </strong>
            <ul>
              {place?.activitiesExperiences?.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
          <div className="info-item">
            <strong>Famous Dishes 🍽️ : </strong>
            <ul>
              {place?.famousDishes?.map((dish, index) => (
                <li key={index}>{dish}</li>
              ))}
            </ul>
          </div>
          <div className="info-item">
            <strong>How To Travel There 🚗 : </strong>
            
            <ul >
              <li><strong>By Road 🛣️ : </strong>{place.howToTravelThere.byRoad || "Not available"}</li>
              <li><strong>By Train 🚆 : </strong>{place.howToTravelThere.byTrain || "Not available"}</li>
              <li><strong>By Water 🚢 : </strong>{place.howToTravelThere.byWater || "Not available"}</li>
              <li><strong>By Air ✈️ : </strong>{place.howToTravelThere.byAir || "Not available"}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="chat-with-other-traveler-btn">
        <Link to={"chat"}>
          <button> Chat With Other Travelers </button>
        </Link>
      </div>

      <ErrorBoundary>
        <TripForm />
      </ErrorBoundary>

      <div className="related-places">
        <h3>Related Places:</h3>
        {loadingRelatedPlaces ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : relatedPlaces.length > 0 ? (
          <div className="related-places-list">
            {relatedPlaces.map(
              (relatedPlace) =>
                relatedPlace._id !== place._id && (
                  <div key={relatedPlace._id} className="related-place-card">
                    <h4>{relatedPlace.name}</h4>
                    <h5>{relatedPlace.category}</h5>
                    <p>
                      {relatedPlace.city}, {relatedPlace.country}
                    </p>
                    <p>{relatedPlace.shortDescription}</p>
                    <Link
                      to={`/explore-more/${relatedPlace._id}`}
                      className="view-details"
                    >
                      View Details
                    </Link>
                  </div>
                )
            )}
          </div>
        ) : (
          <p>No related places found.</p>
        )}
      </div>

      <UserFeedback />
    </div>
  );
}

export default ExploreMore;
