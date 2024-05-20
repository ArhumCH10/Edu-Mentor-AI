import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./MessageSidebar.css";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { MessageList } from "react-chat-elements";
import { toast } from 'react-toastify';
import axios from 'axios';

const MessageWindow = ({ messages, activeConversation, selectedChatId, lastSeen, socket, receiverId }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [localMessages, setLocalMessages] = useState(messages);
  const [file, setFile] = useState(null); 
  const [messageType, setMessageType] = useState("text");
  const emojiPickerRef = useRef();
  const messageBodyRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const scrollToBottom = () => {
    if (messageBodyRef.current) {
      messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInputValue(prevInputValue => prevInputValue + emojiObject.emoji);
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
      if (!selectedChatId) {
        toast.error('Please select a chat');
        return;
      }

      const userDataString = localStorage.getItem('user');
      const userData = JSON.parse(userDataString);
      const senderId = userData._id;

      let messageData;

      if (messageType === 'text') {
        messageData = {
          conversationId: selectedChatId,
          recieverId: receiverId,
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
          conversationId: selectedChatId,
          recieverId: receiverId,
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

      toast.success('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  const handleDownload = (message) => {
    if (message.type === 'file' && message.data && message.data.uri  || message.type === 'photo' || message.type === 'video') {
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
    <div className="message-window">
      <div className="message-header">
        <h2>{activeConversation}</h2>
        <div className="last-seen">
          {lastSeen ? `Last seen: ${lastSeen}` : 'Not available'}
        </div>
      </div>
      <div className="message-body" ref={messageBodyRef} style={{ scrollBehavior: 'smooth', height: 'calc(60vh - 20px)', maxHeight: '500px' }}>
        <MessageList className="message-list" lockable={false} dataSource={localMessages} 
        onDownload={ (e) => handleDownload(e)}
        // onClick={(e) => {
        //   console.log('onclick: ', e)
        //   handleDownload(e)
        // }}
        

         />
      </div>
      <div className="message-input">
        <button onClick={toggleEmojiPicker} type="button" className="emoji-button">
          <EmojiEmotionsIcon />
        </button>
        <button type="button" className="attachment-button">
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          <AttachFileIcon onClick={() => document.querySelector('.attachment-button input').click()} />

        </button>
        <input
          type="text"
          placeholder="Type a message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button type="button" className="send-button" onClick={handleSend}>
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
    })
  ).isRequired,
  activeConversation: PropTypes.string.isRequired,
  lastSeen: PropTypes.string,
  socket: PropTypes.object.isRequired,
  selectedChatId: PropTypes.string,
  receiverId: PropTypes.string,
};

export default MessageWindow;
