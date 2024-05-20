import Header from "./header";
import { useState, useEffect, useRef } from "react";
import { MessageList, Input, ChatList, Button } from "react-chat-elements";
import EmojiPicker from 'emoji-picker-react';
import "react-chat-elements/dist/main.css";
import { toast } from 'react-toastify';
import { Spinner } from "react-bootstrap";
import { io } from 'socket.io-client';
import axios from 'axios';
import AttachFileIcon from "@mui/icons-material/AttachFile";


export default function Message() {

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io('http://localhost:8000'));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('addUser', JSON.parse(localStorage.getItem("userData")).userData._id);

      socket.on('getUser', users => {
        console.log('Socket GetUser online List', users);
      })
      socket.on('getMessage', msgdata => {
        console.log(msgdata);
        const { type } = msgdata;
        if (type === 'text') {

          const newMessage = {
            position: "right",
            type: msgdata.type,
            text: msgdata.text,
            date: new Date(msgdata.date),
          };
          setMessages(prevMessages => [...prevMessages, newMessage]);
        } else if (type === 'photo') {
          const { data } = msgdata;
          data.uri = "http://localhost:8080" + data.uri;
          const newMessage = {
            position: "right",
            type: msgdata.type,
            text: msgdata.text,
            data: data,
            date: new Date(msgdata.date),
          };
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }
        else if (type === 'file') {
          const { data } = msgdata;
          data.uri = "http://localhost:8080" + data.uri;
          const newMessage = {
            position: "right",
            type: msgdata.type,
            text: msgdata.text,
            data: data,
            date: new Date(msgdata.date),
          };
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }
      });
      socket.on('sendItself', msgdata => {
        console.log(msgdata);
        const { type } = msgdata;
        if (type === 'text') {

          const newMessage = {
            position: "right",
            type: msgdata.type,
            text: msgdata.text,
            date: new Date(msgdata.date),
          };
          setMessages(prevMessages => [...prevMessages, newMessage]);
        } else if (type === 'photo') {
          const { data } = msgdata;
          data.uri = "http://localhost:8080" + data.uri;
          const newMessage = {
            position: "right",
            type: msgdata.type,
            text: msgdata.text,
            data: data,
            date: new Date(msgdata.date),
          };
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }
        else if (type === 'file') {
          const { data } = msgdata;
          data.uri = "http://localhost:8080" + data.uri;
          const newMessage = {
            position: "right",
            type: msgdata.type,
            text: msgdata.text,
            data: data,
            date: new Date(msgdata.date),
          };
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }
      });
    }
  }, [socket]);

  const userId = JSON.parse(localStorage.getItem("userData")).userData._id;


  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [conversations, setConversations] = useState([]);
  const [recieverId, setRecieverId] = useState(null);
  const [message, setMessages] = useState([
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
    } finally {
      setMessageListLoading(false);
    }
  };

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
        //console.log("conversations: ",data);

      } catch (error) {
        toast.error(error);
        console.error(error);

      } finally {
        setchatListLoading(false);
      }
    };

    fetchConversations();

  }, []);

  const onSelectChat = (chat) => {
    //console.log("chat:",chat);
    //console.log("selectedChat:",selectedChat);
    if (chat.id !== selectedChat?.id) {
      setMessageListLoading(true);
      setSelectedChat(chat);
      fetchMessages(chat.id);
      const conversationId = chat.id;
      // console.log('conversationId: ',conversationId);
      // console.log('conversationIdcsdcmsdcds: ',conversations);
      const convo = conversations.find(chat => chat._id === conversationId);
      //console.log('convo:',convo);
      if (convo) {
        const receiverId = convo.members.find(member => member !== userId);
        //const receiverId = convo.members[1]; because i have designed members array as 0 is teacherId and 1 is STudentId
        //console.log('recieverIdnull :',recieverId);
        //console.log('recieverId: ',receiverId);
        setRecieverId(receiverId);
      }
    }
  };
  const latestMsgRef = useRef();
  const [chatListLoading, setchatListLoading] = useState(true);
  const [messageListLoading, setMessageListLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [messageType, setMessageType] = useState("text");

  useEffect(() => {
    if (latestMsgRef.current) {
      latestMsgRef.current.scrollTop = latestMsgRef.current.scrollHeight;
    }
  }, [message]);
  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setInputValue((prevValue) => prevValue + emoji);
    setShowEmojiPicker(false);
  };


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const fileType = e.target.files[0].type.split('/')[0];
    if (fileType === 'image') {
      setMessageType('photo');
    } else {
      setMessageType('file');
    }
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

      let messageData;

      if (messageType === 'text') {
        messageData = {
          conversationId: selectedChat.id,
          recieverId: recieverId,
          senderId,
          type: 'text',
          text: inputValue.trim(),
          date: new Date()
        };
      } else if (messageType === 'file' || messageType === 'photo' || messageType === 'video') {
        // Upload the file to the server
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://localhost:8080/sendMessageUploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        messageData = {
          conversationId: selectedChat.id,
          recieverId: recieverId,
          senderId,
          type: messageType,
          text: inputValue.trim(),
          data: {
            uri: response.data.filePath,
            status: {
              click: false,
              loading: 0,
            },
          },
          date: new Date()
        };
      }
      //setLocalMessages([...localMessages, messageData]);


      socket?.emit('sendMessage', messageData);
      setInputValue('');
      setFile(null);
      setMessageType('text')

      // socket?.emit('sendMessage', { 
      //   conversationId : selectedChat.id, 
      //   senderId : senderId, 
      //   recieverId:recieverId,
      //   text: inputValue.trim(), 
      //   type: 'text', 
      //   date: new Date() });

      // const messageData = {
      //   recipientId: selectedChat.id, 
      //   senderId: senderId, 
      //   text: inputValue.trim() ,
      //   type: "text",
      //   date: new Date(),
      // };
      //socket.emit('sendMessage', messageData);
      setInputValue('');
      // const newMessage = {
      //   position: "right",
      //   type: "text",
      //   text: inputValue.trim(),
      //   date: new Date(),
      // };
      // setMessages(prevMessages => [...prevMessages, newMessage]);
      toast.success('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };
  // socket.on('messageReceived', (newMessage) => {
  //   console.log('messageRecieved:',newMessage);
  //   setMessages(prevMessages => [...prevMessages, newMessage]);
  // });

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

  const filteredChatList = conversations.map(conversation => ({
    id: conversation._id,
    title: conversation.studentName,
    subtitle: 'Message placeholder',
    avatar: `http://localhost:8080/uploads/${conversation.studentProfilePicture}`,
    alt: 'default-user.jpg',
    date: new Date(),
  })).filter(message => message.title.toLowerCase().includes(searchKeyword.toLowerCase()));


  const handleDownload = (message) => {
    if (message.type === 'file' && message.data && message.data.uri || message.type === 'photo' || message.type === 'video') {
      console.log('message Download: ', message);

      fetch(message.data.uri)
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a');
          const url = window.URL.createObjectURL(blob);

          link.href = url;
          link.download = message.data.uri.split('/').pop();

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error downloading file:', error));
    }
  };

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

              <div className="message-body" ref={latestMsgRef} style={{ scrollBehavior: 'smooth', height: 'calc(60vh - 20px)', maxHeight: '500px' }} >
                {messageListLoading ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Spinner />
                </div>) : (<MessageList className="message-list" style={{ maxWidth: '80%', overflow: 'hidden' }} dataSource={message} onDownload={(e) => handleDownload(e)} />)}
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
                <button type="button" className="attachment-button">
                  <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                  <AttachFileIcon onClick={() => document.querySelector('.attachment-button input').click()} />
                  </button>
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