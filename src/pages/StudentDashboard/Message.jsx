import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useState } from "react";
import './MessageSidebar.css';
import PropTypes from 'prop-types';
import MessageWindow from "./MessageWindow";

const ChatItem = ({ name, messagePreview, timeAgo, onClick, activeChat }) => (
  <div className={`chat-item ${activeChat ? 'active-chat' : ''}`} onClick={onClick}>
    <div className="avatar">{name[0]}</div>
    <div className="chat-info">
      <h2 className="chat-name">{name}</h2>
      <p className="chat-preview">{messagePreview}</p>
    </div>
    <span className="chat-time">{timeAgo}</span>
  </div>
);

function Message() {

  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const messages = [
    { id: 1, name: 'noahruscher', time: '1 month', messagePreview: 'Me: Alright no pr...' },
    { id: 2, name: 'Sam L', time: '3 months', messagePreview: 'Me: But for insta...' },
    { id: 3, name: 'Bilal M', time: '3 months', messagePreview: 'Me: Ok' },
    { id: 4, name: 'williamfox_', time: '3 months', messagePreview: 'Me: Which invol...' },
    { id: 5, name: 'williamfox_', time: '3 months', messagePreview: 'Me: Which invol...' },
    { id: 6, name: 'williamfox_', time: '3 months', messagePreview: 'Me: Which invol...' },
    { id: 7, name: 'williamfox_', time: '3 months', messagePreview: 'Me: Which invol...' },
    { id: 8, name: 'williamfox_', time: '3 months', messagePreview: 'Me: Which invol...' }
  ];

  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChatMessages = filteredMessages.filter((message) => message.id === selectedChatId);

  console.log(selectedChatMessages);
  return (
    <>
    <Row type="horizontal">
      <Heading as="head1">My Chats</Heading>
    </Row>
    <div className="row-horizontal">
    <div className="sidebar">
    <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            value={searchQuery}
            className="search-input"
          />
<ul className="chat-list">
            {filteredMessages.map((message) => (
              <ChatItem 
                key={message.id}
                name={message.name}
                messagePreview={message.messagePreview}
                timeAgo={message.time}
                onClick={() => handleChatClick(message.id)}
                activeChat={message.id === selectedChatId}
              />
            ))}
          </ul>
    </div>
    <div className="message-window-container">
    {selectedChatId ? (
      <MessageWindow 
  messages={selectedChatMessages} 
  activeConversation={selectedChatMessages.length > 0 ? selectedChatMessages[0].name : null}
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
};

export default Message;