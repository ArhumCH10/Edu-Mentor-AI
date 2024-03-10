import './NewRequest.css'; 
import PropTypes from 'prop-types';

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

function Clicked({ tutor }) {
  return (
    <>
      <div className="card-container">
        <div className="tutor-card">
          <div className="tutor-image">
            <img src={tutor.imageUrl} alt={tutor.name} />
          </div>
          <div className="tutor-info">
          <div className="tutor-rating">
            <h4>{tutor.name}</h4>
            <div className="tutor-status">{tutor.status}</div>
            <div className="rating">
          <StarRating rating={3.1} />
          <span className="rating-number">3.1 (29)</span>
          </div>
            </div>
            <p><span className="education-icon">🎓</span> {tutor.language}</p><br/>
             <p className="from-text"><strong>From:</strong> {tutor.country}</p>
            <div className="tutor-certification">
              <span role="img" aria-label="sparkles">🏫</span> {tutor.grade}
            </div>
            <p className="tutor-bio">
              {tutor.bio} <button className="read-more">Read more</button>
            </p>
     </div>
          <div className="tutor-session-info">
            <button className="book-trial">Send a Request</button>
            <button className="send-message">Send Message</button>
          </div>
        </div>
      </div>
      </>
  );
}

  Clicked.propTypes = {
    tutor: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      students: PropTypes.number.isRequired,
      grade: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
    }).isRequired,
  };

  StarRating.propTypes = {
    rating: PropTypes.number.isRequired
  };
  
  export default Clicked;