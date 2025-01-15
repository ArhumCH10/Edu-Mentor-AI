import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import MeetingScreen from '../../components/MeetingScreen';

export default function Calling() {
  const [isPreview] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isTeacherPresent, setIsTeacherPresent] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInCall, setIsInCall] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);
  const pendingIceCandidates = useRef([]);
  
  const location = useLocation();
  const userRole = location?.state?.userRole;
  const userId = location?.state?.Id;
  const userName = location?.state?.name;
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get('roomID');

  const createPeerConnection = useCallback(() => {
    try {
      console.log("🔄 [PeerConnection] Creating new RTCPeerConnection");
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      });

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(`📤 [ICE] Sending candidate from ${userRole}`);
          socket.current?.emit("ice-candidate", {
            candidate: event.candidate,
            roomId,
            from: userRole
          });
        }
      };

      pc.ontrack = (event) => {
        console.log("📥 [Stream] Received remote track");
        setRemoteStream(event.streams[0]);
      };

      peerConnection.current = pc;
      return pc;
    } catch (error) {
      console.error("❌ [PeerConnection] Error:", error);
      return null;
    }
  }, [roomId, userRole]);

  const handleIceCandidate = useCallback(async (candidate, isFromQueue = false) => {
    const pc = peerConnection.current;
    
    if (!pc || pc.signalingState === 'closed') {
      console.warn("⚠️ [ICE] PeerConnection not available or closed");
      return;
    }

    try {
      if (!pc.remoteDescription) {
        console.log("📦 [ICE] Queueing candidate - remote description not set");
        pendingIceCandidates.current.push(candidate);
        return;
      }

      await pc.addIceCandidate(new RTCIceCandidate(candidate));
      console.log("✅ [ICE] Successfully added candidate");
    } catch (error) {
      console.error("❌ [ICE] Error handling candidate:", error);
    }
  }, []);

  const processPendingCandidates = useCallback(async () => {
    const pc = peerConnection.current;
    if (!pc || !pc.remoteDescription) return;

    console.log(`📤 [ICE] Processing ${pendingIceCandidates.current.length} queued candidates`);
    
    while (pendingIceCandidates.current.length > 0) {
      const candidate = pendingIceCandidates.current.shift();
      await handleIceCandidate(candidate, true);
    }
  }, [handleIceCandidate]);

  const handleOffer = useCallback(async (offer) => {
    if (userRole !== 'student') return;
    console.log("📥 [Signaling] Received offer");

    try {
      const pc = createPeerConnection();
      if (!pc) throw new Error("Failed to create peer connection");

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      console.log("✅ Remote description set");

      await processPendingCandidates();

      if (localStream) {
        localStream.getTracks().forEach(track => {
          pc.addTrack(track, localStream);
        });
      }

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.current?.emit("answer", {
        answer: pc.localDescription,
        roomId,
        from: userRole
      });

      setIsInCall(true);
    } catch (error) {
      console.error("❌ [Signaling] Error handling offer:", error);
    }
  }, [createPeerConnection, localStream, processPendingCandidates, roomId, userRole]);

  useEffect(() => {
    socket.current = io("http://localhost:8000", {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      cors: {
        origin: "http://localhost:5173",
        credentials: true
      }
    });

    const socketRef = socket.current;

    socketRef.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socketRef.on("connect", () => {
      console.log("🔌 Socket connected:", socketRef.id);
      if (roomId && userRole && userName) {
        socketRef.emit("joinRoom", { roomId, userId, userRole, userName });
      }
    });

    socketRef.on("offer", async ({ offer }) => {
      await handleOffer(offer);
    });

    socketRef.on("ice-candidate", async ({ candidate }) => {
      console.log("📥 [ICE] Received candidate");
      await handleIceCandidate(candidate);
      await processPendingCandidates();
    });

    return () => {
      socketRef.off("offer");
      socketRef.off("ice-candidate");
      pendingIceCandidates.current = [];
    };
  }, [roomId, userId, userName, userRole, handleOffer, processPendingCandidates, handleIceCandidate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const startPreview = async () => {
    try {
      if (!isCameraOn) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setLocalStream(stream);
        setIsCameraOn(true);
        console.log("Local stream started:", stream.id);
      } else {
        if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
        }
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = null;
        }
        setLocalStream(null);
        setIsCameraOn(false);
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setIsCameraOn(false);
    }
  };

  const startCall = async () => {
    if (userRole !== 'teacher' || hasJoined) return;
    
    try {
      console.log("👨‍🏫 Teacher initiating call");
      const pc = createPeerConnection();
      if (!pc) throw new Error("Failed to create peer connection");

      console.log("📤 [Media] Adding local tracks to peer connection");
      if (localStream) {
        localStream.getTracks().forEach(track => {
          console.log(`📤 [Media] Adding ${track.kind} track to peer connection`);
          pc.addTrack(track, localStream);
        });
      }

      console.log("📤 [Signaling] Creating offer");
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });

      console.log("📤 [Signaling] Setting local description");
      await pc.setLocalDescription(offer);
      
      console.log("📤 [Signaling] Sending offer");
      socket.current.emit("offer", {
        offer: pc.localDescription,
        roomId,
        from: userRole
      });

      setHasJoined(true);
      setIsInCall(true);
    } catch (error) {
      console.error("❌ [Call] Error starting call:", error);
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
      setHasJoined(false);
      setIsInCall(false);
    }
  };

  // Add this to monitor connection state changes
  useEffect(() => {
    const pc = peerConnection.current;
    if (!pc) return;

    const logConnectionState = () => {
      console.log('📊 [Connection Status]', {
        connectionState: pc.connectionState,
        iceConnectionState: pc.iceConnectionState,
        signalingState: pc.signalingState,
        iceGatheringState: pc.iceGatheringState
      });
    };

    pc.onconnectionstatechange = logConnectionState;
    pc.oniceconnectionstatechange = logConnectionState;
    pc.onsignalingstatechange = logConnectionState;

    // Initial log
    logConnectionState();

    return () => {
      pc.onconnectionstatechange = null;
      pc.oniceconnectionstatechange = null;
      pc.onsignalingstatechange = null;
    };
  }, []);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      console.log("Setting remote stream for", userRole);
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, userRole]);

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
      setLocalStream(null);
    }
    
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    
    socket.current?.disconnect();
    setIsInCall(false);
    setHasJoined(false);
    setIsCameraOn(false);
    setIsAudioOn(false);
    setIsTeacherPresent(false);
    setRemoteStream(null);
  };

  const handleToggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  const handleToggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  useEffect(() => {
    const socketRef = socket.current;
    
    if (!socketRef) return;

    socketRef.on("teacherPresent", (isPresent) => {
      console.log("Teacher presence update:", isPresent);
      setIsTeacherPresent(isPresent);
    });

    socketRef.on("teacherStartedCall", () => {
      console.log("Teacher started call");
      setIsTeacherPresent(true);
    });

    socketRef.on("teacherLeft", () => {
      console.log("Teacher left");
      setIsTeacherPresent(false);
    });

    return () => {
      socketRef.off("teacherPresent");
      socketRef.off("teacherStartedCall");
      socketRef.off("teacherLeft");
    };
  }, []);

  // Add debugging for socket events
  useEffect(() => {
    const socketRef = socket.current;
    
    if (!socketRef) return;

    // Debug all incoming socket messages
    const debugSocketEvent = (eventName) => {
      socketRef.on(eventName, (data) => {
        console.log(`📥 [Socket] Received ${eventName}:`, data);
      });
    };

    // Debug specific events
    ['offer', 'answer', 'ice-candidate', 'teacherStartedCall'].forEach(debugSocketEvent);

    socketRef.on("offer", async ({ offer }) => {
      if (userRole !== 'student') return;

      console.log("🎯 [Offer] Processing offer from teacher", {
        type: offer.type,
        sdp: offer.sdp?.substring(0, 50) + '...'
      });

      try {
        const pc = createPeerConnection();
        if (!pc) throw new Error("Failed to create peer connection");

        console.log("🔄 [PeerConnection] Created new RTCPeerConnection for student");

        if (!localStream) {
          console.log("📹 [Media] Getting user media for student");
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
          setLocalStream(stream);
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          
          stream.getTracks().forEach(track => {
            console.log(`📤 [Media] Adding ${track.kind} track to peer connection`);
            pc.addTrack(track, stream);
          });
        }

        console.log("📥 [Signaling] Setting remote description (offer)");
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        
        console.log("📤 [Signaling] Creating answer");
        const answer = await pc.createAnswer();
        
        console.log("📤 [Signaling] Setting local description (answer)");
        await pc.setLocalDescription(answer);
        
        console.log("📤 [Signaling] Sending answer to teacher");
        socketRef.emit("answer", {
          answer: pc.localDescription,
          roomId,
          from: userRole
        });

        setIsInCall(true);
      } catch (error) {
        console.error("❌ [Signaling] Error handling offer:", error);
      }
    });

    socketRef.on("ice-candidate", async ({ candidate }) => {
      if (!peerConnection.current) {
        console.warn("⚠️ [ICE] Received candidate but no peer connection exists");
        return;
      }

      try {
        console.log("📥 [ICE] Processing candidate:", candidate);
        await peerConnection.current.addIceCandidate(candidate);
        console.log("✅ [ICE] Successfully added candidate");
      } catch (error) {
        console.error("❌ [ICE] Error adding ICE candidate:", error);
      }
    });

    // Log when joining room
    socketRef.emit("joinRoom", { roomId, userId, userRole, userName });
    console.log("🚪 [Room] Joining room:", { roomId, userRole, userName });

    return () => {
      ['offer', 'answer', 'ice-candidate', 'teacherStartedCall'].forEach(event => {
        socketRef.off(event);
      });
    };
  }, [userRole, createPeerConnection, localStream, roomId, userId, userName]);

  // Add cleanup effect
  useEffect(() => {
    return () => {
      pendingIceCandidates.current = [];
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
    };
  }, []);

  // Render meeting screen when in call
  if (isInCall) {
    return (
      <MeetingScreen
        localStream={localStream}
        remoteStream={remoteStream}
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
        userRole={userRole}
        roomId={roomId}
        onEndCall={handleEndCall}
        isCameraOn={isCameraOn}
        isAudioOn={isAudioOn}
        onToggleCamera={handleToggleCamera}
        onToggleAudio={handleToggleAudio}
        isTeacherPresent={userRole === 'teacher' || isTeacherPresent}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {isPreview ? (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl">
            <div className="flex flex-col md:flex-row h-[500px]">
              <div className="md:w-1/2 p-6">
                <h3 className="text-lg font-medium text-gray-300 mb-4">
                  Camera Preview
                </h3>
                <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden mb-4">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${!isCameraOn ? 'hidden' : ''}`}
                  />
                  {!isCameraOn && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <FaVideoSlash className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Camera is off</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                    <button
                      onClick={() => setIsAudioOn(!isAudioOn)}
                      className={`p-3 rounded-full transition-all shadow-lg ${
                        isAudioOn 
                          ? 'border border-green-500 bg-gray-800 text-white' 
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {isAudioOn ? <FaMicrophone size={16} /> : <FaMicrophoneSlash size={16} />}
                    </button>
                    <button
                      onClick={startPreview}
                      className={`p-3 rounded-full transition-all shadow-lg ${
                        isCameraOn 
                          ? 'border border-green-500 bg-gray-800 text-white' 
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {isCameraOn ? <FaVideo size={16} /> : <FaVideoSlash size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 p-6 flex flex-col items-center justify-center border-l border-gray-700">
                {isLoading ? (
                  <>
                    <h3 className="text-lg font-medium text-gray-300 mb-3">
                      Getting Ready...
                    </h3>
                    <ImSpinner8 className="w-8 h-8 text-green-500 animate-spin" />
                  </>
                ) : userRole === 'student' && !isTeacherPresent ? (
                  <>
                    <h3 className="text-lg font-medium text-gray-300 mb-3">
                      Waiting for teacher to join...
                    </h3>
                    <ImSpinner8 className="w-8 h-8 text-green-500 animate-spin" />
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-green-500 mb-2">
                      Ready to Join!
                    </h3>
                    <p className="text-sm text-gray-400 mb-6 text-center max-w-sm">
                      Your camera and microphone are all set. You can join the meeting now.
                    </p>
                    <button
                      onClick={startCall}
                      className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      Join Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MeetingScreen
          localVideoRef={localVideoRef}
          remoteVideoRef={remoteVideoRef}
          remoteStream={remoteStream}
          onEndCall={handleEndCall}
          isCameraOn={isCameraOn}
          isAudioOn={isAudioOn}
          onToggleCamera={startPreview}
          onToggleAudio={() => setIsAudioOn(!isAudioOn)}
          userRole={userRole}
          isTeacherPresent={isTeacherPresent}
        />
      )}
    </div>
  );
}
