import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Modal = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  padding-top: 60px;

  .modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const NotificationModal = ({ show, onClose, classDetails }) => {
  useEffect(() => {
    if (show) {
      const audio = new Audio('/music.mp3'); // Make sure the path is correct
      audio.play();
    }
  }, [show]);

  return (
    <Modal show={show}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Class Notification</h2>
        <p>Your class has started. Please join now!</p>
        <p>Class Details:</p>
        {classDetails ? (
          <ul>
            <li>Teacher: {classDetails.teacherName}</li>
            <li>Time: {classDetails.lessonTime}</li>
            <li>Duration: {classDetails.lessonTimeDuration} minutes</li>
            <li>Subject: {classDetails.subjectsTaught}</li>
          </ul>
        ) : (
          <p>Loading class details...</p>
        )}
        {classDetails && classDetails.classUrl && (
          <a href={classDetails.classUrl} target="_blank" rel="noopener noreferrer">
            <button>Join Class</button>
          </a>
        )}
      </div>
    </Modal>
  );
};

NotificationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classDetails: PropTypes.shape({
    teacherName: PropTypes.string,
    lessonTime: PropTypes.string,
    lessonTimeDuration: PropTypes.number,
    subjectsTaught: PropTypes.string,
    classUrl: PropTypes.string,
  }),
};

NotificationModal.defaultProps = {
  classDetails: {
    teacherName: '',
    lessonTime: '',
    lessonTimeDuration: 0,
    subjectsTaught: '',
    classUrl: '',
  },
};

export default NotificationModal;
