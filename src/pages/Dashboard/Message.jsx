import Header from "./header";
import { useState, useEffect, useRef } from "react";
import { MessageList, Input, ChatList, Button } from "react-chat-elements";
import EmojiPicker from 'emoji-picker-react';
import "react-chat-elements/dist/main.css";
import { toast } from 'react-toastify';
import { Spinner } from "react-bootstrap";




export default function Message() {



  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [conversations, setConversations] = useState([]);
  const [message,setMessages] = useState([
    {
      position: "right",
      type: "text",
      text: `Hi, Ghous! How are you?`,
      date: new Date(),
    },
    {
      position: "left",
      type: "text",
      text: `Hello! I'm good, thanks!`,
      date: new Date(),
    },
  ]
);

  const fetchMessages = async (conversationId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("userData")).userData._id;
      const url = `http://localhost:8080/messages/${conversationId}?userId=${userId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      console.log(data);
      setMessages(data); 
      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    } finally{
      setMessageListLoading(false);
    }
  };
  
  const onSelectChat = (chat) => {
    if (chat.id !== selectedChat?.id) {
      setMessageListLoading(true);
      setSelectedChat(chat);
      fetchMessages(chat.id);
    }
  };
  const latestMsgRef = useRef();
  const [chatListLoading, setchatListLoading] = useState(true);
  const [messageListLoading, setMessageListLoading] = useState(true);

  useEffect(() => {
    if (latestMsgRef.current) {
      latestMsgRef.current.scrollTop = latestMsgRef.current.scrollHeight;
    }
  }, [selectedChat]);
  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setInputValue((prevValue) => prevValue + emoji);
    setShowEmojiPicker(false);
  };

 const handleSend = async () => {
  try {
    if (!selectedChat) {
      console.log('please select a chat');
      toast.error('Please select a chat');
      return;
    }

    if (!inputValue.trim()) {
      console.log("Input value is empty");
      toast.error('Please enter a message');
      return;
    }
    const senderId = JSON.parse(localStorage.getItem("userData")).userData._id;
    
    const messageData = {
      conversationId: selectedChat.id, 
      senderId: senderId, 
      message: inputValue.trim() 
    };
    const response = await fetch('http://localhost:8080/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    setInputValue('');
    const newMessage = {
      position: "right",
      type: "text",
      text: inputValue.trim(),
      date: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    toast.success('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    toast.error('Failed to send message. Please try again later.');
  }
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
  useEffect(() => {
    const teacherId = JSON.parse(localStorage.getItem("userData")).userData._id;

    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/teacher/${teacherId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const data = await response.json();
        setConversations(data);

      } catch (error) {
        toast.error(error);
        console.error(error);

      } finally {
        setchatListLoading(false);
      }
    };

    fetchConversations();

  }, []);
  const filteredChatList = conversations.map(conversation => ({
    id: conversation._id,
    title: conversation.studentName,
    subtitle: 'Message placeholder',
    avatar: `http://localhost:8080/uploads/${conversation.studentProfilePicture}`,
    alt: 'default-user.jpg',
    date: new Date(),
  })).filter(message => message.title.toLowerCase().includes(searchKeyword.toLowerCase()));

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
          {chatListLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spinner />
            </div>
          ) : (
            conversations.length > 0 ? (
              <ChatList
                className="chat-list"
                dataSource={filteredChatList}
                onClick={(chat) => onSelectChat(chat)}
                activeChat={selectedChat}
              />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <strong>No Contact Found</strong>
              </div>
            )
          )}

        </div>
        <div style={{ flex: 1 }}>
          {selectedChat ?
            <>
              <div className="row" style={{ borderBottom: "2px solid #ccc" }}>
                <div className="avatar col-1">
                  {selectedChat.avatar ? (
                    <img height={40} width={40} src={selectedChat.avatar} alt="Profile" />
                  ) : (
                    selectedChat.title
                  )}
                </div>
                <div className=" col-5"
                  style={{
                    paddingTop: '7px',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                    position: "relative"
                  }}
                >
                  <strong >{selectedChat.title}</strong>
                </div>
              </div>
              <div className="row MsgList" ref={latestMsgRef} >
                {messageListLoading ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spinner />
                 </div>):(<MessageList className="message-list" lockable={false} dataSource={message} />)}
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
                        key="sendButton"
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
            :
            <div className="nochat-container" style={{ marginTop: '30px' }}>
              <img className="chatting-pic" src="/public/chat.png" />
              <p className="text-pic">Pick up where you left off</p>
              <p className="down-pic">Select a conversation and chat away.</p>
            </div>
          }
        </div>


      </div>

    </>
  )
}