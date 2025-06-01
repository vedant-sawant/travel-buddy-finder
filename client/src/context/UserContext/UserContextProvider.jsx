import { useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userLoading, setUserLoading] = useState(true);

  async function getUserData() {
    try {
      setUserLoading(true);
      const token = localStorage.getItem("travel_buddy_token");
      const response = await axios.get(`${import.meta.env.VITE_BE}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      setUserData(response.data);
    } catch (err) {
      setUserData(false);
      console.error(err);
    } finally {
      setUserLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, userLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
