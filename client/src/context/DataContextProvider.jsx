import axios from "axios";
import DataContext from "./DataContext";
import { useState, useEffect } from "react";

function DataContextProvider({ children }) {
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset destinations when the search query changes
  useEffect(() => {
    setPages(1); // Reset to the first page
    setDestinations([]); // Clear current destinations
  }, [searchQuery]);

  // Fetch places when searchQuery, category, or pages change
  useEffect(() => {
    async function getPlaces() {
      try {
        setLoading(true);
        const VITE_BE = import.meta.env.VITE_BE;

        const response = await axios.get(`${VITE_BE}/get/places`, {
          params: {
            pages,
            limit,
            searchQuery: searchQuery.trim() ? searchQuery : null,
            category: category || null, // If category exists, apply it
          },
        });

        // Update destinations based on pages and search
        if (pages === 1) {
          // If it's the first page (fresh search), replace destinations
          setDestinations(response.data.places);
        } else {
          // If it's a "Load More" operation, append to existing destinations
          setDestinations((prevData) => [...prevData, ...response.data.places]);
        }

        setShowMoreButton(response.data.hasMore);
      } catch (err) {
        console.error("Error fetching places:", err);
      } finally {
        setLoading(false);
      }
    }

    getPlaces();
  }, [pages, searchQuery, category, limit]);

  return (
    <DataContext.Provider
      value={{
        setSearchQuery,
        setPages,
        setLimit,
        setCategory,
        showMoreButton,
        destinations,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
