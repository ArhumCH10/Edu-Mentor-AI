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
  const [participants, setParticipants] = useState([]);
  const [otherParticipants, setOtherParticipants] = useState([]);

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
        console.log("📥 [Stream] Received remote track", {
          streamId: event.streams[0]?.id,
          trackKind: event.track?.kind,
          trackId: event.track?.id,
          streamCount: event.streams.length
        });
        setRemoteStream(event.streams[0]);
        
        // Log the remote stream details
        const stream = event.streams[0];
        if (stream) {
          console.log("📥 [Remote Stream] Details:", {
            id: stream.id,
            videoTracks: stream.getVideoTracks().length,
            audioTracks: stream.getAudioTracks().length,
            active: stream.active
          });
        }
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

    socketRef.on("ice-candidate", async ({ candidate }) => {
      console.log("📥 [ICE] Received candidate");
      await handleIceCandidate(candidate);
      await processPendingCandidates();
    });

    socketRef.on("participantsUpdate", ({ participants: roomParticipants, teacherPresent, totalParticipants }) => {
      console.log("👥 [Participants] Update received:", { roomParticipants, teacherPresent, totalParticipants });
      setParticipants(roomParticipants);
      setIsTeacherPresent(teacherPresent);
      
      const others = roomParticipants.filter(p => p.userId !== userId && p.socketId !== socketRef.id);
      setOtherParticipants(others);
      console.log("👥 [Other Participants]:", others);
    });

    socketRef.on("userJoined", ({ userId: joinedUserId, userRole: joinedRole, userName: joinedName, socketId }) => {
      console.log("🟢 [User Joined]:", { joinedUserId, joinedRole, joinedName, socketId });
    });

    socketRef.on("userLeft", ({ userId: leftUserId, userRole: leftRole, userName: leftName, socketId }) => {
      console.log("🔴 [User Left]:", { leftUserId, leftRole, leftName, socketId });
    });

    socketRef.on("studentReadyForCall", ({ userId: studentUserId, userRole: studentRole }) => {
      console.log("🔥 [CRITICAL DEBUG] studentReadyForCall received:", { studentUserId, studentRole });
      console.log("🔥 [CRITICAL DEBUG] My userRole:", userRole);
      console.log("🔥 [CRITICAL DEBUG] Condition check:", {
        'userRole === teacher': userRole === 'teacher',
        'peerConnection.current exists': !!peerConnection.current,
        'hasJoined': hasJoined,
        'full condition': userRole === 'teacher' && peerConnection.current && hasJoined
      });
      
      console.log("🟢 [Student Ready]:", { studentUserId, studentRole });
      if (userRole === 'teacher' && peerConnection.current && hasJoined) {
        console.log("👨‍🏫 Teacher detected student is ready, sending offer now");
        console.log("🔍 [Debug] Current state:", {
          hasPeerConnection: !!peerConnection.current,
          hasJoined,
          isInCall,
          userRole
        });
        
        // Send offer to the newly ready student
        const sendOfferToStudent = async () => {
          try {
            const pc = peerConnection.current;
            if (!pc) {
              console.error("❌ No peer connection available for offer");
              return;
            }

            console.log("📤 [Signaling] Creating offer for ready student");
            const offer = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true
            });

            console.log("📤 [Signaling] Setting local description");
            await pc.setLocalDescription(offer);
            
            console.log("📤 [Signaling] Sending offer to ready student", {
              offerType: offer.type,
              sdpLength: pc.localDescription.sdp.length,
              roomId: roomId
            });
            socketRef.emit("offer", {
              offer: pc.localDescription,
              roomId,
              from: userRole
            });
            
            console.log("✅ [Teacher] Offer sent successfully to student");
          } catch (error) {
            console.error("❌ [Offer] Error sending offer to student:", error);
          }
        };
        
        sendOfferToStudent();
      } else {
        console.log("⚠️ [Student Ready] Teacher not ready to send offer:", {
          isTeacher: userRole === 'teacher',
          hasPeerConnection: !!peerConnection.current,
          hasJoined,
          userRole
        });
      }
    });

    return () => {
      socketRef.off("ice-candidate");
      socketRef.off("participantsUpdate");
      socketRef.off("userJoined");
      socketRef.off("userLeft");
      socketRef.off("studentReadyForCall");
      pendingIceCandidates.current = [];
    };
  }, [roomId, userId, userName, userRole, handleIceCandidate, processPendingCandidates]);

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
        const audioTrack = stream.getAudioTracks()[0];
        setIsAudioOn(audioTrack ? audioTrack.enabled : false);
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
        setIsAudioOn(false);
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setIsCameraOn(false);
      setIsAudioOn(false);
    }
  };

  const startCall = async () => {
    if (userRole !== 'teacher' || hasJoined) return;
    
    try {
      console.log("👨‍🏫 Teacher initiating call");
      
      // Set joined state early to ensure we can respond to student ready signals
      setHasJoined(true);
      setIsInCall(true);
      console.log("✅ [Teacher] Set hasJoined=true and isInCall=true");
      
      // Ensure we have media stream before starting call
      if (!localStream) {
        console.log("📹 [Media] Getting user media for teacher");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
        
        // Set camera and audio state based on actual tracks
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        setIsCameraOn(videoTrack ? videoTrack.enabled : false);
        setIsAudioOn(audioTrack ? audioTrack.enabled : false);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          console.log("📹 [Teacher] Local video ref updated with stream");
        }
      } else {
        // If we already have a stream, make sure the video ref is set
        if (localVideoRef.current && !localVideoRef.current.srcObject) {
          localVideoRef.current.srcObject = localStream;
          console.log("📹 [Teacher] Local video ref updated with existing stream");
        }
      }
      
      const pc = createPeerConnection();
      if (!pc) throw new Error("Failed to create peer connection");

      console.log("📤 [Media] Adding local tracks to peer connection");
      if (localStream) {
        localStream.getTracks().forEach(track => {
          console.log(`📤 [Media] Adding ${track.kind} track to peer connection`);
          pc.addTrack(track, localStream);
        });
      }

      console.log("✅ [Teacher] Successfully entered meeting and ready for students");
      
      // Check if there are any students ready, and if so, send offer
      if (otherParticipants.some(p => p.userRole === 'student')) {
        console.log("📤 [Teacher] Students detected, sending offer now");
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        });

        console.log("📤 [Signaling] Setting local description");
        await pc.setLocalDescription(offer);
        
        console.log("📤 [Signaling] Sending offer to students");
        socket.current.emit("offer", {
          offer: pc.localDescription,
          roomId,
          from: userRole
        });
      } else {
        console.log("📤 [Teacher] No students ready yet, will send offer when student joins");
      }
      
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

  const joinCall = async () => {
    if (userRole !== 'student' || hasJoined) return;
    
    try {
      console.log("👨‍🎓 Student joining call");
      
      // Ensure we have media stream before joining call
      if (!localStream) {
        console.log("📹 [Media] Getting user media for student");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
        
        // Set camera and audio state based on actual tracks
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        setIsCameraOn(videoTrack ? videoTrack.enabled : false);
        setIsAudioOn(audioTrack ? audioTrack.enabled : false);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          console.log("📹 [Student] Local video ref updated with stream");
        }
      } else {
        // If we already have a stream, make sure the video ref is set
        if (localVideoRef.current && !localVideoRef.current.srcObject) {
          localVideoRef.current.srcObject = localStream;
          console.log("📹 [Student] Local video ref updated with existing stream");
        }
      }

      // Set state to show meeting screen
      setHasJoined(true);
      setIsInCall(true);
      
      console.log("✅ [Student] Ready for call and entered meeting - signaling readiness");
      
      // Wait a bit to ensure WebRTC handlers are set up, then notify readiness
      setTimeout(() => {
        socket.current?.emit("studentReadyForCall", {
          roomId,
          userId,
          userRole: 'student'
        });
        console.log("📤 [Student] Sent ready signal to teacher");
      }, 500);
      
    } catch (error) {
      console.error("❌ [Call] Error joining call:", error);
      setHasJoined(false);
      setIsInCall(false);
    }
  };

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
      console.log("📹 [Video Ref] Updated local video reference with stream");
      
      // Ensure camera and audio states are synced with actual track states
      const videoTrack = localStream.getVideoTracks()[0];
      const audioTrack = localStream.getAudioTracks()[0];
      
      if (videoTrack && isCameraOn !== videoTrack.enabled) {
        setIsCameraOn(videoTrack.enabled);
        console.log("📹 [State Sync] Camera state synced:", videoTrack.enabled);
      }
      
      if (audioTrack && isAudioOn !== audioTrack.enabled) {
        setIsAudioOn(audioTrack.enabled);
        console.log("🎤 [State Sync] Audio state synced:", audioTrack.enabled);
      }
    }
  }, [localStream, isCameraOn, isAudioOn]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      console.log("📹 [Remote Video] Setting remote stream for", userRole, {
        streamId: remoteStream.id,
        videoTracks: remoteStream.getVideoTracks().length,
        audioTracks: remoteStream.getAudioTracks().length,
        active: remoteStream.active
      });
      remoteVideoRef.current.srcObject = remoteStream;
    } else {
      console.log("📹 [Remote Video] No remote stream or video ref", {
        hasRemoteStream: !!remoteStream,
        hasVideoRef: !!remoteVideoRef.current,
        userRole
      });
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
    setParticipants([]);
    setOtherParticipants([]);
  };

  const handleToggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
        console.log("📹 Camera toggled:", videoTrack.enabled);
        
        if (peerConnection.current) {
          const sender = peerConnection.current.getSenders().find(s => 
            s.track && s.track.kind === 'video'
          );
          if (sender && sender.track) {
            sender.track.enabled = videoTrack.enabled;
          }
        }
      }
    }
  };

  const handleToggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
        console.log("🎤 Audio toggled:", audioTrack.enabled);
        
        if (peerConnection.current) {
          const sender = peerConnection.current.getSenders().find(s => 
            s.track && s.track.kind === 'audio'
          );
          if (sender && sender.track) {
            sender.track.enabled = audioTrack.enabled;
          }
        }
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

  useEffect(() => {
    const socketRef = socket.current;
    
    if (!socketRef) return;

    const debugSocketEvent = (eventName) => {
      socketRef.on(eventName, (data) => {
        console.log(`📥 [Socket] Received ${eventName}:`, data);
      });
    };

    ['offer', 'answer', 'ice-candidate', 'teacherStartedCall'].forEach(debugSocketEvent);

    socketRef.on("offer", async ({ offer, from }) => {
      if (userRole !== 'student') {
        console.log(`⚠️ [Offer] Ignoring offer - I am ${userRole}, offer is for students`);
        return;
      }

      console.log("🎯 [Offer] Processing offer from teacher", {
        type: offer.type,
        from: from,
        sdp: offer.sdp?.substring(0, 50) + '...',
        sdpLength: offer.sdp?.length
      });

      try {
        // Only create peer connection if we don't have one or it's closed
        let pc = peerConnection.current;
        if (!pc || pc.signalingState === 'closed') {
          console.log("🔄 [Student] Creating new peer connection for offer");
          pc = createPeerConnection();
          if (!pc) throw new Error("Failed to create peer connection");
          console.log("✅ [Student] New RTCPeerConnection created");
        } else {
          console.log("🔄 [Student] Using existing peer connection", {
            signalingState: pc.signalingState,
            connectionState: pc.connectionState
          });
        }

        // Ensure student has media before answering
        let currentStream = localStream;
        if (!currentStream) {
          console.log("📹 [Media] Getting user media for student during offer");
          currentStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
          setLocalStream(currentStream);
          setIsCameraOn(true);
          setIsAudioOn(true);
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = currentStream;
          }
        }
        
        // Clear any existing senders to avoid conflicts
        const senders = pc.getSenders();
        console.log("🧹 [Student] Clearing existing senders:", senders.length);
        for (const sender of senders) {
          try {
            pc.removeTrack(sender);
          } catch (e) {
            console.warn("⚠️ Could not remove sender:", e);
          }
        }
        
        // Add local tracks to peer connection
        console.log("📤 [Student] Adding tracks to peer connection");
        currentStream.getTracks().forEach(track => {
          console.log(`📤 [Media] Adding ${track.kind} track (${track.id}) to peer connection`);
          const sender = pc.addTrack(track, currentStream);
          console.log(`✅ [Media] Track added successfully`, { sender: !!sender });
        });

        console.log("📥 [Signaling] Setting remote description (offer)");
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        console.log("✅ [Signaling] Remote description set successfully");
        
        console.log("📤 [Signaling] Creating answer");
        const answer = await pc.createAnswer();
        console.log("✅ [Signaling] Answer created successfully");
        
        console.log("📤 [Signaling] Setting local description (answer)");
        await pc.setLocalDescription(answer);
        console.log("✅ [Signaling] Local description set successfully");
        
        console.log("📤 [Signaling] Sending answer to teacher", {
          answerType: answer.type,
          sdpLength: pc.localDescription.sdp.length,
          roomId: roomId
        });
        socketRef.emit("answer", {
          answer: pc.localDescription,
          roomId,
          from: userRole
        });

        console.log("✅ [Student] Complete answer process finished successfully");
      } catch (error) {
        console.error("❌ [Signaling] Error handling offer:", error);
        console.error("❌ [Signaling] Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
    });

    socketRef.on("answer", async ({ answer, from }) => {
      if (userRole !== 'teacher') {
        console.log(`⚠️ [Answer] Ignoring answer - I am ${userRole}, answer is for teachers`);
        return;
      }
      console.log("🎯 [Answer] Processing answer from student", { 
        from,
        answerType: answer.type,
        sdpLength: answer.sdp?.length
      });

      try {
        const pc = peerConnection.current;
        if (!pc) {
          console.error("❌ [Answer] No peer connection available");
          return;
        }

        console.log("📊 [Answer] Current peer connection state:", {
          signalingState: pc.signalingState,
          connectionState: pc.connectionState,
          iceConnectionState: pc.iceConnectionState,
          localDescription: !!pc.localDescription,
          remoteDescription: !!pc.remoteDescription
        });

        console.log("📥 [Signaling] Setting remote description (answer)");
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
        console.log("✅ [Signaling] Remote description (answer) set successfully");
        
        console.log("📦 [ICE] Processing pending candidates");
        await processPendingCandidates();
        console.log("✅ [ICE] Pending candidates processed");
        
        console.log("📊 [Answer] Final peer connection state:", {
          signalingState: pc.signalingState,
          connectionState: pc.connectionState,
          iceConnectionState: pc.iceConnectionState,
          localDescription: !!pc.localDescription,
          remoteDescription: !!pc.remoteDescription
        });
        
        console.log("✅ [Answer] Teacher-Student connection setup complete");
      } catch (error) {
        console.error("❌ [Answer] Error handling answer:", error);
        console.error("❌ [Answer] Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
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

    socketRef.emit("joinRoom", { roomId, userId, userRole, userName });
    console.log("🚪 [Room] Joining room:", { roomId, userRole, userName });

    return () => {
      ['offer', 'answer', 'ice-candidate', 'teacherStartedCall'].forEach(event => {
        socketRef.off(event);
      });
    };
  }, [userRole, createPeerConnection, localStream, roomId, userId, userName, processPendingCandidates]);

  useEffect(() => {
    return () => {
      pendingIceCandidates.current = [];
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
    };
  }, []);

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
        participants={participants}
        otherParticipants={otherParticipants}
        currentUserId={userId}
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
                      onClick={() => {
                        if (localStream) {
                          const audioTrack = localStream.getAudioTracks()[0];
                          if (audioTrack) {
                            audioTrack.enabled = !audioTrack.enabled;
                            setIsAudioOn(audioTrack.enabled);
                          }
                        } else {
                          setIsAudioOn(!isAudioOn);
                        }
                      }}
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
                    {otherParticipants.length > 0 && (
                      <p className="text-sm text-gray-400 mt-2">
                        {otherParticipants.length} participant(s) in room
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-green-500 mb-2">
                      Ready to Join!
                    </h3>
                    <p className="text-sm text-gray-400 mb-6 text-center max-w-sm">
                      Your camera and microphone are all set. You can join the meeting now.
                    </p>
                    {otherParticipants.length > 0 && (
                      <p className="text-sm text-blue-400 mb-4">
                        {otherParticipants.length} participant(s) already in room
                      </p>
                    )}
                    <button
                      onClick={userRole === 'teacher' ? startCall : joinCall}
                      className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full font-medium transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      {userRole === 'teacher' ? 'Start Call' : 'Join Now'}
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
          participants={participants}
          otherParticipants={otherParticipants}
          currentUserId={userId}
        />
      )}
    </div>
  );
}
