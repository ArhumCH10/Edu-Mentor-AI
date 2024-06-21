import { useState, useEffect } from 'react';
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import styles from '../Dashboard/Cancelled.module.css'; 
import PropTypes from 'prop-types';
import { usePaymentStudent } from '../../services/usePaymentStudent';
import Timer from './Timer';
import StyledSpinner from "../TeacherSignUpProcess/startSpinner";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  let stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      // full star
      stars.push(<i className="fas fa-star" key={i}></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // half star
      stars.push(<i className="fas fa-star-half-alt" key={i}></i>);
    } else {
      // empty star
      stars.push(<i className="far fa-star" key={i}></i>);
    }
  }

  return <div className="tutor-rating">{stars}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired
};

function Classroom() {
  const { data: classes, isLoading, isError, status } = usePaymentStudent();
  const [expandedBios, setExpandedBios] = useState({});

  if (isLoading) {
    return <StyledSpinner />;
  }

  if (isError) {
    return <p>Error fetching data. Please try again later.</p>;
  }

  if (!classes || classes.length === 0 || status !== 'success') {
    return (
      <>
        <Row type="horizontal">
          <Heading as="head1">My Classroom</Heading>
        </Row>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>No classes found.</p>
        </div>
      </>
    );
  }

  const toggleBio = (index) => {
    setExpandedBios((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="head1">My Classroom</Heading>
      </Row>
      {classes.map((tutor, index) => (
        <div key={index} className="tutor-cards">
          <div className="tutor-header">
            <div className="tutor-info-wrapper">
              <img
                className="tutor-image"
                src={tutor.profilePhoto ? `http://localhost:8080/${tutor.profilePhoto}` : '/public/default-user.jpg'}
                alt={tutor.teacherName}
              />
              <div className="tutor-info">
                <h3>{tutor.teacherName}</h3>
                <img src='/public/pakistan.png' className={styles.buyerAvatar} alt="Pakistan flag" />
                <div className="rating">
                  <StarRating rating={3.1} />
                  <span className="rating-number">3.1 (29)</span>
                </div>
              </div>
              <div className="tutor-details">
                <div className="tutor-level">Level 1</div>
                <div className="class-duration">{tutor.lessonTimeDuration} mins lesson</div>
              </div>
            </div>
            <div className="button-group">
              <TimerButton startTime={tutor.lessonDate} />
            </div>
          </div>
          <div className="tutor-body">
            <p><span className="education-icon">🎓</span> {tutor.subjectsTaught} lesson</p>
            <p className="from-text">🗣️ &nbsp;Speaks: {tutor.languagesSpoken}</p>
            <div className="tutor-certification">
              <span role="img" aria-label="sparkles">👤</span> {tutor.lessonType} class <Timer startTime={tutor.lessonDate} />
            </div>
            <p className="tutor-bio">
              {expandedBios[index] ? tutor.introduceYourself : `${tutor.introduceYourself.substring(0, 100)}...`} 
              <button onClick={() => toggleBio(index)} className="read-more">
                {expandedBios[index] ? "Read less" : "Read more"}
              </button>
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Classroom;

const TimerButton = ({ startTime }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = new Date();
      const eventTime = new Date(startTime);
      const difference = eventTime - currentTime;

      if (difference <= 0) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  return (
    <>
      <button className="accept" disabled={!isEnabled}>Start Class</button>
      <button className="send-message">Cancel Class</button>
    </>
  );
};

TimerButton.propTypes = {
  startTime: PropTypes.string.isRequired,
};