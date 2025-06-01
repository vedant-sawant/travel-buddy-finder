import React, { useEffect, useRef } from "react";
import "./Message.css";

const Message = React.memo(({ messages, userClick, user }) => {
  const messageContainerRef = useRef(null);

  useEffect(() => {
    // console.log(messageContainerRef.current);

    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-container" ref={messageContainerRef}>
      {messages?.map((msg, index) => {
        return (
          <div
            key={index}
            className={`${
              user === msg.sender && userClick?.user_email === msg.receiver
                ? "msg-send"
                : user === msg.receiver && userClick?.user_email === msg.sender
                ? "msg-receive"
                : "hide"
            }`}
          >
            <p>{msg.msg || msg.message} </p>
          </div>
        );
      })}
    </div>

    // <div className="message-container" ref={messageContainerRef}>
    //   <div className="msg-send">
    //     <p>arjsfd wgsjiefdvmck </p>
    //   </div>{" "}
    //   <div className="msg-receive">
    //     <p>arjsfd wgsjiefdvmck </p>
    //   </div>{" "}
    //   <div className="msg-receive">
    //     <p>arjsfd wgsjiefdvmck </p>
    //   </div>{" "}
    //   <div className="msg-send">
    //     <p>arjsfd wgsjiefdvmck </p>
    //   </div>{" "}
    //   <div className="msg-send">
    //     <p>arjsfd wgsjiefdvmck </p>
    //   </div>
    //   <div className="msg-receive">
    //     <p>arjsfd wgsjiefdvmck </p>
    //   </div>{" "}
    //   <div className="msg-send">
    //     <p>arjsfd wgsjiefdvmck </p>
    //   </div>
    //   <div className="msg-receive">
    //     <p>arjsfd wgsjiefdvmck </p>
    //   </div>
    // </div>
  );
});

export default Message;
