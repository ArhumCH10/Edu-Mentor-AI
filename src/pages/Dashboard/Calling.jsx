import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

const ICE_SERVERS = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

function randomID(len) {
  let result = "";
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length;
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function Calling() {
  const location = useLocation();
  const urlParams = getUrlParams();
  const userId = location?.state?.Id;
  const role = location?.state?.userRole;
  const roomId = urlParams.get("roomID") || randomID(5);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.emit("joinRoom", { roomId, userId });

    socket.current.on("offer", handleOffer);
    socket.current.on("answer", handleAnswer);
    socket.current.on("ice-candidate", handleNewICECandidateMsg);

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      socket.current.disconnect();
    };
  }, []);

  const handleOffer = async (offer) => {
    if (!peerConnection.current) createPeerConnection();

    await peerConnection.current.setRemoteDescription(offer);

    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    socket.current.emit("answer", { answer, roomId });
  };

  const handleAnswer = async (answer) => {
    await peerConnection.current.setRemoteDescription(answer);
  };

  const handleNewICECandidateMsg = async (candidate) => {
    try {
      await peerConnection.current.addIceCandidate(candidate);
    } catch (error) {
      console.error("Error adding received ice candidate", error);
    }
  };

  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection(ICE_SERVERS);

    const localStream = localVideoRef.current.srcObject;
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    peerConnection.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", {
          candidate: event.candidate,
          roomId,
        });
      }
    };
  };

  const startCall = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = localStream;

    createPeerConnection();

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    socket.current.emit("offer", { offer, roomId });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#3661a0] to-[#57cbf5]">
      <h3 className="text-3xl font-sans text-white mb-6">
        {role === "teacher" ? "Teacher" : "Student"} Room
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-72 h-72 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white text-lg font-sans">
              Your Video Preview
            </span>
          </div>
        </div>
        {remoteStream && (
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            <video
              ref={remoteVideoRef}
              autoPlay
              className="w-72 h-72 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-lg font-sans">Remote Video</span>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={startCall}
        className="mt-6 px-6 py-3 bg-[rgb(25,228,52)] text-white rounded-lg shadow-lg hover:bg-green-600 transition font-sans"
      >
        Start Call
      </button>
    </div>
  );
}
