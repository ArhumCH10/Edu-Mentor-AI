import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash, FaDesktop } from 'react-icons/fa';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

export default function MeetingScreen({ 
  localVideoRef, 
  remoteVideoRef, 
  remoteStream = null,
  onEndCall, 
  isCameraOn, 
  isAudioOn, 
  onToggleCamera, 
  onToggleAudio,
  userRole,
  isTeacherPresent 
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const roomId = new URLSearchParams(location.search).get('roomID');

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData).userData);
    }

    return () => clearInterval(timer);
  }, []);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const startScreenShare = async () => {
    try {
      await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      // You'll need to implement the logic to send this stream to the peer
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-3 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm font-medium">
            {format(currentTime, 'hh:mm a')}
          </span>
          <div className="h-4 w-px bg-gray-700" />
          <span className="text-gray-400 text-sm">
            Meeting ID: {roomId || 'N/A'}
          </span>
          <div className="h-4 w-px bg-gray-700" />
          <span className={`text-sm ${userRole === 'teacher' ? 'text-blue-400' : 'text-green-400'}`}>
            {userRole === 'teacher' ? 'Teacher' : 'Student'}
          </span>
          {!isTeacherPresent && userRole === 'student' && (
            <span className="text-yellow-400 text-sm ml-4">
              Waiting for teacher...
            </span>
          )}
        </div>
      </div>

      {/* Main content with video streams */}
      <div className="flex-1 p-6 relative flex flex-col">
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* Local video */}
          <div className="relative rounded-xl overflow-hidden bg-gray-800">
            <div className="absolute inset-0">
              {isCameraOn ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-2xl font-medium">
                      {userData ? getInitials(userData.firstName, userData.lastName) : ''}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Remote video */}
          {remoteStream ? (
            <div className="relative rounded-xl overflow-hidden bg-gray-800">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                <span className="text-white text-sm">
                  {userRole === 'teacher' ? 'Student' : 'Teacher'}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-gray-700 rounded-xl">
              <p className="text-gray-400">Waiting for other participant...</p>
            </div>
          )}
        </div>
      </div>

      {/* Controls - Fixed at bottom */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-screen-sm mx-auto py-4 px-6 flex justify-center items-center space-x-4">
          <button
            onClick={onToggleAudio}
            className={`p-4 rounded-full transition-all ${
              isAudioOn 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-red-500 hover:bg-red-600'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              isAudioOn ? 'focus:ring-gray-400' : 'focus:ring-red-500'
            }`}
          >
            {isAudioOn ? (
              <FaMicrophone className="w-5 h-5 text-white" />
            ) : (
              <FaMicrophoneSlash className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            onClick={onToggleCamera}
            className={`p-4 rounded-full transition-all ${
              isCameraOn 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-red-500 hover:bg-red-600'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              isCameraOn ? 'focus:ring-gray-400' : 'focus:ring-red-500'
            }`}
          >
            {isCameraOn ? (
              <FaVideo className="w-5 h-5 text-white" />
            ) : (
              <FaVideoSlash className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            onClick={startScreenShare}
            className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <FaDesktop className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={onEndCall}
            className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <FaPhoneSlash className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

MeetingScreen.propTypes = {
  localStream: PropTypes.object,
  remoteStream: PropTypes.object,
  localVideoRef: PropTypes.object.isRequired,
  remoteVideoRef: PropTypes.object.isRequired,
  userRole: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  onEndCall: PropTypes.func.isRequired,
  isCameraOn: PropTypes.bool.isRequired,
  isAudioOn: PropTypes.bool.isRequired,
  onToggleCamera: PropTypes.func.isRequired,
  onToggleAudio: PropTypes.func.isRequired,
  isTeacherPresent: PropTypes.bool.isRequired
}; 