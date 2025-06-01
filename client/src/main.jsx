import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import DataContextProvider from "./context/DataContextProvider.jsx";
import UserContextProvider from "./context/UserContext/UserContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <DataContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </DataContextProvider>
  </BrowserRouter>
  // </StrictMode>
);
