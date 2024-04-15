import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import styles from '../Dashboard/Cancelled.module.css'; 
import PropTypes from 'prop-types';
import './Classroom.css';
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

  const tutors = [
    // ... add more tutor objects here
    {
      name: "Arhum Naveed",
      imageUrl: "/public/Pic2.jpg", // Local path or URL to the image
      language: "English",
      students: 3,
      lessons: 10,
      active: "Class #6",
      bio: "Topics Covered Yesterday...",
      status: "Level 1",
      country: "India",
      duration: "50-min lesson",
      startTime: new Date("2024-03-30T14:30:00")
      // ...other properties
    },
    {
      name: "Elizabeth T.",
      imageUrl: "/public/Pic2.jpg", // Local path or URL to the image
      language: "English",
      students: 3,
      country: "Pakistan",
      active: "Class #6",
      bio: "Topics Covered Yesterday...",
      status: "New tutor",
      duration: "50-min lesson",
      startTime: new Date("2024-03-30T14:30:00")
      // ...other properties
    }
  ];

  return (
    <>
    <Row type="horizontal">
      <Heading as="head1">My Classroom</Heading>
    </Row>

      {tutors.map((tutor, index) => (
     <div key={index} className="request-container">
        <div  className="tutor-card">
          <div className="tutor-image">
            <img src={tutor.imageUrl} alt={tutor.name} />
          </div>
          <div className="tutor-info">
            <div className="tutor-rating">
              <h3>{tutor.name}</h3>
              <img src='/public/pakistan.png' alt={tutor.country} className={styles.buyerAvatar}/>
              <div className="rating">
                <StarRating rating={3.1} />
                <span className="rating-number">3.1 (29)</span>
              </div>
            </div>
            <p><span className="education-icon">🎓</span> {tutor.language} class</p><br/>
            <p className="from-text">🗣️ &nbsp;Speaks: {tutor.language}</p>
            <div className="tutor-certification">
                <span role="img" aria-label="sparkles">👤</span> {tutor.active} <Timer startTime={tutor.startTime} /> 
              </div>
            <p className="tutor-bio">
              {tutor.bio} <button className="read-more">Read more</button>
            </p>
          </div>
          <div className="tutor-session-info">
            <div className="tutor-level">{tutor.status}</div>
            <div className="class-duration">{tutor.duration}</div>
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