import React, { useEffect, useState } from "react";
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room, setOpenChat }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        username: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList([...messageList, messageData]);

      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
      // setMessageList((list)=>[...list, data])
    });
  }, [messageList]);

  return (
    <div className="mainChat">
      <div className="chat-main">
        <div className="chat-head">
          <p>chat box</p>
          <button onClick={() => setOpenChat(false)}>X</button>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.username ? "you" : "other"}
                >
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p>{messageContent.time}</p>
                    <p>{messageContent.username}</p>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={currentMessage}
            placeholder="..."
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessage();
            }}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button className="btn" onClick={sendMessage}>
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
