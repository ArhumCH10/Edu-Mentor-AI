import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import "./MessageSidebar.css";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const MessageWindow = ({ messages, activeConversation, lastSeen }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const emojiPickerRef = useRef();

  const handleEmojiClick = (emojiObject) => {
    setInputValue(prevInputValue => prevInputValue + emojiObject.emoji);
    // Removed the setShowEmojiPicker(false) to keep the emoji picker open
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="message-window">
      <div className="message-header">
        <h2>{activeConversation}</h2>
        <div className="last-seen">
    {lastSeen ? `Last seen: ${lastSeen}` : 'Not available'}
  </div>
      </div>
      <div className="message-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-item ${msg.isOwn ? "own" : ""}`}>
            <div className="message-content">{msg.content}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <button onClick={toggleEmojiPicker} type="button" className="emoji-button">
          <EmojiEmotionsIcon />
        </button>
        <button type="button" className="attachment-button">
          <AttachFileIcon />
        </button>
        <input
          type="text"
          placeholder="Type a message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="button" className="send-button">
          Send
        </button>
        <div className={`emoji-picker-container ${showEmojiPicker ? 'show' : ''}`} ref={emojiPickerRef}>
          {showEmojiPicker && (
            <div className="emoji-picker-modal">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MessageWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      isOwn: PropTypes.bool,
    })
  ).isRequired,
  activeConversation: PropTypes.string,
  lastSeen: PropTypes.string,
};

export default MessageWindow;