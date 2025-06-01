import React, { useState , useEffect,useContext } from "react";
import "./Destination.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import PredefinePlaces from "../../components/PredefinePlaces/PredefinePlaces";
import DataContext from "../../context/DataContext";

const Destination = () => {
  const [query, setQuery] = useState("");
  const {setSearchQuery} = useContext(DataContext)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const sentences = [
    "Find Your Next Adventure....",
    "Experience the World Like Never Before....",
    "Discover Hidden Treasures Across the Globe....",
    "Create Memories That Last a Lifetime....",
   "Find Your Next Buddy....",
   ""
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSentence = sentences[index];
    let typingSpeed = isDeleting ? 50 : 100; // Adjust speed for typing/deleting

    if (!isDeleting && charIndex === currentSentence.length) {
      typingSpeed = 2000; // Pause before deleting
      setTimeout(() => setIsDeleting(true), typingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % sentences.length);
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      setText(currentSentence.substring(0, charIndex));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, sentences]);





  return (
    <div>
      <div className="destination-page">
        <div className="hero-section">
          <h1 className="hero-title">{text}</h1>
          <SearchBar setSearchQuery={setSearchQuery} setQuery={setQuery} query={query} />
        </div>
      </div>
      <PredefinePlaces searchQuery={query} />
    </div>
  );
};

export default Destination;
