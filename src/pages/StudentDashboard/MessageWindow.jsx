import PropTypes from 'prop-types';
import './MessageSidebar.css';

const MessageWindow = ({ messages }) => (
  <div className="message-window">
    <div className="message-header">
      <h2>Conversation Name</h2>
    </div>
    <div className="message-body">
      {messages.map((msg) => (
        <div key={msg.id} className={`message-item ${msg.isOwn ? 'own' : ''}`}>
          <div className="message-content">{msg.content}</div>
          <div className="message-time">{msg.time}</div>
        </div>
      ))}
    </div>
    <div className="message-input">
      <input type="text" placeholder="Type a message" />
      <button type="button">Send</button>
    </div>
  </div>
);

MessageWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      isOwn: PropTypes.bool,
    })
  ).isRequired,
};

export default MessageWindow;
