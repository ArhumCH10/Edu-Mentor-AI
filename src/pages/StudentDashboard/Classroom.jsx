import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import styles from '../Dashboard/Cancelled.module.css'; 
import PropTypes from 'prop-types';
import './Classroom.css';
import { usePaymentStudent } from '../../services/usePaymentStudent';
import Timer from './Timer';

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
  const { data: classes,  isLoading, isError } = usePaymentStudent();

  if (isLoading) {
    return <p>Loading...</p>;
  }


if (isError) {
  return <p>Error fetching data. Please try again later.</p>;
}

if (!classes || classes.length === 0) {
  return <p>No classes found.</p>;
}

  return (
    <>
    <Row type="horizontal">
      <Heading as="head1">My Classroom</Heading>
    </Row>

      {classes.map((tutor, index) => (
     <div key={index} className="request-container">
        <div  className="tutor-card">
          <div className="tutor-image">
            <img src={tutor.profilePhoto ? `http://localhost:8080/${tutor.profilePhoto}` : '/public/default-user.jpg'} alt={tutor.name} />
          </div>
          <div className="tutor-info">
            <div className="tutor-rating">
              <h3>{tutor.teacherName}</h3>
              <img src='/public/pakistan.png' className={styles.buyerAvatar}/>
              <div className="rating">
                <StarRating rating={3.1} />
                <span className="rating-number">3.1 (29)</span>
              </div>
            </div>
            <p><span className="education-icon">🎓</span> {tutor.subjectsTaught} lesson</p><br/>
            <p className="from-text">🗣️ &nbsp;Speaks: {tutor.languagesSpoken}</p>
            <div className="tutor-certification">
                <span role="img" aria-label="sparkles">👤</span> {tutor.lessonType} class <Timer startTime={tutor.lessonDate} /> 
              </div>
            <p className="tutor-bio">
              {tutor.introduceYourself} <button className="read-more">Read more</button>
            </p>
          </div>
          <div className="tutor-session-info">
            <div className="tutor-level">Level 1</div>
            <div className="class-duration">{tutor.lessonTimeDuration} mins lesson</div>
            <div className="tutor-favorite">
              {/* Heart icon placeholder */}
            </div>
            <button className="accept">Start Class</button>
            <button className="send-message">Cancel Class</button>
          </div>
        </div>
        </div>
      ))}
  </>
  );
}

export default Classroom;