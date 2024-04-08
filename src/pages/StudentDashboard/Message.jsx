import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import './MessageSidebar.css';
import PropTypes from 'prop-types';
import MessageWindow from "./MessageWindow";

const ChatItem = ({ name, messagePreview, timeAgo }) => (
  <div className="chat-item">
    <div className="avatar">{name[0]}</div>
    <div className="chat-info">
      <h2 className="chat-name">{name}</h2>
      <p className="chat-preview">{messagePreview}</p>
    </div>
    <span className="chat-time">{timeAgo}</span>
  </div>
);

function Message() {

  const data = [
    {
      id: 1,
      senderName: 'noahruscher',
      time: '1 month ago',
      messageContent: 'Alright no problem, have a great day!',
      isOwn: true,
      status: 'read'
    },
    {
      id: 2,
      senderName: 'Sam L',
      time: '3 months ago',
      messageContent: 'But for instance, if we look at the data from another perspective...',
      isOwn: false,
      status: 'received'
    },
    {
      id: 3,
      senderName: 'Bilal M',
      time: '3 months ago',
      messageContent: 'Ok, let me check and I will get back to you.',
      isOwn: false,
      status: 'sent'
    },
    {
      id: 4,
      senderName: 'williamfox_',
      time: '3 months ago',
      messageContent: 'Which involves more risk, option A or option B?',
      isOwn: true,
      status: 'read'
    },
    // Add additional message objects as needed
  ];
  

  const messages = [
    { id: 1, name: 'noahruscher', time: '1 month', messagePreview: 'Me: Alright no pr...' },
    { id: 2, name: 'Sam L', time: '3 months', messagePreview: 'Me: But for insta...' },
    { id: 3, name: 'Bilal M', time: '3 months', messagePreview: 'Me: Ok' },
    { id: 4, name: 'williamfox_', time: '3 months', messagePreview: 'Me: Which invol...' }
  ];
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">My Chats</Heading>
    </Row>
    <div className="row-horizontal">
    <div className="sidebar">
      <ul className="message-list">
        {messages.map((message) => (
        <ChatItem 
        key={message.id}
        name={message.name}
        messagePreview={message.messagePreview}
        timeAgo={message.time}
      />
        ))}
      </ul>
    </div>
    <div className="message-window-container">
        <MessageWindow messages={data} />
      </div>
    </div>
    </>
  );
}

ChatItem.propTypes = {
  name: PropTypes.string.isRequired, // Define the prop types like this
  messagePreview: PropTypes.string.isRequired,
  timeAgo: PropTypes.string.isRequired,
};

export default Message;