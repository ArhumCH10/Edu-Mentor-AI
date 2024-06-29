import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './TrialLessons.css';
import { usePaymentTeacher } from '../../services/usePaymentTeacher';
import StyledSpinner from "../TeacherSignUpProcess/startSpinner";

function formatTimeSlot(startTime, durationMinutes) {
  const endTime = new Date(new Date(`1970/01/01 ${startTime}`).getTime() + durationMinutes * 60000);
  const formattedEndTime = `${endTime.getHours()}:${endTime.getMinutes()}`;
  return `${startTime}-${formattedEndTime}`;
}

function Modal({ show, onClose, onSave }) {
  const [meetContent, setMeetContent] = useState('');
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [outline, setOutline] = useState('');

  if (!show) {
    return null;
  }

  const handleSave = () => {

    if (!meetContent.trim()) {
      toast.error('Class Topic cannot be empty');
      return;
    }
  
    if (isTakingQuiz && !outline.trim()) {
      toast.error('Outline cannot be empty for quiz');
      return;
    }
   
    if (isTakingQuiz) {
      onSave(meetContent, outline);

    }
    else {
      const nullOutline = null;
      onSave(meetContent, nullOutline);
    }
    onClose();
  };
  const handleToggleQuiz = () => {
    setIsTakingQuiz(!isTakingQuiz);
    setOutline('');
  };
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Enter Class Topic</h2>
            <button className="close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <div>
              <label>Class Topic:</label>
              <input
                value={meetContent}
                onChange={(e) => setMeetContent(e.target.value)}
                style={{ width: '100%' }}
                placeholder='Write Topic. . . '
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <button className="quiz-toggle" onClick={handleToggleQuiz}>
                {isTakingQuiz ? 'Cancel Quiz' : 'Take Quiz'}
              </button>
              {isTakingQuiz && (
                <div>
                  <label>Outline: <small>Quiz will be make by it outline.</small></label>
                  <textarea
                    value={outline}
                    onChange={(e) => setOutline(e.target.value)}
                    style={{ width: '100%', minHeight: '100px', marginTop: '5px' }}
                    placeholder='1 - 2 line for Today Topic outline . . . '
                  />
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button className="save" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default function TrialLessons() {
  const { data: classes, status, isLoading } = usePaymentTeacher();
  const [showModal, setShowModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  // const navigate = useNavigate();


  const handleJoinClassClick = (lesson) => {
    setSelectedLesson(lesson);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveMeetContent = async (meetContent, quizOutline) => {

    const roomID = randomID(5);
    const url = `/meet?roomID=${roomID}&meetContent=${encodeURIComponent(meetContent)}`;
    const currentTime = new Date().toISOString();
    let userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData.userData._id;

    const lessonDetails = {
      classUrl: url,
      meetContent,
      studentName: selectedLesson.studentName,
      teacherName: selectedLesson.teacherName,
      lessonTime: currentTime,
      status: true,
      lessonTimeDuration: selectedLesson.lessonTimeDuration,
      subjectsTaught: selectedLesson.subjectsTaught,
      amountPaid: selectedLesson.amountPaid,
      teacherId: userId,
      teacherProfilePic: '',

    };
    console.log(meetContent, quizOutline);
    try {
      const response = await axios.post('http://localhost:8080/trial-classes', { lessonDetails, ...(quizOutline && { quizOutline }) });
      if (response.status === 201) {
        const userDataString = localStorage.getItem('userData');
        const userDataObject = JSON.parse(userDataString);
        const teacherId = userDataObject.userData._id;
        const profilePhoto = 'http://localhost:8080/' + userDataObject.userData.profilePhoto || './default-user.jpg';
        const teacherName = userDataObject.userData.firstName + userDataObject.userData.lastName;
        const stateToNavigate = { userRole: 'teacher', name: teacherName, Id: teacherId, picture: profilePhoto };
        console.log(stateToNavigate)
        navigate(url, { state: stateToNavigate })
        toast.success("Trial Class Started");
      } else {
        toast.error("Failed to start trial class. Please try again.");
      }
    } catch (error) {
      console.error('Error saving trial lesson details:', error);
    }
  };

  if (isLoading) {
    return <StyledSpinner />;
  }

  if (!classes || classes.length === 0 || status !== 'success') {
    return (
      <>
        <h2 className="lesson-title">Trial Lessons</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>No classes found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="lesson-title">Trial Lessons</h2>
      <div className="lessons-container">
        {status === 'success' && (
          <>
            {classes.map((lesson, index) => (
              <div className="lesson-card" key={index}>
                <div className="triallesson-header">
                  <div>
                    {lesson.subjectsTaught.toUpperCase()} class
                  </div>
                  <div className="triallesson-date">
                    {new Date(lesson.lessonDate).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <div className="lesson-body">
                  <h3>{lesson.studentName}</h3>
                  <p><strong> Time:</strong> {formatTimeSlot(lesson.lessonTime, lesson.lessonTimeDuration)}</p>
                  <p><strong>{lesson.lessonType} class</strong></p>
                  <p>{lesson.subjectsTaught} lesson</p>
                  <div className="add">
                    <p>Price <strong>$ {lesson.amountPaid} <br /> </strong></p>
                    <button className="student-view" onClick={() => handleJoinClassClick(lesson)}>Join Class</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Modal show={showModal} onClose={handleCloseModal} onSave={handleSaveMeetContent} />
    </>
  );
}

function randomID(len) {
  let result = '';
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}
