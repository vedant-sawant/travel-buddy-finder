import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { use } from "react";

const SearchBar = ({ setQuery, setSearchQuery, query }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    // alert(`Searching for: ${query}`);
  };
  useEffect(() => {
   const search = document.getElementById("search");
    search.focus();
  },[]);

  return (
    <form onSubmit={handleSearch}>
      <div className="search-container">
        <input
        id="search"
          className="destination-search-bar"
          type="text"
          placeholder="Enter the destination name..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchQuery(e.target.value);
          }}
        />
        <button className="search-icon" type="submit" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
