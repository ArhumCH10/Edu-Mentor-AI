import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const Modal = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fafafa;
  padding: 20px;
  border: 1px solid #888;
  max-width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0.2, 0.5, 0.5);
  border-radius: '20px';

  animation: ${fadeIn} 0.3s ease-in-out, ${slideIn} 0.5s ease-in-out;
`;


const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CloseButton = styled.span`
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;

const TeacherPicture = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  margin-top: -65px;
`;

const JoinButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #45a049;
  }
`;

const Dots = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-left: 5px;
  background-color: #333;
  border-radius: 50%;
  animation: ${pulse} 1s infinite;
  animation-delay: ${props => props.delay};
`;

const AnimatedDots = ({ count }) => {
  const dots = Array.from({ length: count }, (_, index) => (
    <Dots key={index} delay={`${index * 0.2}s`} />
  ));

  return <>{dots}</>;
};

const NotificationModal = ({ show, onClose, classDetails }) => {
  useEffect(() => {
    let audio = null;
    if (show) {
      audio = new Audio('/music.mp3'); 
      audio.play();

      audio.onended = () => {
        onClose(); // jab song khatam ho jay auto closs modal
      };
    }

    return () => {
      if (audio) {
        audio.pause(); // Stop the audio when cross button dabao gy
      }
    };
  }, [show]);

  const formattedTime = new Date(classDetails?.lessonTime).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  const navigate = useNavigate();

  const handleJoinClass = (classUrl) => {

    const userString = localStorage.getItem('user');
    const userObject = JSON.parse(userString);
    const StudentId = userObject._id;
    const name = userObject.name;
    const Picture = 'http://localhost:8080/' + userObject.profilePhoto || './default-user.jpg';
    const Topic = classDetails?.meetContent;
    const QuizOutline = classDetails?.quizOutline;

    navigate(classUrl, { state: { userRole: 'student',name: name,Id: StudentId, picture: Picture, Topic,QuizOutline } });
  };


  return (
    <Modal show={show}>
      <ModalContent>
        <CloseButtonWrapper>
          <div style={{ width: '90%' }}></div>
          <CloseButton onClick={() => { onClose(); }}>&times;</CloseButton>
        </CloseButtonWrapper>
        <h2>Class Notification</h2>
        <p>Your class has started. Please join now!</p>
        <hr />
        {classDetails ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TeacherPicture
              src={`http://localhost:8080/${classDetails.teacherProfilePic}`}
              alt="Teacher"
            />
            <div>
              <p>
                <strong>{classDetails?.teacherName} is calling you
                  <AnimatedDots count={3} /></ strong>
              </p>
              <p>Time: {formattedTime}</p>
              <p>Duration: {classDetails?.lessonTimeDuration} minutes</p>
              <p>Subject: {classDetails?.subjectsTaught}</p>
              <p>Topic: {classDetails?.meetContent}</p>
              
              {classDetails?.quizOutline ? 
              <p><small>Quiz must be taken at the end of class. Take the Class Carefully!</small> </p> : 
              <></>}
                <JoinButton onClick={() => { handleJoinClass(classDetails.classUrl); onClose(); }}>
                  Join Class
                </JoinButton>
              )
            </div>
          </div>
        ) : (
          <p>Loading class details...</p>
        )}
      </ModalContent>
    </Modal>
  );
};

NotificationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classDetails: PropTypes.shape({
    teacherProfilePic: PropTypes.string,
    teacherName: PropTypes.string,
    lessonTime: PropTypes.string,
    lessonTimeDuration: PropTypes.number,
    subjectsTaught: PropTypes.string,
    classUrl: PropTypes.string,
    quizOutline: PropTypes.string,
    meetContent: PropTypes.string,
  }),
};

NotificationModal.defaultProps = {
  classDetails: {
    teacherProfilePic: '',
    teacherName: '',
    lessonTime: '',
    lessonTimeDuration: 0,
    subjectsTaught: '',
    classUrl: '',
    quizOutline: '', 
  },
};

AnimatedDots.propTypes = {
  count: PropTypes.number.isRequired,
};

export default NotificationModal;
