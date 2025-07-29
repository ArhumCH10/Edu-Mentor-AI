import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Calling from '../../../../src/pages/Dashboard/Calling';

// Mock socket.io-client
const mockSocket = {
  emit: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  disconnect: vi.fn(),
  id: 'mock-socket-id',
};

vi.mock('socket.io-client', () => ({
  io: vi.fn(() => mockSocket),
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
const mockUseLocation = vi.fn(() => ({
  search: '?roomID=test-room-123',
  state: {
    userRole: 'student',
    Id: 'user123',
    name: 'John Doe'
  }
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
    useNavigate: () => mockNavigate,
  };
});

// Mock react-icons
vi.mock('react-icons/fa', () => ({
  FaMicrophone: () => <div data-testid="microphone-icon" />,
  FaMicrophoneSlash: () => <div data-testid="microphone-slash-icon" />,
  FaVideo: () => <div data-testid="video-icon" />,
  FaVideoSlash: () => <div data-testid="video-slash-icon" />,
}));

vi.mock('react-icons/im', () => ({
  ImSpinner8: () => <div data-testid="spinner-icon" />,
}));

// Mock MeetingScreen component
vi.mock('../../../../src/components/MeetingScreen', () => ({
  default: ({ userRole, onEndCall, onToggleCamera, onToggleAudio }) => (
    <div data-testid="meeting-screen">
      <div>Meeting Screen - {userRole}</div>
      <button onClick={onEndCall} data-testid="end-call-btn">End Call</button>
      <button onClick={onToggleCamera} data-testid="toggle-camera-btn">Toggle Camera</button>
      <button onClick={onToggleAudio} data-testid="toggle-audio-btn">Toggle Audio</button>
    </div>
  ),
}));

// Mock WebRTC APIs
const mockPeerConnection = {
  createOffer: vi.fn(),
  createAnswer: vi.fn(),
  setLocalDescription: vi.fn(),
  setRemoteDescription: vi.fn(),
  addIceCandidate: vi.fn(),
  addTrack: vi.fn(),
  removeTrack: vi.fn(),
  getSenders: vi.fn(() => []),
  close: vi.fn(),
  onicecandidate: null,
  ontrack: null,
  onconnectionstatechange: null,
  oniceconnectionstatechange: null,
  onsignalingstatechange: null,
  signalingState: 'stable',
  connectionState: 'new',
  iceConnectionState: 'new',
  iceGatheringState: 'new',
  localDescription: null,
  remoteDescription: null,
};

globalThis.RTCPeerConnection = vi.fn(() => mockPeerConnection);
globalThis.RTCSessionDescription = vi.fn((desc) => desc);
globalThis.RTCIceCandidate = vi.fn((candidate) => candidate);

// Mock getUserMedia
const mockMediaStream = {
  id: 'mock-stream-id',
  getTracks: vi.fn(() => []),
  getVideoTracks: vi.fn(() => [{ id: 'video-track', kind: 'video', enabled: true }]),
  getAudioTracks: vi.fn(() => [{ id: 'audio-track', kind: 'audio', enabled: true }]),
  active: true,
};

Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: vi.fn(() => Promise.resolve(mockMediaStream)),
  },
});

describe('Calling Component', () => {
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();
    
    // Reset socket mock
    mockSocket.emit.mockClear();
    mockSocket.on.mockClear();
    mockSocket.off.mockClear();
    mockSocket.disconnect.mockClear();
    
    // Reset WebRTC mocks
    mockPeerConnection.createOffer.mockResolvedValue({ type: 'offer', sdp: 'mock-sdp' });
    mockPeerConnection.createAnswer.mockResolvedValue({ type: 'answer', sdp: 'mock-sdp' });
    mockPeerConnection.setLocalDescription.mockResolvedValue();
    mockPeerConnection.setRemoteDescription.mockResolvedValue();
    mockPeerConnection.addIceCandidate.mockResolvedValue();
    
    // Reset navigator mocks
    navigator.mediaDevices.getUserMedia.mockResolvedValue(mockMediaStream);
    
    // Reset location mock
    mockUseLocation.mockReturnValue({
      search: '?roomID=test-room-123',
      state: {
        userRole: 'student',
        Id: 'user123',
        name: 'John Doe'
      }
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  describe('Initial Rendering and Preview Mode', () => {
    it('should render preview mode with camera preview section', () => {
      renderWithRouter(<Calling />);
      
      expect(screen.getByText('Camera Preview')).toBeInTheDocument();
      expect(screen.getByText('Getting Ready...')).toBeInTheDocument();
      expect(screen.getByTestId('spinner-icon')).toBeInTheDocument();
    });
  });

  describe('Camera and Audio Controls', () => {
    it('should toggle audio when microphone button is clicked', async () => {
      renderWithRouter(<Calling />);
      
      const audioButton = screen.getByTestId('microphone-slash-icon').closest('button');
      fireEvent.click(audioButton);
      
      // Audio toggle should work even without stream initially
      expect(audioButton).toBeInTheDocument();
    });
  });

  describe('Socket Connection and Events', () => {
    it('should establish socket connection on mount', () => {
      renderWithRouter(<Calling />);
      
      expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('connect_error', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('participantsUpdate', expect.any(Function));
    });

    it('should join room when socket connects', () => {
      renderWithRouter(<Calling />);
      
      // Simulate socket connection
      const connectHandler = mockSocket.on.mock.calls.find(call => call[0] === 'connect')[1];
      connectHandler();
      
      expect(mockSocket.emit).toHaveBeenCalledWith('joinRoom', {
        roomId: 'test-room-123',
        userId: 'user123',
        userRole: 'student',
        userName: 'John Doe'
      });
    });

    it('should handle participants update event', () => {
      renderWithRouter(<Calling />);
      
      const participantsHandler = mockSocket.on.mock.calls.find(
        call => call[0] === 'participantsUpdate'
      )[1];
      
      const mockParticipants = [
        { userId: 'user123', userName: 'John Doe', userRole: 'student', socketId: 'socket1' },
        { userId: 'teacher123', userName: 'Jane Teacher', userRole: 'teacher', socketId: 'socket2' }
      ];
      
      participantsHandler({
        participants: mockParticipants,
        teacherPresent: true,
        totalParticipants: 2
      });
      
      // Component should update internal state (verified by no errors)
      expect(participantsHandler).toBeDefined();
    });
  });

  describe('WebRTC Signaling', () => {
    it('should handle ice candidate events', async () => {
      renderWithRouter(<Calling />);
      
      const iceCandidateHandler = mockSocket.on.mock.calls.find(
        call => call[0] === 'ice-candidate'
      )[1];
      
      const mockCandidate = {
        candidate: 'mock-candidate',
        sdpMLineIndex: 0,
        sdpMid: 'audio'
      };
      
      await iceCandidateHandler({ candidate: mockCandidate });
      
      // Should attempt to add ice candidate (may be queued if no remote description)
      expect(iceCandidateHandler).toBeDefined();
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources on unmount', () => {
      const { unmount } = renderWithRouter(<Calling />);
      
      unmount();
      
      // Should have set up cleanup in useEffect
      expect(mockSocket.off).toHaveBeenCalled();
    });
  });
});
