import React, { useContext, useEffect, useState } from "react";
import "./Chats.css";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import UserContext from "../../context/UserContext/UserContext";
import UsersList from "../../components/UsersList/UsersList";
import MessageSection from "../MessageSection/MessageSection";

function Chats() {
  const [userClick, setUserClick] = useState(null);
  const [user_email, set_user_email] = useState(null);
  const [messages, setMessages] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [explorePlace, setExplorePlace] = useState([]);

  const { userData } = useContext(UserContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPlaceById = async () => {
      try {
        const VITE_BE = import.meta.env.VITE_BE;
        const response = await axios.get(`${VITE_BE}/get/place/id`, {
          params: { id },
        });
        setExplorePlace(response.data);
      } catch (err) {
        console.error("Error fetching place:", err);
      }
    };
    fetchPlaceById();
  }, [id]);

  async function getAllUsers() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BE}/trips`);

      const tripData = response.data;

      // console.log({ tripData });

      const filteredUserList = tripData
        .filter(
          (item) =>
            item.destination.toLowerCase() === explorePlace?.name.toLowerCase()
        )
        .filter((item) => item.user_email !== userData?.user_email)
        .filter(
          (item, index, self) =>
            index ===
            self.findIndex((obj) => obj.user_email === item.user_email)
        );

      setUsersList(filteredUserList);
      // console.log(filteredUserList);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [userData, id, explorePlace]);

  const socket = io("https://travelbuddysocket.onrender.com");

  useEffect(() => {
    const token = localStorage.getItem("travel_buddy_token");
    sendToken(token);
  }, []);

  function sendToken(token) {
    if (token) {
      socket?.emit("token", token);
    } else {
      navigate("/signup");
    }
  }

  async function fetchMessages(sender, receiver) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BE}/messages`, {
        params: { sender, receiver },
      });

      if (response) {
        // console.log(response.data);
        const messages = response.data;
        // console.log({messages});

        setMessages(messages);
      }
    } catch (error) {
      console.error({ error });
    }
  }

  useEffect(() => {
    // console.log(userData);
    fetchMessages(userData?.user_email, userClick?.user_email);
  }, [userData, userClick]);

  socket?.on("user_email", (user_email) => {
    // console.log(user_email);
    if (user_email) {
      set_user_email(user_email);
    } else {
      navigate("/signup");
    }
  });

  async function sendMsg(msg) {
    const msg_details = {
      receiver: userClick?.user_email,
      message: msg,
      sender: user_email || userData?.user_email,
    };

    setMessages((prev) => [...prev, msg_details]);
    socket?.emit("msg", msg_details);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE}/message`,
        msg_details
      );
      // console.log(response.data);
    } catch (err) {
      console.error({ err });
    }
  }

  socket?.on("msg", async (msg) => {
    setMessages((prev) => [...prev, msg]);
    // console.log(msg);
  });

  return (
    <div className="user-chat-container">
      {/* <h2 className="self-name">User name</h2> */}
      <UsersList
        userData={userData}
        usersList={usersList}
        setUserClick={setUserClick}
        placeName={explorePlace?.name}
      />
      <MessageSection
        usersList={usersList}
        messages={messages}
        userClick={userClick}
        sendMsg={sendMsg}
        user_id={userData?._id}
        user={user_email || userData?.user_email}
        placeName={explorePlace?.name}
      />
    </div>
  );
}

export default Chats;
