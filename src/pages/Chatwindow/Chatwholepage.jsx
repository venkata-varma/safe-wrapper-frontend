import React, { useEffect, useState } from "react";
import "./Chatwholepage.css";
import { useDispatch, useSelector } from "react-redux";
import { getLatestChatRooms } from "../../redux/Chat/getChatRoomsOfSender";
import { getUsers } from "../../redux/Chat/getUsersSlice";
import { findOrCreateChatRoom } from "../../redux/Chat/findOrCreateChatRoom";
import { getMessagesOfChat } from "../../redux/Chat/getMessagesSlice";
import { sendMessage } from "../../redux/Chat/sendMessageSlice";
import { socket } from "../../socket";

const Chatwholepage = () => {
  // console.log("Render");

  // useEffect(() => {
  //   console.log("Mounted");

  //   return () => {
  //     console.log("Unmounted");
  //   };
  // }, []);
  const dispatch = useDispatch();

  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    dispatch(getLatestChatRooms());
  }, []);

  const { chatRooms, loading } = useSelector(
    (state) => state.getLatestChatRooms,
  );
  const { users, loading: usersLoading } = useSelector(
    (state) => state.getUsers,
  );
  const filteredUsers = users.filter((user) =>
    user.accountName.toLowerCase().includes(searchText.toLowerCase()),
  );
  const accountDetails = JSON.parse(localStorage.getItem("accountDetails"));

  const handleUserSelection = async (receiverId) => {
    try {
      const response = await dispatch(
        findOrCreateChatRoom(receiverId),
      ).unwrap();

      const receiver = users.find((user) => user._id === receiverId);

      setSelectedReceiver(receiver);

      setSelectedChatRoom(response.chat);

      setShowNewChatModal(false);

      dispatch(getLatestChatRooms());
      dispatch(getMessagesOfChat(response.chat._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChatRoomSelection = (chat) => {
    const accountDetails = JSON.parse(localStorage.getItem("accountDetails"));

    const receiver = chat.participants.find(
      (participant) => participant._id !== accountDetails._id,
    );

    setSelectedChatRoom(chat);

    setSelectedReceiver(receiver);

    dispatch(getMessagesOfChat(chat._id));
  };
  const { messages } = useSelector((state) => state.getMessagesOfChat);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) {
      return;
    }

    if (!selectedChatRoom) {
      return;
    }

    try {
      const response = await dispatch(
        sendMessage({
          chatId: selectedChatRoom._id,
          message: messageInput,
        }),
      );

      if (response.payload?.success) {
        setMessageInput("");

        dispatch(getMessagesOfChat(selectedChatRoom._id));
        // setChatMessages((prev) => [...prev, response.payload.data]);
        // console.log("chatmessages", chatMessages.length, chatMessages[chatMessages.length])
        dispatch(getLatestChatRooms());
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Socket io code
  // useEffect(() => {

  //   socket.on("connect", () => {

  //     console.log("Connected:", socket.id);

  //     const accountDetails = JSON.parse(
  //       localStorage.getItem("accountDetails")
  //     );

  //     socket.emit(
  //       "registerUser",
  //       accountDetails._id
  //     );

  //   });

  // }, []);

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      console.log("Realtime Message Received:", newMessage);

      if (selectedChatRoom && selectedChatRoom._id === newMessage.chatId) {
        setChatMessages((prev) => [...prev, newMessage]);
        dispatch(getLatestChatRooms());
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [selectedChatRoom]);

  const { onlineUsers } = useSelector((state) => state.onlineUsers);
  console.log("onlineUsers===chatwholepage", onlineUsers);
  useEffect(() => {
    console.log("ONLINE USERS FROM REDUX", onlineUsers);
  }, [onlineUsers]);
  // socket io code
  return (
    <>
      <div className="chat-whole-page">
        {/* LEFT SIDEBAR */}

        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <h2>Chats</h2>

            <button
              className="new-chat-btn"
              onClick={() => {
                setShowNewChatModal(true);
                setSearchText("");
                dispatch(getUsers());
              }}
            >
              + New Chat
            </button>
          </div>
          <div className="chat-room-list">
            {/* {loading && <p style={{ padding: "15px" }}>Loading...</p>} */}

            {!loading &&
              chatRooms.map((chat) => {
                const receiver = chat.participants.find(
                  (participant) => participant._id !== accountDetails._id,
                );
                const isOnline = onlineUsers.includes(receiver._id);
                return (
                  <div
                    key={chat._id}
                    className="chat-room-card"
                    onClick={() => handleChatRoomSelection(chat)}
                  >
                    <div className="chat-user-image-wrapper">
                      <img
                        src="https://i.pravatar.cc/150?img=1"
                        alt="profile"
                        className="chat-user-image"
                      />

                      <span
                        className={isOnline ? "online-dot" : "offline-dot"}
                      ></span>
                    </div>
                    <div className="chat-room-content">
                      <div className="chat-room-header">
                        <h4>{receiver?.accountName}</h4>
                        {isOnline && <span className="online-dot"></span>}
                        <span className="chat-time">
                          {new Date(chat.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <p className="last-message">
                        {chat.lastMessage?.message || " "}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* CENTER CHAT WINDOW */}
        <div className="chat-window">
          {selectedChatRoom ? (
            <>
              <div className="chat-window-header">
                <div className="chat-window-header-name-image">
                  <img
                    src="https://i.pravatar.cc/150?img=1"
                    alt="profile"
                    className="chat-user-image"
                  />

                  <div>
                    <h3>{selectedReceiver?.accountName}</h3>
                    <p>{selectedReceiver?.email}</p>
                  </div>
                </div>
                <div className="chat-header-status">
                  <span
                    className={
                      onlineUsers.includes(selectedReceiver?._id)
                        ? "online-dot"
                        : "offline-dot"
                    }
                  ></span>

                  <span>
                    {onlineUsers.includes(selectedReceiver?._id)
                      ? "Online"
                      : "Offline"}
                  </span>
                </div>
              </div>

              <div className="messages-area">
                {chatMessages.length > 0 ? (
                  chatMessages.map((message) => {
                    const accountDetails = JSON.parse(
                      localStorage.getItem("accountDetails"),
                    );

                    const isMyMessage =
                      message.senderId._id === accountDetails._id;

                    return (
                      <div
                        key={message._id}
                        className={isMyMessage ? "my-message" : "other-message"}
                      >
                        <p>{message.message}</p>
                      </div>
                    );
                  })
                ) : (
                  <p>No messages yet</p>
                )}
              </div>
              <div className="message-input-area">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          ) : (
            <div className="empty-chat-window">Select a conversation</div>
          )}
        </div>

        {/* RIGHT PROFILE PANEL */}
        {selectedChatRoom && (
          <div className="chat-profile-panel">
            <img
              src="https://i.pravatar.cc/150?img=1"
              alt="profile"
              className="profile-image"
            />

            <h3>{selectedReceiver?.accountName || " "}</h3>

            <div className="profile-card">
              <div className="profile-row">
                <span>Email</span>
                <p>{selectedReceiver?.email || " "}</p>
              </div>

              <div className="profile-row">
                <span>Phone</span>
                <p>{selectedReceiver?.phone || " "}</p>
              </div>

              <div className="profile-row">
                <span>Status</span>
                <p>Active</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {showNewChatModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowNewChatModal(false)}
        >
          <div className="new-chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Start New Chat</h2>

              <button
                className="close-modal-btn"
                onClick={() => setShowNewChatModal(false)}
              >
                X
              </button>
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="user-search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <div className="users-list">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="user-card"
                  onClick={() => handleUserSelection(user._id)}
                >
                  <img src="https://i.pravatar.cc/150?img=1" alt="user" />

                  <div>
                    <h4>{user.accountName}</h4>

                    <p>{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatwholepage;
