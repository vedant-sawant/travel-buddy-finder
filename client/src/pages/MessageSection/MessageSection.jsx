import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MessageSection.css";
import Message from "../../components/Message/Message";

function MessageSection({
  user_id,
  userClick,
  user,
  usersList,
  sendMsg,
  messages,
  placeName,
}) {
  const [msg, setMsg] = useState("");
  const [displayProfile, setDisplayProfile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleMsg(e) {
    setMsg(e.target.value);
  }

  function handleSendMsg(e) {
    // console.log(e.key);
    if (e.key === "Enter") {
      if (msg.trim()) {
        sendMsg(msg.trim());
        e.target.value = "";
      }
    }
  }

  function handleUserProfileClick(userProfile) {
    // console.log({ userProfile });
    setDisplayProfile(!displayProfile);
  }
  // message request logic start

  const senderId = userClick?._id;
  const receiverId = user_id;

  const [requestStatus, setRequestStatus] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequestStatus() {
      try {
        // console.log(senderId, receiverId);

        const response = await axios.get(
          `${import.meta.env.VITE_BE}/request/status`,
          {
            params: { senderId, receiverId },
          }
        );
        // console.log(response);
        setRequestId(response.data?.request?._id);
        setRequestStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching request status:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequestStatus();
  }, [senderId, receiverId]);

  const handleSendRequest = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE}/request/send`,
        {
          senderId,
          receiverId,
        }
      );
      // console.log(response);

      alert(response.data.message);
      setRequestStatus("pending");
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE}/request/update`,
        {
          requestId: requestId, // Replace with the actual request ID
          action: "accept",
        }
      );
      // console.log(response);

      alert(response.data.message);
      setRequestStatus("accepted");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleRejectRequest = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE}request/update`,
        {
          requestId: requestId, // Replace with the actual request ID
          action: "reject",
        }
      );
      // console.log(response);

      alert(response.data.message);
      setRequestStatus("rejected");
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  // message request logic end

  return (
    <div className="message-section-container">
      <div
        className="selected-user-profile-section"
        onClick={() => handleUserProfileClick(userClick)}
      >
        {usersList.length === 0 ? (
          ""
        ) : (
          <div
            className={`${
              displayProfile
                ? "clicked-user-profile"
                : "clicked-user-profile-dissable"
            }`}
          >
            <p>
              <strong>Name:</strong> {userClick?.user_name}
            </p>
            <p>
              <strong>Email:</strong> {userClick?.user_email}
            </p>
            <p>
              <strong>Gender:</strong> {userClick?.user_gender}
            </p>
            <p>
              <strong>City:</strong> {userClick?.user_city}
            </p>
            <p>
              <strong>State:</strong> {userClick?.user_state}
            </p>
            <p>
              <strong>Preferences:</strong>
              {userClick?.user_preferances.length > 0
                ? userClick?.user_preferances.join(", ")
                : "None"}
            </p>
          </div>
        )}

        <div className="selected-user-profile">
          <p> {userClick ? userClick.user_name[0] : "TB"}</p>
        </div>
        <div className="selected-user-name">
          <p>
            {usersList.length === 0
              ? `No any traveler to go at these place "${placeName || "NA"}"`
              : userClick?.user_name || "Select user to chat"}
          </p>
        </div>
      </div>

      {/* message request logic start */}

      <div className="request-container">
        {loading && userClick ? (
          <p>Loading...</p>
        ) : (
          <div className="request-content">
            {requestStatus === "no_request" && userClick && (
              <button className="btn" onClick={handleSendRequest}>
                Send Request
              </button>
            )}

            {/* {requestStatus === "reverse_awaiting"  && (
              <p>Waiting for response from the other user.</p>
            )} */}

            {requestStatus === "awaiting_response" && userClick && (
              <div>
                <button className="btn" onClick={handleAcceptRequest}>
                  Accept
                </button>
                <button className="btn" onClick={handleRejectRequest}>
                  Reject
                </button>
              </div>
            )}
            {requestStatus === "pending" && userClick && (
              <p>Request is pending...</p>
            )}
          </div>
        )}
      </div>

      {/* message request logic end */}

      {requestStatus !== "accepted" && (
        <div className="message-container"> </div>
      )}

      {requestStatus === "accepted" && (
        <Message messages={messages} userClick={userClick} user={user} />
      )}

      <div className="message-input-section">
        {userClick && requestStatus === "accepted" ? (
          <input
            type="text"
            name="message"
            placeholder="Start Typing..."
            id="message"
            onInput={handleMsg}
            onKeyDown={handleSendMsg}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default MessageSection;
