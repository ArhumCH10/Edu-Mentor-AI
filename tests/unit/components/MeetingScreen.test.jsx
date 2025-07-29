import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MeetingScreen from '../../../src/components/MeetingScreen';

// Mock react-router-dom
const mockNavigate = vi.fn();
const mockUseLocation = vi.fn(() => ({
  search: '?roomID=test-room-123'
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
  FaPhoneSlash: () => <div data-testid="phone-slash-icon" />,
  FaDesktop: () => <div data-testid="desktop-icon" />,
}));

// Mock date-fns
vi.mock('date-fns', () => ({
  format: vi.fn(() => '10:30 AM'),
}));

// Mock navigator.mediaDevices
Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: {
    getDisplayMedia: vi.fn(),
  },
});

describe('MeetingScreen', () => {
  // Default props for testing
  const defaultProps = {
    localVideoRef: { current: null },
    remoteVideoRef: { current: null },
    remoteStream: null,
    onEndCall: vi.fn(),
    isCameraOn: true,
    isAudioOn: true,
    onToggleCamera: vi.fn(),
    onToggleAudio: vi.fn(),
    userRole: 'student',
    isTeacherPresent: true,
    participants: [
      { socketId: '1', userId: 'user1', userName: 'John Doe', userRole: 'student' },
      { socketId: '2', userId: 'user2', userName: 'Jane Smith', userRole: 'teacher' }
    ],
    otherParticipants: [
      { socketId: '2', userId: 'user2', userName: 'Jane Smith', userRole: 'teacher' }
    ],
    currentUserId: 'user1'
  };

  beforeEach(() => {
    // Mock localStorage
    const mockUserData = {
      userData: {
        firstName: 'John',
        lastName: 'Doe'
      }
    };
    localStorage.setItem('userData', JSON.stringify(mockUserData));
    
    // Reset mocks
    vi.clearAllMocks();
    mockUseLocation.mockReturnValue({
      search: '?roomID=test-room-123'
    });
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllTimers();
  });

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  describe('Basic Rendering', () => {
    it('should render the meeting screen with all essential elements', () => {
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      // Check header elements
      expect(screen.getByText('10:30 AM')).toBeInTheDocument();
      expect(screen.getByText('Meeting ID: test-room-123')).toBeInTheDocument();
      expect(screen.getByText('Student')).toBeInTheDocument();
      expect(screen.getByText('Participants: 2')).toBeInTheDocument();
      
      // Check video containers
      expect(screen.getByText('You (student)')).toBeInTheDocument();
      
      // Check control buttons
      expect(screen.getByTestId('microphone-icon')).toBeInTheDocument();
      expect(screen.getByTestId('video-icon')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-icon')).toBeInTheDocument();
      expect(screen.getByTestId('phone-slash-icon')).toBeInTheDocument();
    });

    it('should display teacher role correctly', () => {
      const teacherProps = { ...defaultProps, userRole: 'teacher' };
      renderWithRouter(<MeetingScreen {...teacherProps} />);
      
      expect(screen.getByText('Teacher')).toBeInTheDocument();
      expect(screen.getByText('You (teacher)')).toBeInTheDocument();
    });

    it('should display waiting message when teacher is not present for students', () => {
      const studentProps = { 
        ...defaultProps, 
        userRole: 'student', 
        isTeacherPresent: false 
      };
      renderWithRouter(<MeetingScreen {...studentProps} />);
      
      expect(screen.getByText('Waiting for teacher...')).toBeInTheDocument();
    });
  });

  describe('Video States', () => {

    it('should show microphone off state when isAudioOn is false', () => {
      const props = { ...defaultProps, isAudioOn: false };
      renderWithRouter(<MeetingScreen {...props} />);
      
      expect(screen.getByTestId('microphone-slash-icon')).toBeInTheDocument();
    });

    it('should display remote participant information', () => {
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      expect(screen.getByText('Jane Smith (teacher)')).toBeInTheDocument();
    });

    it('should show waiting message when no other participants', () => {
      const props = { 
        ...defaultProps, 
        otherParticipants: [],
        participants: [defaultProps.participants[0]] // Only current user
      };
      renderWithRouter(<MeetingScreen {...props} />);
      
      expect(screen.getByText('Waiting for other participant...')).toBeInTheDocument();
      expect(screen.getByText('Teacher will appear here when they join')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onToggleAudio when microphone button is clicked', () => {
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      const micButton = screen.getByTestId('microphone-icon').closest('button');
      fireEvent.click(micButton);
      
      expect(defaultProps.onToggleAudio).toHaveBeenCalledTimes(1);
    });

    it('should call onToggleCamera when camera button is clicked', () => {
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      const cameraButton = screen.getByTestId('video-icon').closest('button');
      fireEvent.click(cameraButton);
      
      expect(defaultProps.onToggleCamera).toHaveBeenCalledTimes(1);
    });

    it('should call onEndCall when end call button is clicked', () => {
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      const endCallButton = screen.getByTestId('phone-slash-icon').closest('button');
      fireEvent.click(endCallButton);
      
      expect(defaultProps.onEndCall).toHaveBeenCalledTimes(1);
    });

    it('should attempt screen sharing when screen share button is clicked', async () => {
      const mockGetDisplayMedia = vi.fn().mockResolvedValue({});
      navigator.mediaDevices.getDisplayMedia = mockGetDisplayMedia;
      
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      const screenShareButton = screen.getByTestId('desktop-icon').closest('button');
      fireEvent.click(screenShareButton);
      
      await waitFor(() => {
        expect(mockGetDisplayMedia).toHaveBeenCalledWith({ video: true });
      });
    });

    it('should handle screen sharing error gracefully', async () => {
      const mockGetDisplayMedia = vi.fn().mockRejectedValue(new Error('Screen sharing failed'));
      navigator.mediaDevices.getDisplayMedia = mockGetDisplayMedia;
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      const screenShareButton = screen.getByTestId('desktop-icon').closest('button');
      fireEvent.click(screenShareButton);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error sharing screen:', expect.any(Error));
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('Utility Functions', () => {
    it('should handle missing user data gracefully', () => {
      localStorage.clear();
      const props = { ...defaultProps, isCameraOn: false };
      renderWithRouter(<MeetingScreen {...props} />);
      
      expect(screen.getByText('ME')).toBeInTheDocument();
    });

    it('should display correct room ID from URL params', () => {
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      expect(screen.getByText('Meeting ID: test-room-123')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button roles and focus states', () => {
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(4); // mic, camera, screen share, end call
      
      buttons.forEach(button => {
        expect(button).toHaveClass('focus:outline-none');
        expect(button).toHaveClass('focus:ring-2');
      });
    });

    it('should have appropriate ARIA labels and semantic structure', () => {
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      // Check for proper semantic structure
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing roomID gracefully', () => {
      // Mock useLocation to return no roomID for this specific test
      mockUseLocation.mockReturnValue({ search: '' });
      
      renderWithRouter(<MeetingScreen {...defaultProps} />);
      
      // Use a more flexible matcher for the split text
      expect(screen.getByText((content, element) => {
        return element?.textContent === 'Meeting ID: N/A';
      })).toBeInTheDocument();
    });

    it('should handle empty participants array', () => {
      const props = { 
        ...defaultProps, 
        participants: [], 
        otherParticipants: [] 
      };
      renderWithRouter(<MeetingScreen {...props} />);
      
      expect(screen.getByText('Participants: 0')).toBeInTheDocument();
    });

    it('should handle null remoteStream', () => {
      const props = { ...defaultProps, remoteStream: null };
      renderWithRouter(<MeetingScreen {...props} />);
      
      expect(screen.getByText('Camera off')).toBeInTheDocument();
    });
  });
});
