import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useState } from "react";
import './MessageSidebar.css';
import PropTypes from 'prop-types';
import MessageWindow from "./MessageWindow";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from "react-bootstrap";

const ChatItem = ({ name, messagePreview, timeAgo, profilePic, onClick, activeChat }) => (
  <div className={`chat-item ${activeChat ? 'active-chat' : ''}`} onClick={onClick}>
    <div className="avatar">
      {profilePic ? (
        <img height={60} width={60} src={`http://localhost:8080/${profilePic}`} alt="Profile" />
      ) : (
        name[0]
      )}
    </div>
    <div className="chat-info">
      <h2 className="chat-name">{name}</h2>
      <p className="chat-preview">{messagePreview}</p>
    </div>
    <span className="chat-time">{timeAgo}</span>
  </div>
);

function Message() {

  const [loading, seatLoading] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const handleChatClick = (chatId) => {
    if(chatId !== selectedChatId){
      setSelectedChatId(chatId);
      fetchMessages(chatId)
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const userId = userData._id;
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
    } 
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    const studentId = userData._id;
    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/student/${studentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        toast.error(error);
        console.error(error);

      } finally {
        seatLoading(false);
      }
    };

    fetchConversations();
  }, []);



  const filteredMessages = conversations.map(conversation => ({
    id: conversation._id, 
    name: `${conversation.teacherFirstName} ${conversation.teacherLastName} `,
    time: 'Time placeholder',
    messagePreview: 'Message placeholder',
    profilePic: conversation.teacherProfilePicture,
  })).filter(message => message.name.toLowerCase().includes(searchQuery.toLowerCase()));


  const [messages, setMessages] = useState([]);

  const selectedChatMessages = filteredMessages.filter((message) => message.id === selectedChatId);
  return (
    <>
      <Row type="horizontal">
        <Heading as="head1">My Chats</Heading>
      </Row>
      <div className="row-horizontal">
        <div className="message-sidebar">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            value={searchQuery}
            className="search-input"
          />
          {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spinner />
      </div> :
            <ul className="chat-list">
              {
                filteredMessages.map((message) => (
                  <ChatItem
                    key={message.id}
                    name={message.name}
                    messagePreview={message.messagePreview}
                    timeAgo={message.time}
                    profilePic={message.profilePic}
                    onClick={() => handleChatClick(message.id)}
                    activeChat={message.id === selectedChatId}
                  />
                ))
              }
            </ul>
          }
        </div>
        <div className="message-window-container">
          {selectedChatId ? (
            <MessageWindow
              messages={messages} selectedChatId={selectedChatId} setMessages={setMessages}
              activeConversation={messages.length > 0 ? selectedChatMessages[0].name : null}
              lastSeen="April 10, 10:45 AM"
            />
          ) : (
            <div className="nochat-container">
              <img className="chatting-pic" src="/public/chat.png" />
              <p className="text-pic">Pick up where you left off</p>
              <p className="down-pic">Select a conversation and chat away.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

ChatItem.propTypes = {
  name: PropTypes.string.isRequired, // Define the prop types like this
  messagePreview: PropTypes.string.isRequired,
  timeAgo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeChat: PropTypes.string.isRequired,
  profilePic: PropTypes.string,
};

export default Message;