import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Destination from "./pages/Destination/Destination";
import Footer from "./components/Footer/Footer";
import ExploreMore from "./pages/ExploreMore/ExploreMore";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Chat from "./pages/Chat/Chats";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
  return (
    <>
      <Navbar />
      {/* <Router> */}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Destination />} path="/search-destination" />
        <Route element={<Profile />} path="/profile" />
        <Route path="/explore-more/:id" element={<ExploreMore />} />
        <Route path="/explore-more/:id/chat" element={<Chat />} />
        <Route path="/admin-dashboard" element={<AdminPanel />} />
      </Routes>
      {/* </Router> */}
      <Footer />
    </>
  );
}

export default App;

// 📌 Sections to Include in Destination Search Page
// 1️⃣ Search Bar & Hero Section (Mandatory)
// Large Background Image or Video (e.g., world map, famous destinations, or travel animations).
// Centered Search Bar for users to enter a destination name.
// A tagline like: "Find Your Next Adventure!"

// 2️⃣ Popular Destinations (Auto-Suggest / Trending)
// Show trending or suggested destinations based on user interest.
// Use interactive cards with images, names, and a "View Details" button.

// Implement hover effects to show brief information.
// 3️⃣ Filter & Sort Options
// Category Filters: Beaches, Mountains, Adventure, Cultural, Historical.
// Sort by: Most Popular, Closest to Me, Highest Rated.
// Use toggle buttons or a dropdown menu for easy selection.

// 4️⃣ Destination Results Grid/List
// Display the search results in a grid format (3-4 columns on desktop, 1-2 on mobile).
// Each destination card should include:
// Image, Name, Location, Rating, Category, Short Description.
// A "View More" button to check details.

// 5️⃣ Interactive Map (Optional)
// Show searched destinations on a live map using Google Maps or OpenStreetMap.
// Allow users to click on a marker to see basic details.
// Enable "Nearby Places" feature.

// 6️⃣ User Reviews & Ratings
// Display reviews from travelers who visited the destination.
// Use a slider or card layout.
// Include: Star ratings, user images, short feedback.

// 7️⃣ "Plan Your Trip" CTA Section
// Show a "Book Your Trip" or "Explore More" button.
// Can link to travel guides, booking options, or itinerary suggestions.

// 8️⃣ FAQ & Travel Tips (Helpful)
// Common questions like Best time to visit? Weather? Cost?
// Add travel tips for that destination.
// Example: "Top 5 Things to Do in Goa" section.

// 9️⃣ Footer Section (Essential)
// Important Links: Privacy Policy, Terms, About Us, Contact.
// Social Media Icons.
// Newsletter Subscription Box (for travel deals & tips).
