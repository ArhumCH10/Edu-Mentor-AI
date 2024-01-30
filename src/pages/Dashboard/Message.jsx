import Header from "./header";
import { useState, useEffect, useRef } from "react";
import { MessageList, Input, ChatList, Button } from "react-chat-elements";
import EmojiPicker from 'emoji-picker-react';
import "react-chat-elements/dist/main.css";


export default function Message() {


  const chatList = [
    {
      title: "Ali",
      subtitle: "Last message from Friend 1",
      avatar: "https://placekitten.com/50/50",
    },
    {
      title: "Tayyaba",
      subtitle: "Last message from Friend 2",
      avatar: "https://placekitten.com/52/50",
    },
    {
      title: "Arhum",
      subtitle: "Last message from Friend 2",
      avatar: "https://placekitten.com/51/50",
    },
    {
      title: "Ayesha",
      subtitle: "Last message from Friend 2",
      avatar: "https://placekitten.com/53/50",
    },
    {
      title: "Bilal",
      subtitle: "Last message from Friend 2",
      avatar: "https://placekitten.com/54/50",
    },
    {
      title: "Ayesha",
      subtitle: "Last message from Friend 2",
      avatar: "https://placekitten.com/55/50",
    },
    {
      title: "Wajeeha",
      subtitle: "Last message from Friend 2",
      avatar: "https://placekitten.com/56/50",
    },
    {
      title: "Iqra",
      subtitle: "Last message from Friend 2",
      avatar: "https://placekitten.com/57/50",
    },
    {
      title: "Misha",
      subtitle: "Last message from Friend 2",
      avatar: "https://placekitten.com/58/50",
    },
    {
      title: "Alizah",
      subtitle: "Last message from Friend 2",
      avatar: "https://placekitten.com/59/50",
    },
    // Add more chat rooms as needed
  ];

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");

  const onSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const filteredChatList = chatList.filter((chat) =>
    chat.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );


  const getDummyConversation = (user) => {
    return [
      {
        position: "right",
        type: "text",
        text: `Hi, ${user.title}! How are you?`,
        date: new Date(),
      },
      {
        position: "left",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      {
        position: "right",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      {
        position: "left",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      {
        position: "right",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      {
        position: "left",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      {
        position: "right",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      {
        position: "left",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      {
        position: "right",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      {
        position: "left",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      {
        position: "right",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      {
        position: "right",
        type: "text",
        text: `Hello! I'm good, thanks!`,
        date: new Date(),
      },
      // Add more messages as needed
    ];
  };

  const latestMsgRef = useRef();

  useEffect(() => {
    if (latestMsgRef.current) {
      latestMsgRef.current.scrollTop = latestMsgRef.current.scrollHeight;
    }
  }, [selectedChat]);
  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setInputValue((prevValue) => prevValue + emoji);
    setShowEmojiPicker(false);
    console.log("Emoji selected:", emoji);
  };

  const handleSend = () => {
    console.log("Message sent!");
  };
  const handleEmojiPickerClick = (e) => {
    e.stopPropagation();
  };

  const handleDocumentClick = (e) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showEmojiPicker]);

  const emojiPickerRef = useRef();

  return (
    <>
      <Header />
      <div className="row msg-page-container">
        <div className="chatList">
          <input
            className="searchUser"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchKeyword(e.target.value)}

          />

          <ChatList
            className="chat-list"
            dataSource={filteredChatList}
            onClick={(chat) => onSelectChat(chat)}
            activeChat={selectedChat}
          />
        </div>
        <div style={{ flex: 1 }}>
          {selectedChat ?
            <>
              <div className="row">
                <div
                  style={{
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                    position: "relative"
                  }}
                >
                  <strong>{selectedChat.title}</strong>
                </div>
              </div>
              <div className="row MsgList" ref={latestMsgRef} >
                <MessageList className="message-list" lockable={false} dataSource={getDummyConversation(selectedChat)} />
              </div>
              <div className="row row-message-input" >
                <div className="col " style={{ position: "relative" }} ref={emojiPickerRef} >
                  <Button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    color="white"
                    backgroundColor="white"
                    text="😀"
                  />
                  {showEmojiPicker && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-305px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1000,
                      }}
                      onClick={handleEmojiPickerClick}
                    >
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        disableSearchBar
                        disableSkinTonePicker
                        disableAutoFocus
                        theme="auto"
                        suggestedEmojisMode="recent"
                        width={250}
                        height={300}
                        searchDisabled="true"
                      />
                    </div>
                  )}
                </div>
                <div className="col-11">
                  <Input
                    className="custom-input"
                    placeholder="Type here..."
                    multiline={false}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rightButtons={[
                      <Button
                        key="emojiButton"
                        color="white"
                        backgroundColor="#007BFF"
                        text="Send"
                        onClick={handleSend}
                      />,
                    ]}
                  />
                </div>
              </div>
            </>
            : <h1>Select a chat to start messaging</h1>
          }
        </div>


      </div>

    </>
  )
}